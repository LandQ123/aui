<template>
  <div style="margin: 20px;">
    1、左-中间(布局)
    <af-layout type="left-center" width="400px" class="af-layout">
       <div slot="left" class="left-layout">左边</div>
       <div slot="center" class="center-layout">中间</div>
    </af-layout>
    2、左-中间-右边(嵌套顶部-中间布局) 
    <af-layout type="left-center-right" width="400px" class="af-layout">
       <div slot="left" class="left-layout">左边</div>
       <div slot="center" class="center-layout">中间</div>
       <div slot="right" class="right-layout">
         <af-layout type="top-center" width="400px"  height="50px">
          <div slot="top" class="top-layout">顶部</div>
          <div slot="center" class="center-layout top-center-center">中间</div>
         </af-layout>
      </div>
    </af-layout>
   3、顶部-中间(嵌套左-中-右布局)
    <af-layout type="top-center" width="400px"  height="50px" class="af-layout">
       <div slot="top" class="top-layout">顶部</div>
       <div slot="center" class="center-layout">
         <af-layout type="left-center-right" width="400px">
          <div slot="left" class="left-layout left-center-right-left">左边</div>
          <div slot="center" class="center-layout">中间</div>
          <div slot="right" class="right-layout left-center-right-right">右边</div>
        </af-layout>
       </div>
    </af-layout>
    4、顶部-中间-底部(嵌套左-中间布局)
    <af-layout type="top-center-bottom" width="400px"  height="50px" class="af-layout">
       <div slot="top" class="top-layout">顶部</div>
       <div slot="center" class="center-layout">
         <af-layout type="left-center" width="400px">
          <div slot="left" class="left-layout left-center-left">左边</div>
          <div slot="center" class="center-layout">中间</div>
         </af-layout>
       </div>
       <div slot="bottom" class="bottom-layout">底部</div>
    </af-layout>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      };
    }
  };
</script>
<style lang="scss" scoped>
  .af-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .af-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .af-layout {
    margin: 40px 0;
  }
  .top-layout,
  .bottom-layout {
    background-color: #19b5ff;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  .left-layout,
  .right-layout {
    background-color: #19b5ff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .center-layout {
    background-color: #f7ba2b;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .top-center-center {
    line-height: 150px;
    background-color: gray;
  }
  .left-center-right-left,
  .left-center-right-right,
  .left-center-left {
    background-color: #cdcdcd;
  }
</style>