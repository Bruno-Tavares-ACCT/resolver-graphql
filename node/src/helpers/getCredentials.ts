import { Apps } from '@vtex/api'

import type { AppSettings } from '../types/appSettingsType'

export async function getCredentials(ctx: Context): Promise<AppSettings> {
  const options = { timeout: 8000 }
  const app = new Apps(ctx.vtex, options)

  return (await app.getAppSettings(
    process.env.VTEX_APP_ID ?? ''
  )) as AppSettings
}
