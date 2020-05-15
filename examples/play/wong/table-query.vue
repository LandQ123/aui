 <template>
 <div style="background:#eee">
    <af-table-query ref="atq"
      :fieldList="fields"
      :tableEvents="tableEvents"
      :tableAttrs="tableAttrs"
      :tableData="tableData"
      :tableCloumns="tableCloumns"
      :pagination="pagination"
    >
    </af-table-query>
    <!-- {{fields}} -->
 </div>
</template>

<script>

  const createOptionsData = () => {
    return[{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',
      slot: (h,item) => {
        return(
          <div>
            <span style="float: left">{ item.label }</span>
            <span style="float: right; color: #8492a6; font-size: 13px">item自定义slot</span>
          </div>
        )
      }
    }, {
      value: '选项3',
      label: '蚵仔煎111',
      disabled: true
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]
  }

  const createOptionsGroupData = () => {
      return [{
        label: '分组一',
        disabled: false,
        options: createOptionsData()
      },{
        label: '分组2️⃣',
        disabled: true,
        options: [{
          value: '选项11',
          label: '黄金糕'
        }, {
          value: '选项21',
          label: '双皮奶',
          slot: (h,item) => {
            return(
              <div>
                <span style="float: left">{ item.label }</span>
                <span style="float: right; color: #8492a6; font-size: 13px">item自定义slot</span>
              </div>
            )
          }
        }, {
          value: '选项31',
          label: '蚵仔煎111',
          disabled: true
        }]
      }]
  }

  const createtableData = [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    tag: '家'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    tag: '公司'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    tag: '家'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
    tag: '公司'
  }];

  // cascader
  const cascaderOptions = [{
    value: 'zhinan',
    label: '指南',
    children: [{
      value: 'shejiyuanze',
      label: '设计原则',
      children: [{
        value: 'yizhi',
        label: '一致'
      }, {
        value: 'fankui',
        label: '反馈'
      }, {
        value: 'xiaolv',
        label: '效率'
      }, {
        value: 'kekong',
        label: '可控'
      }]
    }, {
      value: 'daohang',
      label: '导航',
      children: [{
        value: 'cexiangdaohang',
        label: '侧向导航'
      }, {
        value: 'dingbudaohang',
        label: '顶部导航'
      }]
    }]
  }, {
    value: 'zujian',
    label: '组件',
    children: [{
      value: 'basic',
      label: 'Basic',
      children: [{
        value: 'layout',
        label: 'Layout 布局'
      }, {
        value: 'color',
        label: 'Color 色彩'
      }, {
        value: 'typography',
        label: 'Typography 字体'
      }, {
        value: 'icon',
        label: 'Icon 图标'
      }, {
        value: 'button',
        label: 'Button 按钮'
      }]
    }, {
      value: 'form',
      label: 'Form',
      children: [{
        value: 'radio',
        label: 'Radio 单选框'
      }, {
        value: 'checkbox',
        label: 'Checkbox 多选框'
      }, {
        value: 'input',
        label: 'Input 输入框'
      }, {
        value: 'input-number',
        label: 'InputNumber 计数器'
      }, {
        value: 'select',
        label: 'Select 选择器'
      }, {
        value: 'cascader',
        label: 'Cascader 级联选择器'
      }, {
        value: 'switch',
        label: 'Switch 开关'
      }, {
        value: 'slider',
        label: 'Slider 滑块'
      }, {
        value: 'time-picker',
        label: 'TimePicker 时间选择器'
      }, {
        value: 'date-picker',
        label: 'DatePicker 日期选择器'
      }, {
        value: 'datetime-picker',
        label: 'DateTimePicker 日期时间选择器'
      }, {
        value: 'upload',
        label: 'Upload 上传'
      }, {
        value: 'rate',
        label: 'Rate 评分'
      }, {
        value: 'form',
        label: 'Form 表单'
      }]
    }, {
      value: 'data',
      label: 'Data',
      children: [{
        value: 'table',
        label: 'Table 表格'
      }, {
        value: 'tag',
        label: 'Tag 标签'
      }, {
        value: 'progress',
        label: 'Progress 进度条'
      }, {
        value: 'tree',
        label: 'Tree 树形控件'
      }, {
        value: 'pagination',
        label: 'Pagination 分页'
      }, {
        value: 'badge',
        label: 'Badge 标记'
      }]
    }, {
      value: 'notice',
      label: 'Notice',
      children: [{
        value: 'alert',
        label: 'Alert 警告'
      }, {
        value: 'loading',
        label: 'Loading 加载'
      }, {
        value: 'message',
        label: 'Message 消息提示'
      }, {
        value: 'message-box',
        label: 'MessageBox 弹框'
      }, {
        value: 'notification',
        label: 'Notification 通知'
      }]
    }, {
      value: 'navigation',
      label: 'Navigation',
      children: [{
        value: 'menu',
        label: 'NavMenu 导航菜单'
      }, {
        value: 'tabs',
        label: 'Tabs 标签页'
      }, {
        value: 'breadcrumb',
        label: 'Breadcrumb 面包屑'
      }, {
        value: 'dropdown',
        label: 'Dropdown 下拉菜单'
      }, {
        value: 'steps',
        label: 'Steps 步骤条'
      }]
    }, {
      value: 'others',
      label: 'Others',
      children: [{
        value: 'dialog',
        label: 'Dialog 对话框'
      }, {
        value: 'tooltip',
        label: 'Tooltip 文字提示'
      }, {
        value: 'popover',
        label: 'Popover 弹出框'
      }, {
        value: 'card',
        label: 'Card 卡片'
      }, {
        value: 'carousel',
        label: 'Carousel 走马灯'
      }, {
        value: 'collapse',
        label: 'Collapse 折叠面板'
      }]
    }]
  }, {
    value: 'ziyuan',
    label: '资源',
    children: [{
      value: 'axure',
      label: 'Axure Components'
    }, {
      value: 'sketch',
      label: 'Sketch Templates'
    }, {
      value: 'jiaohu',
      label: '组件交互文档'
    }]
  }]

  export default {
    mounted() {
      setTimeout(() => {
        this.fields[0].options = createOptionsData()
        // this.fields[1].options = createOptionsData()
        // this.fields[2].optionsGroup = createOptionsGroupData()
        // table-query 的 setVal api测试
        this.$refs.atq.setVal('input-1.value','api修改的值')
        this.$refs.atq.setVal('input-1.attrs.clearable',true)
        this.$refs.atq.setVal('input-1.attrs.placeholder','请输入')
        this.$refs.atq.setVal('input-1.events.input',this.activeItemChange)

        this.$refs.atq.setVal('select-1.options',createOptionsData())
        this.$refs.atq.setVal('select-2.optionsGroup',createOptionsGroupData())

      })
      // console.log(this.$refs.atq.getFieldComponentInstance('select-0'));
      // console.log(this.$refs.atq.getFieldComponentInstance('select-0').$children.)
      // this.$refs.atq.getFieldComponentInstance('select-0').focus();
    },
    methods: {
      onInput(event){
        console.log(event);
      },
      onBlur(event){
        console.log(event);
      },
      onChange(val){
        console.log(val);
      },
      onClear(){
        console.log('clear');
      },
      visibleChange() {
        console.log('select-visibleChange');
      },
      activeItemChange(val){
        console.log('当前值:', val);
      },
      deleteRow(index, rows) {
        console.log(index,rows);
      },
      // 分页事件
      handleCurrentChange(currentPage){
        console.log("currentPage 值改变");
        console.log(currentPage);
      }
    },
    data() {
      return {
        op: [],
        value: '',
        optionData: createOptionsData(),
        // time-select
        startTime: '',
        endTime: '',

        fields: [
          // 右边的元素放在数组前面倒序排列
          {
            key: 'x-button-0',
            xType:'x-button',
            align: 'right',
            text: '按钮',
            region:'main',
            attrs: {
              size: "icon",
              icon: 'af-icon-upload',
              hasPermission: false
            }
          },
          {
            key: 'select-0',
            xType:'x-select',
            value:'222',
            region:'main',
            attrs:{
              clearable: true,
              placeholder: '亲选择',
              filterable: true
            },
            events: {
              focus: this.onBlur,
              change: this.onChange
            },
            slots: {
              option: (h) => {
                return (
                  this.optionData.map(item => (
                    <af-option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                      disabled={item.disabled}
                    >
                    </af-option>
                  ))
                )
              },
              prefix: h => (<span>Http:</span>)
            }
          },
          {
            key: 'select-1',
            xType:'x-select',
            region:'main',
            value:'',
            attrs:{
              clearable: true,
              placeholder: '多选',
              collapseTags: true,
              multiple: true,
              allowCreate: true
            },
            options: [],
            events: {
              focus: this.onBlur,
              change: this.onChange,
              'visible-change': this.visibleChange
            }
          },
          // {
          //   key: 'input-1',
          //   xType:'x-input',
          //   region:'main',
          //   value:'1234',
          //   attrs:{},
          //   events: {
          //     blur: this.onBlur,
          //     change: this.onChange,
          //     clear: this.onClear,
          //     input: val => console.log(val)
          //   }
          // },
          // {
          //   key: 'time-picker-0',
          //   xType:'x-time-picker',
          //   region:'main',
          //   value: new Date(2016, 9, 10, 18, 40),
          //   attrs:{
          //     size: 'mini',
          //     clearable: true,
          //     placeholder: '任意时间点',
          //     'prefix-icon': 'af-icon-search',
          //     'arrow-control': true,
          //     'picker-options': {
          //       selectableRange: '18:30:00 - 20:30:00'
          //     }
          //   },
          //   events: {
          //     blur: this.onBlur,
          //     change: this.onChange
          //   }
          // },
          // {
          //   key: 'x-cascader-0',
          //   xType:'x-cascader',
          //   region:'main',
          //   value: [],
          //   options: cascaderOptions,
          //   attrs:{
          //     clearable: true,
          //     placeholder: '级联选择器',
          //     // options: cascaderOptions
          //   },
          //   events: {
          //     blur: this.onBlur,
          //     change: this.onChange,
          //     'active-item-change': this.activeItemChange
          //   }
          // },
          {
            key: 'date-picker-0',
            xType:'x-date-picker',
            value: '',
            region:'main',
            attrs:{
              size: 'mini',
              clearable: true,
              type: 'daterange',
              placeholder: '日期范围带快捷选项',
              'unlink-panels': true,
              'arrow-control': true,
              'range-separator': "至",
              'start-placeholder': "开始日期",
              'end-placeholder': "结束日期",
              'picker-options': {
                shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }]
              }
            },
            events: {
              blur: this.onBlur,
              change: this.onChange
            }
          },
          {
            key: 'x-cascader-0',
            xType:'x-cascader',
            value: [],
            region:'main',
            options: cascaderOptions,
            attrs:{
              clearable: true,
              placeholder: '级联选择器',
              width: '120px'
              // options: cascaderOptions
            },
            events: {
              blur: this.onBlur,
              change: this.onChange,
              'active-item-change': this.activeItemChange
            }
          },
          {
            key: 'x-checkbox-group-0',
            region: 'option',
            xType:'x-checkbox-group',
            options: [{
              label: '阿斯钢'
            },{
              label: 'agas'
            },{
              label: '嘎嘎'
            },{
              label: '俺啥时候'
            }],
            value: [],
            text: '选项1',
            attrs: {
              max: 2
            }
          },
          {
            key: 'x-checkbox0',
            region: 'option',
            xType:'x-checkbox',
            value: false,
            text: '选项1',
            attrs: {
              'true-label': "选项1-true",
              'false-label': "选项1-false",
              disabled: false
            }
          },
          {
            xType:'br',
            region: 'option'
          },
          {
            key: 'x-input-number-0',
            xType:'x-input-number',
            region: 'option',
            value: 1,
            attrs: {
              precision: 2,
              step: 0.1,
              max: 10,
              controls: true,
              'controls-direction': 'vertical',
              disabled: false
            }
          },
          {
            key: 'select-2',
            xType:'x-select',
            region: 'option',
            value:'',
            attrs:{
              clearable: true,
              placeholder: '分组',
              collapseTags: true,
              multiple: true,
              allowCreate: true
            },
            optionsGroup: [],
            events: {
              focus: this.onBlur,
              change: this.onChange,
              'visible-change': this.visibleChange
            }
          },
          {
            key: 'input-0',
            xType:'x-input',
            region: 'option',
            value:'1234',
            attrs:{
              maxlength: 2,
              size: 'medium',
              'prefix-icon': 'af-icon-search',
              clearable: true,
              placeholder: '请输入'
            },
            events: {
              blur: this.onBlur,
              change: this.onChange,
              clear: this.onClear,
              input: val => console.log(val)
            },
            slots: {
              prepend: function(h) { return (<span>Http:</span>) },
              append: function(h) { return (<af-button type="primary" icon="el-icon-search">搜索</af-button>) }
            }
          },
          {
            key: 'time-select-0',
            xType:'x-time-select',
            region: 'option',
            value: this.startTime,
            attrs:{
              size: 'mini',
              clearable: true,
              placeholder: '选择时间',
              'prefix-icon': 'af-icon-search',
              'picker-options': {
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }
            },
            events: {
              blur: this.onBlur,
              change: this.onChange
            }
          }
        ],

        /* --------------------------------- */
        /* ----------- 表格相关props --------- */
        /* --------------------------------- */
        tableAttrs: {
          style: "width: 100%"
        },
        tableEvents: {
          'row-click': (row, event, column) => console.log(row, event, column)
        },
        tableData: [
          {
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }, {
            date: '2016-05-07',
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
          }
        ],
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
                  prop:'name"',
                  label:'姓名'
                },{
                  label:'日期',
                  prop:'date',
                  attrs:{
                    width: '120',
                    align:'right',
                    'header-align': 'center'
                  }
                },
                {
                  prop:'province',
                  label:'省份'
                },{
                  prop:'city',
                  label:'市区'
                },{
                  prop:'address',
                  label:'地址',
                  attrs:{
                    'min-width': '520',
                    'header-align': 'center'
                  }
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
        // 分页控件
        pagination: {
          attrs: {
            currentPage: 1,
            pageSizes: [10, 20, 30, 40, 100],
            pageSize: 10,
            total: 10000
          },
          events: {
            'current-change': this.handleCurrentChange
          }
        }
      }
    }
  }
</script>
<<style lang="scss">
  body {
    background: #eee !important;
  }
</style>
