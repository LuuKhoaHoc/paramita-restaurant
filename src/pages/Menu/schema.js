import { gql } from '@apollo/client'
export const GET_CONTENTS = gql`
  query {
    page(name: "Menu") {
      page_id
      name
      content {
        title
        slogan
        description
        image
        position
      }
    }
  }
`
export const GET_CATEGORYLIST = gql`
  query {
    categoryList {
      name
    }
  }
`
export const GET_MENU = gql`
  query {
    menuList {
      item_id
      image
      name
      price
      description
      category {
        name
      }
    }
  }
`
