import AfOptionGroup from '../select/src/option-group';

/* istanbul ignore next */
AfOptionGroup.install = function(Vue) {
  Vue.component(AfOptionGroup.name, AfOptionGroup);
};

export default AfOptionGroup;
