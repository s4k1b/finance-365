<template>
  <div>
    <div class="w-1/3 mb-6">
      <date-input v-model="eventDate" label="Event date" />
    </div>
    <event-select />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, inject, ref } from 'vue'

  export default defineComponent({
    components: {
      DateInput: defineAsyncComponent(
        () => import('../../form-elements/DateInput.vue')
      ),
      EventSelect: defineAsyncComponent(
        () => import('../../form-elements/EventSelect.vue')
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
