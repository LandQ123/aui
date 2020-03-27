<template>
  <button
    class="af-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'af-button--' + type : '',
      buttonSize ? 'af-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading
      }
    ]"
  >
    <i class="af-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <!-- <span>这个标签当且仅当<af-button>中有内容时才存在，内容放在slot插槽中，用$slots.default来判断是否有子元素存在 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'AfButton',
    // 获取父级组件 provide 传递下来的数据    https://cn.vuejs.org/v2/api/#provide-inject
    inject: {
      afForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      // 类型 primary / 默认 / danger / danger-i / warning / warning-i /text
      type: {
        type: String,
        default: 'default'
      },
      // 尺寸 big / small / icon
      size: String,
      // 图标类名
      icon: {
        type: String,
        default: ''
      },
      // 原生type属性 button / submit / reset
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean, // 是否加载中状态
      disabled: Boolean, // 是否禁用状态
      // plain: Boolean, // 是否朴素按钮
      autofocus: Boolean // 是否默认聚焦
      // round: Boolean // 是否圆角按钮
      // circle: Boolean // 是否圆形按钮
    },

    computed: {
      // elFormItem 尺寸获取
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      // 按钮尺寸计算，大小样式由props接收的size和formItem组件注入的size以及全局配置对象（$AUI，此对象由引入时Vue.use()传入的默认空对象）的size决定
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$AUI || {}).size;
      },
      // props接收disabled以及form组件注入的disabled决定（loading时也禁止↑）
      buttonDisabled() {
        return this.disabled || (this.afForm || {}).disabled;
      }
    },

    methods: {
      // 点击事件，使得组件的点击事件为 @click，与原生点击保持一致
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
