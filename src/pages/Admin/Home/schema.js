import { gql } from '@apollo/client'

export const GET_REVENUE_BY_MONTH = gql`
  query getRevenueByMonth($month: String!) {
    getRevenueByMonth(month: $month) {
      invoiceNumber
      revenueInvoice
      orderNumber
      revenueOrder
    }
  }
`
export const GET_REVENUE_BY_QUARTER = gql`
  query getRevenueByQuarter($quarter: String!) {
    getRevenueByQuarter(quarter: $quarter) {
      invoiceNumber
      revenueInvoice
      orderNumber
      revenueOrder
    }
  }
`
