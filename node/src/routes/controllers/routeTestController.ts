import { getDefaultResponse } from '../../helpers/getDefaultResponse'
import { securityCheck } from '../../helpers/securityCheck'
import { setUnknownError } from '../../helpers/setUnknownError'
import { testService } from '../services/testService'

export const routeTestController = async (ctx: Context) => {
  try {
    // Example of how utilizate is validation of alternative token
    const isUserValid = await securityCheck({
      ctx,
      accessType: ['ALTERNATIVE_TOKEN', 'STORE'],
    })

    if (!isUserValid) {
      ctx.status = 401
      ctx.body = getDefaultResponse({
        success: false,
        message: 'User not validated by alternative token',
      })

      return
    }

    const { message, data } = await testService()

    ctx.body = getDefaultResponse({
      success: true,
      message,
      data,
    })
  } catch (err) {
    setUnknownError(ctx, err)
  }
}
