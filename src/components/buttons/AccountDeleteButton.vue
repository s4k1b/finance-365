<template>
  <icon-button button-title="Delete Account">
    <delete-icon class="w-5 h-5" />
  </icon-button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      IconButton: defineAsyncComponent(() => import('./IconButton.vue')),
      DeleteIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.TrashIcon)
      ),
    },
  })
</script>
