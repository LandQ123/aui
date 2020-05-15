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
      :leafMap="leafMap"
      :dataLeaf="dataLeaf"
      :tree="tree"
      @move="handleMove">
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
      :leafMap="leafMap"
      :dataLeaf="dataLeaf"
      :tree="tree"
      @move="handleMove">
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
        let dataLeaf = [];
        let leafMap = {};
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
              dataLeaf.push(cur);
              leafMap[cur[prop]] = cur;
            }
            map[cur[prop]] = cur;
          });
        };
        transToMap(this.data, this.nodeKey, this.props.children, {[this.nodeKey]: 'root'});
        this.dataLeaf = dataLeaf;
        this.leafMap = leafMap;
        return map;
      },
      sourceData() {
        let data = this.data;
        let defaultArr = this.defaultValueArr;
        this.$nextTick(() => {
          let node = '';
          this.dataLeaf.forEach(key => {
            node = this.tree.store.getNode(key);
            node.setChecked(false, false);
          });
          defaultArr.forEach(key => {
            node = this.tree.store.getNode(key);
            node.setChecked(true, false);
          });
        });
        return data;
      },
      targetData() {
        return this.targetOrder === 'original'
          ? this.dataLeaf.filter(item => this.value.indexOf(item[this.nodeKey]) > -1)
          : this.value.map(key => this.leafMap[key]);
      },
      defaultValueArr() {
        let str = this.defaultValue || '';
        let result = [];
        let arr = str.replace(/\s+/g, '').split(',');
        for (let item of arr) {
          let node = this.dataMap[item];
          if (node && node.isLeaf) {
            result.push(node[this.nodeKey]);
          }
        }
        this.$emit('input', result);
        return result;
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
       * @param {String} direction the direction of movement.
       */
      handleMove(moveList, direction) {
        let currentValue = this.value.slice();
        let itemsToBeMoved = [];
        const key = this.nodeKey;

        if (direction === 'right') {
          itemsToBeMoved = moveList.filter(item => this.value.indexOf(item[key]) === -1).map(item => item[key]);
          currentValue = this.targetOrder === 'unshift'
            ? itemsToBeMoved.concat(currentValue)
            : currentValue.concat(itemsToBeMoved);
          this.$emit('input', currentValue);
          this.$emit('change', currentValue, 'right', itemsToBeMoved);
        } else {
          itemsToBeMoved = moveList.map(item => item[key]);
          itemsToBeMoved.forEach(item => {
            const index = currentValue.indexOf(item);
            if (index > -1) {
              currentValue.splice(index, 1);
            }
          });
          this.$emit('input', currentValue);
          this.$emit('change', currentValue, 'left', itemsToBeMoved);
        }
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
      }
    }
  };
</script>
