import { Routes, Route, Outlet } from 'react-router-dom'
import React, { Suspense } from 'react'
import lazyWithPreload from 'react-lazy-with-preload'
// utils
import ScrollToTop from '~/utils/ScrollToTop'
import {
  Footer,
  Loading,
  Navbar,
  ToggleMode,
  SmallBookTable,
  SmallGallery
} from '~/components'
import { Food1, Food2, HomePic2, Space1, Space2, Space3 } from '~/images'
import { Box, useThemeModeValue } from '@prismane/core'

// routes
const Home = lazyWithPreload(() => import('~/pages/Home/Home'))
const AboutUs = lazyWithPreload(() => import('~/pages/AboutUs/AboutUs'))
const Album = lazyWithPreload(() => import('~/pages/Album/Album'))
const AlbumDetail = lazyWithPreload(() =>
  import('~/pages/Album/AlbumDetail/AlbumDetail')
)
const Promotion = lazyWithPreload(() => import('~/pages/Promotion/Promotion'))
const PromotionDetail = lazyWithPreload(() =>
  import('~/pages/Promotion/PromotionDetail/PromotionDetail')
)
const BookTable = lazyWithPreload(() => import('~/pages/BookTable/BookTable'))
const Contact = lazyWithPreload(() => import('~/pages/Contact/Contact'))
const Menu = lazyWithPreload(() => import('~/pages/Menu/Menu'))
const MenuCategory = lazyWithPreload(() =>
  import('~/pages/Menu/MenuCategory/MenuCategory')
)
const MenuItemDetail = lazyWithPreload(() =>
  import('~/pages/Menu/MenuListItem/MenuItem/MenuItemDetail/MenuItemDetail')
)
const Career = lazyWithPreload(() => import('~/pages/Career/Career'))
const Privacy = lazyWithPreload(() => import('~/pages/Privacy/Privacy'))
const TermOfUse = lazyWithPreload(() => import('~/pages/TermOfUse/TermOfUse'))
const FAQ = lazyWithPreload(() => import('~/pages/FAQ/FAQ'))
const Order = lazyWithPreload(() => import('~/pages/Order/Order'))
const Auth = lazyWithPreload(() => import('~/pages/Auth/Auth'))
const Login = lazyWithPreload(() => import('~/pages/Auth/Login/Login'))
const Register = lazyWithPreload(() => import('~/pages/Auth/Register/Register'))
const ForgotPassword = lazyWithPreload(() =>
  import('~/pages/Auth/ForgotPassword/ForgotPassword')
)
const imagesGallery = [Space1, Space2, Space3, Food1, Food2, HomePic2]

const App = () => {
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  return (
    <Suspense fallback={<Loading />}>
      <Box bg={bgColor} cl={textColor}>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route element={<Addition />}>
            <Route path='/' index element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/promotion' element={<Promotion />} />
            <Route path='/promotion/:promotion' element={<PromotionDetail />} />
            <Route path='/order-online' element={<Order />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/book-table' element={<BookTable />} />
          </Route>
          <Route path='/menu' element={<Menu />} />
          <Route path='/menu/:category' element={<MenuCategory />} />
          <Route path='/menu/:category/:item' element={<MenuItemDetail />} />
          <Route path='/album' element={<Album />} />
          <Route path='/album/:album' element={<AlbumDetail />} />
          <Route path='/career' element={<Career />} />
          <Route path='/privacy' element={<Privacy/>} />
          <Route path='/term' element={<TermOfUse/>} />
          <Route path='/faq' element={<FAQ/>} />
          <Route element={<Auth />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<Home />} />
        </Routes>
        <Footer />
        <ToggleMode />
      </Box>
    </Suspense>
  )
}
const Addition = () => (
  <>
    <Outlet />
    <SmallBookTable />
    <SmallGallery images={imagesGallery} />
  </>
)

export default App
