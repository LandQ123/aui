<template>
  <div style="margin: 20px;">
    <af-input v-model="input" placeholder="请输入内容" clearable></af-input>
    <br><br>
    <af-input v-model="input" placeholder="请输入内容" disabled></af-input>
    <br><br>
    <af-input placeholder="请输入内容" v-model="input5" class="input-with-select">
      <span slot="prepend">姓名:</span>
      <!-- <af-select v-model="select" slot="prepend" placeholder="请选择">
        <af-option label="餐厅名" value="1"></af-option>
        <af-option label="订单号" value="2"></af-option>
        <af-option label="用户电话" value="3"></af-option>
      </af-select> -->
      <!-- <i slot="suffix" class="af-input__icon af-icon-date"></i> -->
      <!-- <i slot="prefix" class="af-input__icon af-icon-search"></i> -->
      <i slot="append" class="af-icon-search"></i>
    </af-input>
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
