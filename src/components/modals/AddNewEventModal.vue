<template>
  <modal @close-modal="$emit('close-modal', true)">
    <template #modal-title> Add New Event </template>
  </modal>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      Modal: defineAsyncComponent(() => import('./Modal.vue')),
    },
    props: {
      date: {
        type: Object,
        default: new Date(),
      },
    },
    emits: ['close-modal'],
  })
</script>
