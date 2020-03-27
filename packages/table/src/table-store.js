/**
 * 表格状态管理
 * @module TableStoreModule
 */

import Vue from 'vue';
import debounce from 'throttle-debounce/debounce';
import merge from 'aui/src/utils/merge';
import { hasClass, addClass, removeClass } from 'aui/src/utils/dom';
import { orderBy, getColumnById, getRowIdentity } from './util';
/**
 * 对数据进行排序
 * @param data 要排序的数据
 * @param states 状态信息
 */
const sortData = (data, states) => {
  const sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};
/**
 * 获取值和 行、索引 的映射
 * @param array 要处理的数列
 * @param rowKey 对应的键名或者搜索函数
 * @returns {{}}
 */
const getKeysMap = function(array, rowKey) {
  const arrayMap = {};
  (array || []).forEach((row, index) => {
    arrayMap[getRowIdentity(row, rowKey)] = { row, index };
  });
  return arrayMap;
};
/**
 * 切换被选中的行
 * @param states 状态信息
 * @param row 要处理的行
 * @param selected 是否选中
 * @returns {boolean} 是否改变
 */
const toggleRowSelection = function(states, row, selected) {
  let changed = false;
  const selection = states.selection; // 选中的数组
  const index = selection.indexOf(row); // 查找相应的行
  if (typeof selected === 'undefined') { // 如果没有规定是否选中
    if (index === -1) { // 如果之前没有选中过
      selection.push(row); // 加入到选择列表中
      changed = true;
    } else { // 否则移除
      selection.splice(index, 1);
      changed = true;
    }
  } else { // 如果指定了是否选中
    if (selected && index === -1) { // 选中，并且之前没选中
      selection.push(row);
      changed = true;
    } else if (!selected && index > -1) { // 没选中，并且之前选中了
      selection.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};

/**
 * 切换被选中的行
 * @param states 状态信息
 * @param row 要处理的行
 * @param expanded 是否展开
 * @returns {boolean} 是否处理成功
 */
const toggleRowExpansion = function(states, row, expanded) {
  let changed = false;
  const expandRows = states.expandRows;
  if (typeof expanded !== 'undefined') {
    const index = expandRows.indexOf(row);
    if (expanded) {
      if (index === -1) {
        expandRows.push(row);
        changed = true;
      }
    } else {
      if (index !== -1) {
        expandRows.splice(index, 1);
        changed = true;
      }
    }
  } else {
    const index = expandRows.indexOf(row);
    if (index === -1) {
      expandRows.push(row);
      changed = true;
    } else {
      expandRows.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};

/**
 * TableStore
 * @constructor TableStore
 * @param table table组件实例
 * @param initialState 初始化状态
 */
const TableStore = function(table, initialState = {}) {
  if (!table) {
    throw new Error('Table is required.');
  }
  this.table = table;

  this.states = {
    rowKey: null,
    _columns: [],
    originColumns: [],
    columns: [],
    fixedColumns: [],
    rightFixedColumns: [],
    leafColumns: [],
    fixedLeafColumns: [],
    rightFixedLeafColumns: [],
    leafColumnsLength: 0,
    fixedLeafColumnsLength: 0,
    rightFixedLeafColumnsLength: 0,
    isComplex: false,
    filteredData: null,
    data: null,
    sortingColumn: null,
    sortProp: null,
    sortOrder: null,
    isAllSelected: false,
    selection: [],
    reserveSelection: false,
    selectable: null,
    currentRow: null,
    hoverRow: null,
    filters: {},
    expandRows: [],
    defaultExpandAll: false,
    selectOnIndeterminate: false
  };

  for (let prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop];
    }
  }
};

/**
 * 处理状态的一系列方法
 * @namespace
 * @type {Object}
 */
TableStore.prototype.mutations = {
  /**
   * 设置数据信息
   * @param states 状态信息
   * @param data 数据
   */
  setData(states, data) {
    const dataInstanceChanged = states._data !== data; // 数据发生改变
    states._data = data; // 保存原始值

    Object.keys(states.filters).forEach((columnId) => {
      const values = states.filters[columnId];
      if (!values || values.length === 0) return;
      const column = getColumnById(this.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter((row) => {
          return values.some(value => column.filterMethod.call(null, value, row, column));
        });
      }
    });

    states.filteredData = data;
    states.data = sortData((data || []), states); // 排序

    this.updateCurrentRow(); // 更新当前行的信息

    const rowKey = states.rowKey;

    if (!states.reserveSelection) {
      if (dataInstanceChanged) {
        this.clearSelection();
      } else {
        this.cleanSelection();
      }
      this.updateAllSelected();
    } else {
      if (rowKey) {
        const selection = states.selection;
        const selectedMap = getKeysMap(selection, rowKey);

        states.data.forEach((row) => {
          const rowId = getRowIdentity(row, rowKey);
          const rowInfo = selectedMap[rowId];
          if (rowInfo) {
            selection[rowInfo.index] = row;
          }
        });

        this.updateAllSelected();
      } else {
        console.warn('WARN: rowKey is required when reserve-selection is enabled.');
      }
    }

    const defaultExpandAll = states.defaultExpandAll;
    if (defaultExpandAll) {
      this.states.expandRows = (states.data || []).slice(0);
    } else if (rowKey) {
      // update expandRows to new rows according to rowKey
      const ids = getKeysMap(this.states.expandRows, rowKey);
      let expandRows = [];
      for (const row of states.data) {
        const rowId = getRowIdentity(row, rowKey);
        if (ids[rowId]) {
          expandRows.push(row);
        }
      }
      this.states.expandRows = expandRows;
    } else {
      // clear the old rows
      this.states.expandRows = [];
    }
    // 在下次 DOM 更新结束后，更新垂直滚动的信息
    Vue.nextTick(() => this.table.updateScrollY());
  },

  /**
   * 更改排序条件
   * @param states
   * @param options
   */
  changeSortCondition(states, options) {
    states.data = sortData((states.filteredData || states._data || []), states);

    const { $el, highlightCurrentRow } = this.table;
    if ($el && highlightCurrentRow) {
      const data = states.data;
      const tr = $el.querySelector('tbody').children;
      const rows = [].filter.call(tr, row => hasClass(row, 'af-table__row'));
      const row = rows[data.indexOf(states.currentRow)];

      [].forEach.call(rows, row => removeClass(row, 'current-row'));
      addClass(row, 'current-row');
    }

    if (!options || !options.silent) {
      this.table.$emit('sort-change', {
        column: this.states.sortingColumn,
        prop: this.states.sortProp,
        order: this.states.sortOrder
      });
    }

    Vue.nextTick(() => this.table.updateScrollY());
  },

  /**
   * 排序
   * @param states 状态信息
   * @param options 排序配置项
   */
  sort(states, options) {
    const { prop, order } = options;
    if (prop) {
      states.sortProp = prop;
      states.sortOrder = order || 'ascending';
      Vue.nextTick(() => {
        for (let i = 0, length = states.columns.length; i < length; i++) {
          let column = states.columns[i];
          if (column.property === states.sortProp) {
            column.order = states.sortOrder;
            states.sortingColumn = column;
            break;
          }
        }

        if (states.sortingColumn) {
          this.commit('changeSortCondition');
        }
      });
    }
  },
  /**
   * 更改筛选器信息
   * @param states
   * @param options
   */
  filterChange(states, options) {
    let { column, values, silent } = options;
    if (values && !Array.isArray(values)) {
      values = [values];
    }

    const prop = column.property;
    const filters = {};

    if (prop) {
      states.filters[column.id] = values;
      filters[column.columnKey || column.id] = values;
    }

    let data = states._data;

    Object.keys(states.filters).forEach((columnId) => {
      const values = states.filters[columnId];
      if (!values || values.length === 0) return;
      const column = getColumnById(this.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter((row) => {
          return values.some(value => column.filterMethod.call(null, value, row, column));
        });
      }
    });

    states.filteredData = data;
    states.data = sortData(data, states);

    if (!silent) {
      this.table.$emit('filter-change', filters);
    }

    Vue.nextTick(() => this.table.updateScrollY());
  },
  /**
   * 插入列
   * @param states 状态信息
   * @param column 列
   * @param index 索引
   * @param parent 父级
   */
  insertColumn(states, column, index, parent) {
    let array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }

    if (this.table.$ready) {
      this.updateColumns(); // hack for dynamics insert column
      this.scheduleLayout();
    }
  },
  /**
   * 移除列
   * @param states 状态信息
   * @param column 要移除的列
   */
  removeColumn(states, column, parent) {
    let array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }
    if (array) {
      array.splice(array.indexOf(column), 1);
    }

    if (this.table.$ready) {
      this.updateColumns(); // hack for dynamics remove column
      this.scheduleLayout();
    }
  },
  /**
   * 设置鼠标悬浮的行
   * @param states 状态信息
   * @param row 鼠标悬浮的行
   */
  setHoverRow(states, row) {
    states.hoverRow = row;
  },
  /**
   * 设置当前行
   * @param states 状态信息
   * @param row 要更新的行
   */
  setCurrentRow(states, row) {
    const oldCurrentRow = states.currentRow;
    states.currentRow = row;

    if (oldCurrentRow !== row) {
      this.table.$emit('current-change', row, oldCurrentRow);
    }
  },
  /**
   * 改变选中行
   * @param states 状态信息
   * @param row 要改变的行
   */
  rowSelectedChanged(states, row) {
    const changed = toggleRowSelection(states, row);
    const selection = states.selection;

    if (changed) {
      const table = this.table;
      table.$emit('selection-change', selection ? selection.slice() : []);
      table.$emit('select', selection, row);
    }

    this.updateAllSelected();
  },
  /**
   * 切换全选，有 10ms 的限制
   */
  toggleAllSelection: debounce(10, function(states) {
    const data = states.data || [];
    if (data.length === 0) return;
    const selection = this.states.selection;
    // when only some rows are selected (but not all), select or deselect all of them
    // depending on the value of selectOnIndeterminate
    const value = states.selectOnIndeterminate
      ? !states.isAllSelected
      : !(states.isAllSelected || selection.length);
    let selectionChanged = false;

    data.forEach((item, index) => {
      if (states.selectable) {
        if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      } else {
        if (toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      }
    });

    const table = this.table;
    if (selectionChanged) {
      table.$emit('selection-change', selection ? selection.slice() : []);
    }
    table.$emit('select-all', selection);
    states.isAllSelected = value;
  })
};
/**
 * 平整化列，即降嵌套的列变成平级的
 */
const doFlattenColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
/**
 * 更新列
 */
TableStore.prototype.updateColumns = function() {
  const states = this.states;
  const _columns = states._columns || [];
  states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left');
  states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right');
  // 如果有左侧的固定列，并且第一列为未指定固定的勾选列，则让其固定在左侧
  if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
    _columns[0].fixed = true;
    states.fixedColumns.unshift(_columns[0]);
  }

  const notFixedColumns = _columns.filter(column => !column.fixed);
  states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns);

  const leafColumns = doFlattenColumns(notFixedColumns);
  const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
  const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

  states.leafColumnsLength = leafColumns.length;
  states.fixedLeafColumnsLength = fixedLeafColumns.length;
  states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

  states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
  states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
};
/**
 * 判断某行是否选中
 * @param row 要判断的行
 * @returns {boolean}
 */
