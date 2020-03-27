<template>
  <af-row class="demo-autocomplete">
    <af-col :span="6">
      <div class="sub-title">激活即列出输入建议</div>
      <af-autocomplete
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      ></af-autocomplete>
    </af-col>
    <af-col :span="12">
      <div class="sub-title">输入后匹配输入建议</div>
      <af-autocomplete
        class="inline-input"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
        :group="true"
        :groupAttrs="groupAttrs"
      >
        <template slot-scope="{ item }">
          <div v-if="item.type === 'user'">
            <div  class="user-name">{{ item.value }} ☺</div>
            <span class="addr">{{ item.address }}</span>
          </div>
          <div v-if="item.type === 'address'">
            <div class="user-photo"><img :src="item.address"/> {{item.value }}</div>
          </div>
          <div v-if="item.type === 'list'">
            <span class="name">{{ item.value }}</span>
            <span class="addr">{{ item.address }}</span>
          </div>
        </template>
      </af-autocomplete>
    </af-col>
  </af-row>
</template>
<script>
  export default {
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        groupAttrs: [
            {name:"通讯录",type:"user"},
            {name:"公众号",type:"address"},
            {name:"朋友圈",type:"list"}
          ]
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().includes(queryString.toLowerCase()));
        };
      },
      loadAll() {
        return [
          { "value": "大熊(G)", "address": "18607130524",type:"user"},
          { "value": "熊二(G)", "address": "15836421121",type:"user"},
          { "value": "熊三(G)", "address": "15255154552",type:"user"},
          { "value": "刘备教授(G)", "address": "http://lorempixel.com/40/40/people/",type:"address" },
          { "value": "科普中国(G)", "address": "http://lorempixel.com/40/40/people/",type:"address" },
          { "value": "三甲传真(G)", "address": "http://lorempixel.com/40/40/people/",type:"address" },
          { "value": "丁香医生(G)", "address": "http://lorempixel.com/40/40/people/",type:"address" },
          { "value": "Linux中国(G)", "address": "http://lorempixel.com/40/40/people/",type:"address" },
          { "value": "21CTO(G)", "address": "http://lorempixel.com/40/40/people/",type:"address" },
          { "value": "上海市普陀区(G)", "address": "上海市普陀区真北路988号",type:"list" },
          { "value": "北京市普陀区(G)", "address": "普陀区真",type:"list" },
          { "value": "武汉市真普陀区(G)", "address": "真北路号",type:"list" },
          { "value": "潮汕市普陀区(G)", "address": "北路988号",type:"list" },
          { "value": "东莞市普陀区(G)", "address": "黄冈",type:"list" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>
<style lang="scss" scoped>
  .user-name {
    border-bottom: 1px dotted #ebeef5;
    line-height: 20px;
  }
  .user-photo {
    border-radius: 50%;
    vertical-align: middle;
    margin-bottom: 10px;
  }
</style>
