import { Ref, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { Store } from 'vuex'
import { useFireStore } from '../plugins/firebase'
import { FinancialEvent } from '../typings/event'
import { RootState } from '../typings/store/state'

type AddNewEvent = (
  userId: string,
  eventOb: Omit<Omit<Omit<FinancialEvent, 'createdAt'>, 'ownerId'>, 'id'>
) => void
export interface EventType {
  type: string
  title: string
  icon: unknown
}
export interface EventsComposable {
  eventTypes: Ref<Array<EventType>>
  isEventAdding: Ref<boolean>
  addNewEvent: AddNewEvent
}

const eventTypes = ref([
  {
    type: 'salary-in',
    title: 'Salary In',
    icon: import.meta.globEager(`../assets/icons/017-light-bulb.svg`)[
      `../assets/icons/017-light-bulb.svg`
    ].default,
  },
  {
    type: 'cash-in',
    title: 'Cash In',
    icon: import.meta.globEager(`../assets/icons/002-get-money.svg`)[
      `../assets/icons/002-get-money.svg`
    ].default,
  },
  {
    type: 'payment',
    title: 'Payment',
    icon: import.meta.globEager(`../assets/icons/057-payment.svg`)[
      `../assets/icons/057-payment.svg`
    ].default,
  },
  {
    type: 'purchase',
    title: 'Purchase',
    icon: import.meta.globEager(`../assets/icons/033-shopping-basket.svg`)[
      `../assets/icons/033-shopping-basket.svg`
    ].default,
  },
  {
    type: 'lend-in',
    title: 'Lend In',
    icon: import.meta.globEager(`../assets/icons/036-loan.svg`)[
      `../assets/icons/036-loan.svg`
    ].default,
  },
  {
    type: 'lend-out',
    title: 'Lend Out',
    icon: import.meta.globEager(`../assets/icons/008-money-transfer.svg`)[
      `../assets/icons/008-money-transfer.svg`
    ].default,
  },
  {
    type: 'shared-cost',
    title: 'Shared Cost',
    icon: import.meta.globEager(`../assets/icons/051-cash-register.svg`)[
      `../assets/icons/051-cash-register.svg`
    ].default,
  },
])

const { fireStore } = useFireStore()
const toast = useToast()

const isEventAdding: Ref<boolean> = ref(false)
const addNewEvent: AddNewEvent = async (userId, eventOb) => {
  isEventAdding.value = true
  try {
    const newEventRef = await fireStore.collection('events').doc()
    await newEventRef.set({
      id: newEventRef.id,
      ownerId: userId,
      createdAt: new Date(),
      ...eventOb,
    })
    toast.success('Successfully created event')
  } catch (e) {
    toast.error(e)
  }
  isEventAdding.value = false
}

export function useEvents(store: Store<RootState>): EventsComposable {
  return {
    eventTypes,
    isEventAdding,
    addNewEvent,
  }
}
