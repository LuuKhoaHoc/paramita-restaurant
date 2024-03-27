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
export const ADD_CATEGORY = gql`
  mutation createCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      category_id
      tsid
      name
    }
  }
`
export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      category_id
      name
    }
  }
`
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $data: CategoryInput!) {
    updateCategory(id: $id, data: $data) {
      category_id
      tsid
      name
    }
  }
`
