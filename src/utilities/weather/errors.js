export const extractApiErrorMessage = (error, fallback = 'Unexpected error') => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  )
}
