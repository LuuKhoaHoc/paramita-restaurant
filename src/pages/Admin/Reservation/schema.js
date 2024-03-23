import { gql } from '@apollo/client'

export const GET_RESERVATIONS = gql`
  {
    reservationList {
      reservation_id
      tsid
      customer {
        customer_id
        name
        phone
        email
      }
      table {
        table_id
        name
        capacity
        status
      }
      description
      reservationDate
      status
    }
  }
`
