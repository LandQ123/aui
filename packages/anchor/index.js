import AfAnchor from './src/anchor';

/* istanbul ignore next */
AfAnchor.install = function(Vue) {
  Vue.component(AfAnchor.name, AfAnchor);
};

export default AfAnchor;
