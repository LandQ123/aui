import TransferTree from './src/main';

/* istanbul ignore next */
TransferTree.install = function(Vue) {
  Vue.component(TransferTree.name, TransferTree);
};

export default TransferTree;
