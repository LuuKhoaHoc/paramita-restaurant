import { gql } from '@apollo/client'

export const GET_ORDERS = gql`
  {
    orderList {
      order_id
      tsid
      customer {
        customer_id
        name
        phone
        email
      }
      status
      delivery_address
      voucher_id
      transport_fee
      payment_method
      payment_status
      total_price
      note
      created_at
      updated_at
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
  }
`

export const GET_VOUCHER = gql`
  query voucher($id: Int!) {
    voucher(id: $id) {
      voucher_id
      name
      discount
      description
      code
      status
      expired_date
      min_spend
      max_discount
    }
  }
`
