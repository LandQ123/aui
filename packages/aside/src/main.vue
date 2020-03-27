<template>
  <aside class="af-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'AfAside',

    componentName: 'AfAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
