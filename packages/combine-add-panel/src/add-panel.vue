<template>
  <div class="af-combine-panel__wrapper author-landq">
    <div class="af-combine-panel__input">
      <div class="af-combine-panel__select-wrapper">
        <af-select
          class="af-combine-panel__select"
          ref="select"
          :disabled="disabled"
          :multiple="multiple"
          :collapse-tags="multiple"
          v-model="selectValue"
          :placeholder="placeholder"
          :label="selectLable"
          clearable
          reserve-keyword
          :filterable="filterable"
          :remote="remote"
          :remote-method="remoteMethod"
          :loading="loading"
          :loading-text="loadingText"
          @change="selectChange"
          @visible-change="selectVisibleChange"
          @remove-tag="selectRemoveTag"
          @blur="selectBlurEvent"
          @focus="selectFocusEvent"
          @clear="selectClear"
          popper-class="af-combine-panel__select-dropdown"
        >
          <template v-if="group">
            <af-option-group v-for="group in selectOptions" :key="group.label" :label="group.label">
              <af-option
                v-for="item in group.options"
                :key="item[aliasKey]"
                :label="item[aliasLabel]"
                :value="item[aliasKey]"
                :disabled="item.disabled"
              ></af-option>
            </af-option-group>
          </template>
          <template v-else>
            <af-option
              v-for="item in selectOptions"
              :key="item[aliasKey]"
              :label="item[aliasLabel]"
              :value="item[aliasKey]"
              :disabled="item.disabled"
            ></af-option>
          </template>
        </af-select>
      </div>
      <div class="af-combine-panel__input-wrapper">
        <af-autocomplete
          ref="autocomplete"
          v-if="autocomplete"
          v-model="inputValue"
          clearable
          :disabled="disabled"
          :debounce="autocompleteDebounce"
          :fetch-suggestions="fetchSuggestions"
          :trigger-on-focus="triggerOnFocus"
          :value-key="autocompleteAliasKey"
          @select="autocompleteSelect"
        >
          <template slot="prepend">
            <slot name="inputLabel"></slot>
          </template>
        </af-autocomplete>
        <af-input
          ref="input"
          v-else
          v-model="inputValue"
          clearable
          :disabled="disabled"
          @blur="inputBlurEvent"
          @focus="inputFocusEvent"
          @change="inputChange"
          @clear="inputClear"
        >
          <template slot="prepend">
            <slot name="inputLabel"></slot>
          </template>
        </af-input>
      </div>
      <af-button
        :disabled="!disabledAdd || disabled"
        size="icon"
        @click.stop="addItem"
      >
        <span v-if="addName">{{ addName }}</span>
        <i v-else class="af-icon-plus"></i>
      </af-button>
      <af-button :disabled="disabled" class="af-combine-panel__clear" @click.stop="clearAll">重置</af-button>
    </div>
    <div
      class="af-combine-panel__container"
      :style="{ height:containerHeight > 81 ? containerHeight + 'px':'81px' }"
      v-if="value.length"
    >
      <af-scrollbar>
        <div class="af-combine-panel__item-wrapper flex">
          <span v-for="(item, index) in useDataList" :key="index" class="af-combine-panel__value-item mr-10">
            <af-popover
              v-if="item.selectLabel.length > 15"
              placement="top-start"
              width="180"
              trigger="hover"
              :content="item.selectLabel"
            >
              <span slot="reference" class="af-combine-panel__item-label">
                {{ item.selectLabel }}
              </span>
            </af-popover>
            <span
              v-if="item.selectLabel.length <=15"
              class="af-combine-panel__item-label"
            >
              {{ item.selectLabel }}
            </span>
            <span v-if="splitStr">
              {{ splitStr }}
            </span>
            <span v-else>&emsp;</span>
            <af-popover
              v-if="item.inpValue.length > 15"
              placement="top-start"
              width="180"
              trigger="hover"
              :content="item.inpValue"
            >
              <span slot="reference" class="af-combine-panel__item-label">
                {{ item.inpValue }}
              </span>
            </af-popover>
            <span
              v-if="item.inpValue.length <= 15"
              class="af-combine-panel__item-inpval"
            >
              {{ item.inpValue }}
            </span>
            <i
              class="af-icon-close"
              v-if="!disabled"
              @click.stop="deleteItem(index)"
            ></i>
          </span>
        </div>
      </af-scrollbar>
    </div>
  </div>
