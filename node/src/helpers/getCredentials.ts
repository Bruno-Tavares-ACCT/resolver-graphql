import { Apps } from '@vtex/api'

import type {
  AppSettings,
  GetCredentialsParams,
} from '../types/appSettingsType'

export async function getCredentials(
  ctx: Context
): Promise<AppSettings & GetCredentialsParams> {
  const options = { timeout: 8000 }
  const app = new Apps(ctx.vtex, options)

  const appSettings: AppSettings = await app.getAppSettings(
    process.env.VTEX_APP_ID ?? ''
  )

  const headerAuthorization = ctx.request.headers.authorization

  return {
    alternativeTokenIsValid:
      headerAuthorization === `Bearer ${appSettings.alternativeAccessToken}`,
    ...appSettings,
  }
}
