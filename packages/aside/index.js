import AfAside from './src/main';

/* istanbul ignore next */
AfAside.install = function(Vue) {
  Vue.component(AfAside.name, AfAside);
};

export default AfAside;
