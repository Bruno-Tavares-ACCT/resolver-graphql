import type { AccessType } from '../types/authenticatedUser'
import { setUnknownError } from './setUnknownError'

type SecurityCheckParams = {
  ctx: Context
  accessType: AccessType[]
}

export const securityCheck = async ({
  ctx,
  accessType,
}: SecurityCheckParams): Promise<boolean> => {
  try {
    const permissionsUser = ctx.state.authenticatedUser?.permissions

    return !!accessType?.find((pAccessType) => {
      switch (pAccessType) {
        case 'ADMIN':
          return permissionsUser?.includes('ADMIN')

        case 'STORE':
          return permissionsUser?.includes('STORE')

        case 'ALTERNATIVE_TOKEN':
          return permissionsUser?.includes('ALTERNATIVE_TOKEN')

        default:
          return false
      }
    })
  } catch (error) {
    setUnknownError(ctx, error)
  }

  return false
}
