import { useState } from 'react'

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const fetching = async (...args) => {
    try {
      setIsLoading(true)
      setIsLoaded(false)
      await callback(...args)
      setIsLoaded(true)
      setError(false)
    } catch (e) {
      setError(e.message)
      setIsLoaded(false)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, isLoaded, error]
}
