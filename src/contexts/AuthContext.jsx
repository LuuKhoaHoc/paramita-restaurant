import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  token: '',
  setToken: () => {}
})

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
