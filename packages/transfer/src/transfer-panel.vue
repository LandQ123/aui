<template>
  <div :id="panelId" class="af-transfer-panel">
    <div :class="['af-transfer-panel__header', filterable && 'is-with-filter', isScroll && 'is-panel-scroll']">
      <p class="af-transfer-panel__title">
        {{title}}
        <af-button size="small" class="af-transfer-panel__button" :disabled="moveableData.length === 0" @click="addAllToAnother">{{ buttonText }}</af-button>
      </p>
      <af-input
        class="af-transfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable">
        <i slot="suffix"
          :class="['af-input__icon', 'af-icon-' + inputIcon]"
          @click="clearQuery"
        ></i>
      </af-input>
    </div>
    <div :class="['af-transfer-panel__body', 'is-with-footer', filterable && 'is-with-filter']">
      <ul
        v-show="!hasNoMatch && data.length > 0"
        class="af-transfer-panel__list">
        <af-scrollbar
          wrap-class="af-transfer-panel__wrap"
          view-class="af-transfer-panel__view">
          <li
            class="af-transfer-panel__item"
            :key="item[keyProp]"
            v-for="item in filteredData">
            <af-button type="text" class="af-transfer-panel__button"
              :disabled="item[disabledProp]"
              @click="addToAnother(item)">
              <!-- {{item[labelProp]}} -->
              <option-content :option="item"></option-content>
            </af-button>
          </li>
        </af-scrollbar>
      </ul>
      <p
        class="af-transfer-panel__empty"
        v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="af-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
    </div>
    <div class="af-transfer-panel__footer">
      <span>{{ checkedSummary }}</span>
    </div>
  </div>
</template>

<script>
  import AfInput from 'aui/packages/input';
  import AfButton from 'aui/packages/button';
  import Locale from 'aui/src/mixins/locale';
  import { generateId } from 'aui/src/utils/util';
  export default {
    mixins: [Locale],
    name: 'AfTransferPanel',
    componentName: 'AfTransferPanel',
    components: {
      AfInput,
      AfButton,
      OptionContent: {
        props: {
          option: Object
        },
        // 数据项的渲染函数
        render(h) {
          const getParent = vm => {
            if (vm.$options.componentName === 'AfTransferPanel') {
              return vm;
            } else if (vm.$parent) {
              return getParent(vm.$parent);
            } else {
              return vm;
            }
          };
          const panel = getParent(this);
          const transfer = panel.$parent || panel;
          return panel.renderContent
            ? panel.renderContent(h, this.option)
            : transfer.$scopedSlots.default
              ? transfer.$scopedSlots.default({ option: this.option })
              : <span>{ this.option[panel.labelProp] || this.option[panel.keyProp] }</span>;
        }
      }
    },

    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      renderContent: Function,
      placeholder: String,
      title: String,
      buttonText: '',
      filterable: Boolean,
      format: Object,
      filterMethod: Function,
      props: Object
    },

    data() {
      return {
        query: '',
        inputHover: false,
        isScroll: false,
        timeoutId: '',
        scrollPanel: ''
      };
    },

    computed: {
      panelId() {
        return `af-transfer-panel-${generateId()}`;
      },
      /**
       * @description: 获取checkbook的选项数据
       * @return: 返回过滤之后的数据
       */
      filteredData() {
        // 如果自定义了过滤的方法则通过自定义的方法过滤
        // 否则通过indexOf来过滤
        return this.data.filter(item => {
          if (typeof this.filterMethod === 'function') {
            return this.filterMethod(this.query, item);
          } else {
            const label = item[this.labelProp] || item[this.keyProp].toString();
            return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }
        });
      },

      /**
       * @description: 获取可以移动的数据
       * @return: 包含可移动数据的一个数组
       */
      moveableData() {
        return this.filteredData.filter(item => !item[this.disabledProp]);
      },

      /**
       * @description: 已选择的数量
       * @return: 统计的结果
       */
      checkedSummary() {
        let dataLength = this.data.length;
        const total = this.format.total;
        if (total) {
          return total.replace(/\${total}/g, dataLength);
        } else {
          return `共${dataLength}个`;
        }
      },

      /**
       * @description: 没有匹配的数据
       * @return: {Boolean} 是否搜索匹配到数据
       */
      hasNoMatch() {
        return this.query.length > 0 && this.filteredData.length === 0;
      },

      /**
       * @description: 搜索框prefix icon的class
       * @return: className 类名
       */
      inputIcon() {
        return this.query.length > 0 && this.inputHover
          ? 'circle-close'
          : 'search';
      },

      /**
       * @description: 数据源label字段名称
       * @return: label字段名称
       */
      labelProp() {
        return this.props.label || 'label';
      },

      /**
       * @description: 数据源key字段名称
       * @return: key字段名称
       */
      keyProp() {
        return this.props.key || 'key';
      },

      /**
       * @description: 数据源disabled字段名称
       * @return: disabled字段名称
       */
      disabledProp() {
        return this.props.disabled || 'disabled';
      }
    },

    mounted() {
      // 滚动加阴影
      this.scrollPanel = document.querySelector(`#${this.panelId} .af-transfer-panel__wrap`);
      this.scrollPanel && this.scrollPanel.addEventListener('scroll', this.scrollHandler);
    },

    beforeDestroy() {
      this.removeScrollHandler();
    },

    methods: {
      /**
       * @description: 点击全选的处理
       * @param {boolean}
       */
      addAllToAnother(value) {
        this.$emit('do-move', this.moveableData);
      },

      addToAnother(item) {
        this.$emit('do-move', [item]);
      },

      /**
       * @description: 清除搜索输入框的内容
       */
      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      },

      /**
       * @description: panel滚动事件处理
       * @param {Object} event 滚动事件对象
       */
      scrollHandler(event) {
        let target = event.target;
        let top1 = target.scrollTop;
        this.isScroll = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          let top2 = target.scrollTop;
          if (top1 === top2) {
            this.isScroll = false;
          }
        }, 500);
      },

      /**
       * @description: 清除滚动事件
       */
      removeScrollHandler() {
        this.scrollPanel && this.scrollPanel.removeEventListener('scroll', this.scrollHandler);
      }
    }
  };
</script>
