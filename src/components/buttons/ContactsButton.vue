<template>
  <icon-button
    button-title="Contacts"
    class="animate__animated animate__slideInLeft"
  >
    <contacts-icon class="w-5 h-5" />
  </icon-button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      IconButton: defineAsyncComponent(() => import('./IconButton.vue')),
      ContactsIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.UserGroupIcon)
      ),
    },
  })
</script>
