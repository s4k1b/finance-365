import { Account, User } from './user'

export interface Event {
  id: number
  type: string
  occuringDate: string
  createdAt: string
  ownerId: string
}

export interface Transaction {
  id: number
  from?: string | Account | User
  to?: string | Account | User
  amount: number
}

export type PurchasableGood =
  | 'food'
  | 'grocery'
  | 'clothing'
  | 'transportation'
  | 'internet'
  | 'electronics'
  | 'medicine'
  | 'medical-equipments'
  | 'furniture'
  | 'home-appliences'
  | 'toiletries'
  | 'garments'

export type BillableGood =
  | 'broadband'
  | 'electricity'
  | 'meal-cost'
  | 'home-cost'
  | 'water'
  | 'gass'
  | 'house-rent'
  | 'garbage-service'
  | 'house-maid-salary'

export interface Good<T> {
  id: number
  type: T
  description: string
  price: number
}

export interface SalaryIn extends Event, Transaction {
  type: 'salary-in'
  to: Account
  from: string | User
  forMonth: string
}

export interface CashIn extends Event, Transaction {
  type: 'cash-in'
  to?: Account
  for: string | LendOut
}

export interface Payment extends Event, Transaction {
  type: 'payment'
  to: string
  for: string | LendIn | Array<Good<BillableGood>>
}

export interface Purchase extends Event {
  type: 'purchase'
  totalAmount: number
  goods: Array<Good<PurchasableGood>>
  transactions: Array<Transaction>
}

export interface LendIn extends Event, Omit<Transaction, 'from'> {
  type: 'lend-in'
  to: User
  for: string
}

export interface LendOut extends Event, Omit<Transaction, 'to'> {
  type: 'lend-out'
  from?: Account
  for: string
}

export interface SharedCost extends Event {
  type: 'shared-cost'
  totalAmount: number
  events: Array<Purchase | Payment>
  participants: Array<{
    user: User
    contributedAmount: number
    accouableForAmount: number
  }>
}

export type FinancialEvent =
  | SalaryIn
  | CashIn
  | Payment
  | Purchase
  | LendIn
  | LendOut
  | SharedCost
