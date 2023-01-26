import { getDefaultResponse } from '../../helpers/getDefaultResponse'
import { securityCheck } from '../../helpers/securityCheck'

export const alternativeTokenValidation = async (ctx: Context) => {
  // Example of how utilizate is validation of alternative token
  const ìsUserValid = await securityCheck({
    ctx,
    accessType: ['ALTERNATIVE_TOKEN', 'STORE'],
  })

  ctx.status = ìsUserValid ? 204 : 401

  const message = ìsUserValid
    ? 'User validated by alternative token'
    : 'User not validated by alternative token'

  ctx.body = getDefaultResponse({
    success: ìsUserValid,
    message,
  })
}
