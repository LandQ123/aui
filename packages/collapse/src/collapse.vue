<template>
  <div 
    class="af-collapse" 
    :class="type"
    role="tablist" 
    aria-multiselectable="true">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'AfCollapse',

    componentName: 'AfCollapse',

    props: {
      accordion: Boolean,
      value: {
        type: [Array, String, Number],
        default() {
          return [];
        }
      },
      type: {
        type: String,
        default: 'primary'
      },
      height: Number,
      scale: Array
    },

    data() {
      return {
        activeNames: [].concat(this.value)
      };
    },

    provide() {
      return {
        collapse: this
      };
    },

    watch: {
      value(value) {
        this.activeNames = [].concat(value);
      }
    },

    methods: {
      setActiveNames(activeNames) {
        activeNames = [].concat(activeNames);
        let value = this.accordion ? activeNames[0] : activeNames;
        this.activeNames = activeNames;
        this.$emit('input', value);
        this.$emit('change', value);
      },
      handleItemClick(item) {
        if (this.accordion) {
          this.setActiveNames(
            (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === item.name
              ? '' : item.name
          );
        } else {
          let activeNames = this.activeNames.slice(0);
          let index = activeNames.indexOf(item.name);

          if (index > -1) {
            activeNames.splice(index, 1);
          } else {
            activeNames.push(item.name);
          }

          this.setActiveNames(activeNames);

          setTimeout(() => {
            // set the height according to the scale when all panels are open
            if (this.$children.length === activeNames.length &&
                this.height > 0 &&
                this.scale.length > 0 &&
                this.scale.length === activeNames.length
            ) {
              let total = 0;
              let height = this.height;

              // calculate the total number of copies
              this.scale.forEach(val => { total += val; });

              // subtract all titles height
              this.$children.forEach(el => { height -= document.getElementById('af-collapse-head-' + el.id).clientHeight; });

              // set all content box height
              this.$children.forEach((el, index) => {
                let box = document.getElementById('af-collapse-content-' + el.id);

                box.style.maxHeight = (this.scale[index] / total) * height + 'px';
                box.style.overflow = 'auto';
                box.style.height = (this.scale[index] / total) * height + 'px';
              });
            } else {
              this.$children.forEach(el => {
                let box = document.getElementById('af-collapse-content-' + el.id);

                box.style.maxHeight = 'unset';
                box.style.height = 'auto';
              });
            }
          }, 350);
        }
      }
    },

    created() {
      this.$on('item-click', this.handleItemClick);
    }
  };
</script>
