import { createContext, useContext, useState, useCallback } from 'react'

const FlashContext = createContext(null)

export function FlashProvider({ children }) {
  const [flash, setFlash] = useState({ success: '', error: '' })

  const showSuccess = useCallback((msg) => {
    setFlash({ success: msg, error: '' })
    setTimeout(() => setFlash({ success: '', error: '' }), 4000)
  }, [])

  const showError = useCallback((msg) => {
    setFlash({ success: '', error: msg })
    setTimeout(() => setFlash({ success: '', error: '' }), 4000)
  }, [])

  const clearFlash = useCallback(() => {
    setFlash({ success: '', error: '' })
  }, [])

  return (
    <FlashContext.Provider value={{ flash, showSuccess, showError, clearFlash }}>
      {children}
    </FlashContext.Provider>
  )
}

export function useFlash() {
  return useContext(FlashContext)
}
