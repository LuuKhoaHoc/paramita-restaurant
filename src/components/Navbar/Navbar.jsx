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
  Drawer,
  Avatar,
  Text,
  List
} from '@prismane/core'
// img
import { LogoText } from '~/images'
// utils
import { useResponsive } from '~/utils/responsive'
import lazyWithPreload from 'react-lazy-with-preload'
import { useEffect, useState, useContext } from 'react'
import { Loading } from '~/components'
import {
  ClockCountdown,
  List as ListIcon,
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

// context
import { CartContext } from '~/contexts/CartContext'
import { AuthContext } from '~/contexts/AuthContext'

const Navbar = ({ customer }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const [token, setToken] = useState('')
  // Responsive
  const { isLaptop, isMobile, isTablet } = useResponsive()
  // Số lượng item trong cart
  const { cartItems, clearCart } = useContext(CartContext)
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  // Tổng tiền trong cart
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity * 1000
  }, 0)
  // State cho menu
  const [menuOpen, setMenuOpen] = useState(false)
  // State cho drawer
  const [right, setRight] = useState(false)

  // count order
  let orderCount = 0
  if (customer) {
    for (const item of customer.orders) {
      if (item.status === 'Chờ xác nhận' || item.status === 'Đang đến') {
        orderCount++
      }
    }
  }

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
    if (header && document.documentElement.scrollTop > 10) {
      header.style.backgroundColor = '#371b04'
    }
    if (header && document.documentElement.scrollTop < 10) {
      header.style.boxShadow = 'none'
      header.style.backdropFilter = 'none'
      header.style.backgroundColor = 'transparent'
      header.style.color = 'white'
    }
  }

  window.addEventListener('scroll', handleScroll)
  // Hàm xử lí đăng xuất
  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.removeItem('orders')
    localStorage.removeItem('orderSuccess')
    localStorage.removeItem('login')
    localStorage.removeItem('token')
    clearCart()
    setMenuOpen(false)
    setIsLoggedIn(false)
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    if ((isLoggedIn || localStorage.getItem('login')) && token) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

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
            className='GeomanistMedium-font'
            w='100%'
            justify='between'
            h={fr(22.5)}
            fs={isLaptop ? 'base' : isTablet ? 'sm' : isMobile ? 'xs' : 'lg'}
          >
            {/* Responsive elements */}
            {isTablet || isMobile ? (
              <>
                <Drawer
                  open={right}
                  closable
                  onClose={() => setRight(false)}
                  position='right'
                  size={isTablet ? 'sm' : 'xs'}
                >
                  <Drawer.Header>
                    <Text></Text>
                  </Drawer.Header>
                  <Flex direction='column' className='GeomanistMedium-font'>
                    {isLoggedIn === 'false' ? (
                      <Center>
                        <Box>
                          <Link
                            to={'/login'}
                            onMouseOver={() => Login.preload()}
                          >
                            <Center h={'100%'} w={'max-content'}>
                              <Button
                                variant='primary'
                                className='GeomanistMedium-font'
                                size='lg'
                                br={'full'}
                                onClick={() => setRight(false)}
                              >
                                Đăng nhập
                              </Button>
                            </Center>
                          </Link>
                        </Box>
                      </Center>
                    ) : (
                      <>
                        <Flex align='center' justify='around'>
                          <Avatar size={'sm'} color={'primary'}></Avatar>
                          <Text cl={'primary'} fs={isTablet ? 'lg' : 'md'}>
                            {customer?.name || customer?.username}
                          </Text>
                        </Flex>
                        <Divider my={isTablet ? fr(4) : fr(6)} />
                        <List
                          px={fr(4)}
                          fs={isTablet ? 'base' : 'sm'}
                          onClick={() => setRight(false)}
                        >
                          <List.Item
                            align='center'
                            justify='between'
                            p={fr(2)}
                            as={NavLink}
                            to={'/account/information'}
                          >
                            <Icon>
                              <User />
                            </Icon>
                            Thông tin cá nhân
                          </List.Item>
                          <List.Item
                            align='center'
                            justify='between'
                            p={fr(2)}
                            as={NavLink}
                            to={'/account/orders'}
                          >
                            <Icon>
                              <ListChecks />
                            </Icon>
                            {orderCount ? (
                              <Badge
                                className='GeomanistMedium-font'
                                label={orderCount}
                                cl={'white'}
                              >
                                <Text className='GeomanistMedium-font'>
                                  Đơn hàng
                                </Text>
                              </Badge>
                            ) : (
                              'Đơn hàng'
                            )}
                          </List.Item>

                          <List.Item
                            align='center'
                            justify='between'
                            p={fr(2)}
                            as={NavLink}
                            to={'/account/history-purchase'}
                          >
                            <Icon>
                              <ClockCountdown />
                            </Icon>
                            Lịch sử mua hàng
                          </List.Item>
                          <List.Item
                            className='GeomanistMedium-font'
                            cl='red'
                            align='center'
                            justify='between'
                            p={fr(2)}
                            cs={'pointer'}
                            onClick={handleLogout}
                          >
                            <Icon>
                              <SignOut />
                            </Icon>
                            Đăng xuất
                          </List.Item>
                        </List>
                      </>
                    )}

                    <Divider my={isTablet ? fr(4) : fr(6)} />
                    <List
                      px={fr(4)}
                      fs={isTablet ? 'lg' : 'md'}
                      align='center'
                      onClick={() => setRight(false)}
                    >
                      <List.Item
                        cl={['inherit', { hover: ['primary', 100] }]}
                        bg={['transparent', { ':before': 'primary' }]}
                        pos={['relative', { ':before': 'absolute' }]}
                        p={fr(3)}
                        sx={lineAnimation}
                      >
                        <NavLink to={'/'} onMouseOver={() => Home.preload()}>
                          Trang chủ
                        </NavLink>
                      </List.Item>
                      <List.Item
                        cl={['inherit', { hover: ['primary', 100] }]}
                        bg={['transparent', { ':before': 'primary' }]}
                        pos={['relative', { ':before': 'absolute' }]}
                        p={fr(3)}
                        sx={lineAnimation}
                      >
                        <NavLink
                          to={'/about'}
                          onMouseOver={() => AboutUs.preload()}
                        >
                          Tìm hiểu
                        </NavLink>
                      </List.Item>
                      <List.Item
                        cl={['inherit', { hover: ['primary', 100] }]}
                        bg={['transparent', { ':before': 'primary' }]}
                        pos={['relative', { ':before': 'absolute' }]}
                        p={fr(3)}
                        sx={lineAnimation}
                      >
                        <NavLink
                          to={'/promotion'}
                          onMouseOver={() => Promotion.preload()}
                        >
                          Khuyến mãi{' '}
                        </NavLink>
                      </List.Item>
                      <List.Item
                        cl={['inherit', { hover: ['primary', 100] }]}
                        bg={['transparent', { ':before': 'primary' }]}
                        pos={['relative', { ':before': 'absolute' }]}
                        p={fr(3)}
                        sx={lineAnimation}
                      >
                        <NavLink
                          to={'/book-table'}
                          onMouseOver={() => BookTable.preload()}
                        >
                          Đặt bàn{' '}
                        </NavLink>
                      </List.Item>
                      <List.Item
                        cl={['inherit', { hover: ['primary', 100] }]}
                        bg={['transparent', { ':before': 'primary' }]}
                        pos={['relative', { ':before': 'absolute' }]}
                        p={fr(3)}
                        sx={lineAnimation}
                      >
                        <NavLink
                          to={'/order-online'}
                          onMouseOver={() => Order.preload()}
                        >
                          Đặt hàng{' '}
                        </NavLink>
                      </List.Item>
                      <List.Item
                        cl={['inherit', { hover: ['primary', 100] }]}
                        bg={['transparent', { ':before': 'primary' }]}
                        pos={['relative', { ':before': 'absolute' }]}
                        p={fr(3)}
                        sx={lineAnimation}
                      >
                        <NavLink
                          to={'/menu'}
                          onMouseOver={() => Menus.preload()}
                        >
                          Thực đơn{' '}
                        </NavLink>
                      </List.Item>
                      <List.Item
                        cl={['inherit', { hover: ['primary', 100] }]}
                        bg={['transparent', { ':before': 'primary' }]}
                        pos={['relative', { ':before': 'absolute' }]}
                        p={fr(3)}
                        sx={lineAnimation}
                      >
                        <NavLink
                          to={'/contact'}
                          onMouseOver={() => Contact.preload()}
                        >
                          Liên hệ
                        </NavLink>
                      </List.Item>
                    </List>
                  </Flex>
                  <Drawer.Footer>
                    <Center
                      as={Link}
                      to={'/cart'}
                      bg={'primary'}
                      br={'lg'}
                      p={fr(4)}
                      mx={'auto'}
                      cl={'#fff'}
                      gap={fr(2)}
                      onClick={() => setRight(false)}
                    >
                      <Icon>
                        <ShoppingCartSimple />
                      </Icon>
                      <Text> {itemCount} món - </Text>
                      <Text>{subTotal.toLocaleString('vi-VN')}đ</Text>
                    </Center>
                  </Drawer.Footer>
                </Drawer>

                <Flex align='center' justify='start'>
                  <NavLink to={'/'} onMouseOver={() => Home.preload()}>
                    <Center w={isTablet ? 140 : isMobile ? 120 : ''} h={'100%'}>
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
                    size={isTablet ? fr(10) : isMobile ? fr(8) : ''}
                    cs={'pointer'}
                    onClick={() => setRight(true)}
                  >
                    <ListIcon weight='bold' />
                  </Icon>
                </Flex>
              </>
            ) : (
              <>
                <NavLink to={'/'} onMouseOver={() => Home.preload()}>
                  <Center w={isLaptop ? 140 : 160} h={'100%'}>
                    <Image
                      w={'inherit'}
                      src={LogoText}
                      alt='Paramita Logo'
                      fit='cover'
                    />
                  </Center>
                </NavLink>
                <Box w={'100%'}>
                  <Flex justify='around' align='center' h={'100%'}>
                    <Box
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
                {(isLoggedIn || localStorage.getItem('login')) && token ? (
                  <>
                    <Center id='account-side' gap={fr(10)} cl={'#fff'}>
                      <Box>
                        <Link to={'/cart'}>
                          <Badge
                            className='GeomanistMedium-font'
                            label={itemCount}
                            size='sm'
                            cl={'#fff'}
                          >
                            <Icon>
                              <ShoppingCartSimple weight='fill' />
                            </Icon>
                          </Badge>
                        </Link>
                      </Box>
                      <Flex direction='column' gap={fr(2)}>
                        <Box>
                          {orderCount ? (
                            <Badge label={null} size='xs' cl={'#fff'}>
                              <Icon
                                onClick={() => setMenuOpen(!menuOpen)}
                                cs={'pointer'}
                              >
                                <User weight='fill' />
                              </Icon>
                            </Badge>
                          ) : (
                            <Icon
                              onClick={() => setMenuOpen(!menuOpen)}
                              cs={'pointer'}
                            >
                              <User weight='fill' />
                            </Icon>
                          )}
                        </Box>
                        <Menu
                          w={fr(46)}
                          pos={'absolute'}
                          t={fr(15)}
                          open={menuOpen}
                        >
                          <Menu.Label className='GeomanistMedium-font'>
                            Tài Khoản
                          </Menu.Label>
                          <Menu.Item
                            align='center'
                            as={Link}
                            onClick={() => setMenuOpen(!menuOpen)}
                            to={'/account/information'}
                          >
                            <Center
                              justify='start'
                              gap={fr(2)}
                              className='GeomanistMedium-font'
                            >
                              <Menu.Icon>
                                <User />
                              </Menu.Icon>
                              Thông tin cá nhân
                            </Center>
                          </Menu.Item>
                          <Menu.Item
                            align='center'
                            as={Link}
                            onClick={() => {
                              setMenuOpen(!menuOpen)
                            }}
                            to={'/account/orders'}
                          >
                            <Center
                              justify='start'
                              gap={fr(2)}
                              className='GeomanistMedium-font'
                            >
                              <Menu.Icon>
                                <ListChecks />
                              </Menu.Icon>
                              {orderCount ? (
                                <Badge
                                  label={orderCount}
                                  className='GeomanistMedium-font'
                                  size='sm'
                                  cl={'#fff'}
                                >
                                  <Text className='GeomanistMedium-font'>
                                    Đơn hàng
                                  </Text>
                                </Badge>
                              ) : (
                                'Đơn hàng'
                              )}
                            </Center>
                          </Menu.Item>
                          <Menu.Item
                            align='center'
                            as={Link}
                            onClick={() => setMenuOpen(!menuOpen)}
                            to={'/account/history-purchase'}
                          >
                            <Center
                              justify='start'
                              gap={fr(2)}
                              className='GeomanistMedium-font'
                            >
                              <Menu.Icon>
                                <ClockCountdown />
                              </Menu.Icon>
                              Lịch sử mua hàng
                            </Center>
                          </Menu.Item>
                          <Divider />
                          <Menu.Label className='GeomanistMedium-font'>
                            Danger Zone
                          </Menu.Label>
                          <Menu.Item
                            color='red'
                            align='center'
                            className='GeomanistMedium-font'
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
                          className='GeomanistMedium-font'
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
