<script>
  export default {
    data() {
      return {
        dataVal: [],
        loading: false,
        selectLable: "年龄：",
        containerHeight: 120,
        selectOptions: [
          {
            value: "1",
            label: "12"
          },
          {
            value: "2",
            label: "22"
          },
          {
            value: "3",
            label: "45"
          }
        ],
         splitStr: ",",
         //=====
         dataVal1:[],
         selectOptions1: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ],
         selectOptionsLoading: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ],
         //=====
         dataVal2:[],
         //=====
         dataVal3:[
           {
              selectKeys: '1,2', // 必须这个键名
              inpValue: '冬瓜' // 必须这个键名
           }
         ],
         //=====
         dataVal4:[],
         //=====
         dataVal5:[],
         dataVal8:[],
         dataVal9:[],
         selectOptions5: [
          {
            key: "1",
            aliasLabel: "a"
          },
          {
            key: "2",
            aliasLabel: "b"
          },
          {
            key: "3",
            aliasLabel: "c"
          }
        ],
         //=====
         dataVal6:[
           {
            selectKeys: '1',
            inpValue: '哈哈哈'
           },
           {
            selectKeys: '2',
            inpValue: '滴滴滴'
           }
         ],
         selectOptions3: [
          {
            label: '第一组',
            options: [
              {
                value: '2',
                label: 'b'
              },
              {
                value: '3',
                label: 'c'
              }
            ]
          },
          {
            label: '第二组',
            options: [
              {
                value: '4',
                label: 'bbb'
              },
              {
                value: '5',
                label: 'ccc'
              }
            ]
          }
        ],
      };
    },
    methods: {
      querySearch(queryString,cb) {
        const data = [{
          value: '北京'
        }]
        cb(data)
      },
      remoteMethod(query) {
        this.loading = true
        setTimeout(() => {
          // do something
          this.loading = false
        },1000)
      }
    }
  }
</script>

## CombineAddPanel 表单添加面板

用于添加下拉框和输入框组合数据。

### 基础用法

:::demo `select-options`为下拉框选项，默认值为`value`、输入框标签通过slot名`inputLabel`设置；单个值之间分隔符`splitStr`，默认为空格；`add-name`添加按钮文字描述，默认值为添加符号。

```html
<af-combine-add-panel 
  v-model="dataVal"
  :placeholder="placeholder"
  :split-str="splitStr"
  add-name="添加"
  :select-lable="selectLable"
  :select-options="selectOptions">
    <span slot='inputLabel'>姓名：</span>
</af-combine-add-panel>
<br/>
<span>value:{{dataVal}}</span>

  <script>
  export default {
    data() {
      return {
        placeholder: '请选择姓名',
        dataVal: [],
        splitStr: ",",
        selectLable: "年龄：",
        selectOptions: [
          {
            value: "1",
            label: "12"
          },
          {
            value: "2",
            label: "22"
          },
          {
            value: "3",
            label: "45"
          }
        ]
      };
    }
  }
</script>
```

:::

### 多选
:::demo和select组件一样，支持多选。
```html
<af-combine-add-panel 
  v-model="dataVal1"
  multiple
  :select-options="selectOptions1"
  >
    <span slot='inputLabel'>姓名：</span>
</af-combine-add-panel>
<br/>
<span>value:{{dataVal1}}</span>

 <script>
  export default {
    data() {
      return {
        dataVal: [],
        selectOptions1: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ] 
      };
    }
  }
</script>
```
:::
### 设置重复添加提示语
:::demo通过`repeat-message`字段设置，默认为“请勿重复添加数据！”。
```html
<af-combine-add-panel 
  v-model="dataVal2"
  repeat-message='您已添加过该数据，请勿重复添加！'
  :select-options="selectOptions1"
  >
    <span slot='inputLabel'>姓名：</span>
</af-combine-add-panel>

 <script>
  export default {
    data() {
      return {
        dataVal: [],
        selectOptions1: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ]
      };
    }
  }
</script>
```
:::
### 禁用
:::demo通过`disabled`字段设置是否禁用添加面板。
```html
<af-combine-add-panel 
  v-model="dataVal3"
  disabled
  :select-options="selectOptions1"
  >
    <span slot='inputLabel'>姓名：</span>
</af-combine-add-panel>

 <script>
  export default {
    data() {
      return {
        dataVal: [
          {
            selectKeys: '1,2',
            inpValue: '冬瓜'
          }
        ],
        selectOptions1: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
		    ]
      };
    }
  }
</script>
```
:::
### 输入框激活输入建议
:::demo通过`fetch-suggestions`字段设置函数回调，可用于远程搜索，可通过`trigger-on-focus`设置是否获得焦点时触发输入建议，具体用法同`af-autocomplete`。
```html
<af-combine-add-panel
  v-model="dataVal4"
  :select-options="selectOptions1"
  :fetch-suggestions='querySearch'
  autocomplete
  >
  <span slot='inputLabel'>姓名：</span>
</af-combine-add-panel>

 <script>
  export default {
    data() {
      return {
        dataVal: [],
        selectOptions1: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ]
      };
    },
    methods: {
      querySearch(queryString,cb) {
        // dosomething
        const data = [{
          value: '北京'
        }]
        cb(data)
      }
    }
  }
</script>
```
:::
### 设置下拉选项别名

:::demo可以根据实际数据的键值设置下拉选项的键值别名，默认是`value`和`label`。

