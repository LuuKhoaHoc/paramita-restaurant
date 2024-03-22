import { gql } from '@apollo/client'

export const GET_CONTENTS = gql`
  {
    contentList {
      content_id
      tsid
      title
      slogan
      description
      image
      page {
        page_id
        name
      }
      position
    }
  }
`
export const UPDATE_CONTENT = gql`
  mutation updateContent($id: Int!, $data: ContentInput!) {
    updateContent(id: $id, data: $data) {
      content_id
      tsid
      title
      slogan
      image
      description
      position
      page {
        page_id
        name
      }
    }
  }
`
