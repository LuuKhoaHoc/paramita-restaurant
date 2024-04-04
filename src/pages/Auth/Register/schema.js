import { gql } from '@apollo/client'

export const GET_CONTENT = gql`
  {
    page(name: "Login") {
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

export const CHECK_USERNAME_EXIST = gql`
  query checkUsername($username: String!) {
    checkUsernameExistence(username: $username) {
      username
    }
  }
`
export const CHECK_EMAIL_EXIST = gql`
  query checkEmail($email: String!) {
    checkEmailExistence(email: $email) {
      email
    }
  }
`

export const CREATE_CUSTOMER = gql`
  mutation createCustomer(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createCustomer(
      data: { username: $username, email: $email, password: $password }
    ) {
      customer {
        customer_id
        tsid
        status
        username
        email
      }
      token
    }
  }
`
