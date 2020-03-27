<template>
  <div
    :class="[
      'af-table',
      {
        'af-table--fit': fit,
        'af-table--striped': stripe,
        'af-table--border': border,
        'af-table--hidden': isHidden,
        'af-table--group': isGroup,
        'af-table--fluid-height': maxHeight,
        'af-table--scrollable-x': layout.scrollX,
        'af-table--scrollable-y': layout.scrollY,
        'af-table--enable-row-hover': !store.states.isComplex,
        'af-table--enable-row-transition': (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
      }, 
      tableSize ? `af-table--${ tableSize }` : ''
    ]"
    @mouseleave="handleMouseLeave($event)"
  >
    <!-- 隐藏列 -->
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <!-- 表头 -->
    <div
      v-if="showHeader"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="af-table__header-wrapper"
      ref="headerWrapper">
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-header>
    </div>
    <!-- 表格body -->
    <div
      class="af-table__body-wrapper"
      ref="bodyWrapper"
      :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
      :style="[bodyHeight]">
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
           width: bodyWidth
        }">
      </table-body>
      <!-- 表格空数据时显示的内容 -->
      <div
        v-if="!data || data.length === 0"
        class="af-table__empty-block"
        ref="emptyBlock"
        :style="{
          width: bodyWidth
        }">
        <span class="af-table__empty-text">
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        class="af-table__append-wrapper"
        ref="appendWrapper">
        <slot name="append"></slot>
      </div>
    </div>
    <!-- 表格脚部 -->
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="af-table__footer-wrapper"
      ref="footerWrapper">
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }">
      </table-footer>
    </div>
    <!--左侧固定列-->
    <div
      v-if="fixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="af-table__fixed"
      ref="fixedWrapper"
      :style="[{
        width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
      },
      fixedHeight]">
      <div
        v-if="showHeader"
        class="af-table__fixed-header-wrapper"
        ref="fixedHeaderWrapper" >
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="af-table__fixed-body-wrapper"
        ref="fixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{
            width: bodyWidth
          }">
        </table-body>
        <div
          v-if="$slots.append"
          class="af-table__append-gutter"
          :style="{
            height: layout.appendHeight + 'px'
          }"></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="af-table__fixed-footer-wrapper"
        ref="fixedFooterWrapper">
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
     <!--右侧固定列-->
    <div
      v-if="rightFixedColumns.length > 0"
      v-mousewheel="handleFixedMousewheel"
      class="af-table__fixed-right"
      ref="rightFixedWrapper"
      :style="[{
        width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
        right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
      },
      fixedHeight]">
      <div v-if="showHeader"
        class="af-table__fixed-header-wrapper"
        ref="rightFixedHeaderWrapper">
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-header>
      </div>
      <div
        class="af-table__fixed-body-wrapper"
        ref="rightFixedBodyWrapper"
        :style="[{
          top: layout.headerHeight + 'px'
        },
        fixedBodyHeight]">
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{
            width: bodyWidth
          }">
        </table-body>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        class="af-table__fixed-footer-wrapper"
        ref="rightFixedFooterWrapper">
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"></table-footer>
      </div>
    </div>
    <!-- 预留滚动条的宽度 -->
    <div
      v-if="rightFixedColumns.length > 0"
      class="af-table__fixed-right-patch"
      ref="rightFixedPatch"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }">
    </div>
    <!--列宽调整proxy 拖拽-->
    <div class="af-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
  </div>
</template>

