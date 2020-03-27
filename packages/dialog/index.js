import AfDialog from './src/component';

/* istanbul ignore next */
AfDialog.install = function(Vue) {
  Vue.component(AfDialog.name, AfDialog);
};

export default AfDialog;
