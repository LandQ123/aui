import AfMenu from './src/menu';

/* istanbul ignore next */
AfMenu.install = function(Vue) {
  Vue.component(AfMenu.name, AfMenu);
};

export default AfMenu;
