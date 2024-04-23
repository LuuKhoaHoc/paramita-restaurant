import { gql } from '@apollo/client'

export const GET_ORDERS = gql`
  query getOrders {
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

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: Int!, $data: OrderInput!) {
    updateOrder(id: $id, data: $data) {
      order_id
      status
    }
  }
`

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: Int!) {
    deleteOrder(id: $id) {
      order_id
    }
  }
`
export const DELETE_ORDER_DETAIL = gql`
  mutation deleteOrderDetail($id: Int!) {
    deleteOrderDetail(id: $id) {
      order_detail_id
    }
  }
`
export const CREATE_POINT_HISTORY = gql`
  mutation createPointHistory($data: PointsHistoryInput!) {
    createPointsHistory(data: $data) {
      point_history_id
      tsid
      customer {
        customer_id
        name
      }
    }
  }
`
