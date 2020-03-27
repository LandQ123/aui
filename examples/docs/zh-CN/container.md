<style>
  .af-header, .af-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .af-aside {
    color: #333;
  }
  
  #chang-jian-ye-mian-bu-ju + .demo-container {
    .af-header, .af-footer {
      text-align: center;
    }
  
    .af-aside {
      background-color: #D3DCE6;
      text-align: center;
      line-height: 200px;
    }
  
    .af-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
    
    & > .source > .af-container {
      margin-bottom: 40px;
    
      &:nth-child(5) .af-aside,
      &:nth-child(6) .af-aside {
        line-height: 260px;
      }

      &:nth-child(7) .af-aside {
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
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>

## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<af-container>`：外层容器。当子元素中包含 `<af-header>` 或 `<af-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<af-header>`：顶栏容器。

`<af-aside>`：侧边栏容器。

`<af-main>`：主要区域容器。

`<af-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<af-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<af-container>`。
:::

### 常见页面布局

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
  .af-header, .af-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .af-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .af-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .af-container {
    margin-bottom: 40px;
  }
  
  .af-container:nth-child(5) .af-aside,
  .af-container:nth-child(6) .af-aside {
    line-height: 260px;
  }
  
  .af-container:nth-child(7) .af-aside {
    line-height: 320px;
  }
</style>
```
:::

### 实例

:::demo
```html
<af-container style="height: 500px; border: 1px solid #eee">
  <af-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <af-menu :default-openeds="['1', '3']">
      <af-submenu index="1">
        <template slot="title"><i class="af-icon-message"></i>导航一</template>
        <af-menu-item-group>
          <template slot="title">分组一</template>
          <af-menu-item index="1-1">选项1</af-menu-item>
          <af-menu-item index="1-2">选项2</af-menu-item>
        </af-menu-item-group>
        <af-menu-item-group title="分组2">
          <af-menu-item index="1-3">选项3</af-menu-item>
        </af-menu-item-group>
        <af-submenu index="1-4">
          <template slot="title">选项4</template>
          <af-menu-item index="1-4-1">选项4-1</af-menu-item>
        </af-submenu>
      </af-submenu>
      <af-submenu index="2">
        <template slot="title"><i class="af-icon-menu"></i>导航二</template>
        <af-menu-item-group>
          <template slot="title">分组一</template>
          <af-menu-item index="2-1">选项1</af-menu-item>
          <af-menu-item index="2-2">选项2</af-menu-item>
        </af-menu-item-group>
        <af-menu-item-group title="分组2">
          <af-menu-item index="2-3">选项3</af-menu-item>
        </af-menu-item-group>
        <af-submenu index="2-4">
          <template slot="title">选项4</template>
          <af-menu-item index="2-4-1">选项4-1</af-menu-item>
        </af-submenu>
      </af-submenu>
      <af-submenu index="3">
        <template slot="title"><i class="af-icon-setting"></i>导航三</template>
        <af-menu-item-group>
          <template slot="title">分组一</template>
          <af-menu-item index="3-1">选项1</af-menu-item>
          <af-menu-item index="3-2">选项2</af-menu-item>
        </af-menu-item-group>
        <af-menu-item-group title="分组2">
          <af-menu-item index="3-3">选项3</af-menu-item>
        </af-menu-item-group>
        <af-submenu index="3-4">
          <template slot="title">选项4</template>
          <af-menu-item index="3-4-1">选项4-1</af-menu-item>
        </af-submenu>
      </af-submenu>
    </af-menu>
  </af-aside>
  
  <af-container>
    <af-header style="text-align: right; font-size: 12px">
      <af-dropdown>
        <i class="af-icon-setting" style="margin-right: 15px"></i>
        <af-dropdown-menu slot="dropdown">
          <af-dropdown-item>查看</af-dropdown-item>
          <af-dropdown-item>新增</af-dropdown-item>
          <af-dropdown-item>删除</af-dropdown-item>
        </af-dropdown-menu>
      </af-dropdown>
      <span>王小虎</span>
    </af-header>
    
    <af-main>
      <af-table :data="tableData">
        <af-table-column prop="date" label="日期" width="140">
        </af-table-column>
        <af-table-column prop="name" label="姓名" width="120">
        </af-table-column>
        <af-table-column prop="address" label="地址">
        </af-table-column>
      </af-table>
    </af-main>
  </af-container>
</af-container>

<style>
  .af-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .af-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
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
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `af-header` 或 `af-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |