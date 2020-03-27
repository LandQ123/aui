<script>
  export default {
    data() {
      return {
        tabsActive: 'second',
        tabsActiveEdit: '1',
        tabsActiveEditList: [
          {
            label: '标签一',
            name: '1',
            content: '标签一'
          },
          {
            label: '标签二',
            name: '2',
            content: '标签二'
          },
          {
            label: '标签三',
            name: '3',
            content: '标签三'
          },
          {
            label: '标签四',
            name: '4',
            content: '标签四'
          }
        ],
        tabsActiveEditIndex: 4,
        tabsActiveBorderUI: 'first',
        tabsActiveBorder: 'first',
        tabsActivePosition: 'first',
        tabPosition: 'top',
        tabsActiveSlot: 'first',
        list: [
          {
            label: '证券类监控名单',
            index: "1",
          },
          {
            label: '账户类监控名单',
            index: "2"
          },
          {
            label: '指数类监控名单',
            index: "3"
          }
        ]
      }
    },
    methods: {
      handleTabClick(tab, event) {
        console.log(tab.name);
      },
      handleTabsEdit(targetName, action){
        console.log(targetName, action)
        if(action === 'add') {
          let index = ++this.tabsActiveEditIndex
          let obj = {
            label: 'New Tab' + index,
            name: index + '',
            content: 'New Tab Content' + index
          }
          this.tabsActiveEditList.push(obj)
        }
        if(action === 'remove') {
          if(this.tabsActiveEditList.length === 1){
            return
          }
          this.tabsActiveEditList = this.tabsActiveEditList.filter(tab => tab.name !== targetName)
        }
      },
      selectMenu(val){
        console.log('selectMenu', val)
      }
    }
  }
</script>

## Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

### 基础用法

基础的、简洁的标签页，适用于UI规范中单独横向tabs样式。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

```html
<template>
  <af-tabs v-model="tabsActive" @tab-click="handleTabClick">
    <af-tab-pane label="标签一" name="first">标签一</af-tab-pane>
    <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
    <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
    <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
  </af-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabsActive: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name);
      }
    }
  };
</script>
```
:::

### 组合使用

组合标签页，适用于UI规范中横向tabs组件和纵向tabs组价组合使用。

:::demo 将`type`设置为`border-card`。

```html
<template>
  <af-container>
    <af-aside width="200px">
      <af-side-menu :list="list" class="side-menu-demo" @select="selectMenu"></af-side-menu>
    </af-aside>
    <af-main style="padding: 0px; margin-left: 6px;">
      <af-tabs v-model="tabsActiveBorderUI" @tab-click="handleTabClick" type="border-card">
        <af-tab-pane label="标签一" name="first">标签一</af-tab-pane>
        <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
        <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
        <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
      </af-tabs>
    </af-main>
  </af-container>
</template>
<script>
  export default {
    data() {
      return {
        tabsActiveBorderUI: 'first',
        list: [
            {
              label: '证券类监控名单',
              index: "1",
            },
            {
              label: '账户类监控名单',
              index: "2"
            },
            {
              label: '指数类监控名单',
              index: "3"
            }
          ]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name);
      },
      selectMenu(val){
        console.log('selectMenu', val)
      }
    }
  };
</script>
```
:::

### 卡片化

卡片标签页。

:::demo 将`type`设置为`border-card`。

```html
<template>
  <af-tabs v-model="tabsActiveBorder" @tab-click="handleTabClick" type="border-card">
    <af-tab-pane label="标签一" name="first">标签一</af-tab-pane>
    <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
    <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
    <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
  </af-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabsActiveBorder: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name);
      }
    }
  };
</script>
```
:::

### 位置

可以通过 `tab-position` 设置标签的位置

:::demo 标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

```html
<template>
  <af-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <af-radio-button label="top">top</af-radio-button>
    <af-radio-button label="right">right</af-radio-button>
    <af-radio-button label="bottom">bottom</af-radio-button>
    <af-radio-button label="left">left</af-radio-button>
  </af-radio-group>
  <af-tabs v-model="tabsActivePosition" @tab-click="handleTabClick" :tab-position="tabPosition" style="height: 200px;">
    <af-tab-pane label="标签一" name="first">标签一</af-tab-pane>
    <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
    <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
    <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
  </af-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabsActivePosition: 'first',
        tabPosition: 'top'
      };
    }
  };
</script>
```
:::

### 自定义标签页

可以通过具名 `slot` 来实现自定义标签页的内容

:::demo
```html
<template>
  <af-tabs v-model="tabsActiveSlot" @tab-click="handleTabClick">
    <af-tab-pane label="标签一" name="first">
      <span slot="label"><i class="af-icon-info"></i>标签一</span>
      标签一
    </af-tab-pane>
    <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
    <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
    <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
  </af-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabsActiveSlot: 'first'
      };
    }
  };
</script>
```
:::

### 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

:::demo
```html
<template>
  <af-tabs v-model="tabsActiveEdit" @tab-click="handleTabClick" editable type="card" @edit="handleTabsEdit">
    <af-tab-pane v-for="(item, index) in tabsActiveEditList" :key="index" :label="item.label" :name="item.name">
      {{item.content}}
    </af-tab-pane>
  </af-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabsActiveEdit: '1',
        tabsActiveEditList: [
          {
            label: '标签一',
            name: '1',
            content: '标签一'
          },
          {
            label: '标签二',
            name: '2',
            content: '标签二'
          },
          {
            label: '标签三',
            name: '3',
            content: '标签三'
          },
          {
            label: '标签四',
            name: '4',
            content: '标签四'
          }
        ],
        tabsActiveEditIndex: 4,
      }
    },
    methods: {
      handleTabClick(tab, event) {
        console.log(tab.name);
      },
      handleTabsEdit(targetName, action){
        console.log(targetName, action)
        if(action === 'add') {
          let index = ++this.tabsActiveEditIndex
          let obj = {
            label: 'New Tab' + index,
            name: index + '',
            content: 'New Tab Content' + index
          }
          this.tabsActiveEditList.push(obj)
        }
        if(action === 'remove') {
          if(this.tabsActiveEditList.length === 1){
            return
          }
          this.tabsActiveEditList = this.tabsActiveEditList.filter(tab => tab.name !== targetName)
        }
      }
    }
  }
</script>
```
:::


### Tabs Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 风格类型   | string   | card/border-card  |     —    |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
| addable  | 标签是否可增加   | boolean   | — |  false  |
| editable  | 标签是否同时可增加和关闭   | boolean   | — |  false  |
| value  | 绑定值，选中选项卡的 name  | string   |  —  |  第一个选项卡的 name |
| tab-position  | 选项卡所在位置 | string   |  top/right/bottom/left  |  top |
| stretch  | 标签的宽度是否自撑开 | boolean   |  -  |  false |
| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(activeName, oldActiveName) | — | — |

### Tabs Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| tab-click  | tab 被选中时触发 | 被选中的标签 tab 实例 |
| tab-remove  | 点击 tab 移除按钮后触发  | 被删除的标签的 name |
| tab-add  | 点击 tabs 的新增按钮后触发  | — |
| edit  | 点击 tabs 的新增按钮或 tab 被关闭后触发  | (targetName, action) |

### Tab-pane Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选项卡标题   | string   | — |    —     |
| disabled | 是否禁用 | boolean | — | false |
| name      | 与选项卡 activeName 对应的标识符，表示选项卡别名 | string | — | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
| lazy  | 标签是否延迟渲染   | boolean   | — |  false  |
