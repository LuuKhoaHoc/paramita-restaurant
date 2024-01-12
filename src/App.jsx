import { Routes, Route, Outlet } from 'react-router-dom'
import { Box, useThemeModeValue } from '@prismane/core'
import React, { Suspense } from 'react'
// utils
import ScrollToTop from '~/utils/ScrollToTop'
import {
  Footer,
  Loading,
  Navbar,
  ToggleMode,
  SmallBookTable,
  SmallGallery,
  ScrollToTop as ScrollToTopButton
} from '~/components'
import { Food1, Food2, HomePic2, Space1, Space2, Space3 } from '~/images'
// routes
import {
  Home,
  AboutUs,
  Promotion,
  PromotionDetail,
  Order,
  Cart,
  Contact,
  BookTable,
  MenuCategory,
  MenuItemDetail,
  Album,
  AlbumDetail,
  Career,
  Privacy,
  TermOfUse,
  FAQ,
  Auth,
  Login,
  Register,
  ForgotPassword,
  Menu,
  Error,
  Account,
  Checkout,
  CheckoutSuccess
} from '~/routes'
import { CartProvider } from '~/contexts/CartContext'

const imagesGallery = [Space1, Space2, Space3, Food1, Food2, HomePic2]

const App = () => {
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  return (
    <Suspense fallback={<Loading />}>
      <Box bg={bgColor} cl={textColor}>
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route element={<Addition />}>
              <Route path='/' index element={<Home />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/promotion' element={<Promotion />} />
              <Route
                path='/promotion/:promotion'
                element={<PromotionDetail />}
              />
              <Route path='/order-online' element={<Order />} />
              <Route path='/order-online/:category' element={<Order />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/book-table' element={<BookTable />} />
            </Route>
            <Route path='/menu' element={<Menu />} />
            <Route path='/menu/:category' element={<MenuCategory />} />
            <Route path='/menu/:category/:item' element={<MenuItemDetail />} />
            <Route path='/album' element={<Album />} />
            <Route path='/album/:album' element={<AlbumDetail />} />
            <Route path='/career' element={<Career />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/term' element={<TermOfUse />} />
            <Route path='/faq' element={<FAQ />} />
            <Route element={<Auth />}>
              <Route path='/account' element={<Account />} />
              <Route path='/account/*' element={<Account />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/checkout-success' element={<CheckoutSuccess />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </CartProvider>
        <Footer />
        <ScrollToTopButton />
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
