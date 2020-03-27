<script>
  export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>
<style>
  .demo-box.demo-alert .af-alert {
    margin: 20px 0 0;
  }

  .demo-box.demo-alert .af-alert:first-child {
    margin: 0;
  }
</style>

## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
<template>
  <af-alert
    title="默认应用"
    type="warning">
  </af-alert>
  <af-alert
    title="成功提示"
    type="success">
  </af-alert>
  <af-alert
    title="消息提示"
    type="info">
  </af-alert>
  <af-alert
    title="错误提示"
    type="error">
  </af-alert>
</template>
```
:::

### 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

:::demo 在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，接受`boolean`，默认为`false`。你可以设置`close-text`属性来代替右侧的关闭图标，注意：`close-text`必须为文本。设置`close`事件来设置关闭时的回调。
```html
<template>
  <af-alert
    title="默认应用(带关闭按钮)"
    type="warning"
    :closable="true">
  </af-alert>
  <af-alert
    title="设置了回调的 alert"
    type="success"
    :closable="true"
    @close="hello">
  </af-alert>
  <af-alert
    title="自定义 close-text"
    type="info"
    :closable="true"
    close-text="知道了">
  </af-alert>

</template>

<script>
  export default {
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>
```
:::

### 文字居中

使用 `center` 属性让文字水平居中。

:::demo
```html
<template>
  <af-alert
    title="默认应用(文字居中)"
    type="warning"
    center>
  </af-alert>
  <af-alert
    title="成功提示(文字居中)"
    type="success"
    center>
  </af-alert>
  <af-alert
    title="消息提示(文字居中)"
    type="info"
    center>
  </af-alert>
  <af-alert
    title="错误提示(文字居中)"
    type="error"
    center>
  </af-alert>
</template>
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

:::demo 除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
```html
<template>
  <af-alert
    title="带辅助性文字介绍"
    type="success"
    :show-icon="false"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
  </af-alert>
</template>
```
:::

### 带有 icon 和辅助性文字介绍

:::demo 最后，这是一个同时具有 icon 和辅助性文字的样例。
```html
<template>
  <af-alert
    title="默认应用title"
    type="warning"
    description="文字说明文字说明文字说明文字说明文字说明文字说明">
  </af-alert>
  <af-alert
    title="成功提示title"
    type="success"
    description="文字说明文字说明文字说明文字说明文字说明文字说明">
  </af-alert>
  <af-alert
    title="消息提示title"
    type="info"
    description="文字说明文字说明文字说明文字说明文字说明文字说明">
  </af-alert>
  <af-alert
    title="错误提示title"
    type="error"
    description="文字说明文字说明文字说明文字说明文字说明文字说明">
  </af-alert>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **title** | 标题，**必选参数** | string | — | — |
| type | 主题 | string | success/warning/info/error | warning |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | false |
| center | 文字是否居中 | boolean | — | false |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | true |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
