import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const isAuth =
    sessionStorage.getItem('login') === 'true' ||
    localStorage.getItem('login') === 'true'

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}

export default Auth
