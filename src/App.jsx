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
  InvoiceEmp,
  OrderEmp,
  ReservationEmp,
  Admin,
  VerifyEmail
} from '~/routes'
import { CartProvider } from '~/contexts/CartContext'
import { gql, useQuery } from '@apollo/client'
import { AuthProvider } from '~/contexts/AuthContext'

const CHECK_TOKEN = gql`
  query checkToken($token: String!) {
    checkToken(token: $token) {
      token
    }
  }
`
const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    customer(id: $id) {
      customer_id
      username
      name
      email
      phone
      birthday
      points
      level {
        level_id
        name
      }
      address {
        address_id
        address
      }
      orders {
        order_id
        tsid
        customer {
          name
          phone
        }
        status
        delivery_address
        voucher_id
        transport_fee
        payment_method
        payment_status
        total_price
        note
        order_details {
          order_detail_id
          tsid
          item {
            name
            image
          }
          quantity
          unit_price
          total_price
        }
        created_at
      }
      point_histories {
        tsid
        order {
          order_id
          tsid
        }
        voucher {
          voucher_id
        }
        points_earned
        points_deducted
        transaction_date
      }
    }
  }
`

const GET_EMPLOYEE = gql`
  query getEmployee($id: ID!) {
    employee(id: $id) {
      employee_id
      name
      gender
      email
      phone
      address
      birthday
      position {
        position_id
        name
        salary
      }
      status
      is_admin
      username
    }
  }
`

const imagesGallery = [Space1, Space2, Space3, Food1, Food2, HomePic2]

const App = () => {
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  const bgColorStaff = useThemeModeValue('#fff', '#0a0118')
  const token = localStorage.getItem('token')

  const { loading, error, data } = useQuery(CHECK_TOKEN, {
    skip: !token, // Skip this query if no token.
    variables: {
      token
    }
  })

  useEffect(() => {
    if (!loading && !data?.checkToken) {
      ErrorLogin()
      localStorage.removeItem('token')
      localStorage.removeItem('login')
      sessionStorage.removeItem('checkout-information')
    }
  }, [loading, data])

  const {
    loading: customerLoading,
    error: customerError,
    data: customerData
  } = useQuery(GET_CUSTOMER, {
    variables: {
      id: localStorage.getItem('token')
    }
  })

  const {
    loading: employeeLoading,
    error: employeeError,
    data: employeeData
  } = useQuery(GET_EMPLOYEE, {
    variables: {
      id: localStorage.getItem('tokenEmp')
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
                  path='/employee/invoice'
                  element={<InvoiceEmp employee={employee} />}
                />
                <Route
                  path='/employee/order'
                  element={<OrderEmp employee={employee} />}
                />
                <Route
                  path='/employee/reservation'
                  element={<ReservationEmp employee={employee} />}
                />
                <Route
                  path='/employee/*'
                  element={<InvoiceEmp employee={employee} />}
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
