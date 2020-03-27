<template>
  <div style="margin: 20px;">
    <af-button>默认按钮</af-button>
    <af-button type="primary">推荐按钮</af-button>
    <af-button type="danger">错误按钮</af-button>
    <af-button type="danger-i">错误按钮</af-button>
    <af-button type="warning">提醒按钮</af-button>
    <af-button type="warning-i">提醒按钮</af-button>
    <af-button type="text">文字按钮</af-button>
    <br><br>
    <af-button size="small">小的按钮</af-button>
    <af-button size="small" type="primary">推荐按钮</af-button>
    <af-button size="small" type="danger">错误按钮</af-button>
    <af-button size="small" type="danger-i">错误按钮</af-button>
    <af-button size="small" type="warning">提醒按钮</af-button>
    <af-button size="small" type="warning-i">提醒按钮</af-button>
    <af-button size="small" type="text">文字按钮</af-button>
    <br><br>
    <af-button icon="af-icon-plus">图标按钮</af-button>
    <af-button disabled>禁用按钮</af-button>
    <af-button loading>加载按钮</af-button>
    <af-button loading disabled>加载禁用按钮</af-button>
    <af-button type="danger" loading disabled>加载错误禁用按钮</af-button>
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
