 <template>
 <div style="background:#eee">
    <x-table
      :tableEvents="tableEvents"
      :tableAttrs="tableAttrs"
      :tableData="tableData"
      :tableCloumns="tableCloumns"
    >
    </x-table>
 </div>
</template>

<script>
import Table from 'aui/packages/table-query/src/table.js';
export default {
  components:{
    XTable: Table
  },
  data() {
    return {
      tableAttrs: {
        style: 'width: 100%',
        height: '200',
        border: true
      },
      tableEvents: {
        'row-click': (row, event, column) => console.log(row, event, column)
      },
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
      tableCloumns: [{
        type:'selection'
      },{
        prop:'name',
        label:'姓名',
        attrs:{
          width: '100',
          fixed:'left'
        },
        // render自定义cloumn内容
        slot: (h,scope) => (<div><i class="af-icon-time"></i><span style="margin-left: 10px">{ scope.row.name }</span></div>)
      },{
        label:'日期',
        prop:'date',
        attrs:{
          width: '120',
          align:'right',
          'header-align': 'center'
        }
      },{
        prop:'address',
        label:'地址'
      },{
        // 多级表头
        label:'配送信息',
        children: [{
          prop:'name',
          label:'姓名',
          attrs:{
            width: '100'
          },
          // render自定义cloumn内容
          slot: (h,scope) => (<div><i class="af-icon-time"></i><span style="margin-left: 10px">{ scope.row.name }</span></div>)
        },{
          label:'地址',
          children: [
            {
              prop:'province"',
              label:'省份'
            },{
              prop:'city',
              label:'市区'
            },{
              prop:'address',
              label:'地址'
            },{
              prop:'zip',
              label:'邮编'
            },
          ]
        }]
      },{
        label:'操作',
        attrs:{fixed:'right'},
        slot:(h,scope) => (
           <af-button
            onClick={() => this.deleteRow(scope.$index)}
            type='text'
            size='small'>
            移除
          </af-button>
        )
      }],
    }
  },
  methods: {
    deleteRow(index, rows) {
      console.log(index,rows);
    }
  },
}
</script>

