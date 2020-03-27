<template>
  <div style="margin: 20px;">
    <i class="af-icon-params"></i>
    <br><br>
    <i class="af-icon-location"></i>
    <br><br>
    <af-button icon="af-icon-plus"></af-button>
    <af-button size="small" icon="af-icon-plus"></af-button>
    <af-button size="icon" icon="af-icon-plus"></af-button>
    <af-button size="icon" icon="af-icon-plus" disabled></af-button>
    <br><br>
    <af-radio v-model="radio" label="1">aaa</af-radio>
    <af-radio v-model="radio" label="2">bbb</af-radio>
    <af-radio v-model="radio" label="3" disabled>ccc</af-radio>
    <af-radio v-model="radio2" label="1" disabled>bbb</af-radio>
    <br><br>
    <af-radio-group v-model="radio3">
      <af-radio-button label="1">aaa</af-radio-button>
      <af-radio-button label="2" disabled>bbb</af-radio-button>
      <af-radio-button label="4">bbb</af-radio-button>
      <af-radio-button label="3">ccc</af-radio-button>
    </af-radio-group>
    <br><br>
    <af-alert
      title="成功提示的文案">
    </af-alert>
    <br>
    <af-alert
      title="不可关闭的 alert"
      :closable="true">
    </af-alert>
    <br>
    <af-alert
      title="不可关闭的 alert"
      :closable="true"
      show-icon>
    </af-alert>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        radio: '2',
        radio2: '1',
        radio3: '3'
      };
    }
  };
</script>
