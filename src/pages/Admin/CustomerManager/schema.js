import { gql } from '@apollo/client'

export const GET_CUSTOMERS = gql`
  {
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
          capacity
          status
        }
        description
        reservationDate
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
