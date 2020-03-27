import AfSideMenu from './src/side-menu';

/* istanbul ignore next */
AfSideMenu.install = function(Vue) {
  Vue.component(AfSideMenu.name, AfSideMenu);
};

export default AfSideMenu;
