/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDefaultResponse } from '../src/helpers/getDefaultResponse'
import { setUnknownError } from '../src/helpers/setUnknownError'

export const defaultSecurityCheck = async (
  ctx: Context,
  next?: (ctx: Context) => any
) => {
  try {
    const permissionsUser = ctx.state.authenticatedUser?.permissions

    const isLogged =
      permissionsUser?.includes('ADMIN') || permissionsUser?.includes('STORE')

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
    await setUnknownError(ctx, error)
  }
}
