import { List, SignOut } from '@phosphor-icons/react'
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Menu,
  Text,
  fr,
  usePrismaneTheme
} from '@prismane/core'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const HeaderEmployee = ({ open, setOpen, employee }) => {
  const { theme } = usePrismaneTheme()
  sessionStorage.setItem('openNavbar', open)
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [title, setTitle] = useState('')
  const titleMap = {
    '/employee/invoice': 'Hoá đơn',
    '/employee/order': 'Đơn hàng',
    '/employee/reservation': 'Đặt bàn',
    '/admin/invoice': 'Hoá đơn',
    '/admin/order': 'Đơn hàng',
    '/admin/reservation': 'Đặt bàn',
    '/admin/customers': 'Khách hàng',
    '/admin/employees': 'Nhân viên',
    '/admin/content': 'Nội dung',
    '/admin/category': 'Danh mục món ăn',
    '/admin/menu': 'Thực đơn',
    '/admin/table': 'Bàn',
    '/admin/home': 'Trang chủ'
  }
  useEffect(() => setTitle(titleMap[pathname] || ''), [pathname])
  return (
    <Flex direction='column' justify='center'>
      <Flex direction='row' align='center' my={fr(4.9)}>
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
          <Text className='GeomanistMedium-font'>
            {employee?.name} - {employee?.position?.name}
          </Text>
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
            onClick={() => {
              localStorage.removeItem('tokenEmp')
              sessionStorage.clear()
              navigate('/')
              window.location.reload()
            }}
          >
            <Menu.Icon>
              <SignOut />
            </Menu.Icon>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Flex>
      {theme.mode === 'dark' && <Divider mx={'auto'} w={'98%'} />}
    </Flex>
  )
}
export default HeaderEmployee
