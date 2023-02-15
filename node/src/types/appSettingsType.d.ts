export interface DebugSettingsType {
  debugMode?: boolean
  dataEntityV1?: string
  dataEntityV2?: string
  schema?: string
}

export interface AppSettings {
  alternativeAccessToken?: string
  templateNameEmailWithdraw: string
  debugSettings?: DebugSettingsType
}
