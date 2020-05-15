import Pager from './pager.vue';
import AfSelect from 'aui/packages/select';
import AfOption from 'aui/packages/option';
import AfInput from 'aui/packages/input';
import Locale from 'aui/src/mixins/locale';
import { valueEquals } from 'aui/src/utils/util';

export default {
  name: 'AfPagination',

  props: {
    pageSize: {
      type: Number,
      default: 10
    },

    small: Boolean,

    total: Number,

    pageCount: Number,

    pagerCount: {
      type: Number,
      validator(value) {
        return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
      },
      default: 7
    },

    currentPage: {
      type: Number,
      default: 1
    },

    layout: {
      type: String,
      // '->' 后的元素会靠右显示
      default: 'total, ->,sizes, start, prev, pager, next, end'
    },

    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50, 100];
      }
    },

    popperClass: String,

    prevText: String,

    nextText: String,

    startText: String,

    endText: String,

    background: Boolean,

    disabled: Boolean
  },

  data() {
    return {
      internalCurrentPage: 1,
      internalPageSize: 0,
      lastEmittedPage: -1,
      userChangePageSize: false
    };
  },

  render(h) {
    const layout = this.layout || '';
    if (!layout) return;
    const components = layout.split(',').map((item) => item.trim());

    let template = <div class={['af-pagination', {
      'is-background': this.background,
      'af-pagination--small': this.small,
      'af-pagination__isTotal': components.length === 1 && components[0] === 'total' // 只有total的时候高度为20px
    }] }></div>;

    const TEMPLATE_MAP = {
      start: <start></start>,
      prev: <prev></prev>,
      jumper: <jumper></jumper>,
      pager: <pager currentPage={ this.internalCurrentPage } pageCount={ this.internalPageCount } pagerCount={ this.pagerCount } on-change={ this.handleCurrentChange } disabled={ this.disabled }></pager>,
      next: <next></next>,
      end: <end></end>,
      sizes: <sizes pageSizes={ this.pageSizes }></sizes>,
      slot: <my-slot></my-slot>,
      total: <total></total>
    };

    const leftWrapper = <div class="af-pagination__leftwrapper"></div>;
    const rightWrapper = <div class="af-pagination__rightwrapper"></div>;
    let haveRightWrapper = false;

    template.children = template.children || [];
    leftWrapper.children = leftWrapper.children || [];
    rightWrapper.children = rightWrapper.children || [];
    components.forEach(compo => {
      if (compo === '->') {
        haveRightWrapper = true;
        return;
      }

      if (!haveRightWrapper) {
        leftWrapper.children.push(TEMPLATE_MAP[compo]);
        // template.children.push(TEMPLATE_MAP[compo]);
      } else {
        rightWrapper.children.push(TEMPLATE_MAP[compo]);
      }
    });

    template.children.push(leftWrapper);
    template.children.push(rightWrapper);
    // if (haveRightWrapper) {
    //   template.children.unshift(rightWrapper);
    // }
    console.log(template);
    return template;
  },

  components: {
    MySlot: {
      render(h) {
        return (
          this.$parent.$slots.default
            ? this.$parent.$slots.default[0]
            : ''
        );
      }
    },

    // 上一页
    Prev: {
      render(h) {
        return (
          <button
            type="button"
            class="btn-prev"
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage <= 1 }
            on-click={ this.$parent.prev }>
            {
              this.$parent.prevText
                ? <span>{ this.$parent.prevText }</span>
                : <i class="af-icon af-icon-arrow-left"></i>
            }
          </button>
        );
      }
    },

    // 下一页
    Next: {
      render(h) {
        return (
          <button
            type="button"
            class="btn-next"
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 }
            on-click={ this.$parent.next }>
            {
              this.$parent.nextText
                ? <span>{ this.$parent.nextText }</span>
                : <i class="af-icon af-icon-arrow-right"></i>
            }
          </button>
        );
      }
    },

    // 第一页
    Start: {
      render(h) {
        return (
          <button
            type="button"
            class="btn-start"
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage <= 1 }
            on-click={ this.$parent.start }>
            {
              this.$parent.startText
                ? <span>{ this.$parent.startText }</span>
                : <i class="af-icon af-icon-d-arrow-left"></i>
            }
          </button>
        );
      }
    },

    // 最后一页
    End: {
      render(h) {
        return (
          <button
            type="button"
            class="btn-end"
            disabled={ this.$parent.disabled || this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 }
            on-click={ this.$parent.end }>
            {
              this.$parent.endText
                ? <span>{ this.$parent.endText }</span>
                : <i class="af-icon af-icon-d-arrow-right"></i>
            }
          </button>
        );
      }
    },

    Sizes: {
      mixins: [Locale],

      props: {
        pageSizes: Array
      },

      watch: {
        pageSizes: {
          immediate: true,
          handler(newVal, oldVal) {
            if (valueEquals(newVal, oldVal)) return;
            if (Array.isArray(newVal)) {
              this.$parent.internalPageSize = newVal.indexOf(this.$parent.pageSize) > -1
                ? this.$parent.pageSize
                : this.pageSizes[0];
            }
          }
        }
      },

      render(h) {
        return (
          <span class="af-pagination__sizes">
            <af-select
              value={ this.$parent.internalPageSize }
              popperClass={ this.$parent.popperClass || '' }
              size="mini"
              on-input={ this.handleChange }
              disabled={ this.$parent.disabled }>
              {
                this.pageSizes.map(item =>
                  <af-option
                    value={ item }
                    label={ item + this.t('el.pagination.pagesize') }>
                  </af-option>
                )
              }
            </af-select>
          </span>
        );
      },

      components: {
        AfSelect,
        AfOption
      },

      methods: {
        handleChange(val) {
          if (val !== this.$parent.internalPageSize) {
            this.$parent.internalPageSize = val = parseInt(val, 10);
            this.$parent.userChangePageSize = true;
            this.$parent.$emit('update:pageSize', val);
            this.$parent.$emit('size-change', val);
          }
        }
      }
    },

    Jumper: {
      mixins: [Locale],

      data() {
        return {
          oldValue: null
        };
      },

      components: { AfInput },

      watch: {
        '$parent.internalPageSize'() {
          this.$nextTick(() => {
            this.$refs.input.$el.querySelector('input').value = this.$parent.internalCurrentPage;
          });
        }
      },

      methods: {
        handleFocus(event) {
          this.oldValue = event.target.value;
        },
        handleBlur({ target }) {
          this.resetValueIfNeed(target.value);
          this.reassignMaxValue(target.value);
        },
        handleKeyup({ keyCode, target }) {
          if (keyCode === 13 && this.oldValue && target.value !== this.oldValue) {
            this.handleChange(target.value);
          }
        },
        handleChange(value) {
          this.$parent.internalCurrentPage = this.$parent.getValidCurrentPage(value);
          this.$parent.emitChange();
          this.oldValue = null;
          this.resetValueIfNeed(value);
        },
        resetValueIfNeed(value) {
          const num = parseInt(value, 10);
          if (!isNaN(num)) {
            if (num < 1) {
              this.$refs.input.setCurrentValue(1);
            } else {
              this.reassignMaxValue(value);
            }
          }
        },
        reassignMaxValue(value) {
          const { internalPageCount } = this.$parent;
          if (+value > internalPageCount) {
            this.$refs.input.setCurrentValue(internalPageCount || 1);
          }
        }
      },

      render(h) {
        return (
          <span class="af-pagination__jump">
            { this.t('el.pagination.goto') }
            <af-input
              class="af-pagination__editor is-in-pagination"
              min={ 1 }
              max={ this.$parent.internalPageCount }
              value={ this.$parent.internalCurrentPage }
              domPropsValue={ this.$parent.internalCurrentPage }
              type="number"
              ref="input"
              disabled={ this.$parent.disabled }
              nativeOnKeyup={ this.handleKeyup }
              onChange={ this.handleChange }
              onFocus={ this.handleFocus }
              onBlur={ this.handleBlur }/>
            { this.t('el.pagination.pageClassifier') }
          </span>
        );
      }
    },

    Total: {
      mixins: [Locale],

      render(h) {
        return (
          typeof this.$parent.total === 'number'
            ? <span class="af-pagination__total">{ this.t('el.pagination.total', { total: this.$parent.total }) }</span>
            : ''
        );
      }
    },

    Pager
  },

  methods: {
    handleCurrentChange(val) {
      this.internalCurrentPage = this.getValidCurrentPage(val);
      this.userChangePageSize = true;
      this.emitChange();
    },

    prev() {
      if (this.disabled) return;
      const newVal = this.internalCurrentPage - 1;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit('prev-click', this.internalCurrentPage);
      this.emitChange();
    },

    next() {
      if (this.disabled) return;
      const newVal = this.internalCurrentPage + 1;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit('next-click', this.internalCurrentPage);
      this.emitChange();
    },

    // 最后一页
    end() {
      if (this.disabled) return;
      const newVal = this.internalPageCount;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit('end-click', this.internalCurrentPage);
      this.emitChange();
    },

    // 第一页
    start() {
      if (this.disabled) return;
      const newVal = 1;
      this.internalCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit('start-click', this.internalCurrentPage);
      this.emitChange();
    },

    getValidCurrentPage(value) {
      value = parseInt(value, 10);

      const havePageCount = typeof this.internalPageCount === 'number';

      let resetValue;
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    },

    emitChange() {
      this.$nextTick(() => {
        if (this.internalCurrentPage !== this.lastEmittedPage || this.userChangePageSize) {
          this.$emit('current-change', this.internalCurrentPage);
          this.lastEmittedPage = this.internalCurrentPage;
          this.userChangePageSize = false;
        }
      });
    }
  },

  computed: {
    internalPageCount() {
      if (typeof this.total === 'number') {
        return Math.ceil(this.total / this.internalPageSize);
      } else if (typeof this.pageCount === 'number') {
        return this.pageCount;
      }
      return null;
    }
  },

  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = val;
      }
    },

    pageSize: {
      immediate: true,
      handler(val) {
        this.internalPageSize = isNaN(val) ? 10 : val;
      }
    },

    internalCurrentPage: {
      immediate: true,
      handler(newVal, oldVal) {
        newVal = parseInt(newVal, 10);

        /* istanbul ignore if */
        if (isNaN(newVal)) {
          newVal = oldVal || 1;
        } else {
          newVal = this.getValidCurrentPage(newVal);
        }

        if (newVal !== undefined) {
          this.internalCurrentPage = newVal;
          if (oldVal !== newVal) {
            this.$emit('update:currentPage', newVal);
          }
        } else {
          this.$emit('update:currentPage', newVal);
        }
        this.lastEmittedPage = -1;
      }
    },

    internalPageCount(newVal) {
      /* istanbul ignore if */
      const oldPage = this.internalCurrentPage;
      if (newVal > 0 && oldPage === 0) {
        this.internalCurrentPage = 1;
      } else if (oldPage > newVal) {
        this.internalCurrentPage = newVal === 0 ? 1 : newVal;
        this.userChangePageSize && this.emitChange();
      }
      this.userChangePageSize = false;
    }
  }
};
