export interface LogInput {
  step: string
  content: string
}

export interface CreateParams {
  logInput: LogInput
  ctx: Context
}
