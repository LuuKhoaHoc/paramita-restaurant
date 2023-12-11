import { Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import lazyWithPreload from 'react-lazy-with-preload'
// utils
import ScrollToTop from './utils/ScrollToTop'
import { Loading, Navbar } from './components'

// routes
const Home = lazyWithPreload(() => import('./pages/Home/Home'))
const AboutUs = lazyWithPreload(() => import('./pages/AboutUs/AboutUs'))
const Album = lazyWithPreload(() => import('./pages/Album/Album'))
const BookTable = lazyWithPreload(() => import('./pages/BookTable/BookTable'))
const Contact = lazyWithPreload(() => import('./pages/Contact/Contact'))
const Menu = lazyWithPreload(() => import('./pages/Menu/Menu'))
const Order = lazyWithPreload(() => import('./pages/Order/Order'))
const Auth = lazyWithPreload(() => import('./pages/Auth/Auth'))
const Login = lazyWithPreload(() => import('./pages/Auth/Login/Login'))
const Register = lazyWithPreload(() => import('./pages/Auth/Register/Register'))

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/album' element={<Album />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/order-online' element={<Order />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/book-table' element={<BookTable />} />
        <Route element={<Auth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
