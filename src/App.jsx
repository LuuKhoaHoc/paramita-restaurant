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
  ScrollToTop as ScrollToTopButton,
  ErrorLogin
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
  HomeEmp
} from '~/routes'
import { CartProvider } from '~/contexts/CartContext'
import { gql, useQuery } from '@apollo/client'
import { AuthProvider } from './contexts/AuthContext'

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

function getCustomer() {
  const { loading, error, data } = useQuery(GET_CUSTOMER, {
    variables: {
      id: localStorage.getItem('token')
    }
  })
  if (loading) return <Loading />
  if (error) return <p>Error : {error.message}</p>
  return data
}
function getEmployee() {
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: {
      id: localStorage.getItem('tokenEmp')
    }
  })
  if (loading) return <Loading />
  if (error) return <p>Error : {error.message}</p>
  return data
}

const App = () => {
  const { customer } = getCustomer()
  const { employee } = getEmployee()
  console.log('🚀 ~ App ~ employee:', employee)
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  const bgColorStaff = useThemeModeValue('#fff', '#0a0118')
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const { loading, error, data } = useQuery(CHECK_TOKEN, {
      variables: {
        token
      }
    })
    if (loading) return <Loading />
    if (data === undefined) {
      ErrorLogin()
      localStorage.removeItem('token')
    }
  } else {
    ErrorLogin()
    localStorage.removeItem('login')
    sessionStorage.removeItem('checkout-information')
  }

  window.addEventListener('storage', function (e) {
    if (e.key === 'token' || e.key === 'login') {
      ErrorLogin()
      localStorage.removeItem('login')
      localStorage.removeItem('token')
      sessionStorage.clear()
      window.location.reload()
    }
  })
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
              <Route element={<AuthEmp />}>
                <Route
                  path='/employee/home'
                  element={<HomeEmp customer={customer} />}
                />
                <Route
                  path='/employee/*'
                  element={<HomeEmp customer={customer} />}
                />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
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
