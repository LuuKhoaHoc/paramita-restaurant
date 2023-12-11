// route
import { Link, NavLink } from 'react-router-dom'
// core
import { Box, Flex, Image, Center, Button, Header, Grid } from '@prismane/core'
// img
import { Logo } from '../../images'
// utils
import lazyWithPreload from 'react-lazy-with-preload'

const Home = lazyWithPreload(() => import('../../pages/Home/Home'))
const AboutUs = lazyWithPreload(() => import('../../pages/AboutUs/AboutUs'))
const Album = lazyWithPreload(() => import('../../pages/Album/Album'))
const BookTable = lazyWithPreload(() =>
  import('../../pages/BookTable/BookTable')
)
const Contact = lazyWithPreload(() => import('../../pages/Contact/Contact'))
const Menu = lazyWithPreload(() => import('../../pages/Menu/Menu'))
const Order = lazyWithPreload(() => import('../../pages/Order/Order'))
const Login = lazyWithPreload(() => import('../../pages/Auth/Login/Login'))

const Navbar = () => {
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 10) {
      document.getElementById('header').style.boxShadow =
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      document.getElementById('header').style.backdropFilter = 'blur(10px)'
    } else {
      document.getElementById('header').style.boxShadow = 'none'
      document.getElementById('header').style.backdropFilter = 'none'
    }
  })
  return (
    <Grid
      id='header'
      templateColumns={12}
      w={'100%'}
      h={'max-content'}
      pos={'fixed'}
      t={0}
      z={10}
    >
      <Grid.Item columnStart={3} columnEnd={11}>
        <Header z={1}>
          <Flex
            ff={"'GeomanistMedium', sans-serif"}
            w='100%'
            justify='between'
            h={90}
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
                  <Image w={130} src={Logo} alt='Paramita Logo' fit='contain' />
                </Center>
              </NavLink>
            </Box>
            <Box w={'100%'}>
              <Flex justify='around' align='center' h={'100%'}>
                <Box
                  onMouseOver={() => Contact.preload()}
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={'#fff'}
                  sx={{
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
                  }}
                >
                  <NavLink to={'/about'} onMouseOver={() => AboutUs.preload()}>
                    Tìm hiểu
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={'#fff'}
                  sx={{
                    '&::before': {
                      content: '',
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      backGroundColor: 'primary',
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
                  }}
                >
                  <NavLink to={'/album'} onMouseOver={() => Album.preload()}>
                    Thư viện{' '}
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={'#fff'}
                  sx={{
                    '&::before': {
                      content: '',
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      backGroundColor: 'primary',
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
                  }}
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
                  cl={'#fff'}
                  sx={{
                    '&::before': {
                      content: '',
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      backGroundColor: 'primary',
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
                  }}
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
                  cl={'#fff'}
                  sx={{
                    '&::before': {
                      content: '',
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      backGroundColor: 'primary',
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
                  }}
                >
                  <NavLink to={'/menu'} onMouseOver={() => Menu.preload()}>
                    Thực đơn{' '}
                  </NavLink>
                </Box>
                <Box
                  td={'none'}
                  bg={['transparent', { ':before': 'primary' }]}
                  pos={['relative', { ':before': 'absolute' }]}
                  cl={'#fff'}
                  sx={{
                    '&::before': {
                      content: '',
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      backGroundColor: 'primary',
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
                  }}
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
          </Flex>
        </Header>
      </Grid.Item>
    </Grid>
  )
}

export default Navbar
