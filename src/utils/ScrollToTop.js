import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/menu/') || pathname.startsWith('/order-online/'))
      return

    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
