import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const isAuth = false

  return isAuth ? <Navigate to={'/'} /> : <Outlet />
}

export default Auth
