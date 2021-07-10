<template>
  <div v-if="!isLoggedIn" class="flex flex-col text-center">
    <h2 class="text-md font-medium">Sign in here,</h2>
    <div id="user-container"></div>
  </div>
  <div v-else class="flex flex-row px-4 py-2 border-t-4 border-b-4">
    <user-badge />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, nextTick, watch } from 'vue'
  import { useFirebaseUi } from '../../plugins/firebaseui'
  import { useUser } from '../../composables/user'

  export default defineComponent({
    components: {
      UserBadge: defineAsyncComponent(() => import('./UserBadge.vue')),
    },
    setup() {
      const { startUi } = useFirebaseUi()

      const { isLoggedIn } = useUser()

      watch(
        isLoggedIn,
        (n) => {
          if (!n) {
            nextTick(() => {
              startUi('#user-container')
            })
          }
        },
        {
          immediate: true,
        }
      )

      return {
        isLoggedIn,
      }
    },
  })
</script>
