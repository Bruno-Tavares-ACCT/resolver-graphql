/* eslint-disable @typescript-eslint/no-explicit-any */
export const setUnknownError = (ctx: Context, error: any) => {
  console.error('Unknown erro => ', error)

  ctx.status = 500
  ctx.body = `Unknown error, contact support`
}
