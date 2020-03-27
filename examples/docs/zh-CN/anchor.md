## Anchor 锚点

用于跳转到页面指定位置。

### 基础用法</div>
### <div id="section1"></div>
### <div id="section2"></div>
### <div id="section3"></div>
### <div id="section4"></div>
### <div id="section5"></div>
### <div id="section6"></div>
### <div id="part1"></div>
### <div id="section7"></div>
### <div id="section8"></div>
### <div id="section9"></div>
### <div id="part2"></div>
### <div id="section10"></div>
### <div id="section11"></div>
### <div id="section12"></div>

最简单的用法。index显示序号, title 显示标题。

:::demo
```html
<template>
  <div id="container1">
    <af-anchor show-ink container="#container1">
      <af-anchor-link href="#section1" index="一、" title="重点监控信息与合规教育情况"></af-anchor-link>
      <af-anchor-link href="#section2" index="二、" title="客户基本情况的核查过程和结果"></af-anchor-link>
      <af-anchor-link href="#section3" index="三、" title="客户交易行为的监控指标和阈值设置情况"></af-anchor-link>
      <af-anchor-link href="#section4" index="四、" title="客户异常情况的识别、核查、制止和报告情况"></af-anchor-link>
      <af-anchor-link href="#section5" index="五、" title="客户新开证券账户、新开资金账户、转托管等账户变动情况"></af-anchor-link>
      <af-anchor-link href="#section6" index="六、" title="其他管理措施"></af-anchor-link>
    </af-anchor>
  </div>
</template>
<script>
  export default {

  }
</script>
```

:::

### 层叠锚点</div>

:::demo

```html
<template>
  <div id="container2">
    <af-anchor show-ink aside="right" container="#container2">
      <af-anchor-link href="#part1" title="数据重演">
        <af-anchor-link href="#section7" title="目录1"></af-anchor-link>
        <af-anchor-link href="#section8" title="目录2"></af-anchor-link>
        <af-anchor-link href="#section9" title="目录3"></af-anchor-link>
      </af-anchor-link>
      <af-anchor-link href="#part2" title="自动化测试">
        <af-anchor-link href="#section10" title="目录9"></af-anchor-link>
        <af-anchor-link href="#section11" title="目录10"></af-anchor-link>
        <af-anchor-link href="#section12" title="目录11"></af-anchor-link>
      </af-anchor-link>
    </af-anchor>
  </div>
</template>
<script>
  export default {
      
  }
</script>
```

:::

### 水平锚点</div>

:::demo

```html
<template>
  <div id="container3">
    <af-anchor mode="horizontal" container="#container3">
      <af-anchor-link href="#section7" title="目录1"></af-anchor-link>
      <af-anchor-link href="#section8" title="目录2"></af-anchor-link>
      <af-anchor-link href="#section9" title="目录3"></af-anchor-link>
      <af-anchor-link href="#section10" title="目录9"></af-anchor-link>
      <af-anchor-link href="#section11" title="目录10"></af-anchor-link>
    </af-anchor>
  </div>
</template>
<script>
  export default {
      
  }
</script>
```

:::

### Anchor Attributes</div>

| 参数          | 说明                             | 类型   | 可选值 | 默认值 |
| ------------- | -------------------------------- | ------ | ------ | ------ |
| container | 指定滚动的容器 | String | HTMLElement | -      | -      |
| show-ink | 是否显示小圆点 | Boolean | -     | false      |
| aside | 控制小圆点的位置 | String | left、right | left |
| width | 控制展示区域的宽度 | Number | - | 150 |
| mode | 控制锚点的展示形式 | String | vertical、horizontal | vertical |

### Anchor event</div>

| 事件名称 | 说明                     | 回调参数     |
| -------- | ------------------------ | ------------ |
| select   | 点击锚点时触发，返回链接 | href |
| change   | 链接改变时触发，返回新链接和旧链接 | newHref, oldHref |

### AnchorLink Attributes</div>

| 参数          | 说明                             | 类型   | 可选值 | 默认值 |
| ------------- | -------------------------------- | ------ | ------ | ------ |
| href    | 锚点链接	 | String | -      | -     |
| title | 文字内容	 | String | -      | -      |
| index | 文字序号 | Number/String | - | - |
