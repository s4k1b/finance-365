<template>
  <modal size="lg" @close-modal="$emit('close-modal', true)">
    <template #modal-title> Add New Event </template>

    <div
      class="
        relative
        min-h-full
        transition-height
        duration-300
        ease-in-out
        mb-4
      "
      :style="{ height: stepHeight }"
    >
      <transition
        enter-active-class="transition ease-out delay-200 duration-200 transform"
        enter-from-class="opacity-0 translate-x-10 scale-95"
        enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 -translate-x-10 scale-95"
      >
        <step-1
          v-if="activeStep === 1"
          ref="step"
          v-model:occuringDate="event.occuringDate"
          v-model:type="event.type"
        />
        <step-2
          v-else-if="activeStep === 2"
          ref="step"
          v-model="eventBody"
          :type="event.type"
        />
      </transition>
    </div>

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
          class="col-start-3 ease"
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
          :is-loader-active="isEventAdding"
          @click="done"
        />
      </buttons>
    </template>
  </modal>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref, watch } from 'vue'
  import { useEvents } from '../../composables/events'
  import { useUser } from '../../composables/user'

  export default defineComponent({
    components: {
      Modal: defineAsyncComponent(() => import('./Modal.vue')),
      Step1: defineAsyncComponent(() => import('../events/create/Step1.vue')),
      Step2: defineAsyncComponent(() => import('../events/create/Step2.vue')),
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

    setup(props, { emit }) {
      const stepCount = ref(2)
      const activeStep = ref(1)

      const step = ref(null)

      watch(step, (n) => {
        if (n) {
          // dealy for animation to finish
          setTimeout(() => {
            calcStepHeight(n.$el)
          }, 300)
        }
      })

      const stepHeight = ref('241px')

      const event = ref({
        type: '',
        occuringDate: props.date.toLocaleDateString('fr-CA'),
      })
      const eventBody = ref({})

      function calcStepHeight(el) {
        const maximumHeight = window.innerHeight - 45 - 32 - 57 - 60 // window height - modal titlebar - modal body padding - modal footer - 60
        stepHeight.value = `${Math.min(
          maximumHeight,
          el.clientHeight || 241
        )}px`
      }

      const { user } = useUser()
      function goToPreviousStep() {
        activeStep.value = Math.max(1, activeStep.value - 1)
      }
      function goToNextStep() {
        activeStep.value = Math.min(stepCount.value, activeStep.value + 1)
      }

      const { isEventAdding, addNewEvent } = useEvents()
      async function done() {
        await addNewEvent(user.value.id, {
          ...event.value,
          ...eventBody.value,
        })
        emit('close-modal', true)
      }

      return {
        stepCount,
        activeStep,
        step,
        stepHeight,
        event,
        eventBody,
        calcStepHeight,
        goToPreviousStep,
        goToNextStep,
        isEventAdding,
        done,
      }
    },
  })
</script>
