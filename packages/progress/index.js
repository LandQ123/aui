import AfProgress from './src/progress';

/* istanbul ignore next */
AfProgress.install = function(Vue) {
  Vue.component(AfProgress.name, AfProgress);
};

export default AfProgress;
