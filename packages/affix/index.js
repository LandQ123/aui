import AfAffix from './src/affix';

/* istanbul ignore next */
AfAffix.install = function(Vue) {
  Vue.component(AfAffix.name, AfAffix);
};

export default AfAffix;
