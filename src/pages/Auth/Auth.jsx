import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'

const Auth = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const isAuth = isLoggedIn || localStorage.getItem('login') === 'true'

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}

export default Auth
