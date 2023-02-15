// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getByTypeError = (error: any) => {
  if (error?.message) return error.message
  if (typeof error === 'object') return JSON.stringify(error)

  return error
}
