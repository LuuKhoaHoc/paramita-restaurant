import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '~/contexts/AuthContext'

const AuthEmp = ({ employee }) => {
  const { isLoggedIn, token } = useContext(AuthContext)
  const isAuth =
    (isLoggedIn ||
      sessionStorage.getItem('loginEmp') ||
      localStorage.getItem('loginEmp')) &&
    localStorage.getItem('tokenEmp') === token
  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}

export default AuthEmp
