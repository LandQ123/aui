<style>
  .demo-layout {
    .af-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .af-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .af-layout {
    margin: 40px 0;
  }
  .top-layout,
  .bottom-layout {
    background-color: #19b5ff;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  .left-layout,
  .right-layout {
    background-color: #19b5ff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .center-layout {
    background-color: #f7ba2b;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .top-center-center {
    line-height: 150px;
    background-color: gray;
  }
  .left-center-right-left,
  .left-center-right-right,
  .left-center-left {
    background-color: #cdcdcd;
  }
  }
</style>

## Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

### 基础布局

使用单一分栏创建基础的栅格布局。

:::demo 通过 row 和 col 组件，并通过 col 组件的 `span` 属性我们就可以自由地组合布局。
```html
    <af-row>
      <af-col :span="24"><div class="grid-content bg-purple-dark"></div></af-col>
    </af-row>
    <af-row>
      <af-col :span="12"><div class="grid-content bg-purple"></div></af-col>
      <af-col :span="12"><div class="grid-content bg-purple-light"></div></af-col>
    </af-row>
    <af-row>
      <af-col :span="8"><div class="grid-content bg-purple"></div></af-col>
      <af-col :span="8"><div class="grid-content bg-purple-light"></div></af-col>
      <af-col :span="8"><div class="grid-content bg-purple"></div></af-col>
    </af-row>
    <af-row>
      <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
      <af-col :span="6"><div class="grid-content bg-purple-light"></div></af-col>
      <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
      <af-col :span="6"><div class="grid-content bg-purple-light"></div></af-col>
    </af-row>
    <af-row>
      <af-col :span="4"><div class="grid-content bg-purple"></div></af-col>
      <af-col :span="4"><div class="grid-content bg-purple-light"></div></af-col>
      <af-col :span="4"><div class="grid-content bg-purple"></div></af-col>
      <af-col :span="4"><div class="grid-content bg-purple-light"></div></af-col>
      <af-col :span="4"><div class="grid-content bg-purple"></div></af-col>
      <af-col :span="4"><div class="grid-content bg-purple-light"></div></af-col>
    </af-row>

<style>
  .af-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .af-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 复杂布局

在原有的`container`布局之上，增加`af-layout`布局，子元素通过`slot`来实现。

组件并没有设置子元素高度，需要自己来定义样式设置。`slot`的`name`取值为：

- `left`
- `center`
- `bottom`
- `top`
- `bottom`

包含的属性及其含义为：

- `type` - 布局支持的类型，`left-center`，`left-center-right`，`top-center`，`top-center-bottom`，默认为`left-center`
- `width` - 布局当中存在左边和右边的时候生效，默认为`400px`，固定宽度
- `height` - 布局当中存在顶部和底部的时候生效，默认为`60px`，固定高度


:::demo
```html
1、左-中间(布局)
<af-layout width="200px" class="af-layout">
    <div slot="left" class="left-layout">左边</div>
    <div slot="center" class="center-layout">中间</div>
</af-layout>
2、左-中间-右边(嵌套顶部-中间布局) 
<af-layout type="left-center-right" width="200px" class="af-layout">
    <div slot="left" class="left-layout">左边</div>
    <div slot="center" class="center-layout">中间</div>
    <div slot="right" class="right-layout">
      <af-layout type="top-center" width="200px"  height="50px">
      <div slot="top" class="top-layout">顶部</div>
      <div slot="center" class="center-layout top-center-center">中间</div>
      </af-layout>
  </div>
</af-layout>
3、顶部-中间(嵌套左-中-右布局)
<af-layout type="top-center" width="200px"  height="50px" class="af-layout">
    <div slot="top" class="top-layout">顶部</div>
    <div slot="center" class="center-layout">
      <af-layout type="left-center-right" width="200px">
      <div slot="left" class="left-layout left-center-right-left">左边</div>
      <div slot="center" class="center-layout">中间</div>
      <div slot="right" class="right-layout left-center-right-right">右边</div>
    </af-layout>
    </div>
</af-layout>
4、顶部-中间-底部(嵌套左-中间布局)
<af-layout type="top-center-bottom" width="200px"  height="50px" class="af-layout">
    <div slot="top" class="top-layout">顶部</div>
    <div slot="center" class="center-layout">
      <af-layout type="left-center" width="200px">
      <div slot="left" class="left-layout left-center-left">左边</div>
      <div slot="center" class="center-layout">中间</div>
      </af-layout>
    </div>
    <div slot="bottom" class="bottom-layout">底部</div>
</af-layout>
<style>
 
  .af-layout {
    margin: 40px 0;
  }
  .top-layout,
  .bottom-layout {
    background-color: #19b5ff;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  .left-layout,
  .right-layout {
    background-color: #19b5ff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .center-layout {
    background-color: #f7ba2b;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .top-center-center {
    line-height: 150px;
    background-color: gray;
  }
  .left-center-right-left,
  .left-center-right-right,
  .left-center-left {
    background-color: #cdcdcd;
  }
</style>
```

:::

### 分栏间隔

分栏之间存在间隔。

:::demo Row 组件 提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔为 0。
```html
<af-row :gutter="20">
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>

<style>
  .af-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .af-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

:::demo
```html
<af-row :gutter="20">
  <af-col :span="16"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="8"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row :gutter="20">
  <af-col :span="8"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="8"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="4"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="4"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row :gutter="20">
  <af-col :span="4"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="16"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="4"><div class="grid-content bg-purple"></div></af-col>
</af-row>

<style>
  .af-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .af-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 分栏偏移

支持偏移指定的栏数。

:::demo 通过制定 col 组件的 `offset` 属性可以指定分栏偏移的栏数。
```html
<af-row :gutter="20">
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row :gutter="20">
  <af-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row :gutter="20">
  <af-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>

<style>
  .af-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .af-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 对齐方式

通过 `flex` 布局来对分栏进行灵活的对齐。

:::demo 将 `type` 属性赋值为 'flex'，可以启用 flex 布局，并可通过 `justify` 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。
```html
<af-row type="flex" class="row-bg">
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple-light"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row type="flex" class="row-bg" justify="center">
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple-light"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row type="flex" class="row-bg" justify="end">
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple-light"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row type="flex" class="row-bg" justify="space-between">
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple-light"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>
<af-row type="flex" class="row-bg" justify="space-around">
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple-light"></div></af-col>
  <af-col :span="6"><div class="grid-content bg-purple"></div></af-col>
</af-row>

<style>
  .af-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .af-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
```
:::

### 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。

:::demo
```html
<af-row :gutter="10">
  <af-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></af-col>
  <af-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></af-col>
  <af-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></af-col>
  <af-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></af-col>
</af-row>

<style>
  .af-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
```
:::

### 基于断点的隐藏类

Element 额外提供了一系列类名，用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上。如果需要，请自行引入以下文件：

```js
import 'aui/lib/theme-chalk/display.css';
```

包含的类名及其含义为：
- `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
- `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
- `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
- `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
- `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
- `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
- `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
- `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
- `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
- `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
- `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏

### Row Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | 栅格间隔 | number | — | 0 |
| type | 布局模式，可选 flex，现代浏览器下有效 | string | — | — |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| align | flex 布局下的垂直排列方式 | string | top/middle/bottom | top |
| tag | 自定义元素标签 | string | * | div |

### Col Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | 栅格占据的列数 | number | — | 24 |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push |  栅格向右移动格数 | number | — | 0 |
| pull |  栅格向左移动格数 | number | — | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| tag | 自定义元素标签 | string | * | div |
