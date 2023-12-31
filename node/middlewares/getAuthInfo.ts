/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { getCredentials } from '../src/helpers/getCredentials'
import type {
  AccessType,
  AuthenticatedUser,
} from '../src/types/authenticatedUser'

export async function getAuthInfo(ctx: Context, next: () => Promise<unknown>) {
  const {
    clients: { vtexid },
    vtex: { storeUserAuthToken, adminUserAuthToken },
  } = ctx

  let authenticatedStoreUser: AuthenticatedUser | undefined
  let authenticatedAdminUser: AuthenticatedUser | undefined
  let alternativeTokenIsValid = false
  let permissions: AccessType[] = []

  if (storeUserAuthToken) {
    authenticatedStoreUser = await vtexid.getAuthenticatedUser(
      storeUserAuthToken
    )
  }

  if (adminUserAuthToken) {
    authenticatedAdminUser = await vtexid.getAuthenticatedUser(
      adminUserAuthToken
    )
  }

  if (
    authenticatedStoreUser ||
    authenticatedAdminUser ||
    ctx?.request?.headers?.authorization
  ) {
    const appSettings = await getCredentials(ctx)

    alternativeTokenIsValid =
      ctx.request.headers.authorization ===
      `Bearer ${appSettings?.alternativeAccessToken}`

    permissions = ['ADMIN', 'STORE', 'ALTERNATIVE_TOKEN'].filter(
      (pAccessType) => {
        switch (pAccessType) {
          case 'ADMIN':
            return !!authenticatedAdminUser

          case 'STORE':
            return !!authenticatedStoreUser

          case 'ALTERNATIVE_TOKEN':
            return alternativeTokenIsValid

          default:
            return false
        }
      }
    ) as AccessType[]
  }

  ctx.state.authenticatedUser =
    authenticatedStoreUser || authenticatedAdminUser || alternativeTokenIsValid
      ? {
          user: authenticatedStoreUser
            ? authenticatedStoreUser.user
            : authenticatedAdminUser?.user || '',
          userId: authenticatedStoreUser
            ? authenticatedStoreUser.userId
            : authenticatedAdminUser?.userId || '',
          permissions,
        }
      : undefined

  await next()
}
