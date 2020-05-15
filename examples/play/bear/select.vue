<template>
  <div style="margin: 20px;">
    <af-select
      v-model="value5"
      multiple
      collapse-tags
      placeholder="请选择">
      <af-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </af-option>
    </af-select>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '烤鸭'
        }],
        value5: []
      }
    }
  };
</script>
