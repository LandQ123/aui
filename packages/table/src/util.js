/**
 * 表格工具函数模块
 * @module TableUtilModule
 */

import { getValueByPath } from 'aui/src/utils/util';

/**
 * 获取 td 元素，即单元格
 * @param event 触发的事件
 * @returns {*} td 元素 或者 null
 */
export const getCell = function(event) {
  let cell = event.target;

  while (cell && cell.tagName.toUpperCase() !== 'HTML') {
    if (cell.tagName.toUpperCase() === 'TD') {
      return cell;
    }
    cell = cell.parentNode;
  }

  return null;
};

/**
 * 判断是不是对象
 * @param obj
 * @returns {boolean}
 */
const isObject = function(obj) {
  return obj !== null && typeof obj === 'object';
};

/**
 * 排序
 * @param array 要排序的数组
 * @param sortKey 排序的键
 * @param reverse 是否翻转
 * @param sortMethod 排序的比较方法
 * @param sortBy  要排序的字段
 * @returns {*}
 * 利用数组方法sort进行排序
 */
export const orderBy = function(array, sortKey, reverse, sortMethod, sortBy) {
  // 是否有排序的键
  if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
    return array;
  }
  // 升序或者降序
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1;
  } else {
    reverse = (reverse && reverse < 0) ? -1 : 1;
  }
  const getKey = sortMethod ? null : function(value, index) {
    if (sortBy) {
      if (!Array.isArray(sortBy)) {
        sortBy = [sortBy];
      }
      return sortBy.map(function(by) {
        if (typeof by === 'string') {
          return getValueByPath(value, by);
        } else {
          return by(value, index, array);
        }
      });
    }
    if (sortKey !== '$key') {
      if (isObject(value) && '$value' in value) value = value.$value;
    }
    return [isObject(value) ? getValueByPath(value, sortKey) : value];
  };
  // 排序函数
  const compare = function(a, b) {
    // 如果有传入排序方法，用该方法排序
    if (sortMethod) {
      return sortMethod(a.value, b.value);
    }
    for (let i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  return array.map(function(value, index) {
    return {
      value: value,
      index: index,
      key: getKey ? getKey(value, index) : null
    };
  }).sort(function(a, b) {
    let order = compare(a, b);
    if (!order) {
      // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
      order = a.index - b.index;
    }
    return order * reverse;
  }).map(item => item.value);
};

/**
 * 通过 id 来获取列
 * @param table 表格
 * @param columnId 列的 id
 * @returns {*}
 */
export const getColumnById = function(table, columnId) {
  let column = null;
  table.columns.forEach(function(item) {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};

/**
 * 根据单元格查找列
 * @param table 表格
 * @param cell 单元格
 * @returns {*}
 */
export const getColumnByCell = function(table, cell) {
  const matches = (cell.className || '').match(/af-table_[^\s]+/gm);
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};

/**
 * 获取某一行的值中的某些值
 * @param row 行
 * @param rowKey 键名或者搜索函数
 */
export const getRowIdentity = (row, rowKey) => {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    if (rowKey.indexOf('.') < 0) {
      return row[rowKey];
    }
    let key = rowKey.split('.');
    let current = row;
    for (let i = 0; i < key.length; i++) {
      current = current[key[i]];
    }
    return current;
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row);
  }
};
