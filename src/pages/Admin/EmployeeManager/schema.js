import { gql } from '@apollo/client'

export const GET_EMPLOYEES = gql`
  {
    employeeList {
      employee_id
      name
      gender
      email
      phone
      address
      birthday
      position {
        position_id
        name
        salary
      }
      status
      is_admin
      username
      password
    }
  }
`
