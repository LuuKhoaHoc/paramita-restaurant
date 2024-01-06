// route
import { Link, NavLink } from 'react-router-dom'
// core
import {
  Box,
  Flex,
  Image,
  Center,
  Button,
  Header,
  Grid,
  Icon,
  fr,
  Menu,
  Divider,
  useThemeModeValue,
  Badge
} from '@prismane/core'
// img
import { LogoText } from '~/images'
// utils
import lazyWithPreload from 'react-lazy-with-preload'
import { useEffect, useState, useContext } from 'react'
import {
  ClockCountdown,
  ListChecks,
  ShoppingCartSimple,
  SignOut,
  User
} from '@phosphor-icons/react'

const Home = lazyWithPreload(() => import('~/pages/Home/Home'))
const AboutUs = lazyWithPreload(() => import('~/pages/AboutUs/AboutUs'))
const Promotion = lazyWithPreload(() => import('~/pages/Promotion/Promotion'))
const BookTable = lazyWithPreload(() => import('~/pages/BookTable/BookTable'))
const Contact = lazyWithPreload(() => import('~/pages/Contact/Contact'))
const Menus = lazyWithPreload(() => import('~/pages/Menu/Menu'))
const Order = lazyWithPreload(() => import('~/pages/Order/Order'))
const Login = lazyWithPreload(() => import('~/pages/Auth/Login/Login'))

import { CartContext } from '~/contexts/CartContext'

