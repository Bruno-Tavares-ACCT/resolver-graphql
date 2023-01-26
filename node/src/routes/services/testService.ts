/* eslint-disable @typescript-eslint/no-explicit-any */
type TestServiceParams = {
  data: any
  message: string
}
export const testService = (): TestServiceParams => {
  return {
    data: {
      teste: 'objectTeste',
    },
    message: 'Message Teste',
  }
}
