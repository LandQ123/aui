## Breadcrumb

Displays the location of the current page, making it easier to browser back.

### Basic usage


:::demo In `el-breadcrumb`, each `el-breadcrumb-item` is a tag that stands for every level starting from homepage. This component has a `String` attribute `separator`, and it determines the separator. Its default value is '/'.

```html
<af-breadcrumb separator="/">
  <af-breadcrumb-item :to="{ path: '/' }">homepage</af-breadcrumb-item>
  <af-breadcrumb-item><a href="/">promotion management</a></af-breadcrumb-item>
  <af-breadcrumb-item>promotion list</af-breadcrumb-item>
  <af-breadcrumb-item>promotion detail</af-breadcrumb-item>
</af-breadcrumb>
```
:::

### Icon separator

:::demo Set `separator-class` to use `iconfont` as the separator，it will cover `separator`

```html
<af-breadcrumb separator-class="af-icon-arrow-right">
  <af-breadcrumb-item :to="{ path: '/' }">homepage</af-breadcrumb-item>
  <af-breadcrumb-item>promotion management</af-breadcrumb-item>
  <af-breadcrumb-item>promotion list</af-breadcrumb-item>
  <af-breadcrumb-item>promotion detail</af-breadcrumb-item>
</af-breadcrumb>
```
:::

### Breadcrumb Attributes
| Attribute      | Description          | Type      | Accepted Values            | Default|
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | separator character | string | — | / |
| separator-class | class name of icon separator | string | — | - |

### Breadcrumb Item Attributes
| Attribute      | Description          | Type      | Accepted Values            | Default|
|---------- |-------------- |---------- |--------------------------------  |-------- |
| to | target route of the link, same as `to` of `vue-router` | string/object | — | — |
| replace | if `true`, the navigation will not leave a history record | boolean | — | false |





