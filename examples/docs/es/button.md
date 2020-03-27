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

Botones comúnmente usados.

### Uso básico

:::demo Use `type`, `plain`,`round` y `circle` para definir estilos a los botones.

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

### Botón deshabilitado

El atributo `disabled` determina su un botón esta deshabilitado.

:::demo Use el atributo `disabled` para determinar si un botón esta deshabilitado. Acepta un valor `Boolean`.

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

### Botón de texto

Botones sin borde ni fondo.

:::demo
```html
<af-button type="text">Text Button</af-button>
<af-button type="text" disabled>Text Button</af-button>
```
:::

### Botón icono

Use iconos para darle mayor significado a Button. Se puede usar simplemente un icono o un icono con texto.

:::demo Use el atributo `icon` para agregar un icono. Puede encontrar el listado de iconos en el componente de iconos. Agregar iconos a la derecha del texto se puede conseguir con un tag `<i>`. También se pueden usar iconos custom.

```html
<af-button type="primary" icon="af-icon-edit"></af-button>
<af-button type="primary" icon="af-icon-share"></af-button>
<af-button type="primary" icon="af-icon-delete"></af-button>
<af-button type="primary" icon="af-icon-search">Search</af-button>
<af-button type="primary">Upload<i class="af-icon-upload el-icon-right"></i></af-button>
```
:::

### Grupo de botones

Mostrar un grupo de botones puede ser usado para mostrar un grupo de operaciones similares.

:::demo Use el tag `<af-button-group>` para agrupar sus botones.

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

### Botón de descarga 

Cuando se hace clic en un botón para descargar datos, el botón muestra un estado de descarga.

:::demo Ajuste el atributo `loading` a `true` para mostrar el estado de descarga.

```html
<af-button type="primary" :loading="true">Loading</af-button>
```
:::

### Tamaños

Además del tamaño por defecto, el componente Button provee tres tamaños adicionales para utilizar en diferentes escenarios.

:::demo Use el atributo `size` para setear tamaños adicionales con `medium`, `small` or `mini`.

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

### Atributos
| Atributo    | Descripción                                   | Tipo    | Valores aceptados                                  | Por defecto |
| ----------- | --------------------------------------------- | ------- | -------------------------------------------------- | ----------- |
| size        | tamaño del botón                              | string  | medium / small / mini                              | —           |
| type        | tipo de botón                                 | string  | primary / success / warning / danger / info / text | —           |
| plain       | determinar si es o no un botón plano          | boolean | —                                                  | false       |
| round       | determinar si es o no un botón redondo        | boolean | —                                                  | false       |
| circle      | determina si es un boton circular             | boolean | —                                                  | false       |
| loading     | determinar si es o no un botón de descarga    | boolean | —                                                  | false       |
| disabled    | deshabilitar el botón                         | boolean | —                                                  | false       |
| icon        | nombre de la clase del icono                  | string  | —                                                  | —           |
| autofocus   | misma funcionalidad que la nativa `autofocus` | boolean | —                                                  | false       |
| native-type | misma funcionalidad que la nativa `type`      | string  | button / submit / reset                            | button      |