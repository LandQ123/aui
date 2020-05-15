<template>
  <div class="af-step">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="af-step__item"
      :class="{
				'af-step__start': index === 0,
				'af-step__end' : index === steps.length - 1,
				'af-step__middle' : index > 0 && index < steps.length - 1,
				'af-step__current' : index + 1 === currentStep
			}"
    >
      <div class="af-step__text">{{step}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AfStep',
  componentName: 'AfStep',
  props: {
    currentStep: {
      type: Number,
      default: 1
    },
    steps: {
      type: Array,
      default: ['step 1', 'step 2']
    }
  }
};
</script>