</template>
<script>
import AfSelect from 'aui/packages/select';
import AfOption from 'aui/packages/option';
import AfInput from 'aui/packages/input';
import AfAutocomplete from 'aui/packages/autocomplete';
import AfButton from 'aui/packages/button';
import AfScrollbar from 'aui/packages/scrollbar';
import AfPopover from 'aui/packages/popover';
import Message from 'aui/packages/message';
import { find, findIndex, uniqBy } from 'lodash';
export default {
  name: 'AfCombineAddPanel',
  componentName: 'AfCombineAddPanel',
  components: {
    AfSelect,
    AfOption,
    AfInput,
    AfAutocomplete,
    AfButton,
    AfScrollbar,
    AfPopover,
    Message
  },
  props: {
    group: Boolean, // 下拉框是否为group类型
    filterable: Boolean, // 是否支持过滤
    autoClear: {
      // 是否添加成功后自动清除下拉框和输入框
      type: Boolean,
      default: true
    },
    remote: Boolean, // 下拉框是否支持远程搜索
    loading: Boolean, // 下拉框加载loading，远程搜索时用
    loadingText: String, // 下拉框加载文字，远程搜索时用
    disabled: Boolean, // 是否禁用
    autocomplete: Boolean, // 是否带输入建议
    // 待输入建议回调
    fetchSuggestions: Function,
    // 远程搜索callback函数
    remoteMethod: Function,

    triggerOnFocus: Boolean, // 是否输入带出建议
    // 是否支持多选
    multiple: Boolean,
    selectOptions: {
      // 下拉框选项
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      // 面板绑定值
      type: Array,
      default() {
        return [];
      }
    },
    // 下拉框键的别名
    aliasKey: {
      type: String,
      default: 'value'
    },
    // 下拉框值的别名
    aliasLabel: {
      type: String,
      default: 'label'
    },
    // 输入框值的键名
    autocompleteAliasKey: {
      type: String,
      default: 'value'
    },
    // 添加按钮描述，默认为加号icon
    addName: {
      type: String,
      default: ''
    },
    // 自动输入建议防抖延时
    autocompleteDebounce: {
      type: Number,
      default: 300
    },
    // 下拉框placeholder
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 前置内容标签
    selectLable: {
      type: String,
      default: ''
    },
    // 分隔符号，默认空格
    splitStr: {
      type: String,
      default: ''
    },
    // 容器高度，默认81px，最小81px
    containerHeight: {
      type: [Number],
      default: 0
    },
    // 重复添加时提醒文字
    repeatMessage: {
      type: String,
      default: '请勿重复添加数据！'
    }
  },
  data() {
    return {
      selectValue: '',
      inputValue: '',
      useDataList: [],
      useVlue: []
    };
  },
  computed: {
    disabledAdd() {
      return !!(this.selectValue && this.inputValue);
    },
    // 拍平下拉数据
    selectListFlatten() {
      let options = [];
      if (this.group) {
        this.selectOptions.forEach(item => {
          options.push(...item.options);
        });
      } else {
        options = this.selectOptions;
      }
      return options;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!val.length) return;
        let selectOptions = this.selectListFlatten;
        let dataList = [];
        val = uniqBy(val, 'selectKeys');
        val.forEach(item => {
          // 数组对象类型设置
          let label = '';
          let flag = false;
          let keysArr = [];
          if (typeof item === 'object') {
            if (item.selectKeys) {
              keysArr = item.selectKeys.split(',');
            } else {
              console.error(
                '[af-combine-add-panel]：Value must have field of "selectKeys"!'
              );
            }
          } else {
            console.error(
              '[af-combine-add-panel]：Value must be an "array object"!'
            );
          }
          // console.log(keysArr)
          if (keysArr.length) {
            keysArr.forEach((key, index) => {
              let selectItem = find(
                selectOptions,
                o => o[this.aliasKey] === key
              );
              if (selectItem) {
                label +=
                  index === keysArr.length - 1
                    ? selectItem[this.aliasLabel]
                    : `${selectItem[this.aliasLabel]}、`;
                flag = true;
              } else {
                label = label.substr(0, label.length - 1);
              }
            });
            if (item.inpValue && flag) {
              dataList.push({
                selectLabel: label,
                selectVal: keysArr.join(),
                inpValue:
                  typeof item === 'string' ? item.split(' ')[1] : item.inpValue
              });
            } else if (!item.inpValue) {
              console.error(
                '[af-combine-add-panel]：Value must have field of "inpValue"!'
              );
            }
          }
        });
        this.useDataList = dataList;
      }
    }
  },
  mounted() {
    // console.log(this.group);
  },
  methods: {
    addItem() {
      let label = '';
      for (let i = 0; i < this.selectListFlatten.length; i++) {
        const element = this.selectListFlatten[i];
        if (this.multiple) {
          // 多选
          const key = element[this.aliasKey];
          const valIndex = findIndex(this.selectValue, o => o === key);
          if (valIndex > -1) {
            label +=
              valIndex === this.selectValue.length - 1
                ? element[this.aliasLabel]
                : `${element[this.aliasLabel]}、`;
          }
        } else {
          if (element[this.aliasKey] === this.selectValue) {
            label = element[this.aliasLabel];
          }
        }
      }
      let item = {
        selectLabel: label,
        selectVal: this.multiple ? this.selectValue.join() : this.selectValue,
        inpValue: this.inputValue
      };
      let existence = this.existence(this.useDataList, item);
      // console.log(existence);
      if (existence) {
        this.$message.warning(this.repeatMessage);
        return;
      }
      // 派发添加单条数据事件
      this.$emit('add-data', item);
      this.useDataList.push(item);
      this.emitInput(this.useDataList);
    },
    existence(useDataList, item) {
      let flag = false;
      for (let i = 0; i < useDataList.length; i++) {
        const element = useDataList[i];
        if (
          element.selectVal === item.selectVal &&
          element.inpValue === item.inpValue
        ) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    emitInput(useDataList) {
      let emitData = [];
      if (useDataList.length) {
        useDataList.forEach(item => {
          emitData.push({
            selectKeys: item.selectVal,
            inpValue: item.inpValue
          });
        });
      }
      this.handleAutoClear();
      // 同步value
      this.$emit('input', emitData);
    },
    handleAutoClear() {
      if (this.autoClear) {
        this.selectValue = '';
        this.inputValue = '';
      }
    },
    deleteItem(index) {
      this.$emit('delete-data', this.useDataList.splice(index, 1)[0]);
      this.useDataList.splice(index, 1);
      this.emitInput(this.useDataList);
    },
    clearAll() {
      this.useDataList = [];
      this.selectValue = '';
      this.inputValue = '';
      this.emitInput(this.useDataList);
    },
    // input event
    inputBlurEvent(e) {
      this.$emit('input-blur', e);
    },
    inputFocusEvent(e) {
      this.$emit('input-focus', e);
    },
    inputChange(val) {
      this.$emit('input-change', val);
    },
    inputClear() {
      this.$emit('input-clear');
    },
    autocompleteSelect(val) {
      this.$emit('autocomplete-select', val);
    },
    // input method
    inputFocus() {
      this.$refs.input && this.$refs.input.focus();
      this.$refs.autocomplete && this.$refs.autocomplete.focus();
    },
    inputBlur() {
      this.$refs.input.blur();
    },
    inputSelect() {
      this.$refs.input.select();
    },
    // slecet methods
    selectChange(val) {
      this.$emit('select-change', val);
    },
    selectVisibleChange(val) {
      this.$emit('select-visible-change', val);
    },
    selectRemoveTag(removeTag) {
      this.$emit('select-remove-tag', removeTag);
    },
    selectBlurEvent(e) {
      this.$emit('select-blur', e);
    },
    selectFocusEvent(e) {
      this.$emit('select-focus', e);
    },
    selectClear() {
      this.$emit('select-clear');
    },
    selectFocus() {
      this.$refs.select.focus();
    },
    selectBlur() {
      this.$refs.select.blur();
    }
  }
};
</script>
