<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  
  #common-layouts + .demo-container {
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

## Container
Container components for scaffolding basic structure of the page:

`<af-container>`: wrapper container. When nested with a `<af-header>` or `<af-footer>`, all its child elements will be vertically arranged. Otherwise horizontally.

`<af-header>`: container for headers.

`<af-aside>`: container for side sections (usually a side nav).

`<af-main>`: container for main sections.

`<af-footer>`: container for footers.

:::tip
These components use flex for layout, so please make sure your browser supports it. Besides, `<af-container>`'s direct child elements have to be one or more of the latter four components. And father element of the latter four components must be a `<af-container>`.
:::

### Common layouts

:::demo
```html
<af-container>
  <af-header>Header</af-header>
  <af-main>Main</af-main>
</af-container>

<af-container>
  <af-header>Header</af-header>
  <af-main>Main</af-main>
  <af-footer>Footer</af-footer>
</af-container>

<af-container>
  <af-aside width="200px">Aside</af-aside>
  <af-main>Main</af-main>
</af-container>

<af-container>
  <af-header>Header</af-header>
  <af-container>
    <af-aside width="200px">Aside</af-aside>
    <af-main>Main</af-main>
  </af-container>
</af-container>

<af-container>
  <af-header>Header</af-header>
  <af-container>
    <af-aside width="200px">Aside</af-aside>
    <af-container>
      <af-main>Main</af-main>
      <af-footer>Footer</af-footer>
    </af-container>
  </af-container>
</af-container>

<af-container>
  <af-aside width="200px">Aside</af-aside>
  <af-container>
    <af-header>Header</af-header>
    <af-main>Main</af-main>
  </af-container>
</af-container>

<af-container>
  <af-aside width="200px">Aside</af-aside>
  <af-container>
    <af-header>Header</af-header>
    <af-main>Main</af-main>
    <af-footer>Footer</af-footer>
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

### Example

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

### Container Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| direction | layout direction for child elements | string | horizontal / vertical | vertical when nested with `el-header` or `el-footer`; horizontal otherwise |

### Header Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | height of the header | string | — | 60px |

### Aside Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| width | width of the side section | string | — | 300px |

### Footer Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | height of the footer | string | — | 60px |