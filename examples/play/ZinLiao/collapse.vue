<template>
  <div style="background:#E5E5E5">
    <div class="box">
      <p>primary</p>
      <af-collapse v-model="activeNames1" @change="handleChange" type="primary">
        <af-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </af-collapse-item>
        <af-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </af-collapse-item>
        <af-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </af-collapse-item>
        <af-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </af-collapse-item>
      </af-collapse>
    </div>
    <div class="box">
      <p>simple</p>
      <af-collapse v-model="activeNames2" @change="handleChange" type="simple">
        <af-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </af-collapse-item>
        <af-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </af-collapse-item>
        <af-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </af-collapse-item>
        <af-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </af-collapse-item>
      </af-collapse>
    </div>
    <div class="box">
      <p>自定义面板标题</p>
      <af-collapse v-model="activeNames3" @change="handleChange" type="primary">
        <af-collapse-item>
          <template slot="title">
            <span style="padding: 0 10px;">一致性 Consistency</span>
            <div 
              slot="texpend"
              style="display:inline-block">
              <af-button 
                size="small" 
                @click.stop="handleAlert('新建')"
                type="primary" 
                style="vertical-align:middle">新建</af-button>
              <af-button 
                size="small" 
                @click.stop="handleAlert('删除')"
                style="vertical-align:middle">删除</af-button>
              <af-divider type="vertical"></af-divider>
              <div style="display:inline-block;">
                <af-input 
                  v-model="input" 
                  placeholder="请输入内容"
                  @click.stop.native=""
                  suffix-icon="af-icon-search"></af-input>
              </div>
            </div>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </af-collapse-item>
        <af-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </af-collapse-item>
        <af-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </af-collapse-item>
        <af-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </af-collapse-item>
      </af-collapse>
    </div>
    <div class="box">
      <af-input type="text" placeholder="请输入高度" style="width: 200px;" v-model="heightInput"></af-input>
      <af-button type="priamry" size="small" @click="changeHeight">改变height</af-button>
      <p>按比例占满指定高度(height=500, scale=[1,2,3], scale-Num=2)</p>
      <div style="background-color:#d1f0ff;" :style="`height:${height}px;`">
        <af-collapse 
          v-model="activeNames4" 
          @change="handleChange" 
          type="primary"
          :height=height
          :scale=scale
          :scaleNum=scaleNum
          :scaleDebounce=scaleDebounce>
          <af-collapse-item title="该面板占 1 份" name="a">
            <div style="height: 100%;">
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
              <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
            </div>
          </af-collapse-item>
          <af-collapse-item title="该面板占 2 份" name="b">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          </af-collapse-item>
          <af-collapse-item title="该面板占 3 份" name="c">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          </af-collapse-item>
        </af-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames1: ['1'],
      activeNames2: ['4'],
      activeNames3: [],
      activeNames4: [],
      scale: {
        "a": 1,
        "b": 2,
        "c": 3
      },
      scaleNum: 2,
      scaleDebounce: 500,
      height: 500,
      heightInput: 0
    };
  },
  methods: {
    handleChange(val) {
    },
    handleAlert(str) {
      alert(str)
    },
    changeHeight() {
      this.heightInput = Math.random() * 1000;
      this.height = this.heightInput;
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 0 5px 15px;
  margin-bottom: 10px;
  border-bottom: 2px dotted #aaaaaa;

  P {
    padding-top: 10px;
    margin-bottom: 10px;
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.boxItem {
  display: inline-block;
  padding: 5px 10px 20px 5px;

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>

<style lang="scss">
body {
  background: #E5E5E5;
}
</style>
