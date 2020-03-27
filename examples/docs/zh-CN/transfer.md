<style>
  .demo-transfer {
    .transfer-footer {
      margin-left: 15px;
      padding: 6px 5px;
    }
  }
</style>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      const generateData3 = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            value: i,
            desc: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      const treeData = [{
        id: 1,
        label: 'AMD',
        children: [{
          id: 4,
          label: 'AMD-1',
          children: [{
            id: 5,
            label: 'AMD-1-1'
          }, {
            id: 6,
            label: 'AMD-1-2',
          }, {
            id: 12,
            label: 'AMD-1-3'
          }, {
            id: 7,
            label: 'AMD-1-4'
          }, {
            id: 8,
            label: 'AMD-1-5'
          }]
        }]
      }, {
        id: 2,
        label: 'ARC',
        children: [{
          id: 13,
          label: 'ARC-1',
          children: [{
            id: 15,
            label: 'ARC-1-1'
          }, {
            id: 16,
            label: 'ARC-1-2'
          }]
        }, {
          id: 14,
          label: 'ARC-2',
          children: [{
            id: 17,
            label: 'ARC-2-1'
          }, {
            id: 18,
            label: 'ARC-2-2'
          }]
        }]
      }, 
      {
        id: 3,
        label: 'AMD',
        children: [{
          id: 19,
          label: 'AMD-1',
          children: [{
            id: 21,
            label: 'AMD-1-1'
          }, {
            id: 22,
            label: 'AMD-1-2'
          }]
        }, {
          id: 20,
          label: 'AMD-2',
          children: [{
            id: 23,
            label: 'AMD-2-1'
          }, {
            id: 24,
            label: 'AMD-2-2'
          }]
        }]
      }];
      return {
        data: generateData(),
        data2: generateData2(),
        data3: generateData3(),
        data4: treeData,
        value1: [1, 4],
        value2: [],
        value3: [],
        value4: [1],
        value5: [1],
        value6: [],
        value7: [],
        defaultValue: '23,24',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        }
      };
    },

    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      }
    }
  };
</script>

## Transfer 穿梭框

### 基础用法
:::demo Transfer 的数据通过 `data` 属性传入。数据需要是一个对象数组，每个对象有以下属性：`key` 为数据的唯一性标识，`label` 为显示文本，`disabled` 表示该项数据是否禁止转移。目标列表中的数据项会同步到绑定至 `v-model` 的变量，值为数据项的 `key` 所组成的数组。当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 `v-model` 绑定的变量赋予一个初始值。
```html
<template>
  <af-transfer v-model="value1" :data="data"></af-transfer>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value1: [1, 4]
      };
    }
  };
</script>
```
:::

### 可搜索

在数据很多的情况下，可以对数据进行搜索和过滤。默认情况下会根据`label`的值进行搜索，你也可以自定义搜索方法。

:::demo 设置 `filterable` 为 `true` 即可开启搜索模式。默认情况下，若数据项的 `label` 属性包含搜索关键字，则会在搜索结果中显示。你也可以使用 `filter-method` 定义自己的搜索逻辑。`filter-method` 接收一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。若方法返回 `true`，则会在搜索结果中显示对应的数据项。
```html
<template>
  <p style="text-align: center; margin: 0 0 20px">默认根据 label 的值搜索</p>
  <div>
    <af-transfer
      filterable
      filter-placeholder="请输入城市名称"
      v-model="value2"
      :data="data2">
    </af-transfer>
  </div>
  <p style="text-align: center; margin: 50px 0 20px">自定义搜索方法，按照拼音搜索</p>
  <div>
    <af-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      v-model="value3"
      :data="data2">
    </af-transfer>
  </div>
</template>

<script>
  export default {
    data() {
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data2: generateData2(),
        value2: [],
        value3: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    }
  };
</script>
```
:::

### 可自定义

可以对列表标题文案、按钮文案、数据项的渲染函数、列表底部的勾选状态文案等进行自定义。

:::demo 可以使用 `titles`、`button-texts`、`render-content` 和 `format` 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表底部的勾选状态文案进行自定义。数据项的渲染还可以使用 `scoped-slot` 进行自定义。最后，本例还展示了 `change` 事件的用法。注意：由于 jsfiddle 不支持 JSX 语法，所以使用 `render-content` 自定义数据项的例子在 jsfiddle 中无法运行。但是在实际的项目中，只要正确地配置了相关依赖，就可以正常运行。
```html
<template>
  <p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
  <div style="text-align: center">
    <af-transfer
      style="text-align: left; display: inline-block"
      v-model="value4"
      filterable
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['全部添加', '全部去除']"
      :format="{
        total: '共有${total}个',
      }"
      @change="handleChange"
      :data="data">
    </af-transfer>
  </div>
  <p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p>
  <div style="text-align: center">
    <af-transfer
      style="text-align: left; display: inline-block"
      v-model="value5"
      filterable
      :titles="['Source', 'Target']"
      :button-texts="['全部添加', '全部去除']"
      :format="{
        total: '${total}个',
      }"
      @change="handleChange"
      :data="data">
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
    </af-transfer>
  </div>
</template>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value4: [1],
        value5: [1],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        }
      };
    },

    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      }
    }
  };
</script>
```
:::

### 数据项属性别名

