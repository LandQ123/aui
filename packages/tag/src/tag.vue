<template>
  <transition :name="disableTransitions ? '' : 'af-zoom-in-center'">
    <span
      class="af-tag"
      :class="[
        type ? 'af-tag--' + type : '',
        tagSize && `af-tag--${tagSize}`,
        {'is-hit': hit}
      ]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="af-tag__close af-icon-close"
        v-if="closable"
        @click.stop="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'AfTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$AUI || {}).size;
      }
    }
  };
</script>
