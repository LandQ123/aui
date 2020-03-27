import AfAutocomplete from './src/autocomplete';

/* istanbul ignore next */
AfAutocomplete.install = function(Vue) {
  Vue.component(AfAutocomplete.name, AfAutocomplete);
};

export default AfAutocomplete;
