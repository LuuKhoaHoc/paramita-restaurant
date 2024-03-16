import { List, SignOut } from '@phosphor-icons/react'
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  Text,
  fr
} from '@prismane/core'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const handleLogout = () => {
  localStorage.removeItem('tokenEmp')
  sessionStorage.clear()
  window.location.reload()
}

const HeaderEmployee = ({ open, setOpen, employee }) => {
  sessionStorage.setItem('openNavbar', open)
  const [openMenu, setOpenMenu] = useState(false)
  const { pathname } = useLocation()
  const [title, setTitle] = useState('')
  useEffect(() => {
    switch (pathname) {
      case '/employee/invoice':
        setTitle('Hoá đơn')
        break
      case '/employee/order':
        setTitle('Đơn hàng')
        break
      case '/employee/reservation':
        setTitle('Đặt bàn')
        break
      default:
        setTitle('')
    }
  }, [pathname])
  return (
    <Flex direction='row' align='center' pos={'relative'}>
      <Button
        variant='text'
        icon={<List />}
        size='lg'
        onClick={() => setOpen(!open)}
      />
      <Text className='GeomanistMedium-font' fs={'xl'}>
        {title}
      </Text>
      <Center
        ml={'auto'}
        mr={fr(8)}
        gap={fr(2)}
        cs={'pointer'}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <Avatar size='sm' color={'copper'} />
        <Text className='GeomanistMedium-font'>{employee?.name}</Text>
      </Center>
      <Menu
        w={fr(48)}
        open={openMenu}
        bsh={'base'}
        pos={'absolute'}
        t={fr(15)}
        r={0}
      >
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
  )
}
export default HeaderEmployee
