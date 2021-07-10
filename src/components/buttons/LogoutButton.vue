<template>
  <icon-button
    button-title="Logout"
    class="animate__animated animate__slideInLeft"
    @click="logout"
  >
    <logout-icon class="w-5 h-5" />
  </icon-button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import { useUser } from '../../composables/user'

  export default defineComponent({
    components: {
      IconButton: defineAsyncComponent(() => import('./IconButton.vue')),
      LogoutIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.LogoutIcon)
      ),
    },
    setup() {
      const { logout } = useUser()
      return {
        logout,
      }
    },
  })
</script>
