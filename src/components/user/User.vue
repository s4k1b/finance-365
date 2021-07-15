<template>
  <div v-if="!isLoggedIn" class="flex flex-col text-center">
    <h2 class="text-md font-medium">Sign in here,</h2>
    <div id="user-container"></div>
  </div>
  <div
    v-else
    class="flex flex-row px-3 py-1 border-t-4 border-b-4 transition-all"
  >
    <user-badge
      :active-mode="activeSettings"
      @update:settingsMode="settingsMode = `${$event}-${new Date()}`"
    />
  </div>

  <animate-transition
    animation-enter="fadeInLeft"
    animation-leave="fadeOutRight"
    mode="out-in"
    :duration="{ enter: 800, leave: 100 }"
  >
    <accounts-list v-if="activeSettings === 'accounts'" />
    <contacts-list v-else-if="activeSettings === 'contacts'" />
  </animate-transition>
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
      ContactsList: defineAsyncComponent(() => import('./ContactsList.vue')),
      AnimateTransition: defineAsyncComponent(
        () => import('../transitions/AnimateTransition.vue')
      ),
    },
    setup() {
      const { startUi } = useFirebaseUi()

      const { isLoggedIn } = useUser()

      const settingsMode = ref('')
      const activeSettings = ref('')

      watch(settingsMode, (n) => {
        const value = n.split('-')[0]
        if (value === activeSettings.value) activeSettings.value = ''
        else activeSettings.value = value
      })

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
        activeSettings,
      }
    },
  })
</script>
