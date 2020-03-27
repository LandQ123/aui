<script>
  module.exports = {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }],
        dialogVisible: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        outerVisible: false,
        innerVisible: false,
        centerDialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style>
  .demo-box.demo-dialog {
    .dialog-footer button:first-child {
      margin-right: 10px;
    }
    .full-image {
      width: 100%;
    }
    .el-dialog__wrapper {
      margin: 0;
    }
    .el-select {
      width: 300px;
    }
    .el-input {
      width: 300px;
    }
    .el-button--text {
      margin-right: 15px;
    }
  }
</style>

## Dialog

Informar a usuarios preservando el estado de la página actual.

### Uso Básico

Dialog abre una caja de diálogo, y es bastante personalizable.

:::demo Establezca el atributo `visible` con un booleano, y el Dialog se muestra cuando es `true`. El diálogo tiene dos partes: `body` y `footer`,  este último requiere un slot llamado `footer`. El atributo `title` es opcional (vacío por defecto) y sirve para definir un título. Por último, este ejemplo muestra cómo se utiliza `before-close`.


```html
<af-button type="text" @click="dialogVisible = true">click to open the Dialog</af-button>

<af-dialog
  title="Tips"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>This is a message</span>
  <span slot="footer" class="dialog-footer">
    <af-button @click="dialogVisible = false">Cancel</af-button>
    <af-button type="primary" @click="dialogVisible = false">Confirm</af-button>
  </span>
</af-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
```
:::

:::tip

`before-close`  sólo funciona cuando el usuario hace clic en el icono de cerrar o en el fondo. Si tiene botones que cierran el cuadro de diálogo en el slot llamado `footer`, puede agregar lo que haría `before-close` en el manejador de eventos de los botones.

:::

### Personalizaciones


El contenido del Diálogo puede ser cualquier cosa, incluso una tabla o un formulario. Este ejemplo muestra cómo usar Element Table y Form con Dialog

:::demo

```html
<!-- Table -->
<af-button type="text" @click="dialogTableVisible = true">open a Table nested Dialog</af-button>

<af-dialog title="Shipping address" :visible.sync="dialogTableVisible">
  <af-table :data="gridData">
    <af-table-column property="date" label="Date" width="150"></af-table-column>
    <af-table-column property="name" label="Name" width="200"></af-table-column>
    <af-table-column property="address" label="Address"></af-table-column>
  </af-table>
</af-dialog>

<!-- Form -->
<af-button type="text" @click="dialogFormVisible = true">open a Form nested Dialog</af-button>

<af-dialog title="Shipping address" :visible.sync="dialogFormVisible">
  <af-form :model="form">
    <af-form-item label="Promotion name" :label-width="formLabelWidth">
      <af-input v-model="form.name" autocomplete="off"></af-input>
    </af-form-item>
    <af-form-item label="Zones" :label-width="formLabelWidth">
      <af-select v-model="form.region" placeholder="Please select a zone">
        <af-option label="Zone No.1" value="shanghai"></af-option>
        <af-option label="Zone No.2" value="beijing"></af-option>
      </af-select>
    </af-form-item>
  </af-form>
  <span slot="footer" class="dialog-footer">
    <af-button @click="dialogFormVisible = false">Cancel</af-button>
    <af-button type="primary" @click="dialogFormVisible = false">Confirm</af-button>
  </span>
</af-dialog>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    }
  };
</script>
```
:::

### Diálogo anidado
Si un diálogo está anidado en otro diálogo, se requiere append-to-body.

:::demo Normalmente no recomendamos el uso de Dialog anidado. Si necesita que se muestren múltiples diálogos en la página, puede simplemente aplanarlos para que sean hermanos entre sí. Si debe anidar un Diálogo dentro de otro Diálogo, establezca `append-to-body` del Diálogo anidado como true, y lo añadirá al cuerpo en lugar de su nodo padre, para que ambos Diálogos puedan ser correctamente renderizados.

```html
<template>
  <af-button type="text" @click="outerVisible = true">open the outer Dialog</af-button>
  
  <af-dialog title="Outer Dialog" :visible.sync="outerVisible">
    <af-dialog
        width="30%"
        title="Inner Dialog"
        :visible.sync="innerVisible"
        append-to-body>
    </af-dialog>
    <div slot="footer" class="dialog-footer">
      <af-button @click="outerVisible = false">Cancel</af-button>
      <af-button type="primary" @click="innerVisible = true">open the inner Dialog</af-button>
    </div>
  </af-dialog>
</template>

<script>
  export default {
    data() {
      return {
        outerVisible: false,
        innerVisible: false
      };
    }
  }
</script>
```
:::

