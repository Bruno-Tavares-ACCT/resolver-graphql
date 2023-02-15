import { getByTypeError } from './getByTypeError'
import { getDefaultResponse } from './getDefaultResponse'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const setUnknownError = async (ctx: Context, error: any) => {
  const { logClient } = ctx.clients

  await logClient.create({
    ctx,
    logInput: {
      content: getByTypeError(error),
      step: 'Unknown Error',
    },
  })

  ctx.status = 500
  ctx.body = getDefaultResponse({
    success: false,
    message: `Unknown error, contact support`,
  })
}
