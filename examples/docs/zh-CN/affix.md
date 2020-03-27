<style>
.test-affix {
  display: inline-block;
  color: #fff;
  padding: 10px 30px;
  text-align: center;
  background: rgba(0,153,229,.9);
}
</style>

## Affix 图钉

使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。

### 基础用法

简单使用，当元素不可见时，直接固定在最顶端。

:::demo

```html
<template>
  <af-affix>
    <span class="test-affix">固定在最顶部</span>
  </af-affix>
</template>
<script>
  export default {

  };
</script>
```

:::

### 偏移

当滚动到一定距离时再固定。

:::demo

```html
<template>
  <af-affix :offset-top="50">
    <span class="test-affix">固定在距离顶部 50px 的位置</span>
  </af-affix>
</template>
<script>
  export default {

  };
</script>
```

:::

### 固定在底部

在屏幕下方固定，可以通过缩小浏览器窗口高度来查看效果。

:::demo 注意，`offset-top`和`offset-bottom`只可以设置一个，如果都设置，会使用`offset-top`。

```html
<template>
  <af-affix :offset-bottom="20">
    <span class="test-affix">固定在距离底部 20px 的位置</span>
  </af-affix>
</template>
<script>
  export default {
    
  }
```

:::

### 固定状态改变时的回调

当固定状态发生改变时，会触发事件。

:::demo

```htmlGitGit
<template>
  <af-affix :offset-top="100" @change="change">
    <span class="test-affix">固定在距离顶部 100px 的位置</span>
  </af-affix>
</template>
<script>
  export default {
    methods: {
      change (status) {
        this.alert(`Status: ${status}`);
      }
    }
  }
</script>
```

:::

### Affix Attributes

| 参数          | 说明                             | 类型   | 可选值 | 默认值 |
| ------------- | -------------------------------- | ------ | ------ | ------ |
| offset-top    | 距离窗口顶部达到指定偏移量后触发 | number | -      | 0      |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | number | -      | 0      |

### Affix event

| 事件名称 | 说明                     | 回调参数     |
| -------- | ------------------------ | ------------ |
| change   | 在固定状态发生改变时触发 | true / false |
