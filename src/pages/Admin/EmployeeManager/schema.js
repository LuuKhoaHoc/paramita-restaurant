import { gql } from '@apollo/client'

export const GET_EMPLOYEES = gql`
  query getEmployees {
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
export const GET_POSITIONS = gql`
  {
    positionList {
      position_id
      name
      salary
    }
  }
`
export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($id: Int!, $data: EmployeeInput!) {
    updateEmployee(id: $id, data: $data) {
      employee_id
      tsid
      name
      gender
      email
      phone
      address
      birthday
      position {
        position_id
        name
      }
      status
      is_admin
      username
      password
    }
  }
`
export const ADD_EMPLOYEE = gql`
  mutation createEmployee($data: EmployeeInput!) {
    createEmployee(data: $data) {
      employee_id
      tsid
      name
      gender
      email
      phone
      address
      birthday
      position {
        position_id
        name
      }
      status
      is_admin
      username
      password
    }
  }
`
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: Int!) {
    deleteEmployee(id: $id) {
      employee_id
      name
    }
  }
`
