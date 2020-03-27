<template>
  <af-col
    :xs='24'
    :sm='12'
    :md='colNum'>
    <div class="af-descriptListItem">
      <div class="af-descriptListItem__label">{{item}}</div>
      <div class="af-descriptListItem__content">
        <slot></slot>
      </div>
    </div>
  </af-col>
</template>

<script>
import AfCol from 'packages/col';
export default {
  name: 'AfDescriptionListItem',
  componengNmae: 'AfDescriptionListItem',

  components: {
    AfCol
  },

  props: {
    item: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      colNum: this.$parent.$parent.colNum
    };
  }
};
</script>
