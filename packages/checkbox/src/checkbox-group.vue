<script>
  import Emitter from 'aui/src/mixins/emitter';

  export default {
    name: 'AfCheckboxGroup',

    componentName: 'AfCheckboxGroup',

    mixins: [Emitter],

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._elFormItemSize || (this.$AUI || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('AfFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="af-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
