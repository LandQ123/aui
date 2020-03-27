<template>
  <div style="margin: 20px;">
    <div class="box">
      <af-breadcrumb separator="/">
        <af-breadcrumb-item :to="{ path: '/' }">home</af-breadcrumb-item>
        <af-breadcrumb-item>info</af-breadcrumb-item>
      </af-breadcrumb>
    </div>
    <br>
    <div style="width: 160px;" class="box">
      <af-side-menu  :group="false" :list="list" @select="selectMenu"></af-side-menu>
    </div>
    <br>
    <div style="width: 160px;" class="box">
       <af-side-menu  :group="true" :list="list" @select="selectMenu" @add="add" @edit="edit" @remove="remove"></af-side-menu>
    </div>
    <br>
    <div style="width: 360px;" class="box">
      <af-form :model="afForm" ref="afForm" :rules="rules">
        <af-form-item prop="userName">
          <af-input placeholder="请输入" v-model="afForm.userName">
            <span slot="prepend">用户名：</span>
          </af-input>
        </af-form-item>
        <af-form-item prop="name">
          <af-input placeholder="请输入" v-model="afForm.name">
            <span slot="prepend">姓名：</span>
          </af-input>
        </af-form-item>
        <af-form-item prop="sex" label="性别：">
          <af-radio-group v-model="afForm.sex">
            <af-radio-button label="1">男</af-radio-button>
            <af-radio-button label="2">女</af-radio-button>
          </af-radio-group>
        </af-form-item>
        <af-form-item prop="password">
          <af-input placeholder="请输入" v-model="afForm.password" type="password">
            <span slot="prepend">设置密码：</span>
          </af-input>
        </af-form-item>
        <af-form-item prop="confirmPpassword">
          <af-input placeholder="请输入" v-model="afForm.confirmPpassword" type="password">
            <span slot="prepend">确认密码：</span>
          </af-input>
        </af-form-item>
        <af-form-item prop="position" label="职务：" label-width="80px">
          <af-select v-model="afForm.position" placeholder="请选择" clearable >
            <af-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </af-option>
          </af-select>
        </af-form-item>
        <af-form-item prop="busType" label="业务类型：" label-width="80px">
          <af-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</af-checkbox>
          <af-checkbox-group v-model="afForm.busType" @change="handleCheckedBusTypeChange">
            <af-checkbox v-for="(type, index) in busTypeOptions" :label="type" :key="index">{{type}}</af-checkbox>
          </af-checkbox-group>
        </af-form-item>
        <af-form-item prop="remark">
          <af-input type="textarea" placeholder="请输入内容" v-model="afForm.remark" restrict total-count="100">
          </af-input>
        </af-form-item>
      </af-form>
    </div>
    <br>
    <div class="box">
      <af-tabs v-model="tabsActive" @tab-click="handleTabClick">
        <af-tab-pane label="标签一" name="first">标签一</af-tab-pane>
        <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
        <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
        <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
      </af-tabs>
    </div>
    <br>
    <div class="box">
      <af-tabs v-model="tabsActiveEdit" @tab-click="handleTabClick" editable type="card" @edit="handleTabsEdit">
        <af-tab-pane v-for="(item, index) in tabsActiveEditList" :key="index" :label="item.label" :name="item.name">
          {{item.content}}
        </af-tab-pane>
      </af-tabs>
    </div>
    <br>
    <div class="box">
      <af-tabs v-model="tabsActiveBorder" @tab-click="handleTabClick" type="border-card">
        <af-tab-pane label="标签一" name="first">标签一</af-tab-pane>
        <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
        <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
        <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
      </af-tabs>
    </div>
    <br>
    <div class="box">
      <af-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <af-radio-button label="top">top</af-radio-button>
        <af-radio-button label="right">right</af-radio-button>
        <af-radio-button label="bottom">bottom</af-radio-button>
        <af-radio-button label="left">left</af-radio-button>
      </af-radio-group>
      <af-tabs v-model="tabsActivePosition" @tab-click="handleTabClick" :tab-position="tabPosition" style="height: 200px;">
        <af-tab-pane label="标签一" name="first">标签一</af-tab-pane>
        <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
        <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
        <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
      </af-tabs>
    </div>
    <div class="box">
      <af-tabs v-model="tabsActiveSlot" @tab-click="handleTabClick">
        <af-tab-pane label="标签一" name="first">
          <span slot="label"><i class="af-icon-info"></i>标签一</span>
          标签一
        </af-tab-pane>
        <af-tab-pane label="标签二" name="second">标签二</af-tab-pane>
        <af-tab-pane label="标签三" name="third">标签三</af-tab-pane>
        <af-tab-pane label="标签四" name="fourth">标签四</af-tab-pane>
      </af-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          label: '证券类',
          index: "1",
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
      ],
      afForm:{
        userName: '',
        name: '',
        sex: '1',
        password: '',
        confirmPpassword: '',
        position: '',
        busType: [],
        remark: ''
      },
      positionOptions: [
        {
          label: '总部经理',
          value: 1
        },
        {
          label: '分公司经理',
          value: 2
        }
      ],
      checkAll: false,
      isIndeterminate: false,
      busTypeOptions: ['上海', '北京', '广州', '深圳'],
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPpassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请选择职务', trigger: 'change' }
        ],
        busType: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ]
      },
      tabsActive: 'first',
      tabsActiveEdit: '1',
      tabsActiveEditList: [
        {
          label: '标签一',
          name: '1',
          content: '标签一'
        },
        {
          label: '标签二',
          name: '2',
          content: '标签二'
        },
        {
          label: '标签三',
          name: '3',
          content: '标签三'
        },
        {
          label: '标签四',
          name: '4',
          content: '标签四'
        }
      ],
      tabsActiveEditIndex: 4,
      tabsActiveBorder: 'first',
      tabsActivePosition: 'first',
      tabPosition: 'top',
      tabsActiveSlot: 'first'
    }
  },
  methods: {
    // 侧边栏
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
    },
    // form表单
    handleCheckAllChange(val) {
      this.afForm.busType = val ? this.busTypeOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedBusTypeChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.busTypeOptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.busTypeOptions.length;
    },
    // tabs功能
    handleTabClick(tab, event) {
      console.log(tab.name);
    },
    handleTabsEdit(targetName, action){
      console.log(targetName, action)
      if(action === 'add') {
        let index = ++this.tabsActiveEditIndex
        let obj = {
          label: 'New Tab' + index,
          name: index + '',
          content: 'New Tab Content' + index
        }
        this.tabsActiveEditList.push(obj)
      }
      if(action === 'remove') {
        if(this.tabsActiveEditList.length === 1){
          return
        }
        this.tabsActiveEditList = this.tabsActiveEditList.filter(tab => tab.name !== targetName)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .box{
    border: 1px solid #ddd;
    padding: 20px;
  }
</style>
