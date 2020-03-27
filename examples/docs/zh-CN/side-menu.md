<style>
  .side-menu-demo{
    width: 160px;
  }
</style>
<script>
  export default {
    data() {
      return {
        list: [
          {
            label: '证券类监控名单',
            index: "1",
          },
          {
            label: '账户类监控名单',
            index: "2"
          },
          {
            label: '指数类监控名单',
            index: "3"
          }
        ],
        groupList: [
          {
            label: '证券类',
            index: "1",
            isAdd: true,
            children: [
              {
                label: '交易所重点监控账户',
                indexItem: "1-1",
                isEdit: true,
                isRemove: true
              },
              {
                label: '公司重点监控账户',
                indexItem: "1-2",
                isRemove: true
              }
            ]
          },
          {
            label: '账户类监控名单',
            index: "2"
          },
          {
            label: '指数类',
            index: "3",
            isAdd: true,
            children: [
              {
                label: '公司所重点监控指数测试',
                indexItem: "3-1",
                isEdit: true,
                isRemove: true
              },
              {
                label: '交易所重点监控指数',
                indexItem: "3-2",
                isEdit: true
              }
            ]
          }
        ]
      };
    },
    methods: {
      selectMenu(val){
        console.log('selectMenu', val)
      },
      add(val){
        console.log('add', val)
      },
      edit(val){
        console.log('edit', val)
      },
      remove(val){
        console.log('remove', val)
      }
    }
  }
</script>

## side-menu 标签页
显示左边标签页菜单，有分组标签页和普通标签页2种模式。该组件基于element-UI原始的"af-menu"，"af-submenu"，"af-menu-item"，"af-tooltip"，"af-button"组件组成。

### 基础用法

适用大部分场景的基础用法。

:::demo 通过"af-side-menu"标签使用。必填参数"list（标签页列表）"
```html
  <template>
    <af-side-menu :list="list" class="side-menu-demo" @select="selectMenu"></af-side-menu>
  </template>
  <script>
    export default {
      data() {
        return {
          list: [
            {
              label: '证券类监控名单',
              index: "1",
            },
            {
              label: '账户类监控名单',
              index: "2"
            },
            {
              label: '指数类监控名单',
              index: "3"
            }
          ]
        };
      },
      methods: {
        selectMenu(val){
          console.log('selectMenu', val)
        }
      }
    }
  </script>
```
:::

### 分组标签模式

:::demo 分组标签页模式（group === true）有add/edit/remove按钮，其中add/edit/remove在list中配置是否显示。
```html
  <template>
    <af-side-menu :group="true" :list="groupList"
      class="side-menu-demo"
      @select="selectMenu" 
      @add="add"
      @edit="edit"
      @remove="remove">
    </af-side-menu>
  </template>
  <script>
    export default {
      data() {
        return {
          groupList: [
            {
              label: '证券类',
              index: "1",
              isAdd: true,
              children: [
                {
                  label: '交易所重点监控账户',
                  indexItem: "1-1",
                  isEdit: true,
                  isRemove: true
                },
                {
                  label: '公司重点监控账户',
                  indexItem: "1-2",
                  isRemove: true
                }
              ]
            },
            {
              label: '账户类监控名单',
              index: "2"
            },
            {
              label: '指数类',
              index: "3",
              isAdd: true,
              children: [
                {
                  label: '公司所重点监控指数测试',
                  indexItem: "3-1",
                  isEdit: true,
                  isRemove: true
                },
                {
                  label: '交易所重点监控指数',
                  indexItem: "3-2",
                  isEdit: true
                }
              ]
            }
          ]
        }
      },
      methods: {
        selectMenu(val){
          console.log('selectMenu', val)
        },
        add(val){
          console.log('add', val)
        },
        edit(val){
          console.log('edit', val)
        },
        remove(val){
          console.log('remove', val)
        }
      }
    };
  </script>
```
:::

### side-menu Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| group | 分组模式：true为分组标签页，false为普通标签页 | Boolean | — | false |
| list | 标签页数据列表 | Array | — | - |

### side-menu Methods
| 事件名称      | 说明    | 参数      |
|---------- |-------- |---------- |
| select  | 菜单激活回调 | 返回值为激活菜单的id |
| add  | 分组模式下，添加分组下菜单回调 | 返回值为某组的id |
| edit  | 分组模式下，修改分组下某菜单属性（名称等）回调 |返回值为修改菜单的id |
| remove  | 分组模式下，移除分组下某菜单回调 | 返回值为移除菜单的id |
