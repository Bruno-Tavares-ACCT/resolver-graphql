export type MasterDataVersionType = 'v1' | 'v2'

export interface CreateParams {
  logInput: Record<string, any>
  masterDataVersion?: MasterDataVersionType
  ctx: Context
}

export type OptionsCreateDocumentType = {
  dataEntity: string
  schema?: string
}
