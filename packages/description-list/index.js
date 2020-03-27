import DescriptionList from './src/description-list';

/* istanbul ignore next */
DescriptionList.install = function(Vue) {
  Vue.component(DescriptionList.name, DescriptionList);
};

export default DescriptionList;

