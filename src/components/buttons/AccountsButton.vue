<template>
  <icon-button
    button-title="Bank Accounts"
    class="animate__animated animate__slideInLeft"
  >
    <accounts-icon class="w-5 h-5" />
  </icon-button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      IconButton: defineAsyncComponent(() => import('./IconButton.vue')),
      AccountsIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.ColorSwatchIcon)
      ),
    },
  })
</script>
