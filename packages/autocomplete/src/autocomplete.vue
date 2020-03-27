<template>
  <div
    class="af-autocomplete"
    v-clickoutside="close"
    aria-haspopup="listbox"
    role="combobox"
    :aria-expanded="suggestionVisible"
    :aria-owns="id"
  >
    <af-input
      ref="input"
      v-bind="[$props, $attrs]"
      @input="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.up.native.prevent="highlight(highlightedIndex - 1)"
      @keydown.down.native.prevent="highlight(highlightedIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      @keydown.native.tab="close"
    >
      <template slot="prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <template slot="append" v-if="$slots.append">
        <slot name="append"></slot>
      </template>
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix" v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </af-input>
    <af-autocomplete-suggestions
      visible-arrow
      :class="[popperClass ? popperClass : '']"
      :popper-options="popperOptions"
      :append-to-body="popperAppendToBody"
      ref="suggestions"
      :placement="placement"
      :id="id">
      <div v-if="group">
        <div v-for="(g, gIndex) in groupAttrs" :key="gIndex">
          <div v-if="g.count">
            <div class="group-title">{{g.name}}</div>
            <li
              v-for="(item, index) in suggestions"
              :key="index"
              :class="{'highlighted': highlightedIndex === index}"
              @click="select(item)"
              :id="`${id}-item-${index}`"
              role="option"
              :aria-selected="highlightedIndex === index"
            >
              <slot :item="item" v-if="g.type === item.type">
                {{ item[valueKey] }}
              </slot>
            </li>
          </div>
        </div>
      </div>
      <li
        v-else
        v-for="(item, index) in suggestions"
        :key="index"
        :class="{'highlighted': highlightedIndex === index}"
        @click="select(item)"
        :id="`${id}-item-${index}`"
        role="option"
        :aria-selected="highlightedIndex === index"
      >
        <slot :item="item">
          {{ item[valueKey] }}
        </slot>
      </li>
    </af-autocomplete-suggestions>
  </div>
