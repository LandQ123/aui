<template>
  <!-- 内部被分为input结构 与 textarea结构 -->
  <div :class="[
    type === 'textarea' ? 'af-textarea' : 'af-input',
    inputSize ? 'af-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'af-input-group': $slots.prepend || $slots.append,
      'af-input-group--append': $slots.append,
      'af-input-group--prepend': $slots.prepend,
      'af-input--prefix': $slots.prefix || prefixIcon,
      'af-input--suffix': $slots.suffix || suffixIcon || clearable
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
  <!-- 动态class具名插槽
      $slots.prepend: 前置插槽
      $slots.append: 后置插槽
      $slots.prefix： 前置icon插槽
      $slots.suffix： 后置icon插槽
    不使用插槽的icon
      prefixIcon: 前置icon
      suffixIcon: 后置icon
      clearable： 后置是否清空-->
    <!-- 输入框结构 -->
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="af-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="af-input__inner"
        v-bind="$attrs"
        :type="type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        :value="currentValue"
        ref="input"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <!-- <span class="af-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="af-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span> -->
      <!-- 后置内容 -->
      <span
        class="af-input__suffix"
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
        <span class="af-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="af-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <!-- 清空按钮 -->
          <i v-else
            class="af-input__icon af-icon-error af-input__clear"
            @click="clear"
          ></i>
        </span>
        <i class="af-input__icon"
          v-if="validateState"
          :class="['af-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="af-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="af-textarea__inner"
      :value="currentValue"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
      :maxlength="totalCount"
    >
    </textarea>
    <div v-if="type === 'textarea' && restrict" class="af-textarea__restrict">
      <span>{{ remainCount }}/{{ totalCount }}</span>
    </div>
  </div>
</template>

