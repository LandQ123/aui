<script>
  export default {
    data() {
      return {
        disabled: false
      };
    }
  };
</script>

<style>
  .demo-tooltip.demo-es {
    &:first-of-type .source {
      .el-button {
        width: 110px;
      }
    }
    .el-tooltip + .el-tooltip {
      margin-left: 15px;
    }
    .box {
      width: 400px;
    
      .top {
        text-align: center;
      }
      
      .left {
        float: left;
        width: 110px;
      }
      
      .right {
        float: right;
        width: 110px;
      }
      
      .bottom {
        clear: both;
        text-align: center;
      }
      
      .item {
        margin: 4px;
      }
      
      .left .el-tooltip__popper,
      .right .el-tooltip__popper {
        padding: 8px 10px;
      }
      .el-tooltip {
        margin-left: 0;
      }
    }
  }
</style>

## Tooltip

Mostrar aviso de información con el hover del mouse.

### Uso básico

Tooltip tiene 9 colocaciones.

:::demo Use el atributo `content` para establecer el contenido que se mostrará al hacer hover. El atributo `placement` determina la posición del tooltip. Su valor es `[orientation]-[alignment]` con cuatro orientaciones `top`, `left`, `right`, `bottom` y tres alineaciones `start`, `end`, `null`, la alineación default es null. Tome `placement="left-end"` como ejemplo, Tooltip será mostrado en la izquierda del elemento en que se esté haciendo hover y el fondo del tooltip se alineará con el fondo del elemento.
```html
<div class="box">
  <div class="top">
    <af-tooltip class="item" effect="dark" content="Top Left prompts info" placement="top-start">
      <af-button>top-start</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Top Center prompts info" placement="top">
      <af-button>top</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Top Right prompts info" placement="top-end">
      <af-button>top-end</af-button>
    </af-tooltip>
  </div>
  <div class="left">
    <af-tooltip class="item" effect="dark" content="Left Top prompts info" placement="left-start">
      <af-button>left-start</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Left Center prompts info" placement="left">
      <af-button>left</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Left Bottom prompts info" placement="left-end">
      <af-button>left-end</af-button>
    </af-tooltip>
  </div>

  <div class="right">
    <af-tooltip class="item" effect="dark" content="Right Top prompts info" placement="right-start">
      <af-button>right-start</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Right Center prompts info" placement="right">
      <af-button>right</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Right Bottom prompts info" placement="right-end">
      <af-button>right-end</af-button>
    </af-tooltip>
  </div>
  <div class="bottom">
    <af-tooltip class="item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
      <af-button>bottom-start</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Bottom Center prompts info" placement="bottom">
      <af-button>bottom</af-button>
    </af-tooltip>
    <af-tooltip class="item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
      <af-button>bottom-end</af-button>
    </af-tooltip>
  </div>
</div>

<style>
  .box {
    width: 400px;

    .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 110px;
    }

    .right {
      float: right;
      width: 110px;
    }

    .bottom {
      clear: both;
      text-align: center;
    }

    .item {
      margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }

    .el-button {
      width: 110px;
    }
  }
</style>
```
:::


### Tema

Tooltip tiene dos temas: `dark` and `light`.

:::demo Establecer `effect` para modificar el tema, el valor por defecto es `dark`.
```html
<af-tooltip content="Top center" placement="top">
  <af-button>Dark</af-button>
</af-tooltip>
<af-tooltip content="Bottom center" placement="bottom" effect="light">
  <af-button>Light</af-button>
</af-tooltip>
```
:::

### Más Contenido

Despliegue múltiples líneas de texto y establezca su formato.

:::demo Sobre-escribiba el atributo `content` del `el-tooltip` añadiendo un slot llamado `content`.
```html
<af-tooltip placement="top">
  <div slot="content">multiple lines<br/>second line</div>
  <af-button>Top center</af-button>
</af-tooltip>
```
:::

### Uso Avanzado

Adicional a los usos básicos, existen algunos atributos que permiten la personalización: 

el atributo `transition` permite personalizar la animación con la que el Tooltip se muestra o se esconda, el valor por defecto es `el-fade-in-linear`.

el atributo `disabled` permite deshabilitar `tooltip`. Solo es necesario definirlo como `true`.

De hecho, Tooltip es una extension basada en [Vue-popper](https://github.com/element-component/vue-popper), es posible utilizar cualquier atributo permitido en Vue-popper.

:::demo
```html
<template>
  <af-tooltip :disabled="disabled" content="click to close tooltip function" placement="bottom" effect="light">
    <af-button @click="disabled = !disabled">click to {{disabled ? 'active' : 'close'}} tooltip function</af-button>
  </af-tooltip>
</template>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .expand-fade-leave-active {
    margin-left: 20px;
    opacity: 0;
  }
</style>
```
:::


:::tip
El componente `router-link` no es soportado por Tooltip, favor de usar `vm.$router.push`.

Elementos de forma deshabilitados no son soportados por Tooltip, más información puede ser encontrada en [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter).
Es necesario envolver los elementos de forma deshabilitados en un elemento contenedor para que Tooltipo funcione.
:::


### Atributos
| Atributo       | Descripción                              | Tipo    | Valores aceptados                        | Por defecto                              |
| -------------- | ---------------------------------------- | ------- | ---------------------------------------- | ---------------------------------------- |
| effect         | tema del Tooltip                         | string  | dark/light                               | dark                                     |
| content        | contenido a mostrar, puede ser sobre-escrito por `slot#content` | string  | —                                        | —                                        |
| placement      | posición del Tooltip                     | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                   |
| value(v-model) | visibilidad del Tooltip                  | boolean | —                                        | false                                    |
| disabled       | saber si el Tooltip se encuentra deshabilitado | boolean | —                                        | false                                    |
| offset         | offset del Tooltip                       | number  | —                                        | 0                                        |
| transition     | nombre de animación                      | string  | —                                        | el-fade-in-linear                        |
| visible-arrow  | si una flecha es mostrada. Para mayor información, revisar la página de [Vue-popper](https://github.com/element-component/vue-popper) | boolean | —                                        | true                                     |
| popper-options | parámetros de [popper.js](https://popper.js.org/documentation.html) | Object  | referirse a la documentación de [popper.js](https://popper.js.org/documentation.html) | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| open-delay     | retraso de la apariencia, en milisegundos | number  | —                                        | 0                                        |
| manual         | si el Tooltipo será controlado de forma manual. `mouseenter` y `mouseleave` no tendrán efecto si fue establecido como `true` | boolean | —                                        | false                                    |
| popper-class   | nombre de clase personalizada para el popper del Tooltip | string  | —                                        | —                                        |
| enterable      | si el mouse puede entrar al Tooltip      | Boolean | —                                        | true                                     |
| hide-after     | tiempo a esperar en milisegundos para esconder el Tooltip | number  | —                                        | 0                                        |