### Contenido centrado
El contenido de Diálogo se puede centrar.

:::demo Ajuste `center` en `true` para centrar el encabezado y el pie de página del cuadro de diálogo horizontalmente. `center` sólo afecta al encabezado y pie de página de Dialog. El cuerpo de Dialog puede ser cualquier cosa, así que a veces no se ve bien cuando está centrado. Necesitas escribir algún CSS si deseas centrar el cuerpo también.

```html
<af-button type="text" @click="centerDialogVisible = true">Click to open the Dialog</af-button>

<af-dialog
  title="Warning"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>It should be noted that the content will not be aligned in center by default</span>
  <span slot="footer" class="dialog-footer">
    <af-button @click="centerDialogVisible = false">Cancel</af-button>
    <af-button type="primary" @click="centerDialogVisible = false">Confirm</af-button>
  </span>
</af-dialog>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false
      };
    }
  };
</script>
```
:::

:::tip
The content of Dialog is lazily rendered, which means the default slot is not rendered onto the DOM until it is firstly opened. Therefore, if you need to perform a DOM manipulation or access a component using `ref`, do it in the `open` event callback.
:::

:::tip

Si la variable ligada a `visible` se gestiona en el Vuex store, el `.sync` no puede funcionar correctamente. En este caso, elimine el modificador `.sync`, escuche los eventos de `open` y `close` Dialog, y confirme las mutaciones Vuex para actualizar el valor de esa variable en los manejadores de eventos.

:::

### Atributo

| Atributo              | Descripción                              | Tipo                                     | Valores aceptados | Por defecto |
| --------------------- | ---------------------------------------- | ---------------------------------------- | ----------------- | ----------- |
| visible               | visibilidad del Diálogo, apoya el modificador .sync | boolean                                  | —                 | false       |
| title                 | título de Diálogo. También se puede pasar con un slot con nombre (ver la tabla siguiente) | string                                   | —                 | —           |
| width                 | anchura de Diálogo                       | string                                   | —                 | 50%         |
| fullscreen            | si el diálogo ocupa pantalla completa    | boolean                                  | —                 | false       |
| top                   | valor de `margin-top` del Diálogo CSS    | string                                   | —                 | 15vh        |
| modal                 | si se muestra una máscara                | boolean                                  | —                 | true        |
| modal-append-to-body  | si adjuntar modal al elemento de cuerpo. Si es falso,el modal se agregará al elemento principal de Diálogo | boolean                                  | —                 | true        |
| append-to-body        | Si adjuntar el cuadro de diálogo al cuerpo | boolean                                  | —                 | false       |
| lock-scroll           | Si el scroll del cuerpo está desactivado mientras se muestra el cuadro de diálogo | boolean                                  | —                 | true        |
| custom-class          | nombres de clase personalizada para el Diálogo | string                                   | —                 | —           |
| close-on-click-modal  | si el Diálogo puede ser cerrado haciendo clic en la máscara | boolean                                  | —                 | true        |
| close-on-press-escape | si el Diálogo puede ser cerrado presionando ESC | boolean                                  | —                 | true        |
| show-close            | si mostrar un botón de cerrar            | boolean                                  | —                 | true        |
| before-close          | una devolución de llamada antes de que se cierre el cuadro de diálogo, y evitar cerrar el cuadro de diálogo | función(done) `done`se usa para cerrar el diálog | —                 | —           |
| center                | si alinear el encabezado y el pie de página en el centro | boolean                                  | —                 | false       |

### Slots

| Nombre | Descripcíon                            |
| ------ | -------------------------------------- |
| —      | contenido de Diálogo                   |
| title  | contenido del título de Diálogo        |
| footer | contenido del pie de página de Diálogo |

### Eventos
| Nombre de Evento | Descripcíon                              | Parámetros |
| ---------------- | ---------------------------------------- | ---------- |
| open             | se activa cuando se abre el cuadro de Diálogo | —          |
| opened           | se activa cuando la animacion de apertura del Dialog termina. | — |
| close            | se dispara cuando el Diálogo se cierra   | —          |
| closed           | se activa cuando finaliza la animación de cierre del Diálog | — |

