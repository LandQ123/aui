<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  #disenos-comunes + .demo-container {
    .el-header, .el-footer {
      text-align: center;
    }
    
    .el-aside {
      background-color: #D3DCE6;
      text-align: center;
      line-height: 200px;
    }
    
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
    
    & > .source > .el-container {
      margin-bottom: 40px;
    
      &:nth-child(5) .el-aside,
      &:nth-child(6) .el-aside {
        line-height: 260px;
      }
    
     &:nth-child(7) .el-aside {
       line-height: 320px;
      }
    }
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>

## Contenedor
Componentes contenedores para iniciar una estructura básica de un sitio:

`<af-container>`: Contenedor. Cuando este elemento se anida con un `<af-header>` o `<af-footer>`, todos los elementos secundarios se organizan verticalmente.
De lo contrario, de forma horizontal. 

`<af-header>`: Contenedor para cabeceras.

`<af-aside>`: Contenedor para secciones laterales (generalmente, una barra lateral).

`<af-main>`: Contenedor para sección principal.

`<af-footer>`: Contenedor para pie de página.

:::tip
Estos componentes utilizan flex para el diseño, así que asegurese que el navegador lo soporta. Además, los elementos directos de `<af-container>` tienen que ser uno o más de los últimos cuatro componentes. Y el elemento padre de los últimos cuatro componentes debe ser un `<af-container>`.
:::

### Diseños comunes

:::demo
```html
<af-container>
  <af-header>Cabecera</af-header>
  <af-main>Principal</af-main>
</af-container>

<af-container>
  <af-header>Cabecera</af-header>
  <af-main>Principal</af-main>
  <af-footer>Pie de página</af-footer>
</af-container>

<af-container>
  <af-aside width="200px">Barra lateral</af-aside>
  <af-main>Principal</af-main>
</af-container>

<af-container>
  <af-header>Cabecera</af-header>
  <af-container>
    <af-aside width="200px">Barra lateral</af-aside>
    <af-main>Principal</af-main>
  </af-container>
</af-container>

<af-container>
  <af-header>Cabecera</af-header>
  <af-container>
    <af-aside width="200px">Barra lateral</af-aside>
    <af-container>
      <af-main>Principal</af-main>
      <af-footer>Pie de página</af-footer>
    </af-container>
  </af-container>
</af-container>

<af-container>
  <af-aside width="200px">Barra lateral</af-aside>
  <af-container>
    <af-header>Cabecera</af-header>
    <af-main>Principal</af-main>
  </af-container>
</af-container>

<af-container>
  <af-aside width="200px">Barra lateral</af-aside>
  <af-container>
    <af-header>Cabecera</af-header>
    <af-main>Principal</af-main>
    <af-footer>Pie de página</af-footer>
  </af-container>
</af-container>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
```
:::

### Ejemplo

:::demo
```html
<af-container style="height: 500px; border: 1px solid #eee">
  <af-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <af-menu :default-openeds="['1', '3']">
      <af-submenu index="1">
        <template slot="title"><i class="af-icon-message"></i>Navigator One</template>
        <af-menu-item-group>
          <template slot="title">Group 1</template>
          <af-menu-item index="1-1">Option 1</af-menu-item>
          <af-menu-item index="1-2">Option 2</af-menu-item>
        </af-menu-item-group>
        <af-menu-item-group title="Group 2">
          <af-menu-item index="1-3">Option 3</af-menu-item>
        </af-menu-item-group>
        <af-submenu index="1-4">
          <template slot="title">Option4</template>
          <af-menu-item index="1-4-1">Option 4-1</af-menu-item>
        </af-submenu>
      </af-submenu>
      <af-submenu index="2">
        <template slot="title"><i class="af-icon-menu"></i>Navigator Two</template>
        <af-menu-item-group>
          <template slot="title">Group 1</template>
          <af-menu-item index="2-1">Option 1</af-menu-item>
          <af-menu-item index="2-2">Option 2</af-menu-item>
        </af-menu-item-group>
        <af-menu-item-group title="Group 2">
          <af-menu-item index="2-3">Option 3</af-menu-item>
        </af-menu-item-group>
        <af-submenu index="2-4">
          <template slot="title">Option 4</template>
          <af-menu-item index="2-4-1">Option 4-1</af-menu-item>
        </af-submenu>
      </af-submenu>
      <af-submenu index="3">
        <template slot="title"><i class="af-icon-setting"></i>Navigator Three</template>
        <af-menu-item-group>
          <template slot="title">Group 1</template>
          <af-menu-item index="3-1">Option 1</af-menu-item>
          <af-menu-item index="3-2">Option 2</af-menu-item>
        </af-menu-item-group>
        <af-menu-item-group title="Group 2">
          <af-menu-item index="3-3">Option 3</af-menu-item>
        </af-menu-item-group>
        <af-submenu index="3-4">
          <template slot="title">Option 4</template>
          <af-menu-item index="3-4-1">Option 4-1</af-menu-item>
        </af-submenu>
      </af-submenu>
    </af-menu>
  </af-aside>
  
  <af-container>
    <af-header style="text-align: right; font-size: 12px">
      <af-dropdown>
        <i class="af-icon-setting" style="margin-right: 15px"></i>
        <af-dropdown-menu slot="dropdown">
          <af-dropdown-item>View</af-dropdown-item>
          <af-dropdown-item>Add</af-dropdown-item>
          <af-dropdown-item>Delete</af-dropdown-item>
        </af-dropdown-menu>
      </af-dropdown>
      <span>Tom</span>
    </af-header>
    
    <af-main>
      <af-table :data="tableData">
        <af-table-column prop="date" label="Date" width="140">
        </af-table-column>
        <af-table-column prop="name" label="Name" width="120">
        </af-table-column>
        <af-table-column prop="address" label="Address">
        </af-table-column>
      </af-table>
    </af-main>
  </af-container>
</af-container>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
```
:::

### Atributos de contenedor
| Atributo  | Descripción                              | Tipo   | Valores aceptados     | Por defecto                              |
| --------- | ---------------------------------------- | ------ | --------------------- | ---------------------------------------- |
| direction | dirección de diseño para elementos secundarios | string | horizontal / vertical | vertical cuando el elemento está anidado con `el-header`, de lo contrario, horizontal |

### Atributos de cabecera
| Atributo | Descripción           | Tipo   | Valores aceptados | Por defecto |
| -------- | --------------------- | ------ | ----------------- | ----------- |
| height   | altura de la cabecera | string | —                 | 60px        |

### Atributos de barra lateral
| Atributo | Descripción               | Tipo   | Valores aceptados | Por defecto |
| -------- | ------------------------- | ------ | ----------------- | ----------- |
| width    | ancho de la barra lateral | string | —                 | 300px       |

### Atributos de pie de página
| Atributo | Descripción              | Tipo   | Valores aceptados | Por defecto |
| -------- | ------------------------ | ------ | ----------------- | ----------- |
| height   | altura del pie de página | string | —                 | 60px        |