默认情况下，Transfer 仅能识别数据项中的 `key`、`label` 和 `disabled` 字段。如果你的数据的字段名不同，可以使用 `props` 属性为它们设置别名。
:::demo 本例中的数据源没有 `key` 和 `label` 字段，在功能上与它们相同的字段名为 `value` 和 `desc`。因此可以使用`props` 属性为 `key` 和 `label` 设置别名。
```html
<template>
  <af-transfer
    v-model="value6"
    :props="{
      key: 'value',
      label: 'desc'
    }"
    :data="data3">
  </af-transfer>
</template>

<script>
  export default {
    data() {
      const generateData3 = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            value: i,
            desc: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data3: generateData3(),
        value6: []
      };
    }
  };
</script>
```
:::

### 数据是Tree

穿梭框的数据同样可以绑定 Tree，这样的层次结构会更加清晰。值得注意的是，这将和上面的一些用法有一些差异，请看下面表格说明。

:::demo 数据结构和 Tree 树形控件是一致的，`node-key`默认绑定了 `id`。注意，当你需要默认选中一些值的时候，可以通过`default-value`来设置，只能设置叶子节点，`default-value`需要绑定`String`类型，如果是个数组请先转为字符串再绑定。请不要通过`v-model`绑定的值来设置默认选中，那样是无效的。
```html
<template>
  <af-transfer-tree
      style="text-align: left; display: inline-block"
      v-model="value7"
      :data="data4"
      :default-value="defaultValue"
      filterable
      :titles="['Source', 'Target']"
      @change="handleChange">
    </af-transfer-tree>
</template>

<script>
  export default {
    data() {
      const treeData = [{
        id: 1,
        label: 'AMD',
        children: [{
          id: 4,
          label: 'AMD-1',
          children: [{
            id: 5,
            label: 'AMD-1-1'
          }, {
            id: 6,
            label: 'AMD-1-2',
          }, {
            id: 7,
            label: 'AMD-1-3'
          }, {
            id: 8,
            label: 'AMD-1-4'
          }, {
            id: 9,
            label: 'AMD-1-5'
          }]
        }]
      }, {
        id: 2,
        label: 'ARC',
        children: [{
          id: 13,
          label: 'ARC-1',
          children: [{
            id: 15,
            label: 'ARC-1-1'
          }, {
            id: 16,
            label: 'ARC-1-2'
          }]
        }, {
          id: 14,
          label: 'ARC-2',
          children: [{
            id: 17,
            label: 'ARC-2-1'
          }, {
            id: 18,
            label: 'ARC-2-2'
          }]
        }]
      }, 
      {
        id: 3,
        label: 'ATP',
        children: [{
          id: 19,
          label: 'ATP-1',
          children: [{
            id: 21,
            label: 'ATP-1-1'
          }, {
            id: 22,
            label: 'ATP-1-2'
          }]
        }, {
          id: 20,
          label: 'ATP-2',
          children: [{
            id: 23,
            label: 'ATP-2-1'
          }, {
            id: 24,
            label: 'ATP-2-2'
          }]
        }]
      }];
      return {
        value7: [],
        defaultValue: '23,24',
        data4: treeData,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleChange(val, direction, move) {
        console.log(val, direction, move);
      },
    }
  };
</script>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data | Transfer 的数据源 | array[{ key, label, disabled }] | — | [ ] |
| filterable | 是否可搜索 | boolean | — | false |
| filter-placeholder | 搜索框占位符 | string | — | 搜索关键字 |
| filter-method | 自定义搜索方法 | function | — | — |
| target-order | 右侧列表元素的排序策略：若为 `original`，则保持与数据源相同的顺序；若为 `push`，则新加入的元素排在最后；若为 `unshift`，则新加入的元素排在最前 | string | original / push / unshift | original |
| titles | 自定义列表标题 | array | — | ['列表 1', '列表 2'] |
| button-texts | 自定义按钮文案 | array | — | ['全选', '清空'] |
| render-content | 自定义数据项渲染函数 | function(h, option) | — | — |
| format | 列表底部勾选状态文案 | object{total} | — | { total: '${total}'|
| props | 数据源的字段别名 | object{key, label, disabled} | — | — |

### Transfer-tree Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data | Transfer 的数据源（不支持disabled） | array | — | [ ] |
| filterable | 是否可搜索 | boolean | — | false |
| filter-placeholder | 搜索框占位符 | string | — | 搜索关键字 |
| filter-node-method | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏（对应穿梭框左边）| Function(value, data, node) | —    | —     |
| filter-method | 自定义搜索方法（对应穿梭框右边）| function | — | — |
| target-order | 右侧列表元素的排序策略：若为 `original`，则保持与数据源相同的顺序；若为 `push`，则新加入的元素排在最后；若为 `unshift`，则新加入的元素排在最前 | string | original / push / unshift | original |
| titles | 自定义列表标题 | array | — | ['列表 1', '列表 2'] |
| button-texts | 自定义按钮文案 | array | — | ['全选', '清空'] |
| render-content | 不支持 | — | — | — |
| format | 列表底部勾选状态文案 | object{total} | — | { total: '${total}'|
| node-key | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | String | — | id |
| props | 数据源的字段别名 | object{label, children} | — | {label: 'label', children: 'children'} |

### Scoped Slot
| name | 说明 |
|------|--------|
| — | 自定义数据项的内容，参数为 { option } |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearQuery | 清空某个面板的搜索关键词 | 'left' / 'right'，指定需要清空的面板 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 右侧列表元素变化时触发 | 当前值、数据移动的方向（'left' / 'right'）、发生移动的数据 key 数组 |
