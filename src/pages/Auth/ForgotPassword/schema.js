import { gql } from '@apollo/client'

export const REQUEST_RESET_PASSWORD = gql`
  mutation requestResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      status
      message
    }
  }
`
export const VERIFY_PIN = gql`
  mutation verifyResetPasswordPin($email: String!, $pin: String!) {
    verifyResetPasswordPin(email: $email, pin: $pin) {
      status
      message
    }
  }
`
export const UPDATE_PASSWORD = gql`
  mutation resetPassword($email: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      status
      message
    }
  }
`
