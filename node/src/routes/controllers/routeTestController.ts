import { setUnknownError } from '../../helpers/setUnknownError'
import { alternativeTokenValidation } from '../services/alternativeTokenValidation'

export const routeTestController = async (ctx: Context) => {
  try {
    await alternativeTokenValidation(ctx)
  } catch (err) {
    setUnknownError(ctx, err)
  }
}
