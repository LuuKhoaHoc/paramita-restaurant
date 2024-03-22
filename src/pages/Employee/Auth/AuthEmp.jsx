import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '~/contexts/AuthContext'

const AuthEmp = ({ employee }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const isAuth =
    (isLoggedIn ||
      sessionStorage.getItem('loginEmp') ||
      localStorage.getItem('loginEmp')) &&
    localStorage.getItem('tokenEmp')
  const isAuthAdmin = employee?.is_admin && isAuth
  return isAuth || isAuthAdmin ? <Outlet /> : <Navigate to={'/login'} />
}

export default AuthEmp
