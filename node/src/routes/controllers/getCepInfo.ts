import { json } from 'co-body'
import { getDefaultResponse } from '../../helpers/getDefaultResponse'
import { securityCheck } from '../../helpers/securityCheck'
import { setUnknownError } from '../../helpers/setUnknownError'

export const getCepInfo = async (ctx: Context) => {
  try {
    
    const {
      clients: {
        cep
      }
    } = ctx
    
    const isUserValid = await securityCheck({
      ctx,
      accessType: ['ADMIN']
    })
    
    if (!isUserValid) {
      ctx.status = 401
      ctx.body = getDefaultResponse({
        success: false,
        message: 'User not validated by alternative token',
      })
      
      return
    }
    
    const data = await json(ctx.req)
    
    const cepData = await cep.getCep(data.cep)
    
    ctx.status = 200
    ctx.body = {
      status: ctx.status,
      cepData
    }
    
  } catch (err) {
    setUnknownError(ctx, err)
  }
}
