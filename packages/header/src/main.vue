<template>
  <header class="af-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'AfHeader',

    componentName: 'AfHeader',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
