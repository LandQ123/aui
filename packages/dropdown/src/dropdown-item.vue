<template>
  <li
    class="af-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'af-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from 'aui/src/mixins/emitter';

  export default {
    name: 'AfDropdownItem',

    mixins: [Emitter],

    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean
    },

    methods: {
      handleClick(e) {
        this.dispatch('AfDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
