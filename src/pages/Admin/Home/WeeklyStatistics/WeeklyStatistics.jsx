import { useQuery } from '@apollo/client'
import { Flex, Icon, Card, Text, fr, Center } from '@prismane/core'
import {
  ShoppingCart,
  Invoice,
  CurrencyCircleDollar
} from '@phosphor-icons/react'
import ReactECharts from 'echarts-for-react'
import { GET_REVENUE_BY_WEEKLY } from '~/pages/Admin/Home/schema'
import { useEffect, useState } from 'react'

const WeeklyStatistics = ({ weekInput }) => {
  const [weeklyRevenue, setWeeklyRevenue] = useState()
  const { data: dataWeek } = useQuery(GET_REVENUE_BY_WEEKLY, {
    variables: { week: weekInput },
    onCompleted: (data) => {
      setWeeklyRevenue(JSON.parse(data.getRevenueByWeekly.response))
    }
  })
  // calculate revenue for option pie

  let revenueOrder = weeklyRevenue?.reduce(
    (acc, item) => acc + item.Order || 0,
    0
  )
  let revenueInvoice = weeklyRevenue?.reduce(
    (acc, item) => acc + item.Invoice || 0,
    0
  )
  // sync invoice and order for option line
  const syncedInvoiceArr = new Array(7).fill(0)
  const syncedOrderArr = new Array(7).fill(0)

  weeklyRevenue?.forEach((item) => {
    const dayIndex = item.Day - 1
    syncedInvoiceArr[dayIndex] = item.Invoice || 0
    syncedOrderArr[dayIndex] = item.Order || 0
  })

  const revenue = [
    {
      value: revenueInvoice,
      name: 'Hoá đơn'
    },
    {
      value: revenueOrder,
      name: 'Đơn hàng'
    }
  ]

  const optionPie = {
    title: {
      text: 'Doanh thu từ các nguồn',
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

  const optionLine = {
    legend: {
      data: ['Đơn hàng', 'Hoá đơn']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      valueFormatter: (v) => `${Number(v).toLocaleString('vi-VN')} VND`,
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        'Thứ Hai',
        'Thứ Ba',
        'Thứ Tư',
        'Thứ Năm',
        'Thứ Sáu',
        'Thứ Bảy',
        'Chủ Nhật'
      ]
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} VND'
      },
      axisPointer: {
        snap: true
      }
    },

    series: [
      {
        type: 'line',
        name: 'Hoá đơn',
        data: syncedInvoiceArr
      },
      {
        type: 'line',
        name: 'Đơn hàng',
        data: syncedOrderArr
      }
    ]
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
            Tổng doanh thu tuần này{' '}
            <Text cl={'primary'}>
              {(revenueInvoice + revenueOrder).toLocaleString('vi-VN')} VND
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
            option={optionLine}
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
            {dataWeek?.getRevenueByWeekly?.invoiceNumber}
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
            {dataWeek?.getRevenueByWeekly?.orderNumber}
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

export default WeeklyStatistics
