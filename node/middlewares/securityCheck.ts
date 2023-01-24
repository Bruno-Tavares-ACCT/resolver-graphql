/* eslint-disable @typescript-eslint/no-explicit-any */
import { setUnknownError } from '../helpers/setUnknownError'

export const securityCheck = async (
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
    ctx.body = 'User no access'
  } catch (error) {
    setUnknownError(ctx, error)
  }
}
