import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { RootState } from '../typings/store/state'
import { Account, User } from '../typings/user'

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  state() {
    return {
      user: null,
      accounts: [],
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    accounts(state) {
      return state.accounts
    },
  },
  mutations: {
    user(state, user: User | null) {
      state.user = user
    },
    accounts(state, accounts: Array<Account>) {
      state.accounts = accounts
    },
  },
  actions: {
    user({ commit }, user) {
      if (user) {
        // extract user info
        const { name, email, id, profilePicUrl } = user
        // set basic user info
        commit('user', {
          id,
          name,
          email,
          profilePicUrl,
        })

        // extract accounts
        const { accounts } = user
        commit('accounts', accounts)
      } else {
        commit('user', null)
        commit('accounts', [])
      }
    },
  },
})

// define your own `useStore` composition function
export function useStore(): Store<RootState> {
  return baseUseStore(key)
}
