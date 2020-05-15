<template>
  <section class="af-container" :class="{ 'is-vertical': isVertical, 'af-header-main': headerMain, 'af-aside-main': asideMain }">
    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: 'AfContainer',

    componentName: 'AfContainer',

    props: {
      direction: String
    },

    computed: {
      isVertical() {
        if (this.direction === 'vertical') {
          return true;
        } else if (this.direction === 'horizontal') {
          return false;
        }
        return this.$slots && this.$slots.default
          ? this.$slots.default.some(vnode => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === 'af-header' || tag === 'af-footer';
          })
          : false;
      },
      headerMain() {
        let flag = false;
        if (this.$slots && this.$slots.default) {
          let defaultVnodes = this.$slots.default;
          let tagArr = defaultVnodes.map((item) => {
            return item.componentOptions.tag;
          });
          if (defaultVnodes.length === 2) {
            if (tagArr.indexOf('af-header') > -1 && tagArr.indexOf('af-main') > -1) {
              flag = true;
            }
          }
        }
        return flag;
      },
      asideMain() {
        let flag = false;
        if (this.$slots && this.$slots.default) {
          let defaultVnodes = this.$slots.default;
          let tagArr = defaultVnodes.map((item) => {
            return item.componentOptions.tag;
          });
          if (defaultVnodes.length === 2) {
            if (tagArr.indexOf('af-aside') > -1 && tagArr.indexOf('af-main') > -1) {
              flag = true;
            }
          }
        }
        return flag;
      }
    }
  };
</script>
