<template>
  <modal size="lg" @close-modal="$emit('close-modal', true)">
    <template #modal-title> Add New Event </template>

    step {{ activeStep }}

    <template #modal-footer-left-controls>
      <buttons :count="4">
        <regular-button
          button-title="Cancel"
          @click="$emit('close-modal', true)"
        />
      </buttons>
    </template>
    <template #modal-footer-right-controls>
      <buttons :count="4">
        <regular-button
          class="col-start-3"
          button-title="Previous"
          :is-disabled="activeStep === 1"
          @click="goToPreviousStep"
        />
        <regular-button
          v-if="activeStep < stepCount"
          class="col-start-4"
          button-title="Next"
          type="green"
          @click="goToNextStep"
        />
        <regular-button
          v-else
          class="col-start-4"
          button-title="Done"
          type="green"
          @click="done"
        />
      </buttons>
    </template>
  </modal>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {
      Modal: defineAsyncComponent(() => import('./Modal.vue')),
      Buttons: defineAsyncComponent(() => import('../buttons/Buttons.vue')),
      RegularButton: defineAsyncComponent(
        () => import('../buttons/RegularButton.vue')
      ),
    },
    props: {
      date: {
        type: Object,
        default: new Date(),
      },
    },
    emits: ['close-modal'],

    setup() {
      const stepCount = ref(2)
      const activeStep = ref(1)

      function goToPreviousStep() {
        activeStep.value = Math.max(1, activeStep.value - 1)
      }
      function goToNextStep() {
        activeStep.value = Math.min(stepCount.value, activeStep.value + 1)
      }

      return {
        stepCount,
        activeStep,
        goToPreviousStep,
        goToNextStep,
      }
    },
  })
</script>
