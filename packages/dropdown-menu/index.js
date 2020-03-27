import AfDropdownMenu from '../dropdown/src/dropdown-menu';

/* istanbul ignore next */
AfDropdownMenu.install = function(Vue) {
  Vue.component(AfDropdownMenu.name, AfDropdownMenu);
};

export default AfDropdownMenu;
