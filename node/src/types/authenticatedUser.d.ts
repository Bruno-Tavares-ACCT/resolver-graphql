import type { AccessType } from './accessTypes'

export type AuthenticatedUser = {
  userId: string
  user: string
}

export type AccessType = 'ADMIN' | 'STORE' | 'ALTERNATIVE_TOKEN'

export type UserPermissions = {
  permissions: AccessType[]
}
