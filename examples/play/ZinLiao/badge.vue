<template>
  <div>
    <!-- af-badge -->
    <div class="box">
      <p>af-badge</p>
      <af-badge :value="12" class="item">
        <af-button size="small">评论</af-button>
      </af-badge>
      <af-badge :value="3" class="item">
        <af-button size="small">回复</af-button>
      </af-badge>
      <af-badge :value="1" class="item" type="primary">
        <af-button size="small">评论</af-button>
      </af-badge>
      <af-badge :value="2" class="item" type="warning">
        <af-button size="small">回复</af-button>
      </af-badge>

      <af-badge :value="200" :max="99" class="item">
        <af-button size="small">评论</af-button>
      </af-badge>
      <af-badge :value="100" :max="10" class="item">
        <af-button size="small">回复</af-button>
      </af-badge>

      <af-badge value="new" class="item">
        <af-button size="small">评论</af-button>
      </af-badge>
      <af-badge value="hot" class="item">
        <af-button size="small">回复</af-button>
      </af-badge>

      <af-badge is-dot class="item">数据查询</af-badge>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 0 5px 15px;
  margin-bottom: 10px;
  border-bottom: 2px dotted #aaaaaa;

  P {
    padding-top: 10px;
    margin-bottom: 10px;
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.boxItem {
  display: inline-block;
  padding: 5px 10px 20px 5px;

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>