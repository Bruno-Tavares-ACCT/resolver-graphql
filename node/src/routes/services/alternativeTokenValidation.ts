import { getCredentials } from '../../helpers/getCredentials'
import { getDefaultResponse } from '../../helpers/getDefaultResponse'

export const alternativeTokenValidation = async (ctx: Context) => {
  const { alternativeTokenIsValid } = await getCredentials(ctx)

  ctx.status = alternativeTokenIsValid ? 204 : 401

  const message = alternativeTokenIsValid
    ? 'User validated by alternative token'
    : 'User not validated by alternative token'

  ctx.body = getDefaultResponse({
    success: alternativeTokenIsValid,
    message,
  })
}
