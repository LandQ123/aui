<template>
  <footer class="af-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'AfFooter',

    componentName: 'AfFooter',

    props: {
      height: {
        type: String,
        default: '60px'
      }
    }
  };
</script>
