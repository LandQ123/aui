/* eslint-disable no-unused-vars*/

import Component from './components.js';
import Table from './table.js';
import AfButton from 'aui/packages/button';
import Pagination from './pagination.js';
import debounce from 'throttle-debounce/debounce';
import { addResizeListener, removeResizeListener } from 'aui/src/utils/resize-event';

/*
TODO:
1.默认值 √
2.双向绑定 √
3.事件 √
4.setFieldValue函数 √
5.兼容旧版本的配置项
6.表单验证
7.组件实例方法 methods
8.固定高度 √
*/
console.log(Table);
// const REGION_MAP = {}

const Type = obj => {
  return Object.prototype.toString.call(obj).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase();
};

const SET_DEFAULT_VALUE = field => {
  if (Type(field.value) === 'array') return [];
  return '';
};

export default {
  name: 'AfTableQuery',
  components: {
    AfButton
  },
  data() {
    return {
      optionQueryShow: false
    };
  },
  props: {
    fieldList: {
      type: Array,
      default() {
        return [];
      }
    },
    optionalFieldList: {
      type: Array,
      default() {
        return [];
      }
    },
    tableAttrs: {
      type: Object,
      default() {
        return {};
      }
    },
    tableEvents: {
      type: Object,
      default() {
        return {};
      }
    },
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableCloumns: {
      type: Array,
      default() {
        return [];
      }
    },
    pagination: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    // 判断是否有更多查询
    hasOptionQuery() {
      return this.fieldList.filter(item => item.region && item.region === 'option').length > 0;
    }
  },
  created() {
    this.debouncedUpdateLayout = debounce(60, () => this.calculateHeight());
  },
  mounted() {
    this.$nextTick(() => this.calculateHeight());
    this.initEvents();
  },
  destroyed() {
    window.removeEventListener('optimizedResize', this.calculateHeight);
  },
  methods: {
    initEvents() {

      // 自定义resize事件
      ; (function() {
        var throttle = function(type, name, obj) {
          obj = obj || window;
          var running = false;
          var func = function() {
            if (running) { return; }
            running = true;
            window.requestAnimationFrame(function() {
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
            });
          };
          obj.addEventListener(type, func);
        };
        throttle('resize', 'optimizedResize');
      })();

      // 监听resize事件
      window.addEventListener('optimizedResize', this.calculateHeight);

    },
    // 计算表格高度
    calculateHeight() {
      const ClientHeight = document.documentElement.clientHeight;
      const FooterHeight = this.$refs.footer.offsetHeight || 0;
      const MainHeight = this.$refs.main.offsetHeight || 0;
      const MoreHeight = this.$refs.more && this.$refs.more.offsetHeight || 0;
      const OffsetTop = this.$el.getBoundingClientRect().top;

      let bodyHeight = ClientHeight - OffsetTop - FooterHeight - MainHeight - MoreHeight - 8;
      this.$set(this.tableAttrs, 'height', bodyHeight);

    },
    onQueryMore() {
      this.optionQueryShow = !this.optionQueryShow;
      this.$nextTick(() => this.calculateHeight());
    },
    onReset() {
      // alert('reset');
      this.fieldList.map(item => (item.value = SET_DEFAULT_VALUE(item)));
    },
    onchange(val) {
      console.log(val);
    },
    onfocus(e) {
      console.log(e);
    },
    oninput(e) {
      console.log(e);
    },
    /* -------------------------------------------  对外暴露的函数  ------------------------------------------- */
    /**
     * 获取field组件实例
     * @param {String} key field定义的key
     */
    getFieldComponentInstance(key) {
      console.log(this);
      return this.$children.filter(comp => comp && comp.key === key)[0];
    },
    setValueByPath(obj, keyPath, val) {
      for (let i = 0, path = keyPath.split('.'), len = path.length; i < len; i++) {
        if (i === len - 1) {
          obj[path[i]] = val;
          break;
        }
        obj = obj[path[i]] || {};
      }
    },
    // eg. 'select1.value' = 'option1'
    /**
     * 设置field的配置
     * @param {String} key field定义的key
     * @param {any} key value
     * eg. 'select1.value' = 'option1'
     *  this.$refs.xxx.setVal('input-1.attrs.placeholder','请输入')
     *  this.$refs.xxx.setVal('input-1.events.input',this.activeItemChange)
     *
     *  this.$refs.xxx.setVal('select-1.options',createOptionsData())
     *  this.$refs.xxx.setVal('select-2.optionsGroup',createOptionsGroupData())
     */
    setVal(keyPath, val) {
      const keys = keyPath.split('.');
      if (keys.length < 2) {
        console.error(('[AUI ERROR]: ' + 'keyPath格式错误,路径格式为a.b.c.d且a为key,最短路径为a.b'));
        return;
      }
      for (let index = 0; index < this.fieldList.length; index++) {
        let key = this.fieldList[index].key;
        if (key === keys[0] && keys.length === 2) {
          this.fieldList[index][keys[1]] = val;
          break;
        } else if (key === keys[0]) {
          this.setValueByPath(this.fieldList[index], keys.splice(1).join('.'), val);
          break;
        }
      }
    }
  },
  render(h) {
    const { fieldList, optionQueryShow, tableEvents, tableAttrs, tableData, tableCloumns, pagination } = this;
    const genField = (_fileList, _region) => {

      return (
        this._l(fieldList, field => {
          const _fieldRegion = field.region || 'main';
          if (_fieldRegion === _region && field.xType === 'br') return <br />;
          return _fieldRegion === _region && (
            <div
              class={[
                'af-table-query__field',
                field.align ? field.align : ''
              ]}
            >
              <Component fieldKey={field.key} field={field} />
            </div>
          );
        })
      );
    };
    const TemplateMain = (
      <section ref="main" class="af-table-query__main">
        {genField(fieldList, 'main')}
        {
          this.hasOptionQuery && <af-button size="mini" type="text" style="margin-left: 10px;" class="af-table-query__arrow" onClick={this.onQueryMore}>
            <span>{optionQueryShow ? '收起' : '更多'}</span>
            <i class={['af-icon-caret-top', optionQueryShow ? 'open' : 'close']}></i>
          </af-button>
        }
      </section>
    );
    const TemplateMore = (
      <section ref="more" style={{ display: optionQueryShow ? 'block' : 'none' }} class="af-table-query__more">
        {genField(fieldList, 'option')}
        {
          <af-button size="mini" type="text" style="margin-left: 10px;" class="af-table-query__reset" onClick={this.onReset}>
            <span>重置</span>
          </af-button>
        }
      </section>
    );

    const renderTable = () => {
      return (
        <section ref="tablebody">
          <Table ref="xtable"
            tableEvents={tableEvents}
            tableAttrs={tableAttrs}
            tableData={tableData}
            tableCloumns={tableCloumns}
          >
          </Table>
        </section>
      );
    };

    const renderPagination = () => {
      return (
        <section ref="footer" class="af-table-query__footer">
          <Pagination pagination={pagination}></Pagination>
        </section>
      );
    };

    return (
      <div class="af-table-query">
        {TemplateMain}
        {this.hasOptionQuery && TemplateMore}
        {renderTable()}
        {renderPagination()}
      </div>
    );
  }
};
