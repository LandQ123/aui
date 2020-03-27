/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
// TODO: 用HOC重构
import AfSelectBase from 'aui/packages/select';
import AfOptionBase from 'aui/packages/option';
import AfOptionGoupBase from 'aui/packages/option-group';
import AfInputBase from 'aui/packages/input';
import AfTimeSelect from 'aui/packages/time-select';
import AfTimePicker from 'aui/packages/time-picker';
import AfDatePicker from 'aui/packages/date-picker';
import AfCascader from 'aui/packages/cascader';
import AfButton from 'aui/packages/button';
import AfCheckbox from 'aui/packages/checkbox';
// import AfRadio from 'aui/packages/radio';
import AfInputNumber from 'aui/packages/input-number';
import AfDivider from 'aui/packages/divider';

const mixins = {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};

const _on = self => {
  return {
    input(val) {
      self.field.value = val;
      self.$emit('input', val);
    }
  };
};

const genProps = (self, attrs, events) => {
  return {
    props: attrs,
    on: Object.assign({}, events, _on(self))
  };
};

// 包装一层组件
const componentsAA = {
  'x-select': {
    mixins: [mixins],
    render(h, context) {

      const self = this;
      const renderProxy = self._renderProxy;
      const {attrs = {}, events = {}, slots = {}, options, optionsGroup} = self.field;

      const Props = genProps(self, attrs, events);
      // 渲染option组件
      const renderOptions = data => {
        return self._l(data, option => {
          return (
            <AfOptionBase
              key={option.value}
              label={option.label}
              value={option.value}
              disabled={option.disabled}
            >
              {option.slot && option.slot.call(renderProxy, h, option)}
            </AfOptionBase>
          );
        });
      };
      // 渲染option-group组件
      const renderOptionGroup = data => {
        return self._l(data, item => {
          return (
            <AfOptionGoupBase
              label={item.label}
              disabled={item.disabled}
            >
              { renderOptions(item.options) }
            </AfOptionGoupBase>
          );
        });
      };
      return (
        <AfSelectBase value={self.field.value} {...Props}>
          {
            slots.option
              ? slots.option.call(renderProxy, h)
              : slots.optionGroup
                ? slots.optionGroup.call(renderProxy, h)
                : optionsGroup
                  ? renderOptionGroup(optionsGroup)
                  : renderOptions(options)
          }
          {slots.prefix && <template slot='prefix'>{slots.prefix.call(renderProxy, h)}</template>}
        </AfSelectBase>
      );
    }
  },

  'x-input': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const renderProxy = self._renderProxy;
      const {attrs = {}, events = {}, slots = {}} = self.field;

      const Props = genProps(self, attrs, events);
      return (
        <AfInputBase value={self.field.value} placeholder={attrs.placeholder} {...Props}>
          {slots.prepend && <template slot='prepend'>{slots.prepend.call(renderProxy, h)}</template>}
          {slots.append && <template slot='append'>{slots.append.call(renderProxy, h)}</template>}
          {slots.prefix && <template slot='prefix'>{slots.prefix.call(renderProxy, h)}</template>}
          {slots.suffix && <template slot='suffix'>{slots.suffix.call(renderProxy, h)}</template>}
        </AfInputBase>
      );
    }
  },

  'x-time-select': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const {attrs = {}, events = {}} = self.field;
      const Props = genProps(self, attrs, events);
      return (<AfTimeSelect value={self.field.value} {...Props}></AfTimeSelect>);
    }
  },

  'x-time-picker': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const {attrs = {}, events = {}} = self.field;
      const Props = genProps(self, attrs, events);
      return (<AfTimePicker value={self.field.value} {...Props}></AfTimePicker>);
    }
  },

  'x-date-picker': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const {attrs = {}, events = {}} = self.field;
      const Props = genProps(self, attrs, events);
      return (<AfDatePicker value={self.field.value} {...Props}></AfDatePicker>);
    }
  },

  'x-cascader': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const {attrs = {}, events = {}, options} = self.field;
      const Props = genProps(self, attrs, events);
      return (<AfCascader value={self.field.value} options={options} {...Props}></AfCascader>);
    }
  },

  'x-button': {
    mixins: [mixins],
    render(h) {
      const self = this;

      const renderProxy = self._renderProxy;
      const {attrs = {}, events = {}, slots = {}, text = ''} = self.field;

      let Props = {
        props: attrs,
        on: Object.assign({}, events)
      };

      return (
        <AfButton {...Props}>
          {
            slots.default
              ? slots.default.call(renderProxy, h)
              : text
          }
        </AfButton>
      );
    }
  },

  'x-checkbox': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const renderProxy = self._renderProxy;
      const {attrs = {}, events = {}, slots = {}, text = ''} = self.field;
      const Props = genProps(self, attrs, events);
      return (<AfCheckbox value={self.field.value} {...Props}>
        {/* 默认节点考虑直接用text字段写render函数 */}
        {
          slots.default
            ? slots.default.call(renderProxy, h)
            : text
        }
      </AfCheckbox>);
    }
  },

  'x-input-number': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const {attrs = {}, events = {}} = self.field;
      const Props = genProps(self, attrs, events);
      return (<AfInputNumber value={self.field.value} {...Props}></AfInputNumber>);
    }
  },

  'x-divider': {
    mixins: [mixins],
    render(h) {
      const self = this;
      const renderProxy = self._renderProxy;
      const {attrs = {}, events = {}, slots = {}, text = ''} = self.field;
      const Props = {
        props: attrs,
        on: Object.assign({}, events)
      };
      return (
        <AfDivider {...Props}>
          {/* 默认节点考虑直接用text字段写render函数 */}
          {
            slots.default
              ? slots.default.call(renderProxy, h)
              : text
          }
        </AfDivider>
      );
    }
  }

};

export default {
  name: 'x-component',
  components: componentsAA,
  props: {
    field: Object,
    fieldKey: String
  },
  render(h) {
    const {events = {}} = this.field;
    const TMAP = {
      'x-input': <x-input onInput={events['input'] || (val => this.$emit('input', val))} field={this.field} />,
      'x-select': <x-select field={this.field} />,
      'x-time-select': <x-time-select field={this.field} />,
      'x-time-picker': <x-time-picker field={this.field} />,
      'x-date-picker': <x-date-picker field={this.field} />,
      'x-cascader': <x-cascader field={this.field} />,
      'x-button': <x-button field={this.field} />,
      'x-checkbox': <x-checkbox field={this.field} />,
      'x-input-number': <x-input-number field={this.field} />,
      'x-divider': <x-divider field={this.field} />
    };
    return TMAP[this.field.xType || 'x-input'];
  }
};
