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
        afForm:{
          userName: '',
          name: '',
          sex: '1',
          password: '',
          confirmPpassword: '',
          position: '',
          remark: ''
        },
        afFormValid:{
          userName: '',
          name: '',
          sex: '1',
          password: '',
          confirmPpassword: '',
          position: '',
          busType: [],
          remark: '',
          date: ''
        },
        afFormSelfValid:{
          userName: '',
          name: '',
          sex: '1',
          password: '',
          confirmPpassword: '',
          position: '',
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
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
          date: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        },
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
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' },
            { validator: checkRemark, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // form表单
      onSubmit(){
        console.log('提交表单')
      },
      onSubmitValid(form){
        this.$refs[form].validate((valid) => {
          if(valid){
            console.log('提交表单')
          }
        })
      },
      onSubmitSelfValid(form){
        this.$refs[form].validate((valid) => {
          if(valid){
            console.log('提交表单')
          }
        })
      },
      handleCheckAllChange(val) {
        this.afFormValid.busType = val ? this.busTypeOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedBusTypeChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.busTypeOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.busTypeOptions.length;
      }
    }
  }
</script>


## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 着重说明

:::tip
在AUI中Form表单的表单项分为带有【label】属性和没有【label】属性，带有【label】的表单项有单选框、多选框、日期选择等，没有【label】的表单项有输入框，选择框等。有【label】属性和没有【label】属性的表单项在需要校验的时候有一定区别，有【label】的表单项需要设置【label-width】属性，否则校验提示信息会左侧顶头对齐，请着重阅读表单验证demo结尾的提示信息。
:::

### 典型表单
包括各种表单项，比如输入框、选择器、开关、单选框、多选框等

:::demo 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
```html
<af-form :model="afForm" ref="afForm">
  <af-form-item>
    <af-input placeholder="请输入" v-model="afForm.userName">
      <span slot="prepend">用户名:</span>
    </af-input>
  </af-form-item>
  <af-form-item>
    <af-input placeholder="请输入" v-model="afForm.name">
      <span slot="prepend">姓名:</span>
    </af-input>
  </af-form-item>
  <af-form-item label="性别:">
    <af-radio-group v-model="afForm.sex">
      <af-radio-button label="1">男</af-radio-button>
      <af-radio-button label="2">女</af-radio-button>
    </af-radio-group>
  </af-form-item>
  <af-form-item>
    <af-input placeholder="请输入" v-model="afForm.password" type="password">
      <span slot="prepend">设置密码:</span>
    </af-input>
  </af-form-item>
  <af-form-item>
    <af-input placeholder="请输入" v-model="afForm.confirmPpassword" type="password">
      <span slot="prepend">确认密码:</span>
    </af-input>
  </af-form-item>
  <af-form-item>
    <af-select v-model="afForm.position" placeholder="请选择职务" label="请选择职务:" clearable>
      <af-option
        v-for="item in positionOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </af-option>
    </af-select>
  </af-form-item>
  <af-form-item>
    <af-input type="textarea" placeholder="请输入内容" v-model="afForm.remark" restrict total-count="100">
    </af-input>
  </af-form-item>
  <af-form-item>
    <af-button type="primary" @click="onSubmit">提交</af-button>
    <af-button>取消</af-button>
  </af-form-item>
</af-form>
<script>
  export default {
    data() {
      return {
        afForm:{
          userName: '',
          name: '',
          sex: '1',
          password: '',
          confirmPpassword: '',
          position: '',
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
      }
    },
    methods: {
      onSubmit(){
        console.log('提交表单')
      }
    }
  }
</script>
```
:::

:::tip
W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2):
> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

即:当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `<af-form>` 标签上添加 `@submit.native.prevent`。
:::


### 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

