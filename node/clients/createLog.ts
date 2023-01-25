import { MasterData } from '@vtex/api'

import type { CreateParams } from '../src/types/registerLogType'
import type { DocumentResponse } from '../src/types/masterDataPromiseType'
import { getCredentials } from '../src/helpers/getCredentials'

// Extend the default IOClients implementation with our own custom clients.
export default class CreateLog extends MasterData {
  public async create({
    logInput,
    ctx,
  }: CreateParams): Promise<DocumentResponse | boolean> {
    const { debugSettings } = await getCredentials(ctx)

    try {
      if (
        !debugSettings ||
        !debugSettings?.debugMode ||
        !debugSettings?.dataEntity ||
        !debugSettings?.schema
      ) {
        return false
      }

      const resp = await this.createDocument({
        fields: {
          created: new Date().toISOString(),
          ...logInput,
        },
        dataEntity: debugSettings.dataEntity,
        schema: debugSettings.schema,
      })

      return resp
    } catch (error) {
      throw new Error(`error into log register: ${error}`)
    }
  }
}
