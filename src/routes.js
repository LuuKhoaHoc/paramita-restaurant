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
const Cart = lazyWithPreload(() => import('~/pages/Cart/Cart'))
const Checkout = lazyWithPreload(() => import('~/pages/Checkout/Checkout'))
const Auth = lazyWithPreload(() => import('~/pages/Auth/Auth'))
const Login = lazyWithPreload(() => import('~/pages/Auth/Login/Login'))
const Register = lazyWithPreload(() => import('~/pages/Auth/Register/Register'))
const ForgotPassword = lazyWithPreload(() =>
  import('~/pages/Auth/ForgotPassword/ForgotPassword')
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
  Cart,
  Checkout,
  Auth,
  Login,
  Register,
  ForgotPassword,
  Account,
  AccountAddresses,
  AccountHistory,
  AccountOrders,
  ChangePassword,
  Error
}
