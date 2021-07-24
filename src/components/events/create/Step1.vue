<template>
  <date-input v-model="eventDate" label="Event date" />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, inject, ref } from 'vue'

  export default defineComponent({
    components: {
      DateInput: defineAsyncComponent(
        () => import('../../form-elements/DateInput.vue')
      ),
    },
    setup() {
      const date = inject('providedDate')
      const eventDate = ref(date)
      return {
        eventDate,
      }
    },
  })
</script>
