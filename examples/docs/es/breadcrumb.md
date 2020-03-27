## Breadcrumb

Muestra la localización de la página actual, haciendo más fácil el poder ir a la página anterior.

### Uso básico


:::demo En `el-breadcrumb`, cada `el-breadcrumb-item` es un tag que representa cada nivel empezando desde la homepage. Este componente tiene un atributo `String` llamado `separator`, el mismo determina el caracter separador. El valor por defecto es '/'.

```html
<af-breadcrumb separator="/">
  <af-breadcrumb-item :to="{ path: '/' }">homepage</af-breadcrumb-item>
  <af-breadcrumb-item><a href="/">promotion management</a></af-breadcrumb-item>
  <af-breadcrumb-item>promotion list</af-breadcrumb-item>
  <af-breadcrumb-item>promotion detail</af-breadcrumb-item>
</af-breadcrumb>
```
:::

### Icono separador

:::demo Setee `separator-class` para que utilice `iconfont` como separador，el mismo va a cubrir `separator`

```html
<af-breadcrumb separator-class="af-icon-arrow-right">
  <af-breadcrumb-item :to="{ path: '/' }">homepage</af-breadcrumb-item>
  <af-breadcrumb-item>promotion management</af-breadcrumb-item>
  <af-breadcrumb-item>promotion list</af-breadcrumb-item>
  <af-breadcrumb-item>promotion detail</af-breadcrumb-item>
</af-breadcrumb>
```
:::

### Breadcrumb atributos
| Atributo        | Descripción                            | Tipo   | Valores aceptados | Por defecto |
| --------------- | -------------------------------------- | ------ | ----------------- | ----------- |
| separator       | caracter separador                     | string | —                 | /           |
| separator-class | nombre de la clase del icono separador | string | —                 | -           |

### Breadcrumb Item atributos
| Atributo | Descripción                              | Tipo          | Valores aceptados | Por defecto |
| -------- | ---------------------------------------- | ------------- | ----------------- | ----------- |
| to       | ruta del link, lo mismo que `to` de `vue-router` | string/object | —                 | —           |
| replace  | si `true`,  la navegación no dejara una entrada en la historia | boolean       | —                 | false       |





