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
      name
      phone
      email
      capacity
      note
      reservation_time
      reservation_date
      status
    }
  }
`
export const GET_CUSTOMER_BY_PHONE = gql`
  query getCustomerByPhone($phone: String!) {
    getCustomerByPhone(phone: $phone) {
      customer_id
      name
      phone
      email
      level {
        level_id
        name
      }
      points
    }
  }
`

export const ADD_RESERVATION = gql`
  mutation addReservation($data: ReservationInput!) {
    createReservation(data: $data) {
      reservation_id
      tsid
      customer {
        name
      }
      table {
        table_id
        name
        capacity
        status
      }
      name
      phone
      email
      capacity
      note
      reservation_time
      reservation_date
      status
    }
  }
`
export const UPDATE_RESERVATION = gql`
  mutation updateReservation($id: Int!, $data: ReservationInput!) {
    updateReservation(id: $id, data: $data) {
      reservation_id
      tsid
      customer {
        name
      }
      table {
        table_id
        name
        capacity
        status
      }
      name
      phone
      email
      capacity
      note
      reservation_time
      reservation_date
      status
    }
  }
`

export const DELETE_RESERVATION = gql`
  mutation deleteReservation($id: Int!) {
    deleteReservation(id: $id) {
      reservation_id
      name
      phone
      email
      capacity
      note
      reservation_time
      reservation_date
      status
    }
  }
`
export const SEND_MAIL = gql`
  mutation sendMailReservation($data: ReservationInput!) {
    sendMailReservation(data: $data) {
      status
      message
    }
  }
`
