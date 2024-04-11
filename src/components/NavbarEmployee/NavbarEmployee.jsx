import {
  ForkKnife,
  CalendarBlank,
  FilmScript,
  House,
  Note,
  ShoppingCart,
  UserGear,
  Users,
  ListBullets,
  Invoice,
  PicnicTable,
  AddressBookTabs,
  SealPercent
} from '@phosphor-icons/react'
import { Animation, Divider, Flex, Image, Stack, fr } from '@prismane/core'
import { LogoText } from '~/images'
import NavbarButton from './NavbarButton/NavbarButton'
import { NavLink } from 'react-router-dom'

const NavbarEmployee = ({ employee }) => {
  return (
    <Animation animation={'scale-x'} animated={true} bsh={'md'}>
      <Stack gap={fr(6)} mt={fr(8)} direction='column' w={'100%'}>
        <Flex justify='center'>
          <Image src={LogoText} />
        </Flex>
        <Divider />
        <Stack gap={fr(6)}>
          {employee?.is_admin ? (
            <>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<House />}
                  to={'/admin/home'}
                  text={'Trang chủ'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<FilmScript />}
                  to={'/admin/content'}
                  text={'Nội dung'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<ListBullets />}
                  to={'/admin/category'}
                  text={'Danh mục món ăn'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<ForkKnife />}
                  to={'/admin/menu'}
                  text={'Menu'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<PicnicTable />}
                  to={'/admin/table'}
                  text={'Bàn'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<SealPercent />}
                  to={'/admin/promotion'}
                  text={'Khuyến mãi'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<UserGear />}
                  to={'/admin/employees'}
                  text={'Nhân viên'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<Users />}
                  to={'/admin/customers'}
                  text={'Khách hàng'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<CalendarBlank />}
                  to={'/admin/reservation'}
                  text={'Đặt bàn'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<ShoppingCart />}
                  to={'/admin/order'}
                  text={'Đơn hàng'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<Invoice />}
                  to={'/admin/invoice'}
                  text={'Hoá đơn'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<AddressBookTabs />}
                  to={'/admin/contact'}
                  text={'Liên hệ'}
                  size='md'
                />
              </Flex>
            </>
          ) : (
            <>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<Note />}
                  to={'/employee/invoice'}
                  text={'Hoá đơn'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<ShoppingCart />}
                  to={'/employee/order'}
                  text={'Đơn hàng'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<CalendarBlank />}
                  to={'/employee/reservation'}
                  text={'Đặt bàn'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<PicnicTable />}
                  to={'/employee/table'}
                  text={'Bàn'}
                  size='md'
                />
              </Flex>
              <Flex>
                <NavbarButton
                  as={NavLink}
                  icon={<AddressBookTabs />}
                  to={'/employee/contact'}
                  text={'Liên hệ'}
                  size='md'
                />
              </Flex>
            </>
          )}
        </Stack>
      </Stack>
    </Animation>
  )
}
export default NavbarEmployee