TableStore.prototype.isSelected = function(row) {
  return (this.states.selection || []).indexOf(row) > -1;
};
/**
 * 清空选择
 */
TableStore.prototype.clearSelection = function() {
  const states = this.states;
  states.isAllSelected = false;
  const oldSelection = states.selection;
  if (states.selection.length) {
    states.selection = [];
  }
  if (oldSelection.length > 0) {
    this.table.$emit('selection-change', states.selection ? states.selection.slice() : []);
  }
};

/**
 * 设置要展开的行
 * @param rowKeys 要展开行的主键
 */
TableStore.prototype.setExpandRowKeys = function(rowKeys) {
  const expandRows = [];
  const data = this.states.data;
  const rowKey = this.states.rowKey;
  if (!rowKey) throw new Error('[Table] prop row-key should not be empty.');
  const keysMap = getKeysMap(data, rowKey);
  rowKeys.forEach((key) => {
    const info = keysMap[key];
    if (info) {
      expandRows.push(info.row);
    }
  });

  this.states.expandRows = expandRows;
};
/**
 * 切换行选择
 * @param row 要切换的行
 * @param selected 是否选择
 */
TableStore.prototype.toggleRowSelection = function(row, selected) {
  const changed = toggleRowSelection(this.states, row, selected);
  if (changed) {
    this.table.$emit('selection-change', this.states.selection ? this.states.selection.slice() : []);
  }
};

