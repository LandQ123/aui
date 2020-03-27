<template>
  <div>
    <af-transfer-tree
      style="text-align: left; display: inline-block"
      v-model="value3"
      :defaultValue="defaultValue"
      node-key="idd"
      filterable
      :filter-node-method="filterNode"
      :titles="['Source', 'Target']"
      @change="handleChange"
      :data="data2">
    </af-transfer-tree>
    <div>
      <af-input
        style="widdth: 200px; margin-top: 20px;"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </af-input>
      <p>使用 render-content</p>
      <af-tree
        :data="data3"
        show-checkbox
        :default-checked-keys="[1]"
        node-key="idd"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        :render-content="renderContent">
      </af-tree>
    </div>
  </div>
</template>

<script>
  let idd = 1000;
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      const treeData = [{
        idd: 1,
        label: 'AMD',
        children: [{
          idd: 4,
          label: 'AMD-1',
          children: [{
            idd: 5,
            label: 'AMD-1-1'
          }, {
            idd: 6,
            label: 'AMD-1-2',
          }, {
            idd: 12,
            label: 'AMD-1-3'
          }, {
            idd: 7,
            label: 'AMD-1-4'
          }, {
            idd: 8,
            label: 'AMD-1-5'
          }]
        }]
      }, {
        idd: 2,
        label: 'ARC',
        children: [{
          idd: 13,
          label: 'ARC-1',
          children: [{
            idd: 15,
            label: 'ARC-1-1'
          }, {
            idd: 16,
            label: 'ARC-1-2'
          }]
        }, {
          idd: 14,
          label: 'ARC-2',
          children: [{
            idd: 17,
            label: 'ARC-2-1'
          }, {
            idd: 18,
            label: 'ARC-2-2'
          }]
        }]
      }, 
      {
        idd: 3,
        label: 'AMD',
        children: [{
          idd: 19,
          label: 'AMD-1',
          children: [{
            idd: 21,
            label: 'AMD-1-1'
          }, {
            idd: 22,
            label: 'AMD-1-2'
          }]
        }, {
          idd: 20,
          label: 'AMD-2',
          children: [{
            idd: 23,
            label: 'AMD-2-1'
          }, {
            idd: 24,
            label: 'AMD-2-2'
          }]
        }]
      }];
      return {
        value3: [],
        defaultValue: '23,24',
        data: generateData(),
        filterText: '',
        data2: JSON.parse(JSON.stringify(treeData)),
        data3: JSON.parse(JSON.stringify(treeData)),
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        // console.log(value, data.idd);
        if (!value) return true;
        let id = data.idd + '';
        if (id.indexOf(value) !== -1) {
          console.log(data.label);
        }
        return id.indexOf(value) !== -1;
      },
      handleChange(val, direction, move) {
        console.log('change:')
        console.log(val, direction, move);
      },
      append(data) {
        const newChild = { idd: idd++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.idd === data.idd);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <af-button size="mini" type="text" on-click={ () => this.append(data) }>Append</af-button>
              <af-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</af-button>
            </span>
          </span>);
      }
    }
  };
</script>