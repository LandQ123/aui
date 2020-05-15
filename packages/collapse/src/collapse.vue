<template>
  <div :style="height ? 'height:' + height + 'px;overflow:hidden' : ''">
    <div 
      class="af-collapse" 
      :class="type"
      role="tablist" 
      aria-multiselectable="true">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import debounce from 'throttle-debounce/debounce';

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
    scale: {
      type: Object,
      default: val => val || {}
    },
    scaleNum: {
      type: Number,
      default(num) {
        if (!num || num <= 0) { num = 1; }
        return num;
      }
    },
    scaleDebounce: {
      type: Number,
      default: 100
    }
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
    },
    height(value) {
      value && value > 0 && this.debounceUpdateHeight();
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
        // let height = this.height;
        let activeNames = this.activeNames.slice(0);
        let index = activeNames.indexOf(item.name);

        index > -1 ? activeNames.splice(index, 1) : activeNames.push(item.name);

        this.setActiveNames(activeNames);

        this.updatePannelHeight();
      }
    },
    updatePannelHeight() {
      let height = this.height;
      let activeNames = this.activeNames.slice(0);

      // set the height according to the scale when at least number of setting panels are open
      if (height > 0 && Object.keys(this.scale).length > 0) {
        let total = 0;

        // calculate the total number of copies
        activeNames.forEach(val => { total += this.scale[val]; });

        // subtract all titles height
        this.$children.forEach(el => { height -= document.getElementById('af-collapse-head-' + el.id).clientHeight; });

        // set all content box height
        if (height > 0) {
          this.$children.forEach(({name, id}) => {
            let content = document.getElementById('af-collapse-content-' + id).getElementsByClassName('af-collapse-item__content')[0] || '';

            activeNames.indexOf(name) >= 0 &&
              content &&
              content.setAttribute('style', `height:${(this.scale[name] / total) * height - 4}px; overflow:auto;`);
          });
        } else {
          console.error('高度不够，无法按比例分配各面板高度！');
        }
      }
    }
  },

  created() {
    this.$on('item-click', this.handleItemClick);
    this.debounceUpdateHeight = debounce(this.scaleDebounce, () => this.updatePannelHeight());
  }
};
</script>
