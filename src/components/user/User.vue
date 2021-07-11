<template>
  <div v-if="!isLoggedIn" class="flex flex-col text-center">
    <h2 class="text-md font-medium">Sign in here,</h2>
    <div id="user-container"></div>
  </div>
  <div
    v-else
    class="flex flex-row px-3 py-1 border-t-4 border-b-4 transition-all"
  >
    <user-badge @update:settingsMode="settingsMode = $event" />
  </div>

  <accounts-list v-if="settingsMode === 'accounts'" />
</template>

<script lang="ts">
  import {
    defineAsyncComponent,
    defineComponent,
    nextTick,
    ref,
    watch,
  } from 'vue'
  import { useFirebaseUi } from '../../plugins/firebaseui'
  import { useUser } from '../../composables/user'

  export default defineComponent({
    components: {
      UserBadge: defineAsyncComponent(() => import('./UserBadge.vue')),
      AccountsList: defineAsyncComponent(() => import('./AccountsList.vue')),
    },
    setup() {
      const { startUi } = useFirebaseUi()

      const { isLoggedIn } = useUser()

      const settingsMode = ref('')

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
        settingsMode,
      }
    },
  })
</script>
