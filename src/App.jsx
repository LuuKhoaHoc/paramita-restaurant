import { Routes, Route, Outlet } from 'react-router-dom'
import { Box, useThemeModeValue } from '@prismane/core'
import React, { Suspense, useEffect } from 'react'
// utils
import ScrollToTop from '~/utils/ScrollToTop'
import {
  Footer,
  Loading,
  Navbar,
  ToggleMode,
  SmallBookTable,
  SmallGallery,
  ScrollToTop as ScrollToTopButton,
  ErrorLogin,
  LoginRoute
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
  CheckoutSuccess,
  OrderCategory,
  AuthEmp,
  Admin,
  VerifyEmail,
  Employee
} from '~/routes'
import { CartProvider } from '~/contexts/CartContext'
import { gql, useQuery } from '@apollo/client'
import { AuthProvider } from '~/contexts/AuthContext'
import { CHECK_TOKEN, GET_CUSTOMER, GET_EMPLOYEE } from '~/utils/appSchema'

const imagesGallery = [Space1, Space2, Space3, Food1, Food2, HomePic2]

const App = () => {
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  const bgColorStaff = useThemeModeValue('#fff', '#0a0118')
  const token =
    localStorage.getItem('token') || localStorage.getItem('tokenEmp') || ''

  const { loading, error, data } = useQuery(CHECK_TOKEN, {
    skip: !token, // Skip this query if no token.
    variables: {
      token
    }
  })

  useEffect(() => {
    if ((!loading && !data?.checkToken) || error) {
      ErrorLogin()
      localStorage.removeItem('token')
      localStorage.removeItem('tokenEmp')
      localStorage.removeItem('login')
      localStorage.removeItem('loginEmp')
      sessionStorage.removeItem('checkout-information')
    }
  }, [loading, data])
  useEffect(() => {
    if (
      !sessionStorage.getItem('loginEmp') ||
      !localStorage.getItem('tokenEmp')
    ) {
      localStorage.removeItem('tokenEmp')
    }
  }, [])

  const {
    loading: customerLoading,
    error: customerError,
    data: customerData
  } = useQuery(GET_CUSTOMER, {
    variables: {
      id: token
    }
  })

  const {
    loading: employeeLoading,
    error: employeeError,
    data: employeeData
  } = useQuery(GET_EMPLOYEE, {
    variables: {
      id: token
    }
  })

  window.addEventListener('storage', function (e) {
    if (e.key === 'token' || e.key === 'login' || e.key === 'tokenEmp') {
      ErrorLogin()
      localStorage.removeItem('login')
      localStorage.removeItem('token')
      sessionStorage.clear()
      window.location.reload()
    }
  })
  const customer = customerData?.customer
  const employee = employeeData?.employee
  if (loading) return <Loading />
  if (customerLoading || employeeLoading) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <Box bg={!employee ? bgColor : bgColorStaff} cl={textColor}>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            {!employee && <Navbar customer={customer} />}
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
                <Route
                  path='/order-online/:category'
                  element={<OrderCategory />}
                />
                <Route path='/contact' element={<Contact />} />
                <Route path='/book-table' element={<BookTable />} />
              </Route>
              <Route path='/menu' element={<Menu />} />
              <Route path='/menu/:category' element={<MenuCategory />} />
              <Route
                path='/menu/:category/:item'
                element={<MenuItemDetail />}
              />
              <Route path='/album' element={<Album />} />
              <Route path='/album/:album' element={<AlbumDetail />} />
              <Route path='/career' element={<Career />} />
              <Route path='/privacy' element={<Privacy />} />
              <Route path='/term' element={<TermOfUse />} />
              <Route path='/faq' element={<FAQ />} />
              <Route element={<Auth />}>
                <Route
                  path='/account'
                  element={<Account customer={customer} />}
                />
                <Route
                  path='/account/*'
                  element={<Account customer={customer} />}
                />
                <Route path='/cart' element={<Cart />} />
                <Route
                  path='/checkout'
                  element={<Checkout customer={customer} />}
                />
                <Route
                  path='/checkout-success'
                  element={<CheckoutSuccess customer={customer} />}
                />
              </Route>
              <Route element={<AuthEmp employee={employee} />}>
                <Route path='/admin' element={<Admin employee={employee} />} />
                <Route
                  path='/admin/*'
                  element={<Admin employee={employee} />}
                />
                <Route
                  path='/employee'
                  element={<Employee employee={employee} />}
                />
                <Route
                  path='/employee/*'
                  element={<Employee employee={employee} />}
                />
              </Route>
              <Route element={<LoginRoute />}>
                <Route path='/login' element={<Login />} />
              </Route>
              <Route path='/register' element={<Register />} />
              <Route path='/verify-email' element={<VerifyEmail />} />
              <Route path='/verify-email/*' element={<VerifyEmail />} />
              <Route path='/forgot-password/*' element={<ForgotPassword />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </CartProvider>
          {!employee && <Footer />}
        </AuthProvider>
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
