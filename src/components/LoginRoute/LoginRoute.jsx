import { Navigate, Outlet } from 'react-router-dom'

function LoginRoute() {
  const token =
    localStorage.getItem('token') || localStorage.getItem('tokenEmp')

  return token ? <Navigate to={'/'} /> : <Outlet />
}
export default LoginRoute