const Navbar = () => {
  // Số lượng item trong cart
  const { cartItems } = useContext(CartContext)
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  // Kiểm tra đăng nhập
  const [login, setLogin] = useState(false)
  // State cho menu
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('login') === 'true') {
      setLogin(true)
    }
  }, [])
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  // animation line cho navLink
  const lineAnimation = {
    '&::before': {
      content: '',
      width: '100%',
      height: '4px',
      borderRadius: '2px',
      backgroundColor: 'primary',
      bottom: '-5px',
      left: 0,
      transformOrigin: 'right',
      transform: 'scaleX(0)',
      transition: 'transform 0.2s ease-in-out'
    },
    '&:hover::before': {
      transformOrigin: 'left',
      transform: 'scaleX(1)'
    }
  }
  // Hàm xử lý navbar khi scroll
  const handleScroll = () => {
    const header = document.getElementById('header')
    if (document.documentElement.scrollTop > 10) {
      header.style.boxShadow =
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      header.style.backdropFilter = 'blur(10px)'
    } else if (document.documentElement.scrollTop > innerHeight) {
    } else {
      header.style.boxShadow = 'none'
      header.style.backdropFilter = 'none'
    }
  }

  window.addEventListener('scroll', handleScroll)
  const handleLogout = () => {
    sessionStorage.clear()
    setLogin(false)
  }

  return (
    <Grid
      id='header'
      templateColumns={12}
      w={'100%'}
      h={'max-content'}
      pos={'fixed'}
      t={0}
      z={100}
    >
      <Grid.Item columnStart={3} columnEnd={11}>
        <Header z={1}>
          <Flex
            ff={"'GeomanistMedium', sans-serif"}
            w='100%'
            justify='between'
            h={fr(22.5)}
            fs={'lg'}
          >
            <Box
              cs={'pointer'}
              bg={'#371B04'}
              sx={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px'
              }}
            >
              <NavLink to={'/'} onMouseOver={() => Home.preload()}>
                <Center w={160} h={'100%'}>
                  <Image
                    w={130}
                    src={LogoText}
                    alt='Paramita Logo'
                    fit='contain'
                  />
                </Center>
              </NavLink>
            </Box>
            <Box w={'100%'}>
              <Flex justify='around' align='center' h={'100%'}>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={['#fff', { hover: ['primary', 100] }]}
                  sx={lineAnimation}
                >
                  <NavLink to={'/about'} onMouseOver={() => AboutUs.preload()}>
                    Tìm hiểu
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={['#fff', { hover: ['primary', 100] }]}
                  sx={lineAnimation}
                >
                  <NavLink
                    to={'/promotion'}
                    onMouseOver={() => Promotion.preload()}
                  >
                    Khuyến mãi{' '}
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={['#fff', { hover: ['primary', 100] }]}
                  sx={lineAnimation}
                >
                  <NavLink
                    to={'/book-table'}
                    onMouseOver={() => BookTable.preload()}
                  >
                    Đặt bàn{' '}
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={['#fff', { hover: ['primary', 100] }]}
                  sx={lineAnimation}
                >
                  <NavLink
                    to={'/order-online'}
                    onMouseOver={() => Order.preload()}
                  >
                    Đặt hàng{' '}
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={['#fff', { hover: ['primary', 100] }]}
                  sx={lineAnimation}
                >
                  <NavLink to={'/menu'} onMouseOver={() => Menus.preload()}>
                    Thực đơn{' '}
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={['#fff', { hover: ['primary', 100] }]}
                  sx={lineAnimation}
                >
                  <NavLink
                    to={'/contact'}
                    onMouseOver={() => Contact.preload()}
                  >
                    Liên hệ
                  </NavLink>
                </Box>
              </Flex>
            </Box>
            {login ? (
              <>
                <Center gap={fr(10)}>
                  <Box>
                    <Link to={'/cart'}>
                      <Badge label={itemCount} size='sm' cl={'#fff'}>
                        <Icon cl={'#fff'}>
                          <ShoppingCartSimple weight='fill' />
                        </Icon>
                      </Badge>
                    </Link>
                  </Box>
                  <Flex direction='column' gap={fr(2)}>
                    <Box>
                      <Icon
                        cl={'#fff'}
                        onClick={() => setMenuOpen(!menuOpen)}
                        cs={'pointer'}
                      >
                        <User weight='fill' />
                      </Icon>
                    </Box>
                    <Menu
                      w={fr(46)}
                      pos={'absolute'}
                      t={fr(15)}
                      open={menuOpen}
                      bg={bgColor}
                    >
                      <Menu.Label color={textColor}>Tài Khoản</Menu.Label>
                      <Menu.Item
                        align='center'
                        as={Link}
                        onClick={() => setMenuOpen(!menuOpen)}
                        to={'/account/information'}
                      >
                        <Center justify='start' gap={fr(2)}>
                          <Menu.Icon>
                            <User />
                          </Menu.Icon>
                          Thông tin cá nhân
                        </Center>
                      </Menu.Item>
                      <Menu.Item
                        align='center'
                        as={Link}
                        onClick={() => setMenuOpen(!menuOpen)}
                        to={'/account/orders'}
                      >
                        <Center justify='start' gap={fr(2)}>
                          <Menu.Icon>
                            <ListChecks />
                          </Menu.Icon>
                          Đơn hàng
                        </Center>
                      </Menu.Item>
                      <Menu.Item
                        align='center'
                        as={Link}
                        onClick={() => setMenuOpen(!menuOpen)}
                        to={'/account/history-purchase'}
                      >
                        <Center justify='start' gap={fr(2)}>
                          <Menu.Icon>
                            <ClockCountdown />
                          </Menu.Icon>
                          Lịch sử mua hàng
                        </Center>
                      </Menu.Item>
                      <Divider />
                      <Menu.Label color={textColor}>Danger Zone</Menu.Label>
                      <Menu.Item
                        color='red'
                        align='center'
                        onClick={handleLogout}
                      >
                        <Menu.Icon>
                          <SignOut />
                        </Menu.Icon>
                        Đăng xuất
                      </Menu.Item>
                    </Menu>
                  </Flex>
                </Center>
              </>
            ) : (
              <Box>
                <Link to={'/login'} onMouseOver={() => Login.preload()}>
                  <Center h={'100%'} w={'max-content'}>
                    <Button
                      variant='primary'
                      ff={"'GeomanistMedium', sans-serif"}
                      size='lg'
                      br={'full'}
                    >
                      Đăng nhập
                    </Button>
                  </Center>
                </Link>
              </Box>
            )}
          </Flex>
        </Header>
      </Grid.Item>
    </Grid>
  )
}

export default Navbar
