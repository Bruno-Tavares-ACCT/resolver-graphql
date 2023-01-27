import { LRUCache } from '@vtex/api'

import type { AuthenticatedUser } from '../types/authenticatedUser'

export const UserCache = new LRUCache<string, AuthenticatedUser>({
  max: 5000,
})
