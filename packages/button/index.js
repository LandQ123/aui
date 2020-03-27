import AfButton from './src/button';

/* istanbul ignore next */
// 注册全局组件
AfButton.install = function(Vue) {
  Vue.component(AfButton.name, AfButton);
};

export default AfButton;
