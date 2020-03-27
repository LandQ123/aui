<template>
<af-popover
  v-model="show"
  placement="bottom"
  width="400"
  trigger="click">
    <div class="custom-column">
      <div class="custom-column-title clearfix">
        <span class="title">列自定义</span>
        <af-button type="text" class="reset-title" @click="resetTag">默认</af-button>
      </div>
      <div class="drop-field">
        <span class="title">已添加</span><span class="tip">(拖拽调整顺序，点击x删除)</span><span v-if="showTip" class="notice">最多{{maxLength}}列</span>
        <draggable v-model="afterList" class="drag-area" element="div"  :options="dragOptions" @end="onEnd">
          <transition-group tag="div">
            <af-tag v-for="(item,index ) in afterList" :key="index" disable-transitions color="#fff" :class="item.closable ? 'item-drag':'item-disabled-drag'" :style="item.textColor"
                >{{index+1}}、{{ item.label }}
                 <slot v-if="item.closable">
                   <i class="af-icon-close" @click="removeTag(item,index)"></i>
                 </slot>
                </af-tag>
          </transition-group>
        </draggable>
      </div>
      <div class="drag-field">
        <span class="title">待添加</span><span class="tip">(拖拽至上面的区域进行添加)</span>
        <draggable element="div"  class="drag-area" v-model="beforeList" :options="sourceOptions"  @end="onEnd">
        <transition-group  tag="div">
          <af-button type="primary" v-for="(item, index) in beforeList" :key="index" plain>{{ item.label }}</af-button>
        </transition-group>
      </draggable>
      </div>
      <div class="custom-column-footer">
        <af-button type="primary" size="mini" @click="ensure">确定</af-button>
        <af-button  @click="show=false">取消</af-button>
      </div>
    </div>
    <af-button slot="reference">设置</af-button>
  </af-popover>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'AfColDrag',
  components: {
    draggable
  },
  data() {
    return {
      show: false,
      showTip: false,
      afterList: this.sortedList,
      beforeList: this.sourceList,
      isDragging: false,
      delayedDragging: false,
      dragOptions: {
        animation: 150,
        group: 'col-drag',
        ghostClass: 'ghost',
        draggable: '.item-drag'
      },
      sourceOptions: {
        animation: 150,
        sort: false,
        group: { name: 'col-drag', put: false},
        ghostClass: 'ghost',
        chosenClass: 'chosen-item',
        dragClass: 'draging-item'
      }
    };
  },
  props: {
    sourceList: {
      type: Array
    },
    sortedList: {
      type: Array
    },
    maxLength: {
      type: Number
    }
  },
  mounted() {
    this.ensure();
  },
  methods: {
    onEnd() {
      let afterList = this.afterList;
      let first = afterList.findIndex(item => item.label === '证券代码');
      let last = afterList.findIndex(item => item.label === '操作');
      let firstItem = afterList[first];
      let lastItem = afterList[last];
      afterList.splice(first, 1);
      afterList.splice(last - 1, 1);
      afterList.unshift(firstItem);
      afterList.push(lastItem);
      this.afterList = afterList;
    },
    resetTag() {
      this.afterList = this.sortedList;
      this.beforeList = this.sourceList;
    },
    removeTag(item, index) {
      this.afterList.splice(index, 1);
      this.beforeList.push(item);
    },
    getSortedData() {
      return this.afterList;
    },
    getOriginData() {
      return this.beforeList;
    },
    ensure() {
      this.show = !this.show;
      this.$emit('get-data', this.beforeList, this.afterList);
    }
  },
  watch: {
    afterList(val) {
      let sourceOptions = this.sourceOptions;
      if (this.maxLength && val.length >= this.maxLength) {
        this.showTip = true;
        this.sourceOptions.disabled = true;
        this.sourceOptions = Object.assign({}, sourceOptions, {disabled: true});
      } else {
        this.showTip = false;
        this.sourceOptions = Object.assign({}, sourceOptions, {disabled: false});
      }
    }
  }
};
</script>

<style scoped lang="scss">

  .custom-column {
    font-family:"微软雅黑";
    .custom-column-title {
      padding: 0 10px;
      .title {
        font-size: 14px;
        float: left;
      }
      .reset-title {
        float: right;
      }
    }
    .drag-field,
    .drop-field {
      height: 125px;
      padding: 10px;
      padding-right: 0;
    }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .drop-field {
    .af-tag{
      border-radius: 0;
      border-width: 0;
      font-size: 12px;
      box-sizing: border-box;
      padding: 0 10px;
      height: 22px;
      line-height: 22px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
    background-color: #ecf2fb;
    .item-disabled-drag {
      border: 1px dotted #ddd!important;
    }
    .item-drag {
      border: 1px solid #fff;
    }

    .af-icon-close{
        color: #ddd;
    }

    .item-drag:hover {
      cursor: move;
      border: 1px solid #4183d7;
      .af-icon-close{
        color: #4183d7;
        cursor: pointer;
      }
    }
  }

  .drag-area {
    margin-top: 10px;

      .af-button{
      border-radius: 0;
      border-width: 0;
      font-size: 12px;
      box-sizing: border-box;
      padding: 0 10px;
      height: 22px;
      line-height: 22px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
    .ghost {
      opacity: 0.5;
      background: #c8ebfb;
    }

    .chosen-item, .draging-item {
      color: #fff!important;
      background-color: rgba(65, 131, 215, 0.5)!important;
    }

    .af-button {
        background-color: #ddf3fe;
        color: #4183d7;
        margin-left: 0!important;
    }

    .af-button:hover {
      cursor: move;
      color: #fff!important;
      background-color: rgba(65, 131, 215, 0.5)!important;
    }

  }
   .title, .tip, .notice {
      font-size: 12px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .title {
      color: #000;
    }
    .tip {
      color: #a0a0a0;
      font-style: italic;
    }
    .notice{
      color: #ff4d4d;
    }
  }
  .custom-column-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
    text-align: center;
  }
</style>

<style lang="scss">
  .af-popover, .af-popover--plain{
    padding-left: 0;
    padding-right: 0;
    border:1px solid #ccc;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
  }
</style>
