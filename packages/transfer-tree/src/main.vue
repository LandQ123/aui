<template>
  <div class="af-transfer">
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      panel="leftPanel"
      :data="sourceData"
      :buttonText="buttonTexts[0]"
      :title="titles[0] || t('el.transfer.titles.0')"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      :dataMap="dataMap"
      :leafMap="leafMap"
      :tree="tree"
      @move="addToRight">
    </transfer-panel>
    <div class="af-transfer__link">
      <i class="af-icon-transfer"></i>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      panel="rightPanel"
      :data="targetData"
      :buttonText="buttonTexts[1]"
      :title="titles[1] || t('el.transfer.titles.1')"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      :dataMap="dataMap"
      :leafMap="leafMap"
      :tree="tree"
      @move="addToLeft">
    </transfer-panel>
  </div>
</template>

<script>
  import AfButton from 'aui/packages/button';
  import Emitter from 'aui/src/mixins/emitter';
  import Locale from 'aui/src/mixins/locale';
  import TransferPanel from './transfer-panel.vue';
  import Migrating from 'aui/src/mixins/migrating';

  export default {
    name: 'AfTransferTree',
    inheritAttrs: false,
    mixins: [Emitter, Locale, Migrating],
    components: {
      TransferPanel,
      AfButton
    },
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      titles: {
        type: Array,
        default() {
          return [];
        }
      },
      buttonTexts: {
        type: Array,
        default() {
          return ['全选', '清空'];
        }
      },
      filterPlaceholder: {
        type: String,
        default: ''
      },
      filterMethod: Function,
      filterNodeMethod: Function,
      renderContent: Function,
      value: {
        type: Array,
        default() {
          return [];
        }
      },
      defaultValue: String,
      format: {
        type: Object,
        default() {
          return {};
        }
      },
      filterable: Boolean,
      props: {
        type: Object,
        default() {
          return {
            label: 'label',
            children: 'children'
          };
        }
      },
      nodeKey: {
        type: String,
        default: 'id'
      },
      targetOrder: {
        type: String,
        default: 'original'
      }
    },

    data() {
      return {
        rightChecked: [],
        tree: '',
        dataLeaf: [],
        leafMap: {}
      };
    },

    computed: {
      /**
       * Get the map of data.
       *
       * @return {Object} map The map of data.
       */
      dataMap() {
        let map = {};
        const transToMap = (data, prop, child, parent) => {
          data = data || [];
          data.forEach((cur, index, array) => {
            cur = Object.assign({}, cur);
            cur.parent = parent;
            if (cur[child] && cur[child].length) {
              cur.isLeaf = false;
              transToMap(cur[child].slice(), prop, child, cur);
            } else {
              cur.isLeaf = true;
              cur.previousSiblings = array.slice(0, index);
              this.dataLeaf.push(cur);
              this.leafMap[cur[prop]] = cur;
            }
            map[cur[prop]] = cur;
          });
        };
        transToMap(this.data, this.nodeKey, this.props.children, {[this.nodeKey]: 'root'});
        return map;
      },
      /**
       * Get source data.
       *
       * @return {Object} data The data that has deleted defaultVlue.
       */
      sourceData() {
        let data = JSON.parse(JSON.stringify(this.data));
        let defaultArr = this.formatValue(this.defaultValue);
        if (defaultArr.length === 0) return data;
        const traverse = (data, prop, child) => {
          let deleteList = [];
          for (let [index, item] of data.entries()) {
            if (defaultArr.length === 0) break;
            if (item[child] && item[child].length) {
              traverse(item[child], prop, child);
            } else {
              let loc = defaultArr.indexOf(item[this.nodeKey]);
              if (loc !== -1) {
                defaultArr.splice(loc, 1);
                deleteList.push(index);
              }
            }
          }
          while (deleteList.length) {
            let index = deleteList.pop();
            data.splice(index, 1);
          }
        };
        traverse(data, this.nodeKey, this.props.children);
        return data;
      },
      targetData() {
        return this.targetOrder === 'original'
          ? this.dataLeaf.filter(item => this.value.indexOf(item[this.nodeKey]) > -1)
          : this.value.map(key => this.leafMap[key]);
      },
      preValue() {
        return this.value.slice();
      },
      hasButtonTexts() {
        return this.buttonTexts.length === 2;
      }
    },

    watch: {
      value(val) {
        this.dispatch('AfFormItem', 'el.form.change', val);
      },
      defaultValue: {
        handler: function(val, oldVal) {
          if (val !== oldVal) {
            this.$emit('input', this.formatValue(val));
          }
        },
        immediate: true
      }
    },

    mounted() {
      const children = this.$children;
      for (let child of children) {
        if (child.$refs.tree) {
          this.tree = child.$refs.tree;
          break;
        }
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'footer-format': 'footer-format is renamed to format.'
          }
        };
      },

      /**
       * Handle the move event, update the result of value.
       *
       * @param {Array} moveList the list be moved.
       */
      addToLeft(moveList) {
        let currentValue = this.value.slice();
        let itemsToBeMoved = [];
        const key = this.nodeKey;
        itemsToBeMoved = moveList.map(item => item[key]);
        itemsToBeMoved.forEach(item => {
          const index = currentValue.indexOf(item);
          if (index > -1) {
            currentValue.splice(index, 1);
          }
        });
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'left', itemsToBeMoved);
      },

      /**
       * Handle the move event, update the result of value.
       *
       * @param {Array} moveList the list be moved.
       */
      addToRight(moveList) {
        let currentValue = this.value.slice();
        let itemsToBeMoved = [];
        const key = this.nodeKey;
        itemsToBeMoved = moveList.filter(item => this.value.indexOf(item[key]) === -1).map(item => item[key]);
        currentValue = this.targetOrder === 'unshift'
          ? itemsToBeMoved.concat(currentValue)
          : currentValue.concat(itemsToBeMoved);
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'right', itemsToBeMoved);
      },

      /**
       * Clear the query.
       *
       * @param {String} which the panel to clear.
       */
      clearQuery(which) {
        if (which === 'left') {
          this.$refs.leftPanel.query = '';
        } else if (which === 'right') {
          this.$refs.rightPanel.query = '';
        }
      },

      /**
       * Format defaultValue.
       * Firstly, filter the item that is't a leaf.
       * Secondly, get the real id, the item may not be the same type with id.
       *
       * @param {String} val The value of binding.
       * @return {Array} result The formatting result.
       */
      formatValue(val = '') {
        let result = [];
        let arr = val.replace(/\s+/g, '').split(',');
        for (let item of arr) {
          if (this.dataMap[item] && this.dataMap[item].isLeaf) {
            result.push(this.dataMap[item][this.nodeKey]);
          }
        }
        return result;
      }
    }
  };
</script>
