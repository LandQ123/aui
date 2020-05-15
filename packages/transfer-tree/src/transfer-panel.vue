<template>
  <div :id="panelId" class="af-transfer-panel">
    <div :class="['af-transfer-panel__header', filterable && 'is-with-filter', isScroll && 'is-panel-scroll']">
      <p class="af-transfer-panel__title">
        {{title}}
        <af-button size="small" class="af-transfer-panel__button" :disabled="disabledMove" @click="addAll">{{ buttonText }}</af-button>
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
      <div
        v-if="panel === 'leftPanel'"
        v-show="!hasNoMatch && data.length > 0"
        class="af-transfer-panel__list">
        <af-scrollbar
          wrap-class="af-transfer-panel__wrap"
          view-class="af-transfer-panel__view">
          <af-tree
            ref="tree"
            :data="data"
            @check="handleCheck"
            default-expand-all
            show-checkbox
            check-on-click-node
            :expand-on-click-node="false"
            :node-key="key"
            :filter-node-method="filterNode"
            :props="props">
          </af-tree>
        </af-scrollbar>
      </div>
      <ul
        v-else
        v-show="!hasNoMatch && data.length > 0"
        class="af-transfer-panel__list">
        <af-scrollbar
          wrap-class="af-transfer-panel__wrap"
          view-class="af-transfer-panel__view">
          <li
            class="af-transfer-panel__item"
            :key="item[key]"
            v-for="item in filteredData">
            <af-button type="text" class="af-transfer-panel__button"
              :disabled="item[disabledProp]"
              @click="addToLeft(item)">
              <span>{{item[labelProp]}}</span>
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
  import AfTree from 'aui/packages/tree';
  import AfScrollbar from 'aui/packages/scrollbar';
  import Locale from 'aui/src/mixins/locale';
  import { generateId } from 'aui/src/utils/util';
  export default {
    mixins: [Locale],
    name: 'AfTransferPanel',
    componentName: 'AfTransferPanel',
    components: {
      AfInput,
      AfButton,
      AfTree,
      AfScrollbar
    },

    props: {
      panel: String,
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
      filterNodeMethod: Function,
      props: Object,
      nodeKey: String,
      leafMap: Object,
      dataLeaf: Array,
      tree: ''
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
      filteredData() {
        return this.data.filter(item => {
          if (typeof this.filterMethod === 'function') {
            return this.filterMethod(this.query, item);
          } else {
            const label = item[this.labelProp] || item[this.key].toString();
            return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }
        });
      },
      moveableData() {
        return this.filteredData.filter(item => !item[this.disabledProp]);
      },
      disabledMove() {
        if (this.panel === 'leftPanel') {
          // All leafs are selected, return true.
          if (this.dataLeaf.length === this.$attrs.value.length || !this.tree.root) return true;
          let hasMatch = false;
          const traverse = function(data) {
            for (let item of data) {
              if (!item.visible) continue;
              if (hasMatch) break;
              if (item.childNodes && item.childNodes.length) {
                traverse.call(this, item.childNodes);
              } else {
                let data = this.leafMap[item.data[this.key]];
                if (data && !data[this.disabledProp] && !item.checked && item.visible) {
                  hasMatch = true;
                }
              }
            }
          };
          traverse.call(this, this.tree.root.childNodes);
          return !hasMatch;
        } else {
          return this.moveableData.length === 0;
        }
      },
      checkedSummary() {
        let dataLength = this.data.length;
        if (this.panel === 'leftPanel') {
          // Total minus the length of value
          dataLength = this.$parent.dataLeaf.length - this.$parent.value.length;
        }
        const total = this.format.total;
        if (total) {
          return total.replace(/\${total}/g, dataLength);
        } else {
          return `共${dataLength}个`;
        }
      },
      hasNoMatch() {
        if (this.panel === 'leftPanel') {
          return this.query.length > 0 && this.tree.isEmpty;
        } else {
          return this.query.length > 0 && this.filteredData.length === 0;
        }
      },
      inputIcon() {
        return this.query.length > 0 && this.inputHover
          ? 'circle-close'
          : 'search';
      },
      labelProp() {
        return this.props.label;
      },
      childrenProp() {
        return this.props.children;
      },
      key() {
        return this.nodeKey;
      },
      disabledProp() {
        return this.props.disabled || 'disabled';
      }
    },

    watch: {
      query(val) {
        if (this.panel === 'leftPanel') {
          this.tree.filter(val);
        }
      }
    },

    mounted() {
      this.scrollPanel = document.querySelector(`#${this.panelId} .af-transfer-panel__wrap`);
      this.scrollPanel && this.scrollPanel.addEventListener('scroll', this.scrollHandler);
    },

    beforeDestroy() {
      this.removeScrollHandler();
    },

    methods: {
      /**
       * Move the all nodes to another panel.
       *
       * @param {Array} value the data of the node.
       */
      addAll(value) {
        let moveList = [];
        if (this.panel === 'leftPanel') {
          // 当前右边的数据
          let currentValue = this.$attrs.value;
          let currentMap = currentValue.reduce((o, cur) => (o[cur] = true) && o, {});

          // 移动的数据
          Object.keys(this.leafMap).forEach(key => {
            let data = this.leafMap[key];
            let node = this.tree.store.getNode(data);
            if (!currentMap[key] && !data[this.disabledProp] && node.visible) {
              node.setChecked(true, false);
              moveList.push(data);
            }
          });
          this.$emit('move', moveList, 'right');
        } else {
          moveList = this.moveableData;
          moveList.forEach(item => this.addToLeft(item, false));
          this.$emit('move', moveList, 'left');
        }
      },

      /**
       * 移到左边，即左边对应的节点去勾选，右边要去除该节点
       *
       * @param {Object} item 移动的选项数据
       * @param {Boolean} isEmit 是否 emit move 事件
       */
      addToLeft(item, isEmit = true) {
        let node = this.tree.store.getNode(item);
        node.setChecked(false, false);
        if (isEmit) this.$emit('move', [item], 'left');
      },

      /**
       * 移到右边，即左边对应的节点勾选，右边加上该节点
       *
       * @param {Object} item 移动的选项数据
       * @param {Boolean} isEmit 是否 emit move 事件
       */
      addToRight(item, isEmit = true) {
        if (isEmit) this.$emit('move', [item], 'right');
      },

      /**
       * 当复选框被点击的时候触发
       *
       * @param {Object} data 传递给 data 属性的数组中该节点所对应的对象
       * @param {Object} checkInfo 树目前的选中状态对象
       */
      handleCheck(data, checkInfo) {
        console.log('handle-check');
        let node = this.tree.store.getNode(data);
        let { checked, isLeaf } = node;
        if (isLeaf) {
          checked ? this.addToRight(data) : this.addToLeft(data);
        } else {
          // 当前右边的数据
          let currentValue = this.$attrs.value;
          let currentMap = currentValue.reduce((o, cur) => (o[cur] = true) && o, {});

          // 从选中的节点中找出叶子节点
          let checkedLeafValue = checkInfo.checkedKeys.filter(key => this.leafMap[key]);
          let checkedLeafMap = checkedLeafValue.reduce((o, cur) => (o[cur] = true) && o, {});

          // 选中的叶子节点和右边数据的差集
          let isDelete = currentValue.length > checkedLeafValue.length;
          let difference = isDelete
            ? currentValue.filter(key => !this.leafMap[key][this.disabledProp] && !checkedLeafMap[key])
            : checkedLeafValue.filter(key => !currentMap[key]);
          let moveList = difference.map(key => this.leafMap[key]);
          if (!isDelete) {
            this.$emit('move', moveList, 'right');
          } else {
            this.$emit('move', moveList, 'left');
          }
        }
      },

      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      },
      filterNode(value, data, node) {
        if (typeof this.filterNodeMethod === 'function') {
          return this.filterNodeMethod(value, data, node);
        } else {
          if (!value) return true;
          return data[this.labelProp].indexOf(value) !== -1;
        }
      },
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
      removeScrollHandler() {
        this.scrollPanel && this.scrollPanel.removeEventListener('scroll', this.scrollHandler);
      }
    }
  };
</script>
