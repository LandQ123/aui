<template>
  <div>
    <div class="box">
      <p>descriptionList</p>
      <af-description-list 
        :title="'这是标题'">
        <af-description-list-item item="column1">
          这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件
        </af-description-list-item>
        <af-description-list-item item="column2">
          这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件
        </af-description-list-item>
        <af-description-list-item item="column2">
          这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件
        </af-description-list-item>
      </af-description-list>
    </div>
  </div>
</template>

<script>
export default {
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