import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [curruser, setCurruser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load, silently check if session is still alive
  useEffect(() => {
    api.get('/auth/me')
      .then(res => {
        if (res.data?.user) setCurruser(res.data.user)
        else setCurruser(null)
      })
      .catch(() => {
        // 401 = not logged in — perfectly normal, not an error
        setCurruser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = (user) => setCurruser(user)
  const logout = () => setCurruser(null)

  return (
    <AuthContext.Provider value={{ curruser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
