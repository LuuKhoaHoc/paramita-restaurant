import { List, fr, useThemeModeValue } from '@prismane/core'
import { itemToURL } from '~/utils/stringToURL'
import { NavLink } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import {gql, useQuery } from '@apollo/client'
import { Loading } from '~/components'

const GET_CATEGORYLIST = gql`
  query {
    categoryList {
      name
    }
  }
`

const MenuListCategory = () => {
  const { loading, error, data } = useQuery(GET_CATEGORYLIST)
  const { isMobile } = useResponsive()
  const listCategory = data?.categoryList.map((item) => item.name)
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  return (
    <List gap={fr(3)}>
      {listCategory?.map((item, index) => (
        <List.Item
          key={index}
          fs={isMobile ? 'sm' : 'md'}
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
