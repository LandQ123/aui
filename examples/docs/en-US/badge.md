## Badge

A number or status mark on buttons and icons.

### Basic usage

Displays the amount of new messages.

:::demo The amount is defined with `value` which accepts `Number` or `String`.

```html
<af-badge :value="12" class="item">
  <af-button size="small">comments</af-button>
</af-badge>
<af-badge :value="3" class="item">
  <af-button size="small">replies</af-button>
</af-badge>
<af-badge :value="1" class="item" type="primary">
  <af-button size="small">comments</af-button>
</af-badge>
<af-badge :value="2" class="item" type="warning">
  <af-button size="small">replies</af-button>
</af-badge>

<af-dropdown trigger="click">
  <span class="af-dropdown-link">
    Click Me<i class="af-icon-caret-bottom el-icon--right"></i>
  </span>
  <af-dropdown-menu slot="dropdown">
    <af-dropdown-item class="clearfix">
      comments
      <af-badge class="mark" :value="12" />
    </af-dropdown-item>
    <af-dropdown-item class="clearfix">
      replies
      <af-badge class="mark" :value="3" />
    </af-dropdown-item>
  </af-dropdown-menu>
</af-dropdown>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

### Max value

You can customize the max value.

:::demo The max value is defined by property `max` which is a `Number`. Note that it only works when `value` is also a `Number`.

```html
<af-badge :value="200" :max="99" class="item">
  <af-button size="small">comments</af-button>
</af-badge>
<af-badge :value="100" :max="10" class="item">
  <af-button size="small">replies</af-button>
</af-badge>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

### Customizations

Displays text content other than numbers.

:::demo When `value` is a `String`, it can display customized text.

```html
<af-badge value="new" class="item">
  <af-button size="small">comments</af-button>
</af-badge>
<af-badge value="hot" class="item">
  <af-button size="small">replies</af-button>
</af-badge>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

### Little red dot

Use a red dot to mark content that needs to be noticed.

:::demo Use the attribute `is-dot`. It is a `Boolean`.

```html
<af-badge is-dot class="item">query</af-badge>
<af-badge is-dot class="item">
  <af-button class="share-button" icon="af-icon-share" type="primary"></af-button>
</af-badge>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```
:::

<style scoped>
  .share-button {
    width: 36px;
    padding: 10px;
  }

  .mark {
    margin-top: 8px;
    line-height: 1;
    float: right;
  }

  .clearfix {
    @utils-clearfix;
  }

  .item {
    margin-right: 40px;
  }
</style>

### Attributes
| Attribute     | Description     | Type            | Accepted Values       | Default |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value         | display value   | string, number  |          —            |    —    |
| max           |  maximum value, shows '{max}+' when exceeded. Only works if `value` is a `Number`   | number  |         —              |     —    |
| is-dot        | if a little dot is displayed | boolean   |    —           |  false  |
| hidden        | hidden badge    | boolean         |          —            |  false  |
| type          | button type     | string          | primary / success / warning / danger / info |   —  |
