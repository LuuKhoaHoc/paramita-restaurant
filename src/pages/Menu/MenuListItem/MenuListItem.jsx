import { Flex, fr } from '@prismane/core'
import MenuItem from '~/pages/Menu/MenuListItem/MenuItem/MenuItem'

const MenuListItem = ({ items }) => {
  return (
    <Flex direction='row' wrap='wrap' gap={fr(8)}>
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
