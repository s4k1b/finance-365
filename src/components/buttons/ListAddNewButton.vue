<template>
  <icon-button button-title="Add" class="animate__animated animate__zoomIn">
    <plus-icon class="w-5 h-5" />
  </icon-button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      IconButton: defineAsyncComponent(() => import('./IconButton.vue')),
      PlusIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.PlusIcon)
      ),
    },
  })
</script>
