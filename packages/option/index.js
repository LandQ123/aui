import AfOption from '../select/src/option';

/* istanbul ignore next */
AfOption.install = function(Vue) {
  Vue.component(AfOption.name, AfOption);
};

export default AfOption;