/**
 * 切换被选中的行
 * @param row 要处理的行
 * @param expanded 是否展开
 */
TableStore.prototype.toggleRowExpansion = function(row, expanded) {
  const changed = toggleRowExpansion(this.states, row, expanded);
  if (changed) {
    this.table.$emit('expand-change', row, this.states.expandRows);
    this.scheduleLayout();
  }
};

/**
 * 判断某一行是否展开
 * @param row 要处理的行
 * @returns {boolean} 是否展开
 */
TableStore.prototype.isRowExpanded = function(row) {
  const { expandRows = [], rowKey } = this.states;
  if (rowKey) {
    const expandMap = getKeysMap(expandRows, rowKey);
    return !!expandMap[getRowIdentity(row, rowKey)];
  }
  return expandRows.indexOf(row) !== -1;
};
/**
 * 清理选择
 */
TableStore.prototype.cleanSelection = function() {
  const selection = this.states.selection || [];
  const data = this.states.data;
  const rowKey = this.states.rowKey;
  let deleted;
  if (rowKey) {
    deleted = [];
    const selectedMap = getKeysMap(selection, rowKey);
    const dataMap = getKeysMap(data, rowKey);
    for (let key in selectedMap) {
      if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
        deleted.push(selectedMap[key].row);
      }
    }
  } else {
    deleted = selection.filter((item) => {
      return data.indexOf(item) === -1;
    });
  }

  deleted.forEach((deletedItem) => {
    selection.splice(selection.indexOf(deletedItem), 1);
  });

  if (deleted.length) {
    this.table.$emit('selection-change', selection ? selection.slice() : []);
  }
};
/**
 * 清理filter
 */
