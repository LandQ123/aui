<template>
  <div>
    <af-switch 
      v-model="value" 
      @change="handleChange" 
      active-value="1" 
      inactive-value="0" 
      active-text="开了"
      inactive-text="关了">
    </af-switch>
  </div>
</template>
<script>
export default {
  data(){
    return{
      value: true
    }
  },
  methods: {
    handleChange(val){
      console.log(val);
    }
  }
}
</script>

