<template>
  <salary-in-form v-if="type === 'salary-in'" v-model="event" />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    components: {
      SalaryInForm: defineAsyncComponent(() => import('./SalaryInForm.vue')),
    },
    props: {
      type: {
        type: String,
        default: '',
      },
      modelValue: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const event = ref(props.modelValue)
      watch(
        event,
        (n) => {
          emit('update:modelValue', n)
        },
        { deep: true }
      )

      return {
        event,
      }
    },
  })
</script>
