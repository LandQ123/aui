import AfTableQuery from './src/table-query.js';

/* istanbul ignore next */
AfTableQuery.install = function(Vue) {
  Vue.component(AfTableQuery.name, AfTableQuery);
};

export default AfTableQuery;
