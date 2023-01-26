/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDefaultResponse } from '../src/helpers/getDefaultResponse'
import { setUnknownError } from '../src/helpers/setUnknownError'

export const defaultSecurityCheck = async (
  ctx: Context,
  next?: (ctx: Context) => any
) => {
  try {
    const isLogged =
      ctx?.vtex?.adminUserAuthToken ?? ctx?.vtex?.storeUserAuthToken

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
