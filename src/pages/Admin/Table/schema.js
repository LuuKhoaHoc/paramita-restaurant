import { gql } from '@apollo/client'

export const GET_TABLES = gql`
  {
    tableList {
      table_id
      tsid
      name
      capacity
      status
    }
  }
`
export const UPDATE_TABLE = gql`
  mutation updateTable($id: Int!, $data: TableInput!) {
    updateTable(id: $id, data: $data) {
      table_id
      tsid
      name
      capacity
      status
    }
  }
`

export const CREATE_TABLE = gql`
  mutation createTable($data: TableInput!) {
    createTable(data: $data) {
      table_id
      tsid
      name
      capacity
      status
    }
  }
`
