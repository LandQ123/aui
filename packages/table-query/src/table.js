/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/*
TODO:
1.多级表头 √
2.cloumn slot render √
3.实例方法
4.setFieldValue函数 √
*/

import AfTableBase from 'aui/packages/table';
import AfTableColumnBase from 'aui/packages/table-column';

const defaultCloumnsProps = {
  'header-align': 'center'
};

const genProps = (self, attrs = {}, events) => {
  // 设置默认配置
  Object.keys(defaultCloumnsProps).forEach(item => {
    if (!attrs[item]) {
      attrs[item] = defaultCloumnsProps[item];
    }
  });
  return {
    props: attrs,
    on: events || {}
  };
};

export default {
  name: 'x-table',
  props: {
    tableAttrs: Object,
    tableEvents: Object,
    tableData: Array,
    tableCloumns: Array
  },
  render(h) {
    const self = this;
    const {tableData = [], tableCloumns = [], tableAttrs, tableEvents} = self.$props;
    const tableProps = genProps(self, tableAttrs, tableEvents);

    const genColumn = ({prop, label, type, children}, tableColumnProps) => {
      return (
        <AfTableColumnBase
          type={type}
          prop={prop}
          label={label}
          {...tableColumnProps}
        >
          { children && renderCloumn(children) }
        </AfTableColumnBase>
      );
    };

    // 渲染cloumn
    const renderCloumn = data => {
      const renderProxy = this._renderProxy;
      return self._l(data, cloumn => {
        let {attrs, events, slot, children} = cloumn;
        let tableColumnProps = genProps(null, attrs, events);

        // 递归render多级表头
        if (children && children.length > 0) {
          return genColumn(cloumn, tableColumnProps);
        }

        // 处理作用域插槽
        if (slot) {
          let scopedSlots = {
            default: props => slot.call(renderProxy, h, props)
          };
          tableColumnProps = Object.assign({}, tableColumnProps, {scopedSlots: scopedSlots});
        }

        return genColumn(cloumn, tableColumnProps);
      });
    };

    return (
      <AfTableBase data={tableData} {...tableProps} >
        {renderCloumn(tableCloumns)}
      </AfTableBase>
    );
  }
};
