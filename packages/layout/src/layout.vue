<template>
  <div>
    <af-container>
      <af-header v-if="isTop" :height="height"><slot name="top"></slot></af-header>
      <af-aside v-if="isLeft" :width="width"><slot name="left"></slot></af-aside>
      <af-main v-if="isCenter"><slot name="center"></slot></af-main>
      <af-aside v-if="isRight" :width="width"><slot name="right"></slot></af-aside>
      <af-footer v-if="isBottom" :height="height"><slot name="bottom"></slot></af-footer>
    </af-container>
  </div>
</template>

<script>
  export default {
    name: 'AfLayout',
    componentName: 'AfLayout',
    created() {
      this.initLayout();
    },
    data() {
      return {
        isTop: false,
        isBottom: false,
        isCenter: false,
        isLeft: false,
        isRight: false
      };
    },
    props: {
      type: {
        type: String,
        default: 'left-center'
      },
      width: {
        type: String,
        default: '400px'
      },
      height: {
        type: String,
        default: '80px'
      }
    },
    methods: {
      initLayout() {
        this.isTop = this.hasChild('top');
        this.isBottom = this.hasChild('bottom');
        this.isCenter = this.hasChild('center');
        this.isLeft = this.hasChild('left');
        this.isRight = this.hasChild('right');
      },
      hasChild(item) {
        if (!this.type || this.type.split('-').length > 3) return false;
        return this.type.split('-').includes(item);
      }
    }
  };
</script>
<style lang="scss" scoped>
 .af-main, .af-header, .af-footer {
  padding: 0;
 }
</style>