```html
<af-combine-add-panel 
  v-model="dataVal5"
  alias-key='key'
  alias-label='aliasLabel'
  :select-options="selectOptions5">
    <span slot='inputLabel'>姓名：</span>
</af-combine-add-panel>

 <script>
  export default {
    data() {
      return {
        dataVal: [],
        selectOptions5: [
          {
            key: "1",
            aliasLabel: "a"
          },
          {
            key: "2",
            aliasLabel: "b"
          },
          {
            key: "3",
            aliasLabel: "c"
          }
        ]
      };
    }
  }
</script>
```

:::
### 设置初始值

:::demo `v-model`为双向绑定值，值为数组对象,此时每条数据对应的下拉框值须为`selectKeys`字段，输入框对应值需为`inpValue`，多选时`selectKeys`字段键值以英文逗号分隔开："1,2,3"。

```html
<af-combine-add-panel 
  v-model="dataVal6"
  :select-options="selectOptions1"
  >
    <span slot='inputLabel'>姓名：</span>
</af-combine-add-panel>

  <script>
  export default {
    data() {
      return {
        dataVal: [
          {
            selectKeys: '1',
            inpValue: '哈哈哈'
           },
           {
            selectKeys: '2',
            inpValue: '滴滴滴'
           }
        ],
        selectOptions1: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ]
      };
    }
  }
</script>
```

:::
### 可配置容器高度

:::demo 设置`container-height`属性可设定容器的高度，默认81px，小于81px时取81px,超出容器滚动展示。

```html
<af-combine-add-panel 
  v-model="dataVal6"
  :container-height='containerHeight'
  :select-options="selectOptions1">
</af-combine-add-panel>

 <script>
  export default {
    data() {
      return {
        dataVal: ['1 哈哈哈','2 滴滴滴'],
        containerHeight: 120,
        selectOptions1: [
         {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ]
      };
    }
  }
</script>
```
:::
### 分组

:::demo 设置`group`属性设置分组。

```html
<af-combine-add-panel 
  v-model="dataVal8"
  group
  :select-options="selectOptions3">
</af-combine-add-panel>

 <script>
  export default {
    data() {
      return {
        dataVal: [],
        selectOptions3: [
          {
            label: '第一组',
            options: [
              {
                value: '2',
                label: 'b'
              },
              {
                value: '3',
                label: 'c'
              }
            ]
          },
          {
            label: '第二组',
            options: [
              {
                value: '4',
                label: 'bbb'
              },
              {
                value: '5',
                label: 'ccc'
              }
            ]
          }
        ]
      };
    }
  }
</script>
```
:::
### 下拉框可搜索

可远程搜索，必须有filterable属性。

:::demo
```html
<af-combine-add-panel 
  v-model="dataVal9"
  filterable
  remote
  :loading='loading'
  :remote-method='remoteMethod'
  :select-options="selectOptionsLoading">
</af-combine-add-panel>

 <script>
  export default {
    data() {
      return {
        dataVal: [],
        loading: false,
        selectOptions: [
          {
            value: "1",
            label: "一班"
          },
          {
            value: "2",
            label: "二班"
          },
          {
            value: "3",
            label: "三班"
          }
        ]
      };
    },
    methods: {
      remoteMethod(query) {
        this.loading = true
        setTimeout(() => {
          // do something
          this.loading = false
        },1000)
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 值 | array | — | — |
| disabled | 是否禁用 | boolean | — | false |
| auto-clear | 成功添加后是否清除下拉框和输入框数据 | boolean | — | true |
| add-name | 添加按钮文字描述 | string | — | — |
| split-str | 添加内容的分隔符 | string | — | — |
| container-height | 容器高度 | number | — | 81 |
| repeat-message | 重复添加时提示文字 | string | — | 请勿重复添加数据！ |
| group | select是否支持组 | boolean | — | false |
| filterable | select是否支持过滤 | boolean | — | false |
| remote | select是否支持远程搜索 | boolean | — | false |
| loading | select加载loading | boolean | — | false |
| loadingText | select加载文字| string | — | 加载中 |
| remote-method | select搜索方法 | function | — | — |
| select-options | select下拉选项 | array | — | — |
| alias-key | select下拉选项值的别名 | string | — | value |
| alias-label | select下拉选项描述的别名 | string | — | label |
| placeholder | select的占位符 | string | — | 请选择 |
| select-lable | select的前置内容标签 | string | — | 请选择 |
| multiple | select是否支持多选 | boolean | — | false |
| autocomplete | input是否带输入建议 | boolean | — | false |
| fetch-suggestions | input输入建议回调函数 | function | — | — |
| trigger-on-focus | input是否输入时带出输入建议 | boolean | — | false |
| autocomplete-alias-key | input输入建议值的别名 | string | — | value |
| autocomplete-debounce | input防抖延时 | number | — | 300 |

### Slot
| name | 说明 |
|------|--------|
| inputLabel | input 前置内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| add-data | 添加数据 | (value：array) |
| delete-data | 删除容器内已选数据的tag | (value：object) 删除的值 |
| input-blur | input失去焦点 | (event：Event) |
| input-focus | input获得焦点 | (event：Event) |
| input-change | input值改变 | (value：string \| number) |
| input-clear | input清空 | — |
| autocomplete-select | input选择（autocomplete为true） | (value) |
| select-change | select选择 | (value) |
| select-visible-change | select下拉框出现/隐藏时 | 出现true，隐藏false |
| select-remove-tag | select多选模式下删除tag时 | (value：移除tag的值) |
| select-blur | select失去焦点 | (event：Event) |
| select-focus | select获得焦点 | (event：Event) |
| select-clear | select单选模式下清空 | — |

### Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| inputFocus | 使input获取焦点 | —
| inputBlur | 使input失去焦点 | —
| inputSelect | 选中input中的文字 | —
| selectFocus | 使select获取焦点 | —
| selectBlur | 使select失去焦点 | —
