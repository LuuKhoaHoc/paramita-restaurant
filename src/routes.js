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
const Auth = lazyWithPreload(() => import('~/pages/Auth/Auth'))
const Login = lazyWithPreload(() => import('~/pages/Auth/Login/Login'))
const Register = lazyWithPreload(() => import('~/pages/Auth/Register/Register'))
const ForgotPassword = lazyWithPreload(() =>
  import('~/pages/Auth/ForgotPassword/ForgotPassword')
)

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
  Auth,
  Login,
  Register,
  ForgotPassword
}
