<template>
  <div>
    <p class="af-descriptionList-title" v-if="title">{{title}}</p>
    <af-row>
      <slot :colNum='colNum'></slot>
    </af-row>
  </div>
</template>

<script>
import AfRow from 'packages/row';
export default {
  name: 'AfDescriptionList',
  componentName: 'AfDescriptionList',

  components: {
    AfRow
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    col: {
      type: Number,
      default: 3
    }
  },

  data() {
    return {
      defaultCol: [1, 2, 3, 4],
      colNum: 8
    };
  },

  beforeMount() {
    this.col > 4 || this.col < 0 ? this.colNum = 8 : this.colNum = 24 / this.col;
  }
};
</script>
