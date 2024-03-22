import {
  BookOpenText,
  CalendarBlank,
  FilmScript,
  House,
  Note,
  ShoppingCart,
  Table
} from '@phosphor-icons/react'
import { Divider, Flex, Image, Stack, fr } from '@prismane/core'
import { LogoText } from '~/images'
import NavbarButton from './NavbarButton/NavbarButton'
import { NavLink } from 'react-router-dom'

const NavbarEmployee = ({ employee }) => {
  return (
    <Stack m={fr(8)} gap={fr(6)} direction='column'>
      <Flex justify='center'>
        <Image src={LogoText} />
      </Flex>
      <Divider />
      {employee?.is_admin && (
        <>
          <Flex>
            <NavbarButton
              as={NavLink}
              icon={<House />}
              to={'/admin/home'}
              text={'Trang chủ'}
              size='md'
              pr={fr(8)}
            />
          </Flex>
          <Flex>
            <NavbarButton
              as={NavLink}
              icon={<FilmScript />}
              to={'/admin/content'}
              text={'Nội dung'}
              size='md'
              pr={fr(8)}
            />
          </Flex>
          <Flex>
            <NavbarButton
              as={NavLink}
              icon={<BookOpenText />}
              to={'/admin/menu'}
              text={'Menu'}
              size='md'
              pr={fr(8)}
            />
          </Flex>
          <Flex>
            <NavbarButton
              as={NavLink}
              icon={<Table />}
              to={'/admin/table'}
              text={'Bàn'}
              size='md'
              pr={fr(8)}
            />
          </Flex>
        </>
      )}
      <Flex>
        <NavbarButton
          as={NavLink}
          icon={<Note />}
          to={'/employee/invoice'}
          text={'Hoá đơn'}
          size='md'
          pr={fr(8)}
        />
      </Flex>
      <Flex>
        <NavbarButton
          as={NavLink}
          icon={<ShoppingCart />}
          to={'/employee/order'}
          text={'Đơn hàng'}
          size='md'
          pr={fr(8)}
        />
      </Flex>
      <Flex>
        <NavbarButton
          as={NavLink}
          icon={<CalendarBlank />}
          to={'/employee/reservation'}
          text={'Đặt bàn'}
          size='md'
          pr={fr(8)}
        />
      </Flex>
    </Stack>
  )
}
export default NavbarEmployee