<script>
  // $attrs: 获取到子组件props没有注册的,除了style和class以外所有父组件的属性。（感觉好强!）
  // tabindex: 原生属性, 元素的 tab 键控制次序(具体的自行查阅)
  // readonly ：原生属性，只读。（true时input框不可修改）
  // autoComplete：原生属性 当用户在字段开始键入时，浏览器基于之前键入过的值，是否显示出在字段中填写的选项。
  // aria-label：原生属性，tab到输入框时，读屏软件就会读出相应label里的文本。

  // 实例属性$slots用来访问被插槽分发的内容
  // vm.$slots.foo 访问具名插槽foo
  // vm.$slots.default 没有被包含在具名插槽中的节点
  import emitter from 'aui/src/mixins/emitter';
  import Migrating from 'aui/src/mixins/migrating';
  import calcTextareaHeight from './calcTextareaHeight';
  import merge from 'aui/src/utils/merge';
  import { isKorean } from 'aui/src/utils/shared'; // 判断韩文的方法

  export default {
    name: 'AfInput',

    componentName: 'AfInput',

    mixins: [emitter, Migrating],

    inheritAttrs: false,

    inject: {
      afForm: {
        default: ''
      },
      afFormItem: {
        default: ''
      }
    },

    data() {
      // 如果用户没有在<af-input>上写v-model(v-model原理参考官网),那么就没有传入value，所以currentValue就是空字符串，否则就是传入的值
      return {
        currentValue: this.value === undefined || this.value === null
          ? ''
          : this.value,
        textareaCalcStyle: {},
        hovering: false,
        focused: false,
        isOnComposition: false,
        valueBeforeComposition: null,
        remainCount: 0
      };
    },

    props: {
      value: [String, Number],
      // size: String,
      resize: String, // 是否缩放
      form: String,
      disabled: Boolean,
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: { // 自适应高度的配置
        type: [Boolean, Object],
        default: false
      },
      autocomplete: {
        type: String,
        default: 'off'
      },
      /** @Deprecated in next major version */
      autoComplete: {
        type: String,
        validator(val) {
          process.env.NODE_ENV !== 'production' &&
            console.warn('[AUI Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
          return true;
        }
      },
      // 时间选择器会传入false其他默认true （意思大概true是需要做校验）
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      tabindex: String,
      restrict: {
        type: Boolean,
        default: false
      },
      totalCount: [String, Number]
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      // 表单验证相关
      validateState() {
        // 控制表单验证时icon的样式（红*之类的）
        return this.elFormItem ? this.elFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.afForm ? this.afForm.statusIcon : false;
      },
      // 表单验证样式
      validateIcon() {
        return {
          validating: 'af-icon-loading',
          success: 'af-icon-circle-check',
          error: 'af-icon-circle-close'
        }[this.validateState];
      },
      // merge 从src/utils/merge.js引入 合并对象的方法
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._elFormItemSize || (this.$AUI || {}).size;
      },
      // 判断如果input被包含在表单内，如果表单禁用，那么自然自己也就被禁用了。输入框样式上的禁用是由最外层的div的class控制的
      inputDisabled() {
        return this.disabled || (this.afForm || {}).disabled;
      },
      // 看用户是否添加了显示清空按钮的属性，如果没有则不显示，如果有则继续判断，在非禁用且非只读状态下才且当前input的value不是空且该input获得焦点或者鼠标移动上去才显示
      showClear() {
        return this.clearable &&
          !this.disabled &&
          !this.readonly &&
          this.currentValue !== '' &&
          (this.focused || this.hovering);
      }
    },

    watch: {
      value(val, oldValue) {
        this.setCurrentValue(val);
      }
    },

    methods: {
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      },
      blur() {
        (this.$refs.input || this.$refs.textarea).blur();
      },
      // 迭代api友好提示 方便由于用了移除的api报错 找出问题在哪
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.focused = false;
        // 暴露blur事件
        this.$emit('blur', event);
        if (this.validateEvent) {
          // 向上找到ElFormItem组件发布el.form.blur事件并传值
          this.dispatch('AfFormItem', 'el.form.blur', [this.currentValue]);
        }
      },
      select() {
        (this.$refs.input || this.$refs.textarea).select();
      },
      resizeTextarea() {
        // 是否服务器渲染
        if (this.$isServer) return;
        const { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      // 识别到你开始使用中文输入法或者语音输入时触发compositionstart 事件
      // 未输入结束但还在输入中触发compositionupdate 事件
      // 输入完成（也就是我们回车或者选择了对应的文字插入到输入框的时刻）触发compositionend事件
      // 为了解决中文输入法输入内容时还没将中文插入到输入框就验证的问题，我们希望中文输入完成以后才验证，所以使用这几个事件
      // 触发compositionstart时，文本框会填入 “虚拟文本”（待确认文本），同时触发input事件；在触发compositionend时，就是填入实际内容后（已确认文本）,所以这里如果不想触发input事件的话就得设置一个bool变量来控制
      // 首先在data中定义了一个bool变量isOnComposition,这个变量就是用来判断是否在打拼音的过程中，初始为false，当开始打拼音后，触发compositionstart事件，更新isOnComposition,通过this.isOnComposition = !isKorean(lastCharacter)来更新，这里的逻辑是判断输入的字符的最后一个是不是韩文，韩文通过正则表达式来判断，至于为啥要判断韩文的最后一个字符，不清楚~ 如果是中文，则isOnComposition为true，这里比较难理解的是后面这个if，当正在打拼音的过程中且是compositionstart事件时，则用一个valueBeforeComposition变量保存当前的文本，也就是保存此次打字前input中的文本内容，这个valueBeforeComposition的作用后面介绍，接下来看if (event.type === 'compositionend')中的内容，当打完拼音后，触发compositionend,此时设置isOnComposition为false表明打字完成，然后注意这里会手动触发一个this.handleInput(event)(handleInput就是input上绑定的v-on:input)，这是因为最后输入完成时，compositionend会在input事件后触发，此时isOnComposition还是true，无法触发下面handleInput中的emit将新的input的value传递给父组件，所以这里需要手动调用一次handleInput，这里请仔细理解!
      handleComposition(event) {
        // 完成输入时
        if (event.type === 'compositionend') {
          // 输入中标识为false
          this.isOnComposition = false;
          // 中文或语音输入前的值赋值给当前
          this.currentValue = this.valueBeforeComposition;
          // 清空之前的值
          this.valueBeforeComposition = null;
          // 赋值并且向父组件暴露input方法
          this.handleInput(event);
        } else { // 未完成时
          const text = event.target.value;
          const lastCharacter = text[text.length - 1] || '';
          // 最后一个字符不是韩文就是在输入中（不是很理解为什么要判断最后一个字符是否是韩语
          this.isOnComposition = !isKorean(lastCharacter);
          // 输入开始前
          if (this.isOnComposition && event.type === 'compositionstart') {
            this.valueBeforeComposition = text;
          }
        }
      },
      // 输入到input框触发input事件
      handleInput(event) {
        const value = event.target.value;
        this.setCurrentValue(value);
        if (this.restrict === true) {
          this.getRemainCount(value);
        }
        if (this.isOnComposition) return; // handleInput中当isOnComposition为true时表明正在打拼音输入，则不触发emit事件
        this.$emit('input', value);
      },
      getRemainCount(val) {
        if (this.totalCount) {
          let len = val.length;
          this.remainCount = len;
        }
      },
      // 失去焦点后内容有改变触发change事件
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      setCurrentValue(value) {
        // 还在输入并且内容与之前内容相同 return
        if (this.isOnComposition && value === this.valueBeforeComposition) return;
        // input内容赋值
        this.currentValue = value;
        // 还在输入return
        if (this.isOnComposition) return;
        this.$nextTick(this.resizeTextarea);
        // 除了时间选择器其他组件中使用默认为true
        if (this.validateEvent && this.currentValue === this.value) {
          // mixin中的方法 意思是向上找到ElFormItem组件发布el.form.change事件并传递当前input内容
          this.dispatch('AfFormItem', 'el.form.change', [value]);
        }
      },
      calcIconOffset(place) {
        let elList = [].slice.call(this.$el.querySelectorAll(`.af-input__${place}`) || []);
        if (!elList.length) return;
        let el = null;
        for (let i = 0; i < elList.length; i++) {
          if (elList[i].parentNode === this.$el) {
            el = elList[i];
            break;
          }
        }
        if (!el) return;
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        };

        const pendant = pendantMap[place];
        if (this.$slots[pendant]) {
          el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.af-input-group__${pendant}`).offsetWidth}px)`;
        } else {
          el.removeAttribute('style');
        }
      },
      updateIconOffset() {
        this.calcIconOffset('prefix');
        this.calcIconOffset('suffix');
      },
      clear() {
        this.$emit('input', ''); // emit是通知父组件自己的value值变成了空，从而更新<af-input v-model="v">中的v这个data为空
        this.$emit('change', ''); // emit触发了父组件的change事件，这样在<af-input v-model="v" @change="inputChange">中的inputChange中就能监听到该事件
        this.$emit('clear'); // 触发父组件的@clear方法，让父组件知道自己已经清空了
        this.setCurrentValue(''); // 更新自己的currentValue为空
        this.focus(); // 让input获得焦点便于输入内容
      }
    },

    created() {
      // 与select组件相关联 (若select组件已发布inputSelect事件则触发选中)
      this.$on('inputSelect', this.select);
    },

    mounted() {
      // 动态文本域（高度）
      this.resizeTextarea();
      // 前置后置元素偏移（样式）
      this.updateIconOffset();
    },

    updated() {
      // 视图重绘完毕后 前置后置偏移（样式）
      this.$nextTick(this.updateIconOffset);
    }
  };
</script>
