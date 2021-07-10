import { computed, Ref } from 'vue'
import { useStore } from '../store'
import { User } from '../typings/user'
import { useFirebaseAuth } from '../plugins/firebase'

interface UserComposable {
  user: Ref<User>
  isLoggedIn: Ref<boolean>
  logout: () => void
}

const { firebaseAuth } = useFirebaseAuth()

export function useUser(): UserComposable {
  const store = useStore()

  const user = computed(() => store.getters.user)
  const isLoggedIn = computed(() => !!user.value)
  async function logout() {
    await firebaseAuth.signOut()
    // destroy store user
    store.dispatch('user$set', null)
  }

  return { user, isLoggedIn, logout }
}
