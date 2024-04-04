import { gql } from '@apollo/client'

export const CHECK_TOKEN = gql`
  query checkToken($token: String!) {
    checkToken(token: $token) {
      token
    }
  }
`
export const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    customer(id: $id) {
      customer_id
      username
      name
      email
      phone
      birthday
      points
      level {
        level_id
        name
      }
      address {
        address_id
        address
      }
      orders {
        order_id
        tsid
        customer {
          name
          phone
        }
        status
        delivery_address
        voucher_id
        transport_fee
        payment_method
        payment_status
        total_price
        note
        order_details {
          order_detail_id
          tsid
          item {
            name
            image
          }
          quantity
          unit_price
          total_price
        }
        created_at
      }
      point_histories {
        tsid
        order {
          order_id
          tsid
        }
        voucher {
          voucher_id
        }
        points_earned
        points_deducted
        transaction_date
      }
    }
  }
`

export const GET_EMPLOYEE = gql`
  query getEmployee($id: ID!) {
    employee(id: $id) {
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
    }
  }
`
