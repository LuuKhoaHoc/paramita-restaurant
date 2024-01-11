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
  Badge,
  Drawer
} from '@prismane/core'
// img
import { LogoText } from '~/images'
// utils
import lazyWithPreload from 'react-lazy-with-preload'
import { useEffect, useState, useContext } from 'react'
import {
  ClockCountdown,
  List,
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
import { useMediaQuery } from '@prismane/core/hooks'

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1280px)')
  // Số lượng item trong cart
  const { cartItems } = useContext(CartContext)
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  // Kiểm tra đăng nhập
  const [login, setLogin] = useState(false)
  // State cho menu
  const [menuOpen, setMenuOpen] = useState(false)
  // State cho drawer
  const [right, setRight] = useState(false)
  useEffect(() => {
    if (
      sessionStorage.getItem('login') === 'true' ||
      localStorage.getItem('login') === 'true'
    ) {
      setLogin(true)
    }
  }, [])
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
      header.style.backgroundColor = '#371b04'
    }
    if (document.documentElement.scrollTop < 10) {
      header.style.boxShadow = 'none'
      header.style.backdropFilter = 'none'
      header.style.backgroundColor = 'transparent'
      header.style.color = 'white'
    }
  }

  window.addEventListener('scroll', handleScroll)
  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.removeItem('orders')
    localStorage.removeItem('orderSuccess')
    localStorage.removeItem('login')
    setLogin(false)
  }

  return (
    <Grid
      id='header'
      templateColumns={12}
      w={'100%'}
      cl={'#fff'}
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
            {isTablet || isMobile ? (
              <>
                {isMobile ? (
                  <Drawer
                    open={right}
                    closable
                    onClose={() => setRight(false)}
                    position='right'
                    size={'xs'}
                  >
                    Press Esc key to close the Drawer. Or just click the
                    backdrop.
                  </Drawer>
                ) : (
                  <Drawer
                    open={right}
                    closable
                    onClose={() => setRight(false)}
                    position='right'
                    size={'sm'}
                  >
                    Press Esc key to close the Drawer. Or just click the
                    backdrop.
                  </Drawer>
                )}
                <Flex align='center' justify='start'>
                  <NavLink to={'/'} onMouseOver={() => Home.preload()}>
                    <Center w={140} h={'100%'}>
                      <Image
                        w={'inherit'}
                        src={LogoText}
                        alt='Paramita Logo'
                        fit='cover'
                      />
                    </Center>
                  </NavLink>
                </Flex>
                <Flex align='center' justify='end'>
                  <Icon
                    size={fr(10)}
                    cs={'pointer'}
                    onClick={() => setRight(true)}
                  >
                    <List weight='bold' />
                  </Icon>
                </Flex>
              </>
            ) : (
              <>
                <NavLink to={'/'} onMouseOver={() => Home.preload()}>
                  <Center w={160} h={'100%'}>
                    <Image
                      w={160}
                      src={LogoText}
                      alt='Paramita Logo'
                      fit='cover'
                    />
                  </Center>
                </NavLink>
                <Box w={'100%'}>
                  <Flex justify='around' align='center' h={'100%'}>
                    <Box
                      td={'none'}
                      cl={['inherit', { hover: ['primary', 100] }]}
                      bg={['transparent', { ':before': 'primary' }]}
                      pos={['relative', { ':before': 'absolute' }]}
                      sx={lineAnimation}
                    >
                      <NavLink
                        to={'/about'}
                        onMouseOver={() => AboutUs.preload()}
                      >
                        Tìm hiểu
                      </NavLink>
                    </Box>
                    <Box
                      td={'none'}
                      cl={['inherit', { hover: ['primary', 100] }]}
                      bg={['transparent', { ':before': 'primary' }]}
                      pos={['relative', { ':before': 'absolute' }]}
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
                      cl={['inherit', { hover: ['primary', 100] }]}
                      bg={['transparent', { ':before': 'primary' }]}
                      pos={['relative', { ':before': 'absolute' }]}
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
                      cl={['inherit', { hover: ['primary', 100] }]}
                      bg={['transparent', { ':before': 'primary' }]}
                      pos={['relative', { ':before': 'absolute' }]}
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
                      cl={['inherit', { hover: ['primary', 100] }]}
                      bg={['transparent', { ':before': 'primary' }]}
                      pos={['relative', { ':before': 'absolute' }]}
                      sx={lineAnimation}
                    >
                      <NavLink to={'/menu'} onMouseOver={() => Menus.preload()}>
                        Thực đơn{' '}
                      </NavLink>
                    </Box>
                    <Box
                      td={'none'}
                      cl={['inherit', { hover: ['primary', 100] }]}
                      bg={['transparent', { ':before': 'primary' }]}
                      pos={['relative', { ':before': 'absolute' }]}
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
                    <Center id='account-side' gap={fr(10)} cl={'#fff'}>
                      <Box>
                        <Link to={'/cart'}>
                          <Badge label={itemCount} size='sm' cl={'#fff'}>
                            <Icon>
                              <ShoppingCartSimple weight='fill' />
                            </Icon>
                          </Badge>
                        </Link>
                      </Box>
                      <Flex direction='column' gap={fr(2)}>
                        <Box>
                          <Icon
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
                        >
                          <Menu.Label>Tài Khoản</Menu.Label>
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
                          <Menu.Label>Danger Zone</Menu.Label>
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
              </>
            )}
          </Flex>
        </Header>
      </Grid.Item>
    </Grid>
  )
}

export default Navbar
