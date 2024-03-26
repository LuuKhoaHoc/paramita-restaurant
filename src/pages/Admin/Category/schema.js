import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  {
    categoryList {
      category_id
      tsid
      name
      menu {
        item_id
        name
        image
      }
    }
  }
`
