import lazyWithPreload from 'react-lazy-with-preload'

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
const OrderCategory = lazyWithPreload(() =>
  import('~/pages/Order/OrderCategory')
)
const Cart = lazyWithPreload(() => import('~/pages/Cart/Cart'))
const Checkout = lazyWithPreload(() => import('~/pages/Checkout/Checkout'))
const CheckoutSuccess = lazyWithPreload(() =>
  import('~/pages/Checkout/CheckoutSuccess/CheckoutSuccess')
)
const Auth = lazyWithPreload(() => import('~/pages/Auth/Auth'))
const Login = lazyWithPreload(() => import('~/pages/Auth/Login/Login'))
const Register = lazyWithPreload(() => import('~/pages/Auth/Register/Register'))
const ForgotPassword = lazyWithPreload(() =>
  import('~/pages/Auth/ForgotPassword/ForgotPassword')
)
const VerifyPin = lazyWithPreload(() =>
  import('~/pages/Auth/ForgotPassword/VerifyPin/VerifyPin')
)
const Account = lazyWithPreload(() => import('~/pages/Auth/Account/Account'))
const AccountAddresses = lazyWithPreload(() =>
  import('~/pages/Auth/Account/AccountAddresses/AccountAddresses')
)
const AccountHistory = lazyWithPreload(() =>
  import('~/pages/Auth/Account/AccountHistory/AccountHistory')
)
const AccountOrders = lazyWithPreload(() =>
  import('~/pages/Auth/Account/AccountOrders/AccountOrders')
)
const ChangePassword = lazyWithPreload(() =>
  import('~/pages/Auth/Account/ChangePassword/ChangePassword')
)
const Error = lazyWithPreload(() => import('~/pages/Error/Error'))
const AuthEmp = lazyWithPreload(() => import('~/pages/Employee/Auth/AuthEmp'))
const InvoiceEmp = lazyWithPreload(() =>
  import('~/pages/Employee/Invoice/InvoiceEmp')
)
const OrderEmp = lazyWithPreload(() =>
  import('~/pages/Employee/Order/OrderEmp')
)
const ReservationEmp = lazyWithPreload(() =>
  import('~/pages/Employee/Reservation/ReservationEmp')
)
const Admin = lazyWithPreload(() => import('~/pages/Admin/Admin'))

export {
  Home,
  AboutUs,
  Album,
  AlbumDetail,
  Promotion,
  PromotionDetail,
  BookTable,
  Contact,
  Menu,
  MenuCategory,
  MenuItemDetail,
  Career,
  Privacy,
  TermOfUse,
  FAQ,
  Order,
  OrderCategory,
  Cart,
  Checkout,
  CheckoutSuccess,
  Auth,
  Login,
  Register,
  ForgotPassword,
  VerifyPin,
  Account,
  AccountAddresses,
  AccountHistory,
  AccountOrders,
  ChangePassword,
  Error,
  AuthEmp,
  InvoiceEmp,
  OrderEmp,
  ReservationEmp,
  Admin
}
