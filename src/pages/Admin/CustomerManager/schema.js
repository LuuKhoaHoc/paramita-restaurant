import { gql } from '@apollo/client'

export const GET_CUSTOMERS = gql`
  query getCustomers {
    customerList {
      customer_id
      tsid
      name
      phone
      email
      address {
        address_id
        address
      }
      birthday
      points
      level {
        level_id
        name
      }
      status
      username
      invoice {
        invoice_id
        invoice_time
        voucher {
          voucher_id
          name
        }
        payment_method
        payment_status
        total_price
        note
        invoice_details {
          invoice_detail_id
          item {
            name
          }
          quantity
          unit_price
          total_price
        }
      }
      orders {
        order_id
        status
        delivery_address
        payment_method
        payment_status
        total_price
        note
        order_details {
          order_detail_id
          item {
            item_id
            name
          }
          quantity
          unit_price
          total_price
        }
      }
      point_histories {
        point_history_id
        order {
          order_id
        }
        invoice {
          invoice_id
        }
        voucher {
          voucher_id
        }
        points_earned
        points_deducted
        transaction_date
      }
      reservations {
        reservation_id
        table {
          table_id
          name
        }
        customer {
          customer_id
          name
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
      vouchers {
        voucher_id
        name
        code
        description
        expired_date
        min_spend
        max_discount
        status
      }
    }
  }
`

export const ADD_CUSTOMER = gql`
  mutation addCustomer($data: CustomerInput!) {
    addCustomer(data: $data) {
      customer_id
      tsid
      name
      phone
      email
      birthday
      status
      username
      password
    }
  }
`

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: Int!, $data: CustomerInput!) {
    updateCustomer(id: $id, data: $data) {
      customer_id
      tsid
      name
    }
  }
`

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: Int!) {
    deleteCustomer(id: $id) {
      customer_id
      name
    }
  }
`

export const GET_RANK = gql`
  {
    customerLevelList {
      level_id
      name
    }
  }
`
