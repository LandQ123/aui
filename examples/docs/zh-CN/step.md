<script>
  export default {
    data() {
      return {
        currentStep: 1,
        steps: [
          '1、步骤一',
          '2、步骤二',
          '3、步骤三'
        ]
      };
    },

    methods: {
      next() {
        if (this.currentStep++ > 2) this.currentStep = 1;
      }
    }
  }
</script>

## Step 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法

简单的步骤条。

:::demo 设置`current-step`属性，接受一个`Number`，表明步骤的 index，从 1 开始。设置`steps`属性， 接受一个`Array`, 字符串数组, 设置步骤名称。
```html
<af-step :current-step="currentStep" :steps="steps"></af-step>

<af-button style="margin-top: 12px;" @click="next">下一步</af-button>

<script>
  export default {
    data() {
      return {
        currentStep: 1,
        steps: [
          '1、步骤一',
          '2、步骤二',
          '3、步骤三'
        ]
      };
    },

    methods: {
      next() {
        if (this.currentStep++ > 2) this.currentStep = 1;
      }
    }
  }
</script>
```
:::

### Step Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| steps | 设置每个步骤的名称 | Array | - | ['step1', 'step2'] |
| current-step | 设置当前激活步骤  | number | — | 1 |
