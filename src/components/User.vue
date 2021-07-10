<template>
  <div v-if="!isUserLoggedIn" id="user-container" class="container"></div>
  <button v-else @click="logout">Logout</button>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, watch } from 'vue'
  import { useFirebaseUi } from '../plugins/firebaseui'
  import { useFirebaseAuth } from '../plugins/firebase'
  import { useStore } from '../store'

  export default defineComponent({
    setup() {
      const store = useStore()
      const { startUi } = useFirebaseUi()

      const { firebaseAuth } = useFirebaseAuth()

      const isUserLoggedIn = computed(() => {
        return !!store.getters.user
      })

      watch(
        isUserLoggedIn,
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

      async function logout() {
        await firebaseAuth.signOut()
        // destroy store user
        store.dispatch('user$set', null)
      }

      return {
        isUserLoggedIn,
        logout,
      }
    },
  })
</script>
