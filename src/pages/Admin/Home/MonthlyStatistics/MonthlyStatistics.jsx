import { useQuery } from '@apollo/client'
import { Flex, Icon, Card, Text, fr, Center } from '@prismane/core'
import {
  ShoppingCart,
  Invoice,
  CurrencyCircleDollar
} from '@phosphor-icons/react'
import ReactECharts from 'echarts-for-react'
import {
  GET_REVENUE_BY_MONTH,
  GET_REVENUE_BY_WEEK
} from '~/pages/Admin/Home/schema'
import { useEffect, useState } from 'react'

const MonthlyStatistics = ({ monthInput }) => {
  const {
    loading: loadingMonth,
    data: dataMonth,
    error: errorMonth
  } = useQuery(GET_REVENUE_BY_MONTH, {
    variables: {
      month: monthInput
    }
  })
  const {
    loading: loadingWeek,
    data: dataWeek,
    error: errorWeek,
    refetch: refetchWeek
  } = useQuery(GET_REVENUE_BY_WEEK, {
    variables: {
      month: monthInput
    }
  })
  useEffect(() => {
    if (dataMonth) {
      refetchWeek()
    }
  }, [])

  if (loadingMonth || loadingWeek) return <div>Loading...</div>
  if (errorMonth || errorWeek) return <div>Error!</div>
  if (!dataWeek || !dataMonth) return null

  const week = JSON.parse(dataWeek.getRevenueByWeek.response)
  const revenue = [
    {
      value: +dataMonth?.getRevenueByMonth.revenueInvoice,
      name: 'Hoá đơn'
    },
    {
      value: +dataMonth?.getRevenueByMonth.revenueOrder,
      name: 'Đơn hàng'
    }
  ]

  const optionPie = {
    title: {
      text: 'Tổng doanh thu từ các nguồn',
      left: 'center',
      textStyle: {
        fontFamily: 'GeomanistMedium'
      }
    },
    tooltip: {
      trigger: 'item',
      valueFormatter: (v) => `${v.toLocaleString('vi-VN')} VND`
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: revenue,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  const optionBar = {
    legend: {},
    tooltip: {
      valueFormatter: (v) => `${Number(v).toLocaleString('vi-VN')} VND`
    },
    dataset: {
      dimensions: ['Week', 'Hoá đơn', 'Đơn hàng'],
      source: week.map((item) => ({
        Week: `${item.Week}  ${item.Start} - ${item.End}`,
        'Hoá đơn': item.Invoice,
        'Đơn hàng': item.Order
      }))
    },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }]
  }
  return (
    <>
      <Flex
        w={'100%'}
        sx={{
          '*': {
            fontFamily: 'GeomanistMedium !important'
          }
        }}
        direction='column'
      >
        <Center>
          <Icon size={fr(12)} cl='primary'>
            <CurrencyCircleDollar />
          </Icon>
          <Text fs={'xl'}>
            Tổng doanh thu tháng này{' '}
            <Text cl={'primary'}>
              {(
                +dataMonth?.getRevenueByMonth.revenueInvoice +
                +dataMonth?.getRevenueByMonth.revenueOrder
              ).toLocaleString('vi-VN')}{' '}
              VND
            </Text>
          </Text>
        </Center>
        <Flex>
          <ReactECharts
            style={{ width: '50%', height: fr(80) }}
            option={optionPie}
          />
          <ReactECharts
            style={{ width: '50%', height: fr(80) }}
            option={optionBar}
          />
        </Flex>
      </Flex>
      <Flex mx={fr(16)} gap={fr(8)}>
        <Card
          w={'50%'}
          h={fr(10)}
          direction='row'
          justify='center'
          align='center'
          fs={'xl'}
          bsh={'md'}
          gap={fr(8)}
          bg={'blue'}
          cl={'white'}
        >
          <Text ff={'GeomanistMedium !important'} cl={'white'}>
            {dataMonth?.getRevenueByMonth?.invoiceNumber}
          </Text>
          <Icon size={fr(12)}>
            <Invoice />
          </Icon>
          <Text ff={'GeomanistMedium !important'} cl={'white'}>
            Hoá đơn
          </Text>
        </Card>
        <Card
          w={'50%'}
          h={fr(10)}
          direction='row'
          justify='center'
          align='center'
          fs={'xl'}
          bsh={'md'}
          gap={fr(8)}
          bg={'primary'}
          cl={'white'}
        >
          <Text ff={'GeomanistMedium !important'} cl={'white'}>
            {dataMonth?.getRevenueByMonth?.orderNumber}
          </Text>
          <Icon size={fr(12)}>
            <ShoppingCart />
          </Icon>
          <Text ff={'GeomanistMedium !important'} cl={'white'}>
            Đơn hàng
          </Text>
        </Card>
      </Flex>
    </>
  )
}

export default MonthlyStatistics
