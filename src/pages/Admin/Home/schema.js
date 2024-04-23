import { gql } from '@apollo/client'

export const GET_REVENUE_BY_WEEK = gql`
  query getRevenueByWeek($month: String!) {
    getRevenueByWeek(month: $month) {
      response
    }
  }
`
export const GET_REVENUE_BY_WEEKLY = gql`
  query getRevenueByWeekly($week: String!) {
    getRevenueByWeekly(week: $week) {
      response
    }
  }
`
export const GET_REVENUE_BY_MONTH = gql`
  query getRevenueByMonth($month: String!, $year: String!) {
    getRevenueByMonth(month: $month, year: $year) {
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
export const GET_REVENUE_BY_YEAR = gql`
  query getRevenueByYear($year: String!) {
    getRevenueByYear(year: $year) {
      invoiceNumber
      revenueInvoice
      orderNumber
      revenueOrder
    }
  }
`
