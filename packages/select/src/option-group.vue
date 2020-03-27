<template>
  <ul class="af-select-group__wrap" v-show="visible">
    <li class="af-select-group__title">{{ label }}</li>
    <li>
      <ul class="af-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'aui/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'AfOptionGroup',

    componentName: 'AfOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('AfOption', 'handleGroupDisabled', val);
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('AfOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
