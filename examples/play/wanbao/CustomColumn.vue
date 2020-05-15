<template>
 <div>
    <af-row>
        <af-col :span="12">
          <pre>已添加：{{data}}</pre>
          <pre>待添加：{{orginData}}</pre>
        </af-col>
        <af-col :span="12">
          <af-col-drag
            :sourceList="sourceList"
            :maxLength="9"
            :text="text"
            :sortedList="sortedList"
            @get-data="getData" >
          </af-col-drag>
        </af-col>
    </af-row>
 </div>
</template>
<script>
  export default {
    data() {
      return {
        sourceList:[
            {
                id: 3,
                label: '交易所',
                closable: true,
                textColor:{
                    color: '#000'
                }
            },
            {
                id: 4,
                label: '上市日期',
                closable: true,
                textColor:{
                    color: '#000'
                }
            },
            {
                id: 5,
                label: '证券类别',
                closable: true,
                textColor:{
                    color: '#000'
                }
            },
            {
                id: 6,
                label: '货币种类',
                closable: true,
                textColor:{
                    color: '#000'
                }
            },
            {
                id: 7,
                label: '数量单位',
                closable: true,
                textColor:{
                    color: '#000'
                }
            },
            {
                id: 8,
                label: '昨日收盘价',
                closable: true,
                fixed: false,
                textColor:{
                    color: '#000'
                }
            },
            {
                id: 10,
                label: '今日收盘价',
                closable: true,
                textColor:{
                    color: '#000'
                }
            }
        ],
        sortedList: [
            {
              id: 1,
              label: '申通代码',
              closable: false,
              textColor:{
                  color: '#aeaeae'
              }
            },
            {
              id: 2,
              label: '证券简称',
              closable: true,
              textColor:{
                  color: '#000'
              }
            },
            {
                id: 9,
                label: '操作',
                closable: false,
                textColor:{
                    color: '#aeaeae'
                }
            },
        ],
        text: {
          name: '新增',
          class: 'text'
        },
        data: '',
        orginData: '',
      };
    },
    methods:{
      getData(orginData, sortedData) {
        this.data = JSON.stringify(sortedData.map(item=>item.label))
        this.orginData = JSON.stringify(orginData.map(item=>item.label))
      }
    }
  };
</script>
<style lang="scss" scoped>
 >>> .text{
   color: red;
   font-size: 18px;
 }
</style>
