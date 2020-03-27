 <template>
 <div>
    <af-table
      :data="tableData"
      style="width: 100%">
      <af-table-column
        prop="date"
        label="日期"
        width="180">
      </af-table-column>
      <af-table-column
        show-overflow-tooltip
        prop="name"
        label="姓名"
        width="180">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址">
      </af-table-column>
    </af-table>
    <p>使用带斑马纹的表格，可以更容易区分出不同行的数据。</p>
    <af-table
      :data="tableData"
      stripe
      style="width: 100%">
      <af-table-column
        prop="date"
        label="日期"
        width="180">
      </af-table-column>
      <af-table-column
        prop="name"
        label="姓名"
        width="180">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址">
      </af-table-column>
    </af-table>

    <p>带边框表格</p>
    <af-table
      :data="tableData"
      border
      style="width: 100%">
      <af-table-column
        prop="date"
        label="日期"
        width="180">
      </af-table-column>
      <af-table-column
        prop="name"
        label="姓名"
        width="180">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址">
      </af-table-column>
    </af-table>

    <p>带状态表格</p>
    <af-table
      :data="tableData2"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <af-table-column
        prop="date"
        label="日期"
        width="180">
      </af-table-column>
      <af-table-column
        prop="name"
        label="姓名"
        width="180">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址">
      </af-table-column>
    </af-table>

    <p>固定表头</p>
    <af-table
      :data="tableData3"
      height="250"
      border
      style="width: 100%">
      <af-table-column
        prop="date"
        label="日期"
        width="180">
      </af-table-column>
      <af-table-column
        prop="name"
        label="姓名"
        width="180">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址">
      </af-table-column>
    </af-table>

    <p>固定列</p>
    <af-table
      :data="tableData1"
      border
      style="width: 100%">
      <af-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </af-table-column>
      <af-table-column
        prop="name"
        label="姓名"
        width="120">
      </af-table-column>
      <af-table-column
        prop="province"
        label="省份"
        width="120">
      </af-table-column>
      <af-table-column
        prop="city"
        label="市区"
        width="120">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址"
        width="300">
      </af-table-column>
      <af-table-column
        prop="zip"
        label="邮编"
        width="120">
      </af-table-column>
      <af-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <af-button @click="handleClick(scope.row)" type="text" size="small">查看</af-button>
          <af-button type="text" size="small">编辑</af-button>
        </template>
      </af-table-column>
    </af-table>

    <p>固定列和表头</p>
    <af-table
      :data="tableData3"
      style="width: 100%"
      height="250">
      <af-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </af-table-column>
      <af-table-column
        prop="name"
        label="姓名"
        width="120">
      </af-table-column>
      <af-table-column
        prop="province"
        label="省份"
        width="120">
      </af-table-column>
      <af-table-column
        prop="city"
        label="市区"
        width="120">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址"
        width="300">
      </af-table-column>
      <af-table-column
        prop="zip"
        label="邮编"
        width="120">
      </af-table-column>
    </af-table>

    <p>流体高度</p>
    <af-table
      :data="tableData4"
      style="width: 100%"
      max-height="250">
      <af-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </af-table-column>
      <af-table-column
        prop="name"
        label="姓名"
        width="120">
      </af-table-column>
      <af-table-column
        prop="province"
        label="省份"
        width="120">
      </af-table-column>
      <af-table-column
        prop="city"
        label="市区"
        width="120">
      </af-table-column>
      <af-table-column
        prop="address"
        label="地址"
        width="300">
      </af-table-column>
      <af-table-column
        prop="zip"
        label="邮编"
        width="120">
      </af-table-column>
      <af-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <af-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            移除
          </af-button>
        </template>
      </af-table-column>
    </af-table>

    <p>多级表头</p>
    <af-table
      :data="tableData3"
      style="width: 100%">
      <af-table-column
        prop="date"
        label="日期"
        width="150">
      </af-table-column>
      <af-table-column label="配送信息">
        <af-table-column
          prop="name"
          label="姓名"
          width="120">
        </af-table-column>
        <af-table-column label="地址">
          <af-table-column
            prop="province"
            label="省份"
            width="120">
          </af-table-column>
          <af-table-column
            prop="city"
            label="市区"
            width="120">
          </af-table-column>
          <af-table-column
            prop="address"
            label="地址"
            width="300">
          </af-table-column>
          <af-table-column
            prop="zip"
            label="邮编"
            width="120">
          </af-table-column>
        </af-table-column>
      </af-table-column>
    </af-table>
 </div>
    <!-- <af-pagination
      background
      layout="prev, pager, next, jumper, ->, total"
      :total="1000">
    </af-pagination> -->
  </template>

  <script>
    export default {
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        handleClick(row) {
          console.log(row);
        },
        deleteRow(index, rows) {
          rows.splice(index, 1);
        }
      },
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],

          tableData1: [{
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
          }],

          tableData3: [{
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

          tableData4: [{
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
          }]
        }
      }
    }
  </script>
