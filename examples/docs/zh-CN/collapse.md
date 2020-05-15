<script>
  export default {
    data() {
      return {
        activeNames: ['1'],
        activeNames4: [],
        activeName: '1',
        scale: {
          "a": 1,
          "b": 2,
          "c": 3
        },
        scaleNum: 2,
        scaleDebounce: 500,
        height: 500,
        heightInput: 0
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      handleAlert(str) {
        alert(str);
      },
      changeHeight() {
        this.heightInput = Math.random() * 1000;
        this.height = this.heightInput;
      }
    }
  }
</script>
<style>
  .demo-collapse {
    .el-collapse-item__header {
      .header-icon {
        margin-left: 5px;
      }
    }
  }
</style>

## Collapse 折叠面板

通过折叠面板收纳内容区域

### 基础用法

可同时展开多个面板，面板之间不影响

:::demo
```html
<h5>默认风格(type=primary)</h5>
<af-collapse v-model="activeNames" @change="handleChange">
  <af-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </af-collapse-item>
  <af-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </af-collapse-item>
  <af-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </af-collapse-item>
  <af-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </af-collapse-item>
</af-collapse>
<div style="margin:10px 0;height:2px;background:#ddd;"></div>
<h5>简单风格(type=simple)</h5>
<af-collapse v-model="activeNames2" @change="handleChange" type="simple">
  <af-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </af-collapse-item>
  <af-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </af-collapse-item>
  <af-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </af-collapse-item>
  <af-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </af-collapse-item>
</af-collapse>
<script>
  export default {
    data() {
      return {
        activeNames: ['1'],
        activeNames2: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>
```
:::

### 手风琴效果

每次只能展开一个面板

:::demo 通过 `accordion` 属性来设置是否以手风琴模式显示。
```html
<af-collapse v-model="activeName" accordion>
  <af-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </af-collapse-item>
  <af-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </af-collapse-item>
  <af-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </af-collapse-item>
  <af-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </af-collapse-item>
</af-collapse>
<script>
  export default {
    data() {
      return {
        activeName: '1'
      };
    }
  }
</script>
```
:::

### 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

:::demo
```html
<af-collapse v-model="activeNames1" accordion>
  <af-collapse-item name="1">
    <template slot="title">
      <span style="padding: 0 10px;">一致性 Consistency</span>
      <div 
        slot="texpend"
        style="display:inline-block">
        <af-button 
          size="small" 
          @click.stop="handleAlert('新建')"
          type="primary" 
          style="vertical-align:middle">新建</af-button>
        <af-button 
          size="small" 
          @click.stop="handleAlert('删除')"
          style="vertical-align:middle">删除</af-button>
        <af-divider type="vertical"></af-divider>
        <div style="display:inline-block;">
          <af-input 
            v-model="input" 
            placeholder="请输入内容"
            @click.stop.native=""
            suffix-icon="af-icon-search"></af-input>
        </div>
      </div>
    </template>
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </af-collapse-item>
  <af-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </af-collapse-item>
  <af-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </af-collapse-item>
  <af-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </af-collapse-item>
</af-collapse>
<script>
export default {
  data() {
    return {
      activeNames1: ['1']
    }
  },
  methods: {
    handleAlert(str) {
      alert(str);
    }
  }
}
</script>
```
:::

### 按比例占满指定高度

配合使用 `height` 、 `scale` 和  `scaleNum` 可以实现按比例占满指定高度，手风琴模式下无效

以下 demo height=500，scale={a:1, b:2, c:3}，scale-num=2，scale-debounce=500，即打开两个面板时，触发按比例占满指定高度，且动态改变height时，会有500ms延迟时间重新分配各已经打开的面板高度

:::demo
```html
<div style="background-color:#d1f0ff;" :style="`height:${height}px;`">
  改变高度：
  <af-input type="text" placeholder="请输入高度" style="width: 200px;" v-model="heightInput"></af-input>
  <af-button type="primary" size="small" @click="changeHeight">改变height</af-button>
  <af-collapse 
    v-model="activeNames4" 
    @change="handleChange" 
    type="primary"
    :height=height
    :scale=scale
    :scale-num="scaleNum"
    :scale-debounce="scaleDebounce">
    <af-collapse-item title="该面板占 1 份" name="a">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </af-collapse-item>
    <af-collapse-item title="该面板占 2 份" name="b">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    </af-collapse-item>
    <af-collapse-item title="该面板占 3 份" name="c">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    </af-collapse-item>
  </af-collapse>
</div>
<script>
export default {
  data() {
    return {
      activeNames4: [],
      scale: {
        "a": 1,
        "b": 2,
        "c": 3
      },
      scaleNum: 2,
      scaleDebounce: 500,
      height: 500,
      heightInput: 0
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    changeHeight() {
      this.heightInput = Math.random() * 1000;
      this.height = this.heightInput;
    }
  }
}
```
:::

### Collapse Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| accordion | 是否手风琴模式 | boolean | — | false |
| value | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | string/array | — | — |
| type | 风格 | string | primary 、simple | primary |
| height | 折叠面板最大高度，配合 scale 使用可实现各面板按比例占满高度 | Number | - |
| scale | 各面板高度占比，属性的key必须与面板name一一对应，同时需配合 height 使用 | Object | - | - |
| scale-num | 触发按比例占满高度的折叠面板个数，非数字、小于1或与大于面板个数，触发无效 | Number | - | 1 |
| scale-debounce | 动态改变height后，重新触发按比例分配面板高度的防抖动延时 | Number | - | 100 |

### Collapse Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`) | (activeNames: array\|string) |

### Collapse Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 唯一标志符 | string/number | — | — |
| title | 面板标题 | string | — | — |