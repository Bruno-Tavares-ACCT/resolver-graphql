import { MasterData } from '@vtex/api'

import type {
  CreateParams,
  MasterDataVersionType,
  OptionsCreateDocumentType,
} from '../src/types/registerLogType'
import type { DocumentResponse } from '../src/types/masterDataPromiseType'
import { getCredentials } from '../src/helpers/getCredentials'
import type { DebugSettingsType } from '../src/types/appSettingsType'

// Extend the default IOClients implementation with our own custom clients.
export default class CreateLog extends MasterData {
  private getOptions(
    debugSettings: DebugSettingsType,
    masterDataVersion: MasterDataVersionType
  ): OptionsCreateDocumentType | null {
    switch (masterDataVersion) {
      case 'v1':
        if (debugSettings?.dataEntityV1) {
          return {
            dataEntity: debugSettings?.dataEntityV1,
          }
        }

        return null

      case 'v2':
        if (debugSettings?.dataEntityV2 && debugSettings?.schema) {
          return {
            dataEntity: debugSettings.dataEntityV2,
            schema: debugSettings.schema,
          }
        }

        return null

      default:
        return null
    }
  }

  public async create({
    logInput,
    masterDataVersion = 'v2',
    ctx,
  }: CreateParams): Promise<DocumentResponse | boolean> {
    const { debugSettings } = await getCredentials(ctx)

    try {
      if (!debugSettings || !debugSettings?.debugMode) {
        return false
      }

      const options = this.getOptions(debugSettings, masterDataVersion)

      if (!options) return false

      const resp = await this.createDocument({
        fields: {
          ...logInput,
        },
        ...options,
      })

      return resp
    } catch (error) {
      throw new Error(`error into log register: ${error}`)
    }
  }
}
