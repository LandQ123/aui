import AfTable from './src/table';

/* istanbul ignore next */
AfTable.install = function(Vue) {
  Vue.component(AfTable.name, AfTable);
};

export default AfTable;
