import { gql } from '@apollo/client'

export const ADD_PROMOTION = gql`
  mutation addPromotion($data: PromotionInput!) {
    createPromotion(data: $data) {
      promotion_id
    }
  }
`

export const GET_PROMOTIONS = gql`
  {
    promotionList {
      promotion_id
      tsid
      name
      description
      start_date
      end_date
      target
      conditions
      discount
      status
    }
  }
`
