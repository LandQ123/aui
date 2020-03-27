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
  .demo-box.demo-alert .el-alert {
    margin: 20px 0 0;
  }

  .demo-box.demo-alert .el-alert:first-child {
    margin: 0;
  }
</style>

## Alert

Displays important alert messages.

### Basic usage

Alert components are non-overlay elements in the page that does not disappear automatically.

:::demo Alert provides 4 types of themes defined by `type`, whose default value is `info`.

```html
<template>
  <af-alert
    title="success alert"
    type="success">
  </af-alert>
  <af-alert
    title="info alert"
    type="info">
  </af-alert>
  <af-alert
    title="warning alert"
    type="warning">
  </af-alert>
  <af-alert
    title="error alert"
    type="error">
  </af-alert>
</template>
```
:::

### Customizable close button

Customize the close button as texts or other symbols.

:::demo Alert allows you to configure if it's closable. The close button text and closing callbacks are also customizable. `closable` attribute decides if the component can be closed or not. It accepts `boolean`, and the default is `true`. You can set `close-text` attribute to replace the default cross symbol as the close button. Be careful that `close-text` must be a string. `close` event fires when the component is closed.

```html
<template>
  <af-alert
    title="unclosable alert"
    type="success"
    :closable="false">
  </af-alert>
  <af-alert
    title="customized close-text"
    type="info"
    close-text="Gotcha">
  </af-alert>
  <af-alert
    title="alert with callback"
    type="warning"
    @close="hello">
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

### With icon

Displaying an icon improves readability.

:::demo Setting the `show-icon` attribute displays an icon that corresponds with the current Alert type.

```html
<template>
  <af-alert
    title="success alert"
    type="success"
    show-icon>
  </af-alert>
  <af-alert
    title="info alert"
    type="info"
    show-icon>
  </af-alert>
  <af-alert
    title="warning alert"
    type="warning"
    show-icon>
  </af-alert>
  <af-alert
    title="error alert"
    type="error"
    show-icon>
  </af-alert>
</template>
```
:::

## Centered text

Use the `center` attribute to center the text.

:::demo

```html
<template>
  <af-alert
    title="success alert"
    type="success"
    center
    show-icon>
  </af-alert>
  <af-alert
    title="info alert"
    type="info"
    center
    show-icon>
  </af-alert>
  <af-alert
    title="warning alert"
    type="warning"
    center
    show-icon>
  </af-alert>
  <af-alert
    title="error alert"
    type="error"
    center
    show-icon>
  </af-alert>
</template>
```
:::

### With description

Description includes a message with more detailed information.

:::demo Besides the required `title` attribute, you can add a `description` attribute to help you describe the alert with more details. Description can only store text string, and it will word wrap automatically.

```html
<template>
  <af-alert
    title="with description"
    type="success"
    description="This is a description.">
  </af-alert>
</template>
```
:::

### With icon and description

:::demo At last, this is an example with both icon and description.

```html
<template>
  <af-alert
    title="success alert"
    type="success"
    description="more text description"
    show-icon>
  </af-alert>
  <af-alert
    title="info alert"
    type="info"
    description="more text description"
    show-icon>
  </af-alert>
  <af-alert
    title="warning alert"
    type="warning"
    description="more text description"
    show-icon>
  </af-alert>
  <af-alert
    title="error alert"
    type="error"
    description="more text description"
    show-icon>
  </af-alert>
</template>
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **title** | title **REQUIRED** | string | — | — |
| type | component type | string | success/warning/info/error | info |
| description | descriptive text. Can also be passed with the default slot | string | — | — |
| closable | if closable or not | boolean | — | true |
| center | whether to center the text | boolean | — | false |
| close-text | customized close button text | string | — | — |
| show-icon | if a type icon is displayed | boolean | — | false |


### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| close | fires when alert is closed | — |
