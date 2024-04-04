import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
  {
    contactList {
      contact_id
      name
      email
      phone
      message
      createAt
    }
  }
`
export const DELETE_CONTACT = gql`
  mutation deleteContact($id: Int!) {
    deleteContact(id: $id) {
      contact_id
    }
  }
`
export const CREATE_CONTACT = gql`
  mutation createContact($data: ContactInput!) {
    createContact(data: $data) {
      contact_id
      name
      email
      phone
      message
      createAt
    }
  }
`