:::demo Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)
```html
<af-form :model="afFormValid" ref="afFormValid" :rules="rules">
  <af-form-item prop="userName">
    <af-input placeholder="请输入" v-model="afFormValid.userName">
      <span slot="prepend">用户名:</span>
    </af-input>
  </af-form-item>
  <af-form-item prop="name">
    <af-input placeholder="请输入" v-model="afFormValid.name">
      <span slot="prepend">姓名:</span>
    </af-input>
  </af-form-item>
  <af-form-item prop="sex" label="性别:" label-width="50px">
    <af-radio-group v-model="afFormValid.sex">
      <af-radio-button label="1">男</af-radio-button>
      <af-radio-button label="2">女</af-radio-button>
    </af-radio-group>
  </af-form-item>
  <af-form-item prop="password">
    <af-input placeholder="请输入" v-model="afFormValid.password" type="password">
      <span slot="prepend">设置密码:</span>
    </af-input>
  </af-form-item>
  <af-form-item prop="confirmPpassword">
    <af-input placeholder="请输入" v-model="afFormValid.confirmPpassword" type="password">
      <span slot="prepend">确认密码:</span>
    </af-input>
  </af-form-item>
  <af-form-item prop="position">
    <af-select v-model="afFormValid.position" placeholder="请选择职务" clearable >
      <af-option
        v-for="item in positionOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </af-option>
    </af-select>
  </af-form-item>
  <af-form-item prop="busType" label="业务类型:" label-width="73px">
    <af-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</af-checkbox>
    <af-checkbox-group v-model="afFormValid.busType" @change="handleCheckedBusTypeChange">
      <af-checkbox v-for="(type, index) in busTypeOptions" :label="type" :key="index">{{type}}</af-checkbox>
    </af-checkbox-group>
  </af-form-item>
  <af-form-item prop="date">
    <af-date-picker
      v-model="afFormValid.date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      label="日期:">
    </af-date-picker>
  </af-form-item>
  <af-form-item prop="remark">
    <af-input type="textarea" placeholder="请输入内容" v-model="afFormValid.remark" restrict total-count="100">
    </af-input>
  </af-form-item>
  <af-form-item>
    <af-button type="primary" @click="onSubmitValid('afFormValid')">提交</af-button>
    <af-button>取消</af-button>
  </af-form-item>
</af-form>
<script>
  export default {
    data() {
      return {
        afFormValid:{
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
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
          date: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmitValid(form){
        this.$refs[form].validate((valid) => {
          if(valid){
            console.log('提交表单')
          }
        })
      },
      handleCheckAllChange(val) {
        this.afForm.busType = val ? this.busTypeOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedBusTypeChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.busTypeOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.busTypeOptions.length;
      }
    }
  }
</script>
```
:::

:::tip
需要校验的表单项是【label】属性类型时，需要设置【label-width】，确保校验提示信息对齐展示:
<br>
原有ElementUI表单的【label-width】是在el-form标签中统一配置，在AUI中有无【label】属性的表单项，所以【label-width】不在af-form标签中统一配置，对于无【label】属性的表单项需要校验时，校验提示信息是统一右对齐；在有【label】属性时，需要配置在af-form-item标签中配置【label-width】属性，校验提示信息对齐位置是距离左边【label-width】位置。
:::

:::tip
需要注意的是选择框（select）是无【label】类型，在进行校验时，由于select有自定的【width】属性，需要手动设置af-form-item标签的内联样式【style】的【width】属性等于select自定的【width】属性值，否则校验提示信息会右侧顶头对齐。
:::

### 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证，及areatext输入文字的规范校验。

:::demo 本例还使用`status-icon`属性为输入框添加了表示校验结果的反馈图标。
```html
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
  <af-form-item>
    <af-button type="primary" @click="onSubmitSelfValid('afFormSelfValid')">提交</af-button>
    <af-button>取消</af-button>
  </af-form-item>
</af-form>
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
        afFormValid:{
          userName: '',
          name: '',
          sex: '1',
          password: '',
          confirmPpassword: '',
          position: '',
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
```
:::

:::tip
自定表单校验可以在data中定义校验规则函数，并添加到rules配置中。
:::

### Form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| model   | 表单数据对象 | object      |                  —                |  — |
| rules    | 表单验证规则 | object | — | — |
| inline    | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width` | string |  right/left/top            | right |
| label-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| hide-required-asterisk | 是否显示必填字段的标签旁边的红色星号 | boolean | — | false |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon  | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证 | boolean | — | true |
| size  | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |

### Form Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数:是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))
| validateField | 对部分表单字段进行校验的方法 | Function(prop: string, callback: Function(errorMessage: string))
| resetFields | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性组成的数组，如不传则移除整个表单的校验结果 | Function(props: array)

### Form Events
| 事件名称 | 说明    | 回调参数  |
|--------- |-------- |---------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### Form-Item Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 以行内形式展示校验信息 | boolean | — | false |
| size  | 用于控制该表单域下组件的尺寸 | string | medium / small / mini | - |

### Form-Item Slot
| name | 说明 |
|------|--------|
| — | Form Item 的内容 |
| label | 标签文本的内容 |

### Form-Item Scoped Slot
|  name  |   说明  |
|--------|--------|
|  error | 自定义表单校验信息的显示方式，参数为 { error } |

### Form-Item Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -
| clearValidate | 移除该表单项的校验结果 | -
