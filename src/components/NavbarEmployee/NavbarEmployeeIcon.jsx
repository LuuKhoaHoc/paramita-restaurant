import {
  BookOpenText,
  CalendarBlank,
  FilmScript,
  House,
  Note,
  ShoppingCart,
  Table,
  UserCircleGear
} from '@phosphor-icons/react'
import { Animation, Divider, Flex, Image, Stack, fr } from '@prismane/core'
import { LogoIcon } from '~/images'
import NavbarButton from './NavbarButton/NavbarButton'
import { NavLink } from 'react-router-dom'

const NavbarEmployeeIcon = ({ employee }) => {
  return (
    <Animation animation={'scale-x'} animated={true}>
      <Stack m={fr(4)} gap={fr(6)} direction='column'>
        <Flex justify='center' align='center'>
          <Image src={LogoIcon} w={fr(16)} mx={'auto'} />
        </Flex>
        <Divider />
        {employee?.is_admin && (
          <>
            <Flex>
              <NavbarButton
                as={NavLink}
                icon={<House />}
                to={'/admin/home'}
                size='lg'
              />
            </Flex>
            <Flex>
              <NavbarButton
                as={NavLink}
                icon={<FilmScript />}
                to={'/admin/content'}
                size='lg'
              />
            </Flex>
            <Flex>
              <NavbarButton
                as={NavLink}
                icon={<BookOpenText />}
                to={'/admin/menu'}
                size='lg'
              />
            </Flex>
            <Flex>
              <NavbarButton
                as={NavLink}
                icon={<Table />}
                to={'/admin/table'}
                size='lg'
              />
            </Flex>
            <Flex>
              <NavbarButton
                as={NavLink}
                icon={<UserCircleGear />}
                to={'/admin/employees'}
                size='lg'
              />
            </Flex>
          </>
        )}
        <Flex>
          <NavbarButton
            as={NavLink}
            icon={<Note />}
            to={'/employee/invoice'}
            size='lg'
          />
        </Flex>
        <Flex>
          <NavbarButton
            as={NavLink}
            icon={<ShoppingCart />}
            to={'/employee/order'}
            size='lg'
          />
        </Flex>
        <Flex>
          <NavbarButton
            as={NavLink}
            icon={<CalendarBlank />}
            to={'/employee/reservation'}
            size='lg'
          />
        </Flex>
      </Stack>
    </Animation>
  )
}
export default NavbarEmployeeIcon