</template>
<script>
  import debounce from 'throttle-debounce/debounce';
  import AfInput from 'aui/packages/input';
  import Clickoutside from 'aui/src/utils/clickoutside';
  import AfAutocompleteSuggestions from './autocomplete-suggestions.vue';
  import Emitter from 'aui/src/mixins/emitter';
  import Migrating from 'aui/src/mixins/migrating';
  import { generateId } from 'aui/src/utils/util';
  import Focus from 'aui/src/mixins/focus';

  export default {
    name: 'AfAutocomplete',

    mixins: [Emitter, Focus('input'), Migrating],

    inheritAttrs: false,

    componentName: 'AfAutocomplete',

    components: {
      AfInput,
      AfAutocompleteSuggestions
    },

    directives: { Clickoutside },

    props: {
      valueKey: {
        type: String,
        default: 'value'
      },
      popperClass: String,
      popperOptions: Object,
      placeholder: String,
      disabled: Boolean,
      name: String,
      size: String,
      value: String,
      maxlength: Number,
      minlength: Number,
      autofocus: Boolean,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String,
      selectWhenUnmatched: {
        type: Boolean,
        default: false
      },
      prefixIcon: String,
      suffixIcon: String,
      label: String,
      debounce: {
        type: Number,
        default: 300
      },
      placement: {
        type: String,
        default: 'bottom-start'
      },
      hideLoading: Boolean,
      popperAppendToBody: {
        type: Boolean,
        default: true
      },
      group: {
        type: Boolean,
        default: false
      },
      groupAttrs: Array
    },
    data() {
      return {
        activated: false,
        suggestions: [],
        loading: false,
        highlightedIndex: -1,
        suggestionDisabled: false
      };
    },
    computed: {
      suggestionVisible() {
        const suggestions = this.suggestions;
        if (this.group && this.groupAttrs && this.groupAttrs.length) {
          this.groupAttrs.map(ele => {
            ele.count = 0;
            this.suggestions.map(ob => {
              if (ele.type === ob.type) {
                ele.count += 1;
              }
            });
          });
        }
        let isValidData = Array.isArray(suggestions) && suggestions.length > 0;
        return (isValidData || this.loading) && this.activated;
      },
      id() {
        return `af-autocomplete-${generateId()}`;
      }
    },
    watch: {
      suggestionVisible(val) {
        this.broadcast('AfAutocompleteSuggestions', 'visible', [val, this.$refs.input.$refs.input.offsetWidth]);
      }
    },
    methods: {
      getMigratingConfig() {
        return {
          props: {
            'custom-item': 'custom-item is removed, use scoped slot instead.',
            'props': 'props is removed, use value-key instead.'
          }
        };
      },
      getData(queryString) {
        if (this.suggestionDisabled) {
          return;
        }
        this.loading = true;
        this.fetchSuggestions(queryString, (suggestions) => {
          this.loading = false;
          if (this.suggestionDisabled) {
            return;
          }
          if (Array.isArray(suggestions)) {
            this.suggestions = suggestions;
          } else {
            console.error('[AUI Error][Autocomplete]autocomplete suggestions must be an array');
          }
        });
      },
      handleChange(value) {
        this.$emit('input', value);
        this.suggestionDisabled = false;
        if (!this.triggerOnFocus && !value) {
          this.suggestionDisabled = true;
          this.suggestions = [];
          return;
        }
        this.debouncedGetData(value);
      },
      handleFocus(event) {
        this.activated = true;
        this.$emit('focus', event);
        if (this.triggerOnFocus) {
          this.debouncedGetData(this.value);
        }
      },
      handleBlur(event) {
        this.$emit('blur', event);
      },
      close(e) {
        this.activated = false;
      },
      handleKeyEnter(e) {
        if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
          e.preventDefault();
          this.select(this.suggestions[this.highlightedIndex]);
        } else if (this.selectWhenUnmatched) {
          this.$emit('select', {value: this.value});
          this.$nextTick(_ => {
            this.suggestions = [];
            this.highlightedIndex = -1;
          });
        }
      },
      select(item) {
        this.$emit('input', item[this.valueKey]);
        this.$emit('select', item);
        this.$nextTick(_ => {
          this.suggestions = [];
          this.highlightedIndex = -1;
        });
      },
      highlight(index) {
        if (!this.suggestionVisible || this.loading) { return; }
        if (index < 0) {
          this.highlightedIndex = -1;
          return;
        }
        if (index >= this.suggestions.length) {
          index = this.suggestions.length - 1;
        }
        const suggestion = this.$refs.suggestions.$el.querySelector('.af-autocomplete-suggestion__wrap');
        const suggestionList = suggestion.querySelectorAll('.af-autocomplete-suggestion__list li');

        let highlightItem = suggestionList[index];
        let scrollTop = suggestion.scrollTop;
        let offsetTop = highlightItem.offsetTop;

        if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
          suggestion.scrollTop += highlightItem.scrollHeight;
        }
        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight;
        }
        this.highlightedIndex = index;
        this.$el.querySelector('.af-input__inner').setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
      }
    },
    mounted() {
      this.debouncedGetData = debounce(this.debounce, this.getData);
      this.$on('item-click', item => {
        this.select(item);
      });
      let $input = this.$el.querySelector('.af-input__inner');
      $input.setAttribute('role', 'textbox');
      $input.setAttribute('aria-autocomplete', 'list');
      $input.setAttribute('aria-controls', 'id');
      $input.setAttribute('aria-activedescendant', `${this.id}-item-${this.highlightedIndex}`);
    },
    beforeDestroy() {
      this.$refs.suggestions.$destroy();
    }
  };
</script>
<style lang="scss" scoped>
  .group-title{
    margin-left: 5px;
    color: #4183d7;
    margin-bottom: 5px;
  }
  .af-autocomplete-suggestion li {
    padding: 0 15px;
  }
</style>

