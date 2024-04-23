import { gql } from '@apollo/client'

export const GET_MENU = gql`
  query getMenus {
    menuList {
      item_id
      name
      image
      description
      price
      category {
        category_id
        name
      }
    }
  }
`
export const GET_CATEGORIES = gql`
  {
    categoryList {
      category_id
      name
    }
  }
`

export const ADD_MENU = gql`
  mutation createMenu($data: MenuInput!) {
    createMenu(data: $data) {
      item_id
      tsid
      name
      description
      price
      image
      category {
        category_id
        name
      }
    }
  }
`

export const UPDATE_MENU = gql`
  mutation updateMenu($id: Int!, $data: MenuInput!) {
    updateMenu(id: $id, data: $data) {
      item_id
      tsid
      name
      description
      price
      image
      category {
        category_id
        name
      }
    }
  }
`

export const DELETE_MENU = gql`
  mutation deleteMenu($id: Int!) {
    deleteMenu(id: $id) {
      item_id
      name
    }
  }
`
