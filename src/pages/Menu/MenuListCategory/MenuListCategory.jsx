import { List, fr, useThemeModeValue } from '@prismane/core'
import { itemToURL } from '~/utils/stringToURL'
import { NavLink } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'

const MenuListCategory = ({ categories }) => {
  const { isMobile } = useResponsive()
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  return (
    <List gap={fr(3)}>
      {categories?.map((item, index) => (
        <List.Item
          key={index}
          fs={isMobile ? 'sm' : 'md'}
          className='GeomanistLight-font'
          cl={[textColor, { hover: 'primary' }]}
          w={'max-content'}
        >
          <NavLink to={'/menu/' + itemToURL(item)}>{item}</NavLink>
        </List.Item>
      ))}
    </List>
  )
}

export default MenuListCategory
