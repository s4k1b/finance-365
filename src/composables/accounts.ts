import firebase from 'firebase/app'
import 'firebase/firestore'
import { computed, Ref, ref } from 'vue'
import { Store } from 'vuex'
import { useFireStore } from '../plugins/firebase'
import { RootState } from '../typings/store/state'
import { Account } from '../typings/user'

type AddNewAccount = (userId: string, accountOb: Account) => void
type UpdateAccount = (
  userId: string,
  accountIndex: number,
  accountOb: Account
) => void
type DeleteAccount = (userId: string, accountIndex: number) => void
type AccountsComposable = {
  accounts: Ref<RootState['accounts']>
  isAccountAdding: Ref<boolean>
  addNewAccount: AddNewAccount
  isAccountUpdating: Ref<boolean>
  updateAccount: UpdateAccount
  isAccountDeleting: Ref<boolean>
  deleteAccount: UpdateAccount
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

const isAccountUpdating: Ref<boolean> = ref(false)
const updateAccount: UpdateAccount = async (
  userId,
  accountIndex,
  accountOb
) => {
  isAccountUpdating.value = true
  try {
    // get the existing accounts
    const userRef = await fireStore.collection('users').doc(userId).get()
    if (userRef.exists) {
      const user = userRef.data()
      const accounts = user?.accounts || []

      // edit the accounts array
      accounts[accountIndex] = accountOb

      // update the user doc
      await fireStore.collection('users').doc(userId).set(
        {
          accounts,
        },
        { merge: true }
      )
    }
  } catch (e) {
    console.log(e)
  }
  isAccountUpdating.value = false
}

const isAccountDeleting: Ref<boolean> = ref(false)
const deleteAccount: DeleteAccount = async (userId, accountIndex) => {
  isAccountDeleting.value = true
  try {
    // get the existing accounts
    const userRef = await fireStore.collection('users').doc(userId).get()
    if (userRef.exists) {
      const user = userRef.data()
      const accounts = user?.accounts || []

      // edit the accounts array
      accounts.splice(accountIndex, 1)

      // update the user doc
      await fireStore.collection('users').doc(userId).set(
        {
          accounts,
        },
        { merge: true }
      )
    }
  } catch (e) {
    console.log(e)
  }
  isAccountDeleting.value = false
}

export function useAccounts(store: Store<RootState>): AccountsComposable {
  const accounts = computed(() => store.getters.accounts)

  return {
    accounts,
    isAccountAdding,
    addNewAccount,
    isAccountUpdating,
    updateAccount,
    isAccountDeleting,
    deleteAccount,
  }
}
