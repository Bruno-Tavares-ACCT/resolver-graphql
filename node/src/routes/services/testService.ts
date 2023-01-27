/* eslint-disable @typescript-eslint/no-explicit-any */
type TestServiceParams = {
  data: any
  message: string
}
export const testService = async (): Promise<TestServiceParams> => {
  return {
    data: {
      teste: 'objectTeste',
    },
    message: 'Message Teste',
  }
}
