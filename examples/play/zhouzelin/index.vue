<template>
  <af-input-number v-model="num8" controls-direction="vertical" @change="handleChange" :min="1" :max="10"></af-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num8: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>