<script type="text/babel">
  // 选择列的多选按钮
  import AfCheckbox from 'aui/packages/checkbox';
  // 防抖动
  import debounce from 'throttle-debounce/debounce';
  // 添加或移除调整尺寸事件
  import { addResizeListener, removeResizeListener } from 'aui/src/utils/resize-event';
  // 鼠标滚动事件指令
  import Mousewheel from 'aui/src/directives/mousewheel';
  // 多语言
  import Locale from 'aui/src/mixins/locale';
  import Migrating from 'aui/src/mixins/migrating';
  // 表格状态管理
  import TableStore from './table-store';
  // 布局管理
  import TableLayout from './table-layout';
  // 表格body
  import TableBody from './table-body';
  // 表头
  import TableHeader from './table-header';
  // footer
  import TableFooter from './table-footer';

  let tableIdSeed = 1;

  export default {
    name: 'AfTable',

    mixins: [Locale, Migrating],

    directives: {
      Mousewheel
    },

    props: {
      // 表格数据
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },

      // Table 的尺寸: medium / small / mini 可选
      size: String,

      // 宽度 === 未使用属性
      width: [String, Number],

      //  * Table 的高度，默认为自动高度
      //  * 如果 height 为 number 类型，单位 px；
      //  * 如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值
      //  * Table 的高度会受控于外部样式
      height: [String, Number],

      // Table 的最大高度
      maxHeight: [String, Number],

      // 列的宽度是否自撑开
      fit: {
        type: Boolean,
        default: true
      },

      // 是否为斑马纹 table
      stripe: {
        type: Boolean,
        default: true
      },

      // 是否带有纵向边框
      // border: Boolean,
      border: {
        type: Boolean,
        default: false
      },

      // 行数据的 Key，用来优化 Table 的渲染
      // 在使用 reserve-selection 功能的情况下，该属性是必填的。
      // 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
      rowKey: [String, Function],

      context: {},

      // 是否显示表头
      showHeader: {
        type: Boolean,
        default: true
      },

      // 是否在表尾显示合计行
      showSummary: Boolean,

      // 合计行第一列的文本
      sumText: String,

      // 自定义的合计计算方法 Function({ columns, data })
      summaryMethod: Function,

      // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
      // Function({row, rowIndex})
      rowClassName: [String, Function],

      // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
      // Function({row, rowIndex})/Object
      rowStyle: [Object, Function],

      // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
      // Function({row, column, rowIndex, columnIndex})/String
      cellClassName: [String, Function],

      // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
      // Function({row, column, rowIndex, columnIndex})/Object
      cellStyle: [Object, Function],

      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      // Function({row, rowIndex})/String
      headerRowClassName: [String, Function],

      // 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
      // Function({row, rowIndex})/Object
      headerRowStyle: [Object, Function],

      // 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
      // Function({row, column, rowIndex, columnIndex})/String
      headerCellClassName: [String, Function],

      // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
      // Function({row, column, rowIndex, columnIndex})/Object
      headerCellStyle: [Object, Function],

      // 是否要高亮当前行 默认false
      highlightCurrentRow: Boolean,

      // 当前行的 key，只写属性
      currentRowKey: [String, Number],

      // 空数据时显示的文本内容，也可以通过 slot="empty" 设置
      emptyText: String,

      // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
      expandRowKeys: Array,

      // 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效
      defaultExpandAll: Boolean,

      // 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
      defaultSort: Object,

      // tooltip effect 属性
      tooltipEffect: String,

      // 合并行或列的计算方法
      // Function({ row, column, rowIndex, columnIndex })
      spanMethod: Function,

      // 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
      selectOnIndeterminate: {
        type: Boolean,
        default: true
      }
    },

    components: {
      TableHeader,
      TableFooter,
      TableBody,
      AfCheckbox
    },

    methods: {
      // api更改声明
      getMigratingConfig() {
        return {
          events: {
            expand: 'expand is renamed to expand-change'
          }
        };
      },

      // 切换被选中的行
      setCurrentRow(row) {
        this.store.commit('setCurrentRow', row);
      },

      // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
      toggleRowSelection(row, selected) {
        this.store.toggleRowSelection(row, selected);
        this.store.updateAllSelected();
      },

      // 用于可展开表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
      toggleRowExpansion(row, expanded) {
        this.store.toggleRowExpansion(row, expanded);
      },

      // 用于多选表格，清空用户的选择
      clearSelection() {
        this.store.clearSelection();
      },

      // 用于清空过滤条件，数据会恢复成未过滤的状态
      clearFilter() {
        this.store.clearFilter();
      },

      // 用于清空排序条件，数据会恢复成未排序的状态
      clearSort() {
        this.store.clearSort();
      },

      // 鼠标离开事件处理
      handleMouseLeave() {
        this.store.commit('setHoverRow', null);
        if (this.hoverState) this.hoverState = null;
      },

      // 未被调用
      updateScrollY() {
        this.layout.updateScrollY();
        this.layout.updateColumnsWidth();
      },

      // 处理鼠标滚动
      handleFixedMousewheel(event, data) {
        const bodyWrapper = this.bodyWrapper;
        if (Math.abs(data.spinY) > 0) {
          const currentScrollTop = bodyWrapper.scrollTop;
          if (data.pixelY < 0 && currentScrollTop !== 0) {
            event.preventDefault();
          }
          if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
            event.preventDefault();
          }
          bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
        } else {
          bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
        }
      },

      // 待研究
      handleHeaderFooterMousewheel(event, data) {
        const { pixelX, pixelY } = data;
        if (Math.abs(pixelX) >= Math.abs(pixelY)) {
          event.preventDefault();
          this.bodyWrapper.scrollLeft += data.pixelX / 5;
        }
      },

      // 綁定事件
      bindEvents() {
        const { headerWrapper, footerWrapper } = this.$refs;
        const refs = this.$refs;
        let self = this;
        // 同步滚动
        this.bodyWrapper.addEventListener('scroll', function() {
          if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
          if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
          if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
          if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
          const maxScrollLeftPosition = this.scrollWidth - this.offsetWidth - 1;
          const scrollLeft = this.scrollLeft;
          // 控制is-scrolling-(right/left/middle)样式
          if (scrollLeft >= maxScrollLeftPosition) {
            self.scrollPosition = 'right';
          } else if (scrollLeft === 0) {
            self.scrollPosition = 'left';
          } else {
            self.scrollPosition = 'middle';
          }
        });

        // 列的宽度自撑开 resize事件
        if (this.fit) {
          addResizeListener(this.$el, this.resizeListener);
        }
      },

      // 对比新旧宽高更新布局
      resizeListener() {
        if (!this.$ready) return;
        let shouldUpdateLayout = false;
        const el = this.$el;
        const { width: oldWidth, height: oldHeight } = this.resizeState;

        const width = el.offsetWidth;
        if (oldWidth !== width) {
          shouldUpdateLayout = true;
        }

        const height = el.offsetHeight;
        if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
          shouldUpdateLayout = true;
        }

        if (shouldUpdateLayout) {
          this.resizeState.width = width;
          this.resizeState.height = height;
          this.doLayout();
          this.$emit('table-resize');
        }
      },

      // 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
      doLayout() {
        this.layout.updateColumnsWidth();
        if (this.shouldUpdateHeight) {
          this.layout.updateElsHeight();
        }
      },

      // 手动对 Table 进行排序。参数prop属性指定排序列，order指定排序顺序。
      sort(prop, order) {
        this.store.commit('sort', { prop, order });
      },

      // 用于多选表格，切换所有行的选中状态
      toggleAllSelection() {
        this.store.commit('toggleAllSelection');
      }
    },

    created() {
      // 生成tableid
      this.tableId = 'af-table_' + tableIdSeed++;
      // 设置table刷新布局的频率
      this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
    },

    computed: {
      // 表格尺寸
      tableSize() {
        return this.size || (this.$AUI || {}).size;
      },

      // 返回表格容器
      bodyWrapper() {
        return this.$refs.bodyWrapper;
      },

      // 能否更新表格高度，height 属性为数值或具有固定列时可以
      shouldUpdateHeight() {
        return this.height ||
          this.maxHeight ||
          this.fixedColumns.length > 0 ||
          this.rightFixedColumns.length > 0;
      },

      // 获取行选择集
      selection() {
        return this.store.states.selection;
      },

      // 获取列对象集合
      columns() {
        return this.store.states.columns;
      },

      // 获取表格数据
      tableData() {
        return this.store.states.data;
      },

      // 获取左侧固定列集合
      fixedColumns() {
        return this.store.states.fixedColumns;
      },

      // 获取右侧固定列集合
      rightFixedColumns() {
        return this.store.states.rightFixedColumns;
      },

      // 计算表格宽度
      bodyWidth() {
        const { bodyWidth, scrollY, gutterWidth } = this.layout;
        return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
      },

      // 计算表格高度
      bodyHeight() {
        if (this.height) {
          return {
            height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          return {
            'max-height': (this.showHeader
              ? this.maxHeight - this.layout.headerHeight - this.layout.footerHeight
              : this.maxHeight - this.layout.footerHeight) + 'px'
          };
        }
        return {};
      },

      // 计算固定列表身高度
      fixedBodyHeight() {
        if (this.height) {
          return {
            height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
          };
        } else if (this.maxHeight) {
          let maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }

          maxHeight -= this.layout.footerHeight;

          return {
            'max-height': maxHeight + 'px'
          };
        }

        return {};
      },

      // 计算固定列整体高度
      fixedHeight() {
        if (this.maxHeight) {
          if (this.showSummary) {
            return {
              bottom: 0
            };
          }
          return {
            bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
          };
        } else {
          if (this.showSummary) {
            return {
              height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
            };
          }
          return {
            height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
          };
        }
      }
    },

    watch: {
      // 更新高度
      height: {
        immediate: true,
        handler(value) {
          this.layout.setHeight(value);
        }
      },

      // 更新最大高度
      maxHeight: {
        immediate: true,
        handler(value) {
          this.layout.setMaxHeight(value);
        }
      },

      // 更新RowKey
      currentRowKey(newVal) {
        this.store.setCurrentRowKey(newVal);
      },

      // 更新数据
      data: {
        immediate: true,
        handler(value) {
          this.store.commit('setData', value);
          if (this.$ready) {
            this.$nextTick(() => {
              this.doLayout();
            });
          }
        }
      },

      // 更新展开行 RowKey
      expandRowKeys: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.store.setExpandRowKeys(newVal);
          }
        }
      }
    },

    destroyed() {
      // 解除绑定事件
      if (this.resizeListener) removeResizeListener(this.$el, this.resizeListener);
    },

    // 绑定事件 布局
    mounted() {
      this.bindEvents();
      this.store.updateColumns();
      this.doLayout();

      this.resizeState = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };

      // init filters
      this.store.states.columns.forEach(column => {
        if (column.filteredValue && column.filteredValue.length) {
          this.store.commit('filterChange', {
            column,
            values: column.filteredValue,
            silent: true
          });
        }
      });

      this.$ready = true;
    },

    data() {
      const store = new TableStore(this, {
        rowKey: this.rowKey,
        defaultExpandAll: this.defaultExpandAll,
        selectOnIndeterminate: this.selectOnIndeterminate
      });
      const layout = new TableLayout({
        store,
        table: this,
        fit: this.fit,
        showHeader: this.showHeader
      });
      return {
        layout,
        store,
        isHidden: false,
        renderExpanded: null,
        resizeProxyVisible: false,
        resizeState: {
          width: null,
          height: null
        },
        // 是否拥有多级表头
        isGroup: false,
        scrollPosition: 'left'
      };
    }
  };
</script>
