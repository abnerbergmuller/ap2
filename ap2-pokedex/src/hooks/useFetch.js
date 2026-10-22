import { useCallback, useEffect, useState } from 'react'

// Hook genérico de requisições GET (JSON).
// Se `url` for null/undefined, nenhuma requisição é feita.
function useFetch(url) {
  // Guarda o resultado junto da requisição (url + tentativa) a que ele pertence
  const [result, setResult] = useState({ key: null, data: null, error: null })
  const [attempt, setAttempt] = useState(0)

  // Incrementar `attempt` refaz o effect abaixo
  const refetch = useCallback(() => setAttempt((n) => n + 1), [])

  const key = url ? `${url}#${attempt}` : null

  useEffect(() => {
    if (!key) return undefined

    // AbortController cancela a requisição anterior se a url mudar ou o componente desmontar
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

  // Enquanto o resultado guardado não for da requisição atual, está carregando
  const isCurrent = result.key === key
  return {
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    loading: Boolean(key) && !isCurrent,
    refetch,
  }
}

export default useFetch
