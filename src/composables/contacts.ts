import firebase from 'firebase/app'
import 'firebase/firestore'
import { computed, Ref, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { Store } from 'vuex'
import { useFireStore } from '../plugins/firebase'
import { RootState } from '../typings/store/state'
import { User } from '../typings/user'

type AddNewContact = (userId: string, contactOb: User) => void
type UpdateContact = (
  userId: string,
  contactIndex: number,
  contactOb: User
) => void
type DeleteContact = (userId: string, contactIndex: number) => void
type ContactsComposable = {
  contacts: Ref<RootState['contacts']>
  isContactAdding: Ref<boolean>
  addNewContact: AddNewContact
  isContactUpdating: Ref<boolean>
  updateContact: UpdateContact
  isContactDeleting: Ref<boolean>
  deleteContact: UpdateContact
}

const { fireStore } = useFireStore()
const toast = useToast()

const isContactAdding: Ref<boolean> = ref(false)

async function getProfilePicUrl(email: string) {
  const matches = await fireStore
    .collection('users')
    .where('email', '==', email)
    .get()

  return matches.docs?.[0]?.data().profilePicUrl || ''
}

const addNewContact: AddNewContact = async (userId, contactOb) => {
  isContactAdding.value = true
  try {
    const profilePicUrl = await getProfilePicUrl(contactOb.email)
    await fireStore
      .collection('users')
      .doc(userId)
      .update({
        contacts: firebase.firestore.FieldValue.arrayUnion({
          ...contactOb,
          id: new Date().getTime(),
          profilePicUrl,
        }),
      })
    toast.success('Successfully added new contact')
  } catch (e) {
    toast.error(e)
  }
  isContactAdding.value = false
}

const isContactUpdating: Ref<boolean> = ref(false)
const updateContact: UpdateContact = async (
  userId,
  contactIndex,
  contactOb
) => {
  isContactUpdating.value = true
  try {
    const profilePicUrl = await getProfilePicUrl(contactOb.email)
    // get the existing contacts
    const userRef = await fireStore.collection('users').doc(userId).get()
    if (userRef.exists) {
      const user = userRef.data()
      const contacts = user?.contacts || []

      // edit the contacts array
      contacts[contactIndex] = { ...contactOb, profilePicUrl }

      // update the user doc
      await fireStore.collection('users').doc(userId).set(
        {
          contacts,
        },
        { merge: true }
      )
    }
    toast.success('Successfully updated contact')
  } catch (e) {
    toast.error(e)
  }
  isContactUpdating.value = false
}

const isContactDeleting: Ref<boolean> = ref(false)
const deleteContact: DeleteContact = async (userId, contactIndex) => {
  isContactDeleting.value = true
  try {
    // get the existing contacts
    const userRef = await fireStore.collection('users').doc(userId).get()
    if (userRef.exists) {
      const user = userRef.data()
      const contacts = user?.contacts || []

      // edit the contacts array
      contacts.splice(contactIndex, 1)

      // update the user doc
      await fireStore.collection('users').doc(userId).set(
        {
          contacts,
        },
        { merge: true }
      )
    }
    toast.success('Successfully deleted contact')
  } catch (e) {
    toast.error(e)
  }
  isContactDeleting.value = false
}

export function useContacts(store: Store<RootState>): ContactsComposable {
  const contacts = computed(() => store.getters.contacts)

  return {
    contacts,
    isContactAdding,
    addNewContact,
    isContactUpdating,
    updateContact,
    isContactDeleting,
    deleteContact,
  }
}
