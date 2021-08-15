import firebase from 'firebase/app'
import 'firebase/firestore'
import { computed, Ref, ref } from 'vue'
import { useToast } from 'vue-toastification'
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
type UpdateAccountBalance = (
  userId: string,
  account: Account,
  amount: number
) => void
type DeleteAccount = (userId: string, accountIndex: number) => void
type AccountsComposable = {
  accounts: Ref<RootState['accounts']>
  isAccountAdding: Ref<boolean>
  addNewAccount: AddNewAccount
  isAccountUpdating: Ref<boolean>
  updateAccount: UpdateAccount
  updateAccountBalance: UpdateAccountBalance
  isAccountDeleting: Ref<boolean>
  deleteAccount: UpdateAccount
}

const { fireStore } = useFireStore()
const toast = useToast()

const isAccountAdding: Ref<boolean> = ref(false)

const addNewAccount: AddNewAccount = async (userId, accountOb) => {
  isAccountAdding.value = true
  try {
    await fireStore
      .collection('users')
      .doc(userId)
      .update({
        accounts: firebase.firestore.FieldValue.arrayUnion({
          ...accountOb,
          id: new Date().getTime(),
        }),
      })
    toast.success('Successfully added new account')
  } catch (e) {
    toast.error(e)
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
    toast.success('Successfully updated account')
  } catch (e) {
    toast.error(e)
  }
  isAccountUpdating.value = false
}

const updateAccountBalance: UpdateAccountBalance = async function (
  userId,
  account,
  amount
) {
  try {
    const userRef = await fireStore.collection('users').doc(userId).get()
    if (userRef.exists) {
      const user = userRef.data()
      const accounts: Array<Account> = user?.accounts || []

      // find the account that matches the account parameter
      const idx = accounts.findIndex((ac) => ac.id === account.id)

      // update the balance
      if (accounts[idx]) {
        if (typeof accounts[idx].balance === 'number') {
          accounts[idx].balance = <number>accounts[idx].balance + amount
        } else {
          accounts[idx].balance = amount
        }
      }

      // update user doc
      await fireStore
        .collection('users')
        .doc(userId)
        .set({ accounts }, { merge: true })
    }
  } catch (e) {
    toast.error(e)
  }
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
    toast.success('Successfully deleted account')
  } catch (e) {
    toast.error(e)
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
    updateAccountBalance,
    isAccountDeleting,
    deleteAccount,
  }
}
