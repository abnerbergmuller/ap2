import { useCallback, useEffect, useState } from 'react'

function useFetch(url) {
  const [result, setResult] = useState({ key: null, data: null, error: null })
  const [attempt, setAttempt] = useState(0)

  const refetch = useCallback(() => setAttempt((n) => n + 1), [])

  const key = url ? `${url}#${attempt}` : null

  useEffect(() => {
    if (!key) return undefined

    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Erro HTTP ${response.status}`)
        return response.json()
      })
      .then((json) => setResult({ key, data: json, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setResult({ key, data: null, error: err.message })
      })

    return () => controller.abort()
  }, [url, key])

  const isCurrent = result.key === key
  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: Boolean(key) && !isCurrent,
    refetch,
  }
}

export default useFetch
