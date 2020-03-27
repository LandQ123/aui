import AfTableColumn from '../table/src/table-column';

/* istanbul ignore next */
AfTableColumn.install = function(Vue) {
  Vue.component(AfTableColumn.name, AfTableColumn);
};

export default AfTableColumn;
