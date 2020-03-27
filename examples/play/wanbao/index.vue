<template>
  <div style="margin: 20px;">
    <!-- <layout></layout> -->
    <autocomplete></autocomplete>
    <!--<CustomColumn></CustomColumn>-->
  </div>
</template>
<script>
  import layout from './layout.vue'
  import autocomplete from './autocomplete.vue'
  import CustomColumn from './CustomColumn.vue'

  export default {
    components:{
      layout,
      autocomplete,
      CustomColumn
    },
    data() {
      return {

      };
    }
  };
</script>
<style lang="scss" scoped>
  
</style>