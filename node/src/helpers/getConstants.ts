type ConstantsTypes = {
  URL_DOMAIN: string
}

export function getConstants(ctx: Context): ConstantsTypes {
  const ACCOUNT = ctx.vtex.account
  const WS = ctx.vtex.workspace
  const URL_DOMAIN = process.env.VTEX_PRODUCTION
    ? `https://${ACCOUNT}.vtexcommercestable.com.br`
    : `https://${WS}--${ACCOUNT}.myvtex.com`

  return {
    URL_DOMAIN,
  }
}
