<script>
  module.exports = {
    methods: {
      open() {
        this.$message('这是一条消息提示');
      },

      openVn() {
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          type: 'success'
        });
      },

      open1() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open2() {
        this.$message({
          messageTitle: '提示',
          message: '提示哦，这是一条提示消息'
        });
      },

      open3() {
        this.$message({
          messageTitle: '确认',
          message: '确认哦，这是一条确认消息',
          type: 'question'
        });
      },

      open4() {
        this.$message({
          messageTitle: '警告',
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open5() {
        this.$message({
          messageTitle: '错误',
          message: '错了哦，这是一条错误消息',
          type: 'error'
        });
      },

      open6() {
        this.$message({
          onDefault: false,
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open7() {
        this.$message({
          onDefault: false,
          showClose: false,
          message: '这是一条提示消息',
          type: 'info'
        });
      },

      open8() {
        this.$message({
          onDefault: false,
          showClose: false,
          message: '这是一条提示消息',
          type: 'question'
        });
      },

      open9() {
        this.$message({
          onDefault: false,
          showClose: false,
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open10() {
        this.$message({
          onDefault: false,
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error'
        });
      },

      openHTML() {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong>这是 <i>HTML</i> 片段</strong>'
        });
      }
    }
  };
</script>

## Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

:::warning
根据设计需要，默认设置如下

1. `type=success`，显示关闭按钮，同时显示时间默认为3000（`showClose=true`, `duration=3000`)，你仍然可以修改`duration`的值。
2. `type`为其他值的时候，显示关闭按钮，同时不会自动关闭（`showClose=true`, `duration=0`)。

这个时候`showClose`和`duration`的配置会失效。当然你可以通过将`onDefault`设置为`false`，然后修改它们的默认值。
:::

### 基础用法

从顶部出现，type 为 success 的时候，3 秒后自动消失。

:::demo Message 在配置上与 Notification 非常类似，所以部分 options 在此不做详尽解释，文末有 options 列表，可以结合 Notification 的文档理解它们。Element 注册了一个`$message`方法用于调用，Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。

```html
<template>
  <af-button :plain="true" @click="open">打开消息提示</af-button>
  <af-button :plain="true" @click="openVn">VNode</af-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$message('这是一条消息提示');
      },

      openVn() {
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          type: 'success'
        });
      }
    }
  }
</script>
```
:::

### 不同状态

用来显示「成功、消息、疑问、警告、错误」类的操作反馈。没有设置`onDefault`为false，则`duration`、`showClose`为设置的默认值，不可配置。

:::demo 当需要自定义更多属性时，Message 也可以接收一个对象为参数。比如，设置`type`字段可以定义不同的状态，默认为`info`。`messageTitle`可以为提示内容设置标题，但是`type`为 success 的时候它是无效的。
```html
<template>
  <af-button :plain="true" @click="open1">成功</af-button>
  <af-button :plain="true" @click="open2">消息</af-button>
  <af-button :plain="true" @click="open3">疑问</af-button>
  <af-button :plain="true" @click="open4">警告</af-button>
  <af-button :plain="true" @click="open5">错误</af-button>
</template>

<script>
  export default {
    methods: {
      open1() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open2() {
        this.$message({
          messageTitle: '提示',
          message: '提示哦，这是一条提示消息'
        });
      },

      open3() {
        this.$message({
          messageTitle: '确认',
          message: '确认哦，这是一条确认消息',
          type: 'question'
        });
      },

      open4() {
        this.$message({
          messageTitle: '警告',
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open5() {
        this.$message({
          messageTitle: '错误',
          message: '错了哦，这是一条错误消息',
          type: 'error'
        });
      }
    }
  }
</script>
```
:::

### 可自定义关闭和显示时间

通过设置`onDefault`的值为false，就可以添加关闭按钮和显示时间，而不用考虑`type`的值。

:::demo 默认的 Message，都可以被人工关闭的，如果需要不可以手动关闭的 Message，需要先将`onDefault` 设置为 false，这是就可以使用`showClose`字段。此外，和 Notification 一样，Message 拥有可控的`duration`，默认的 Message，除了`type`为 success 的时候是可配的，其他情况都不可配置。需要先将`onDefault` 设置为 false，才能使用`duration`。设置`0`则不会被自动关闭，默认为 3000 毫秒。
```html
<template>
  <af-button :plain="true" @click="open6">成功</af-button>
  <af-button :plain="true" @click="open7">消息</af-button>
  <af-button :plain="true" @click="open8">疑问</af-button>
  <af-button :plain="true" @click="open9">警告</af-button>
  <af-button :plain="true" @click="open10">错误</af-button>
</template>

<script>
  export default {
    methods: {
      open6() {
        this.$message({
          onDefault: false,
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open7() {
        this.$message({
          onDefault: false,
          showClose: false,
          message: '这是一条提示消息',
          type: 'info'
        });
      },

      open8() {
        this.$message({
          onDefault: false,
          showClose: false,
          message: '这是一条提示消息',
          type: 'question'
        });
      },

      open9() {
        this.$message({
          onDefault: false,
          showClose: false,
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open10() {
        this.$message({
          onDefault: false,
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error'
        });
      }
    }
  }
</script>
```
:::

### 使用 HTML 片段
`message` 属性支持传入 HTML 片段

:::demo 将`dangerouslyUseHTMLString`属性设置为 true，`message` 就会被当作 HTML 片段处理。

```html
<template>
  <af-button :plain="true" @click="openHTML">使用 HTML 片段</af-button>
</template>

<script>
  export default {
    methods: {
      openHTML() {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong>这是 <i>HTML</i> 片段</strong>'
        });
      }
    }
  }
</script>
```
:::

:::warning
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。
:::

### 全局方法

Element 为 Vue.prototype 添加了全局方法 $message。因此在 vue instance 中可以采用本页面中的方式调用 `Message`。

### 单独引用

单独引入 `Message`：

```javascript
import { Message } from 'aui';
```

此时调用方法为 `Message(options)`。我们也为每个 type 定义了各自的方法，如 `Message.success(options)`。并且可以调用 `Message.closeAll()` 手动关闭所有实例。

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | message 标题（`type`的值为 success 时是无效的） | string | — | 提示 |
| messageTitle | 消息标题（`type`的值为 success 时是无效的） | string | — | — |
| message | 消息文字 | string / VNode | — | — |
| type | 主题 | string | success/warning/question/info/error | info |
| onDefault | 是否是默认配置，默认为false，即使用配置，这时除了 `type` 为 success 的时候 `duration`可以配置，其他情况 `showClose` 和 `duration` 的配置将失效。 | boolean | true/false | true |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000|
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| customClass | 自定义类名 | string | — | — |
| iconClass | 自定义图标的类名，会覆盖 `type` | string | — | — |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |
| isDrag   | 是否支持拖拽（`type`的值为 success 的时候不支持拖拽） | boolean | — | true |

### 方法
调用 `Message` 或 `this.$message` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |
