import { CalendarBlank, Note, ShoppingCart } from '@phosphor-icons/react'
import { Animation, Divider, Flex, Image, Stack, fr } from '@prismane/core'
import { LogoIcon } from '~/images'
import NavbarButton from './NavbarButton/NavbarButton'
import { NavLink } from 'react-router-dom'

const NavbarEmployeeIcon = () => {
  return (
    <Animation animation={'scale-x'} animated={true}>
      <Stack m={fr(4)} gap={fr(6)} direction='column'>
        <Flex justify='center' align='center'>
          <Image src={LogoIcon} w={fr(16)} mx={'auto'} />
        </Flex>
        <Divider />
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
