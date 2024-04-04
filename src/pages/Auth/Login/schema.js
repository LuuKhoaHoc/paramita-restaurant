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

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
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
export const LOGIN_EMP_MUTATION = gql`
  mutation loginEmp($username: String!, $password: String!) {
    loginEmployee(username: $username, password: $password) {
      employee {
        employee_id
        name
        username
        status
        is_admin
      }
      token
    }
  }
`
