type GetDefaultResponseParams = {
  success: boolean
  message?: string
  data?: any
}

export const getDefaultResponse = ({
  data,
  message,
  success,
}: GetDefaultResponseParams) => {
  const response: Record<string, any> = {}

  if (message) response.message = message

  if (data) response.data = data

  return {
    success,
    ...response,
  }
}
