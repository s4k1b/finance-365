export interface User {
  id: number | string
  name: string
  email: string
  profilePicUrl?: string
}

export interface Account {
  id: number
  name: string
  balance?: number
  logoUrl?: string
}
