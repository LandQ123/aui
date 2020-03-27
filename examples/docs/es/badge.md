## Badge

Marcas en forma de número o estado para botones e iconos.

### Uso básico

Muestra la cantidad de mensajes nuevos.

:::demo La cantidad está definida por `value` que acepta `Number` o `String`.

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

### Valor máximo

Se puede personalizar el valor máximo.

:::demo El valor máximo se define como `max` el cual es un `Number`. Nota: solo funciona si `value` es también un `Number`.

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

### Personalizaciones

Mostrar texto en vez de números.

:::demo Cuando `value` es un `String`, puede mostrar texto personalizado.

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

### Pequeño punto rojo

Puede utilizar un punto rojo para marcar contenido que debe ser notado.

:::demo Use el atributo `is-dot`. Es un `Boolean`.

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

### Atributos
| Atributo | Descripción                              | Tipo           | Valores aceptados | Por defecto |
| -------- | ---------------------------------------- | -------------- | ----------------- | ----------- |
| value    | valor a mostrar                          | string, number | —                 | —           |
| max      | valor máximo, Muestra '{max}+' cuando se excede. Solo funciona si `value` es un `Number` | number         | —                 | —           |
| is-dot   | si se debe mostrar un pequeño punto      | boolean        | —                 | false       |
| hidden   | hidden badge                             | boolean        | —                 | false       |
| type     | tipo de botón                            | string         | primary / success / warning / danger / info | — |