TableStore.prototype.clearFilter = function() {
  const states = this.states;
  const { tableHeader, fixedTableHeader, rightFixedTableHeader } = this.table.$refs;
  let panels = {};

  if (tableHeader) panels = merge(panels, tableHeader.filterPanels);
  if (fixedTableHeader) panels = merge(panels, fixedTableHeader.filterPanels);
  if (rightFixedTableHeader) panels = merge(panels, rightFixedTableHeader.filterPanels);

  const keys = Object.keys(panels);
  if (!keys.length) return;

  keys.forEach(key => {
    panels[key].filteredValue = [];
  });

  states.filters = {};

  this.commit('filterChange', {
    column: {},
    values: [],
    silent: true
  });
};
/**
 * 清除排序
 */
TableStore.prototype.clearSort = function() {
  const states = this.states;
  if (!states.sortingColumn) return;
  states.sortingColumn.order = null;
  states.sortProp = null;
  states.sortOrder = null;

  this.commit('changeSortCondition', {
    silent: true
  });
};
/**
 * 更新是否全部被选中
 */
TableStore.prototype.updateAllSelected = function() {
  const states = this.states;
  const { selection, rowKey, selectable, data } = states;
  if (!data || data.length === 0) {
    states.isAllSelected = false;
    return;
  }

  let selectedMap;
  if (rowKey) {
    selectedMap = getKeysMap(states.selection, rowKey);
  }

  const isSelected = function(row) {
    if (selectedMap) {
      return !!selectedMap[getRowIdentity(row, rowKey)];
    } else {
      return selection.indexOf(row) !== -1;
    }
  };

  let isAllSelected = true;
  let selectedCount = 0;
  for (let i = 0, j = data.length; i < j; i++) {
    const item = data[i];
    const isRowSelectable = selectable && selectable.call(null, item, i);
    if (!isSelected(item)) {
      if (!selectable || isRowSelectable) {
        isAllSelected = false;
        break;
      }
    } else {
      selectedCount++;
    }
  }

  if (selectedCount === 0) isAllSelected = false;

  states.isAllSelected = isAllSelected;
};
/**
 * 重新规划布局
 */
TableStore.prototype.scheduleLayout = function(updateColumns) {
  if (updateColumns) {
    this.updateColumns();
  }
  this.table.debouncedUpdateLayout();
};
/**
 * 设置当前的行 rowKey
 * @param key
 */
TableStore.prototype.setCurrentRowKey = function(key) {
  const states = this.states;
  const rowKey = states.rowKey;
  if (!rowKey) throw new Error('[Table] row-key should not be empty.');
  const data = states.data || [];
  const keysMap = getKeysMap(data, rowKey);
  const info = keysMap[key];
  states.currentRow = info ? info.row : null;
};
/**
 * 更新当前行的信息
 */
TableStore.prototype.updateCurrentRow = function() {
  const states = this.states;
  const table = this.table;
  const data = states.data || [];
  const oldCurrentRow = states.currentRow;

  if (data.indexOf(oldCurrentRow) === -1) {
    states.currentRow = null;

    if (states.currentRow !== oldCurrentRow) {
      table.$emit('current-change', null, oldCurrentRow);
    }
  }
};
/**
 * commit 触发相应的 mutation
 */
TableStore.prototype.commit = function(name, ...args) {
  const mutations = this.mutations;
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};

export default TableStore;
