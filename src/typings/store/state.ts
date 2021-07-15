import { Account, User } from '../user'

export interface RootState {
  user: User | null
  accounts: Array<Account>
  contacts: Array<User>
}
