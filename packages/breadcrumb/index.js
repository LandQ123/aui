import AfBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
AfBreadcrumb.install = function(Vue) {
  Vue.component(AfBreadcrumb.name, AfBreadcrumb);
};

export default AfBreadcrumb;
