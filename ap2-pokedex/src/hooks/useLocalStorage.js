import { useEffect, useState } from 'react'

// Hook genérico: funciona como useState, mas persiste o valor no localStorage
function useLocalStorage(key, initialValue) {
  // Lê o valor salvo só na primeira renderização; JSON inválido cai no valor inicial
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  // Grava sempre que o valor (ou a chave) mudar
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage cheio ou bloqueado: o app continua funcionando sem persistir
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
