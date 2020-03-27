import AfAnchorLink from './src/anchor-link';

/* istanbul ignore next */
AfAnchorLink.install = function(Vue) {
  Vue.component(AfAnchorLink.name, AfAnchorLink);
};

export default AfAnchorLink;
