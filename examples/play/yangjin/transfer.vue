<template>
  <div>
    <af-transfer-tree
      style="text-align: left; display: inline-block"
      v-model="value7"
      :data="data4"
      :default-value="defaultValue"
      filterable
      :props="defaultProps"
      :titles="['Source', 'Target']"
      @change="handleChange">
    </af-transfer-tree>
  </div>
</template>

<script>
  export default {
    data() {
      const treeData1 = [{
        id: 1,
        label: 'AMD',
        children: [{
          id: 4,
          label: 'AMD-1',
          children: [{
            id: 5,
            label: 'AMD-1-1'
          }, {
            id: 6,
            label: 'AMD-1-2',
          }, {
            id: 7,
            label: 'AMD-1-3'
          }, {
            id: 8,
            label: 'AMD-1-4'
          }, {
            id: 9,
            label: 'AMD-1-5'
          }]
        }]
      }, {
        id: 2,
        label: 'ARC',
        children: [{
          id: 13,
          label: 'ARC-1',
          children: [{
            id: 15,
            label: 'ARC-1-1'
          }, {
            id: 16,
            label: 'ARC-1-2'
          }]
        }, {
          id: 14,
          label: 'ARC-2',
          children: [{
            id: 17,
            label: 'ARC-2-1'
          }, {
            id: 18,
            label: 'ARC-2-2'
          }]
        }]
      }, 
      {
        id: 3,
        label: 'ATP',
        children: [{
          id: 19,
          label: 'ATP-1',
          children: [{
            id: 21,
            label: 'ATP-1-1'
          }, {
            id: 22,
            label: 'ATP-1-2'
          }]
        }, {
          id: 20,
          label: 'ATP-2',
          children: [{
            id: 23,
            label: 'ATP-2-1'
          }, {
            id: 24,
            label: 'ATP-2-2'
          }]
        }]
      }];
      return {
        data4: treeData1,
        value7: [],
        defaultValue: '23,24',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleChange(val, direction, move) {
        console.log(val, direction, move);
      },
    }
  };
</script>