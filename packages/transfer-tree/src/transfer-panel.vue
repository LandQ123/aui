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
            :data="data"
            default-expand-all
            :expand-on-click-node="false"
            :node-key="key"
            ref="tree"
            :filter-node-method="filterNode"
            @node-click="addToRight"
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
  import Locale from 'aui/src/mixins/locale';
  import { generateId } from 'aui/src/utils/util';
  export default {
    mixins: [Locale],

    name: 'AfTransferPanel',

    componentName: 'AfTransferPanel',

    components: {
      AfInput,
      AfButton
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
      dataMap: Object,
      leafMap: Object,
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
      disabledMove() {
        if (this.panel === 'leftPanel') {
          // All leafs are selected, return true.
          if (this.$parent.dataLeaf.length === this.$parent.value.length) return true;
          if (this.query.length === 0) return false;
          let hasMatch = false;
          const traverse = function(data) {
            for (let item of data) {
              if (!item.visible) continue;
              if (hasMatch) break;
              if (item.childNodes && item.childNodes.length) {
                traverse.call(this, item.childNodes);
              } else {
                if (this.leafMap[item.data[this.key]] && item.visible) {
                  hasMatch = true;
                }
              }
            }
          };
          traverse.call(this, this.tree.root.childNodes);
          return !hasMatch;
        } else {
          return this.filteredData.length === 0;
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
        if (this.panel === 'leftPanel') {
          let moveList = [];
          this.data.forEach(item => {
            let list = this.addToRight(item, null, null, false);
            moveList = moveList.concat(list);
          });
          this.$emit('move', moveList);
        } else {
          this.filteredData.forEach(item => this.addToLeft(item, false));
          this.$emit('move', this.filteredData);
        }
      },

      /**
       * Move the node to left panel.
       *
       * @param {Object} item the data of the node.
       */
      addToLeft(item, finish = true) {
        let child = item;
        let {parent, previousSiblings} = item;
        let tree = this.tree;
        let siblingsNodes = tree.store.nodesMap[parent[this.key]] &&
          tree.store.nodesMap[parent[this.key]].childNodes ||
          tree.store.root;
        if (siblingsNodes.length === 0) {
          tree.append(child, parent);
        } else if (previousSiblings.length === 0) {
          tree.insertBefore(child, siblingsNodes[0]);
        } else {
          const baseFindIndex = (array, predicate, fromRight) => {
            const {length} = array;
            let index = fromRight ? length : -1;
            while (fromRight ? index-- : ++index < length) {
              if (predicate(array[index], index, array)) return index;
            }
            return -1;
          };
          const predicate = (cur, index, array) => typeof tree.store.nodesMap[cur[this.key]] === 'object';
          let index = baseFindIndex(previousSiblings, predicate, true);
          if (!~index) {
            tree.insertBefore(child, siblingsNodes[0]);
          } else {
            tree.insertAfter(child, previousSiblings[index]);
          }
        }
        if (finish) this.$emit('move', [item]);
      },

      /**
       * Move the node to right panel.
       *
       * @param {Object} data the data of the node.
       * @param {Object} Node the Node of the node.
       * @param {Object} instance the node instance.
       */
      addToRight(data, Node, instance, finish = true) {
        let moveList = [];
        const traverse = function(data) {
          let mapData = this.dataMap[data[this.key]];
          if (mapData.isLeaf && this.tree.store.nodesMap[data[this.key]].visible) {
            moveList.push(data);
          } else {
            let children = data[this.childrenProp] || [];
            if (children.length === 0) return '';
            children.forEach(child => {
              traverse.call(this, child);
            });
          }
        };
        traverse.call(this, data);
        if (moveList.length === 0) return [];
        moveList.forEach(item => this.tree.remove(item));
        if (finish) this.$emit('move', moveList);
        return moveList;
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
          return data.label.indexOf(value) !== -1;
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
