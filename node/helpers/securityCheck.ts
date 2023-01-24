import { setUnknownError } from './setUnknownError'

type SecurityCheckParams = {
  ctx: Context
  accessType: 'ADMIN' | 'STORE'
}

export const securityCheck = ({
  ctx,
  accessType,
}: SecurityCheckParams): boolean => {
  try {
    switch (accessType) {
      case 'ADMIN':
        if (ctx?.vtex?.adminUserAuthToken) {
          return true
        }

        break

      case 'STORE':
        if (ctx?.vtex?.storeUserAuthToken) {
          return true
        }

        break

      default:
        return false
    }
  } catch (error) {
    setUnknownError(ctx, error)
  }

  return false
}
