import firebase from 'firebase/app'
import 'firebase/firestore'
import { computed, Ref, ref } from 'vue'
import { Store } from 'vuex'
import { useFireStore } from '../plugins/firebase'
import { RootState } from '../typings/store/state'
import { Account } from '../typings/user'

type AddNewAccount = (userId: string, accountOb: Account) => void
type AccountsComposable = {
  accounts: Ref<RootState['accounts']>
  isAccountAdding: Ref<boolean>
  addNewAccount: AddNewAccount
}

const { fireStore } = useFireStore()

const isAccountAdding: Ref<boolean> = ref(false)

const addNewAccount: AddNewAccount = async (userId, accountOb) => {
  isAccountAdding.value = true
  try {
    await fireStore
      .collection('users')
      .doc(userId)
      .update({
        accounts: firebase.firestore.FieldValue.arrayUnion(accountOb),
      })
  } catch (e) {
    console.log(e)
  }
  isAccountAdding.value = false
}

export function useAccounts(store: Store<RootState>): AccountsComposable {
  const accounts = computed(() => store.getters.accounts)

  return {
    accounts,
    isAccountAdding,
    addNewAccount,
  }
}
