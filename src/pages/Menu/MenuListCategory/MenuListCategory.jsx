import { List, fr, useThemeModeValue } from '@prismane/core'
import { itemToURL } from '~/utils/stringToURL'
import { NavLink } from 'react-router-dom'

const MenuListCategory = ({ listCategory }) => {
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  return (
    <List gap={fr(3)}>
      {listCategory.map((item, index) => (
        <List.Item
          key={index}
          fs={'md'}
          className='GeomanistLight-font'
          cl={[textColor, { hover: 'primary' }]}
          w={'max-content'}
        >
          <NavLink to={'/menu/' + itemToURL(item)} state={{ category: item }}>
            {item}
          </NavLink>
        </List.Item>
      ))}
    </List>
  )
}

export default MenuListCategory
