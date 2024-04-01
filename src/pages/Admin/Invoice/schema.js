import { gql } from '@apollo/client'

export const GET_INVOICES = gql`
  query getInvoices {
    invoiceList {
      invoice_id
      invoice_time
      customer {
        name
        phone
      }
      voucher {
        name
      }
      payment_method
      payment_status
      total_price
      note
      invoice_details {
        invoice_detail_id
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
export const DELETE_INVOICE_DETAIL = gql`
  mutation deleteInvoiceDetail($id: Int!) {
    deleteInvoiceDetail(id: $id) {
      invoice_detail_id
    }
  }
`
export const DELETE_INVOICE = gql`
  mutation deleteInvoice($id: Int!) {
    deleteInvoice(id: $id) {
      invoice_id
    }
  }
`
