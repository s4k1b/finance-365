import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { RootState } from '../typings/store/state'
import { User } from '../typings/user'

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  state() {
    return {
      user: null,
    }
  },
  getters: {
    user(state) {
      return state.user
    },
  },
  mutations: {
    user(state, user: User | null) {
      state.user = user
    },
  },
  actions: {
    user$set({ commit }, user) {
      if (user) {
        const {
          displayName: name,
          email,
          uid: id,
          photoURL: profilePicUrl,
        } = user
        commit('user', {
          id,
          name,
          email,
          profilePicUrl,
        })
      } else commit('user', null)
    },
  },
})

// define your own `useStore` composition function
export function useStore(): Store<RootState> {
  return baseUseStore(key)
}
