import { Flex, fr } from '@prismane/core'
import MenuItem from '~/pages/Menu/MenuListItem/MenuItem/MenuItem'
import { useResponsive } from '~/utils/responsive'

const MenuListItem = ({ items }) => {
  const { isMobile, isTablet, isLaptop } = useResponsive()
  return (
    <Flex direction='row' wrap='wrap'  gap={isTablet ? fr(5) : isMobile ? fr(3) : fr(8)}>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          image={item.image}
          title={item.title}
          price={item.price}
          category={item.category}
        />
      ))}
    </Flex>
  )
}

export default MenuListItem
