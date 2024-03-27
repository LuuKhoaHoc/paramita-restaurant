import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '~/contexts/AuthContext'

const AuthEmp = ({ employee }) => {
  const { isLoggedIn } = useContext(AuthContext)
  return isLoggedIn ||
    sessionStorage.getItem('loginEmp') ||
    (localStorage.getItem('loginEmp') &&
      localStorage.getItem('tokenEmp') &&
      employee?.is_admin) ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} />
  )
}

export default AuthEmp
