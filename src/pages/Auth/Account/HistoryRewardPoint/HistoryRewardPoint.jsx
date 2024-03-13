import { CaretRight } from '@phosphor-icons/react'
import { Center, Flex, Icon, Image, Stack, Text, fr } from '@prismane/core'
import { useId } from '@prismane/core/hooks'
import React, { useEffect, useRef } from 'react'
import { useResponsive } from '~/utils/responsive'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Loading } from '~/components'

const CREATE_POINT_HISTORIES = gql`
  mutation createPointHistory($data: PointsHistoryInput!) {
    createPointsHistory(data: $data) {
      customer {
        customer_id
        name
      }
      order {
        order_id
        status
      }
      voucher {
        voucher_id
        status
      }
      points_earned
      points_deducted
      transaction_date
    }
  }
`

const GET_POINT_HISTORIES = gql`
  query {
    pointsHistoryList {
      point_history_id
      tsid
      order {
        order_id
        tsid
      }
      points_earned
      points_deducted
      transaction_date
    }
  }
`

const HistoryRewardPoint = ({ customer }) => {
  const id = useId()
  const { isTablet, isMobile } = useResponsive()
  const [createPointHistory, { loading, error }] = useMutation(
    CREATE_POINT_HISTORIES
  )
  const { data } = useQuery(GET_POINT_HISTORIES)
  const pointHistory = data?.pointsHistoryList
  const orderComplete = customer?.orders.filter(
    (item) => item.status === 'Hoàn thành'
  )
  const prevOrderCompleteLength = useRef(orderComplete.length)

  useEffect(() => {
    if (orderComplete.length !== prevOrderCompleteLength.current) {
      orderComplete.forEach(async (item) => {
        let point = Math.floor(item?.total_price / 10000)
        let date = new Date(item.created_at)
        const transaction_date = `${date
          .getDate()
          .toString()
          .padStart(2, '0')}.${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${date.getFullYear()}`
        try {
          await createPointHistory({
            variables: {
              data: {
                customerId: customer?.customer_id,
                orderId: item?.order_id,
                voucherId: item?.voucher_id,
                earnedPoints: point,
                transactionDate: transaction_date
              }
            }
          })
        } catch (error) {
          console.log('🚀 ~ error ~ error:', error)
        }
      })
      prevOrderCompleteLength.current = orderComplete.length
    }

    return () => {}
  }, [orderComplete.length, createPointHistory])

  if (loading) return <Loading />
  if (error) return <p>Error : {error.message}</p>

  return (
    <Flex direction='column' grow pos={'relative'} m={fr(10)}>
      <Text
        pos={['relative', { ':before': 'absolute' }]}
        fs={isMobile ? '2xl' : '4xl'}
        sx={{
          '&::before': {
            content: '',
            width: '25%',
            height: '2px',
            borderRadius: '2px',
            backgroundColor: '#39b54a',
            bottom: '0px',
            left: 0
          }
        }}
      >
        Lịch sử tích điểm
      </Text>
      <Stack>
        {pointHistory?.map((item) => (
          <Flex
            key={item?.point_history_id}
            align='center'
            bg={'#fff'}
            br={'base'}
            bsh={'md'}
            p={fr(2)}
            my={fr(2)}
            cs={'pointer'}
          >
            <Flex direction='column' ml={fr(2)} grow>
              <Text as={'h2'} fs={isMobile ? 'md' : 'inherit'}>
                Giao địch thành công
              </Text>
              <Text fs={isMobile ? 'base' : 'lg'}>
                {item?.transaction_date}
              </Text>
              <Text fs={isMobile ? 'base' : 'xl'} cl={'primary'}>
                Mã giao địch: #{item?.tsid}
              </Text>
              <Text fs={isMobile ? 'base' : 'lg'}>
                Mã đơn hàng: #{item?.order.tsid}
              </Text>
            </Flex>

            <Text fs={isMobile ? 'base' : 'xl'} cl={'primary'}>
              {item?.points_earned} điểm
            </Text>
            <Icon size={isMobile ? fr(4) : fr(6)}>
              <CaretRight />
            </Icon>
          </Flex>
        ))}
      </Stack>
    </Flex>
  )
}

export default HistoryRewardPoint
