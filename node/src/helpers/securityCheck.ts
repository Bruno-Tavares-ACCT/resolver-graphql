import { getCredentials } from './getCredentials'
import { setUnknownError } from './setUnknownError'

type SecurityCheckParams = {
  ctx: Context
  accessType: 'ADMIN' | 'STORE' | 'ALTERNATIVE_TOKEN'
}

export const securityCheck = async ({
  ctx,
  accessType,
}: SecurityCheckParams): Promise<boolean> => {
  try {
    const { alternativeTokenIsValid } = await getCredentials(ctx)

    switch (accessType) {
      case 'ADMIN':
        return !!ctx?.vtex?.adminUserAuthToken

      case 'STORE':
        return !!ctx?.vtex?.storeUserAuthToken

      case 'ALTERNATIVE_TOKEN':
        return alternativeTokenIsValid

      default:
        return false
    }
  } catch (error) {
    setUnknownError(ctx, error)
  }

  return false
}
