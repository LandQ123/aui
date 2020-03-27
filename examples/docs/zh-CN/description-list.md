## Description-list 描述列表

成组展示多个只读字段，常见于详情页的信息展示。

### 基本用法

:::demo

```html
<template>
  <af-description-list 
    :title="'这是标题'">
    <af-description-list-item item="column1">
      这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件
    </af-description-list-item>
    <af-description-list-item item="column2">
      这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件
    </af-description-list-item>
    <af-description-list-item item="column2">
      这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件这是一家公司里的一支前端团队里的一个前端er写的一个公共组件
    </af-description-list-item>
  </af-description-list>
</template>

<script>
export default {

}
</script>
```
:::

### Description-list
| 参数  | 说明 | 类型   | 可选值 | 默认值  |
|----- |---- |------- |-------|-------- |
| title | 列表标题 | string | - | - |
| col | 列数 | number | 1 - 4 | 3 |

### Description-list-Item
| 参数  | 说明 | 类型   | 可选值 | 默认值  |
|----- |---- |------- |-------|-------- |
| title | 列表项标题 | string | - | - |