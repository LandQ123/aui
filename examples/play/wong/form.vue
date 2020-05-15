<template>
    <af-form :model="afFormSelfValid" ref="afFormSelfValid" :rules="selfRules">
        <af-form-item prop="userName">
            <af-input placeholder="请输入" v-model="afFormSelfValid.userName">
                <span slot="prepend">用户名:</span>
            </af-input>
        </af-form-item>
        <af-form-item prop="name">
            <af-input placeholder="请输入" v-model="afFormSelfValid.name">
                <span slot="prepend">姓名:</span>
            </af-input>
        </af-form-item>
        <af-form-item prop="sex" label="性别:" label-width="50px">
            <af-radio-group v-model="afFormSelfValid.sex">
                <af-radio-button label="1">男</af-radio-button>
                <af-radio-button label="2">女</af-radio-button>
            </af-radio-group>
        </af-form-item>
        <af-form-item prop="password">
            <af-input placeholder="请输入" v-model="afFormSelfValid.password" type="password">
                <span slot="prepend">设置密码:</span>
            </af-input>
        </af-form-item>
        <af-form-item prop="confirmPpassword">
            <af-input placeholder="请输入" v-model="afFormSelfValid.confirmPpassword" type="password">
                <span slot="prepend">确认密码:</span>
            </af-input>
        </af-form-item>
        <af-form-item prop="position">
            <af-select v-model="afFormSelfValid.position" placeholder="请选择职务" clearable label="选择职务:" style="width: 100%;">
                <af-option
                        v-for="item in positionOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </af-option>
            </af-select>
        </af-form-item>
        <af-form-item prop="remark">
            <af-input type="textarea" placeholder="请输入内容" v-model="afFormSelfValid.remark" restrict total-count="100">
                <span slot="prepend">内容:</span>
            </af-input>
        </af-form-item>
        <af-form-item prop="address">
            <af-cascader
                v-model="afFormSelfValid.address"
                :options="cascaderOptions"
                :show-all-levels="false"
            ></af-cascader>
        </af-form-item>
        <af-form-item>
            <af-button type="primary" @click="onSubmitSelfValid('afFormSelfValid')">提交</af-button>
            <af-button>取消</af-button>
        </af-form-item>
    </af-form>
</template>
<script>
  export default {
    data() {
      let checkRemark = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请填写备注'))
        } else if(/^ +$/gi.test(value)) {
          callback(new Error('备注信息不能为纯空格'))
        } else if(!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/gi.test(value)) {
          callback(new Error('不允许输入特殊字符'))
        } else {
          callback()
        }
      }
      let checkConfirmPassword = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请填写备注'))
        } else if(value !== this.afFormSelfValid.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        afFormSelfValid:{
          userName: '',
          name: '',
          sex: '1',
          password: '',
          confirmPpassword: '',
          position: '',
          remark: '',
          address:''
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
        cascaderOptions: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selfRules: {
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
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { validator: checkConfirmPassword, trigger: 'blur' }
          ],
          position: [
            { required: true, message: '请选择职务', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' },
            { validator: checkRemark, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmitSelfValid(form){
        this.$refs[form].validate((valid) => {
          if(valid){
            console.log('提交表单')
          }
        })
      }
    }
  }
</script>
