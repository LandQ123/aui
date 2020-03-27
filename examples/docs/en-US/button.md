<style>
  .demo-box.demo-button {
    .el-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-button + .el-button {
      margin-left: 10px;
    }
    .el-button-group {
      .el-button + .el-button {
        margin-left: 0;
      }

      & + .el-button-group {
        margin-left: 10px;
      }
    }
  }
</style>

## Button

Commonly used button.

### Basic usage

:::demo Use `type`, `plain`, `round` and `circle` to define Button's style.

```html
<af-row>
  <af-button>Default</af-button>
  <af-button type="primary">Primary</af-button>
  <af-button type="success">Success</af-button>
  <af-button type="info">Info</af-button>
  <af-button type="warning">Warning</af-button>
  <af-button type="danger">Danger</af-button>
</af-row>

<af-row>
  <af-button plain>Plain</af-button>
  <af-button type="primary" plain>Primary</af-button>
  <af-button type="success" plain>Success</af-button>
  <af-button type="info" plain>Info</af-button>
  <af-button type="warning" plain>Warning</af-button>
  <af-button type="danger" plain>Danger</af-button>
</af-row>

<af-row>
  <af-button round>Round</af-button>
  <af-button type="primary" round>Primary</af-button>
  <af-button type="success" round>Success</af-button>
  <af-button type="info" round>Info</af-button>
  <af-button type="warning" round>Warning</af-button>
  <af-button type="danger" round>Danger</af-button>
</af-row>

<af-row>
  <af-button icon="af-icon-search" circle></af-button>
  <af-button type="primary" icon="af-icon-edit" circle></af-button>
  <af-button type="success" icon="af-icon-check" circle></af-button>
  <af-button type="info" icon="af-icon-message" circle></af-button>
  <af-button type="warning" icon="af-icon-star-off" circle></af-button>
  <af-button type="danger" icon="af-icon-delete" circle></af-button>
</af-row>
```
:::

### Disabled Button

The `disabled` attribute determines if the button is disabled.

:::demo Use `disabled` attribute to determine whether a button is disabled. It accepts a `Boolean` value.

```html
<af-row>
  <af-button disabled>Default</af-button>
  <af-button type="primary" disabled>Primary</af-button>
  <af-button type="success" disabled>Success</af-button>
  <af-button type="info" disabled>Info</af-button>
  <af-button type="warning" disabled>Warning</af-button>
  <af-button type="danger" disabled>Danger</af-button>
</af-row>

<af-row>
  <af-button plain disabled>Plain</af-button>
  <af-button type="primary" plain disabled>Primary</af-button>
  <af-button type="success" plain disabled>Success</af-button>
  <af-button type="info" plain disabled>Info</af-button>
  <af-button type="warning" plain disabled>Warning</af-button>
  <af-button type="danger" plain disabled>Danger</af-button>
</af-row>
```
:::

### Text Button

Buttons without border and background.

:::demo
```html
<af-button type="text">Text Button</af-button>
<af-button type="text" disabled>Text Button</af-button>
```
:::

### Icon Button

Use icons to add more meaning to Button. You can use icon alone to save some space, or use it with text.

:::demo Use the `icon` attribute to add icon. You can find the icon list in Element icon component. Adding icons to the right side of the text is achievable with an `<i>` tag. Custom icons can be used as well.

```html
<af-button type="primary" icon="af-icon-edit"></af-button>
<af-button type="primary" icon="af-icon-share"></af-button>
<af-button type="primary" icon="af-icon-delete"></af-button>
<af-button type="primary" icon="af-icon-search">Search</af-button>
<af-button type="primary">Upload<i class="af-icon-upload el-icon-right"></i></af-button>
```
:::

### Button Group

Displayed as a button group, can be used to group a series of similar operations.

:::demo Use tag `<af-button-group>` to group your buttons.

```html
<af-button-group>
  <af-button type="primary" icon="af-icon-arrow-left">Previous Page</af-button>
  <af-button type="primary">Next Page<i class="af-icon-arrow-right el-icon-right"></i></af-button>
</af-button-group>
<af-button-group>
  <af-button type="primary" icon="af-icon-edit"></af-button>
  <af-button type="primary" icon="af-icon-share"></af-button>
  <af-button type="primary" icon="af-icon-delete"></af-button>
</af-button-group>
```
:::

### Loading Button

Click the button to load data, then the button displays a loading state.

:::demo Set `loading` attribute to `true` to display loading state.

```html
<af-button type="primary" :loading="true">Loading</af-button>
```
:::

### Sizes

Besides default size, Button component provides three additional sizes for you to choose among different scenarios.

:::demo Use attribute `size` to set additional sizes with `medium`, `small` or `mini`.

```html
<af-row>
  <af-button>Default</af-button>
  <af-button size="medium">Medium</af-button>
  <af-button size="small">Small</af-button>
  <af-button size="mini">Mini</af-button>
</af-row>
<af-row>
  <af-button round>Default</af-button>
  <af-button size="medium" round>Medium</af-button>
  <af-button size="small" round>Small</af-button>
  <af-button size="mini" round>Mini</af-button>
</af-row>
```
:::

### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | button size   | string  |   medium / small / mini            |    —     |
| type     | button type   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | determine whether it's a plain button   | boolean    | — | false   |
| round     | determine whether it's a round button   | boolean    | — | false   |
| circle     | determine whether it's a circle button   | boolean    | — | false   |
| loading   | determine whether it's loading   | boolean    | — | false   |
| disabled  | disable the button    | boolean   | —   | false   |
| icon  | icon class name | string   |  —  |  —  |
| autofocus  | same as native button's `autofocus` | boolean   |  —  |  false  |
| native-type | same as native button's `type` | string | button / submit / reset | button |