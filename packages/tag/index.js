import AfTag from './src/tag';

/* istanbul ignore next */
AfTag.install = function(Vue) {
  Vue.component(AfTag.name, AfTag);
};

export default AfTag;
