import AfLayout from './src/layout';

/* istanbul ignore next */
AfLayout.install = function(Vue) {
  Vue.component(AfLayout.name, AfLayout);
};

export default AfLayout;
