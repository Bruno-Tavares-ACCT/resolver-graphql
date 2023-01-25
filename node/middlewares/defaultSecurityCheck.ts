/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCredentials } from '../src/helpers/getCredentials'
import { getDefaultResponse } from '../src/helpers/getDefaultResponse'
import { setUnknownError } from '../src/helpers/setUnknownError'

export const defaultSecurityCheck = async (
  ctx: Context,
  next?: (ctx: Context) => any
) => {
  try {
    const { alternativeTokenIsValid } = await getCredentials(ctx)

    const isLogged =
      ctx?.vtex?.adminUserAuthToken ??
      ctx?.vtex?.storeUserAuthToken ??
      alternativeTokenIsValid

    if (isLogged && next) {
      return next(ctx)
    }

    if (isLogged) {
      ctx.status = 304

      return
    }

    ctx.status = 401
    ctx.body = getDefaultResponse({
      success: false,
      message: 'User no access',
    })
  } catch (error) {
    setUnknownError(ctx, error)
  }
}
