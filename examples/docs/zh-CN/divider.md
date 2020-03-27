## Divider 分割线

区隔内容的分割线。

对不同章节的文本段落进行分割。

对行内文字/链接进行分割，例如表格的操作列。


### 水平分割线

默认为水平分割线，可在中间加入文字。

:::demo

```html
<template>
  <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
  <af-divider></af-divider>
  <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
  <af-divider>With Text</af-divider>
  <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
  <af-divider dashed></af-divider>
  <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
</template>

<script>
export default {

}
</script>
```

:::

### 垂直分割线

行内的垂直分割线。

:::demo 通过`type`属性设置分割线的方向：`vertical`或`horizontal`。

```html
<template>
  Text
  <af-divider type="vertical"></af-divider>
  <a href="#">Link</a>
  <af-divider type="vertical"></af-divider>
  <a href="#">Link</a>
</template>

<script>
export default {

}
</script>
```

:::

### 标题位置 

修改分割线标题的位置。

:::demo 通过`orientation`属性设置分割线标题的位置：`left`、`right`或`center`。

```html
<template>
  <af-divider orientation="left">Left Text</af-divider>
  <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
  <af-divider orientation="right">Right Text</af-divider>
  <p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>
</template>

<script>
export default {

}
</script>
```

:::

### Attributes

| 参数        | 说明                                              | 类型    | 可选值                | 默认值     |
| ----------- | ------------------------------------------------- | ------- | --------------------- | ---------- |
| type        | 水平还是垂直类型，可选值为 horizontal 或 vertical | string  | horizontal / vertical | horizontal |
| orientation | 分割线标题的位置，可选值为 left、right 或 center  | string  | left / right / center | center     |
| dashed      | 是否虚线                                          | Boolean | -                     | false      |
