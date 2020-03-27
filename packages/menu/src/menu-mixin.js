export default {
  inject: ['rootMenu'],
  computed: {
    indexPath() {
      const path = [this.index];
      let parent = this.$parent;
      while (parent.$options.componentName !== 'AfMenu') {
        if (parent.index) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      console.log(parent);
      return path;
    },
    parentMenu() {
      let parent = this.$parent;
      while (
        parent &&
        ['AfMenu', 'AfSubmenu'].indexOf(parent.$options.componentName) === -1
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingStyle() {
      if (this.rootMenu.mode !== 'vertical') return {};

      let padding = 10;
      let parent = this.$parent;

      if (this.rootMenu.collapse) {
        padding = 10;
      } else {
        while (parent && parent.$options.componentName !== 'AfMenu') {
          if (parent.$options.componentName === 'AfSubmenu') {
            padding += 10;
          }
          parent = parent.$parent;
        }
      }
      return {paddingLeft: padding + 'px'};
    }
  }
};
