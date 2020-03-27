<style>
  .demo-box.demo-button {
    .af-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
    .af-button + .af-button {
      margin-left: 10px;
    }
    .af-button-group {
      .af-button + .af-button {
        margin-left: 0;
      }

      & + .af-button-group {
        margin-left: 10px;
      }
    }
  }
</style>

## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<af-row>
  <af-button>默认</af-button>
  <af-button type="primary">按钮</af-button>
  <af-button type="danger">按钮</af-button>
  <af-button type="danger-i">按钮</af-button>
  <af-button type="warning">按钮</af-button>
  <af-button type="warning-i">按钮</af-button>
</af-row>
<br>
<af-row>
  <af-button size="icon" icon="af-icon-plus"></af-button>
  <af-button size="icon" type="primary" icon="af-icon-plus"></af-button>
  <af-button size="icon" type="danger" icon="af-icon-plus"></af-button>
  <af-button size="icon" type="danger-i" icon="af-icon-plus"></af-button>
  <af-button size="icon" type="warning" icon="af-icon-plus"></af-button>
  <af-button size="icon" type="warning-i" icon="af-icon-plus"></af-button>
</af-row>
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<af-row>
  <af-button disabled>默认按钮</af-button>
  <af-button type="primary" disabled>主要按钮</af-button>
  <af-button type="danger" disabled>成功按钮</af-button>
  <af-button type="danger-i" disabled>信息按钮</af-button>
  <af-button type="warning" disabled>警告按钮</af-button>
  <af-button type="warning-i" disabled>危险按钮</af-button>
</af-row>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<af-button type="text">文字按钮</af-button>
<af-button type="text" disabled>文字按钮</af-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标，单个图标按钮设置size属性为`icon`。

```html
<af-button size="icon" icon="af-icon-plus"></af-button>
<af-button icon="af-icon-plus">新增</af-button>
<af-button>上传 <i class="af-icon-upload"></i></af-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<af-button-group>`标签来嵌套你的按钮。

```html
<af-button-group>
  <af-button type="primary" icon="af-icon-arrow-left">上一页</af-button>
  <af-button type="primary">下一页<i class="af-icon-arrow-right-copy-copy"></i></af-button>
</af-button-group>
<af-button-group>
  <af-button type="primary" icon="af-icon-plus"></af-button>
  <af-button type="primary" icon="af-icon-minus"></af-button>
  <af-button type="primary" icon="af-icon-delete"></af-button>
</af-button-group>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<af-button type="primary" :loading="true">加载中</af-button>
```
:::

### 不同尺寸

Button 组件提供除了默认值以外小按钮尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`small`，通过设置`size`属性来配置它们。

```html
<af-row>
  <af-button>默认按钮</af-button>
  <af-button size="small">小按钮</af-button>
  <af-button size="icon" icon="af-icon-plus"></af-button>
</af-row>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   small            |    —     |
| type     | 类型   | string    |   primary / danger / warning / danger-i / warning-i / text |     —    |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
