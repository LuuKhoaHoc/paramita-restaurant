import { useQuery } from '@apollo/client'
import { Flex, Icon, Card, Text, fr } from '@prismane/core'
import { ShoppingCart, Invoice } from '@phosphor-icons/react'
import ReactECharts from 'echarts-for-react'
import {
  GET_REVENUE_BY_MONTH,
  GET_REVENUE_BY_WEEK
} from '~/pages/Admin/Home/schema'
import { useState } from 'react'

const MonthlyStatistics = ({ monthInput }) => {
  const { loading: loadingMonth, data: dataMonth } = useQuery(
    GET_REVENUE_BY_MONTH,
    {
      variables: {
        month: monthInput
      }
    }
  )
  if (loadingMonth) return <div>Loading...</div>
  const { loading: loadingWeek, data: dataWeek } = useQuery(
    GET_REVENUE_BY_WEEK,
    {
      variables: {
        month: monthInput
      }
    }
  )
  if (loadingWeek) return <div>Loading...</div>
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
      >
        <ReactECharts
          style={{ width: '50%', height: fr(80) }}
          option={optionPie}
        />
        <ReactECharts
          style={{ width: '50%', height: fr(80) }}
          option={optionBar}
        />
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
            {dataMonth?.getRevenueByQuarter?.invoiceNumber}
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
            {dataMonth?.getRevenueByQuarter?.orderNumber}
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
