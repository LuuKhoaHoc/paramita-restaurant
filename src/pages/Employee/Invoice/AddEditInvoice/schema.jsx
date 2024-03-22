import { gql } from '@apollo/client'

export const GET_MENU = gql`
  query {
    menuList {
      item_id
      image
      name
      price
      description
      category {
        name
      }
    }
  }
`
export const GET_CUSTOMER_BY_PHONE = gql`
  query getCustomerByPhone($phone: String!) {
    getCustomerByPhone(phone: $phone) {
      customer_id
      name
      phone
      points
      level {
        name
      }
    }
  }
`
export const ADD_INVOICE = gql`
  mutation createInvoice($data: InvoiceInput!) {
    createInvoice(data: $data) {
      invoice_id
      tsid
      invoice_time
      customer {
        name
        phone
        level {
          name
        }
        points
      }
      voucher {
        name
      }
      payment_method
      payment_status
      total_price
      note
    }
  }
`
export const ADD_INVOICE_DETAIL = gql`
  mutation addInvoiceDetailEmp($data: InvoiceDetailInput!) {
    createInvoiceDetail(data: $data) {
      invoice_detail_id
      tsid
      item {
        name
      }
      quantity
      unit_price
      total_price
    }
  }
`
export const UPDATE_INVOICE = gql`
  mutation updateInvoice($id: Int!, $data: InvoiceInput!) {
    updateInvoice(id: $id, data: $data) {
      invoice_id
      tsid
      invoice_time
      customer {
        name
        phone
        level {
          name
        }
        points
      }
      voucher {
        name
      }
      payment_method
      payment_status
      total_price
      note
    }
  }
`
export const UPDATE_INVOICE_DETAIL = gql`
  mutation updateInvoiceDetailEmp($id: Int!, $data: InvoiceDetailInput!) {
    updateInvoiceDetail(id: $id, data: $data) {
      invoice_detail_id
      tsid
      item {
        name
      }
      quantity
      unit_price
      total_price
    }
  }
`
