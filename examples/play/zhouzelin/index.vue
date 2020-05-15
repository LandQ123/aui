<template>
  <af-table :data="[{
    name: 'xiaoming', age: 12, sex: 1, birthday: '1992-04-28'
  }]">
    <af-table-column label="序号" type="indexSelection"></af-table-column>
    <af-table-column label="姓名" prop="name"></af-table-column>
    <af-table-column label="年龄" prop="age"></af-table-column>
    <af-table-column label="性别" prop="sex"></af-table-column>
    <af-table-column label="生日" prop="birthday"></af-table-column>
  </af-table>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          age: '',
          times: [],
          like: [],
          date: '',
          dates: [],
          count: 0
        },
        rules: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
          times: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          date: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        options: [{
          label: '每月',
          value: 0,
          children: [{
            label: '1次',
            value: 1
          }, {
            label: '2次',
            value: 2
          }, {
            label: '3次',
            value: 3
          }]
        }, {
          label: '每周',
          value: 1,
          children: [{
            label: '1次',
            value: 1
          }, {
            label: '2次',
            value: 2
          }, {
            label: '3次',
            value: 3
          }]
        }, {
          label: '每日',
          value: 2
        }]
      };
    },
    methods: {
      handleClick() {
        this.$message({
          type: 'success',
          title: '成功提示',
          messageTitle: '点击成功'
        })
      }
    },
  };
</script>