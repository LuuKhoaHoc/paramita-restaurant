import { useApolloClient, useQuery } from '@apollo/client'
import { Flex, Icon, Card, Text, fr, Center } from '@prismane/core'
import {
  ShoppingCart,
  Invoice,
  CurrencyCircleDollar
} from '@phosphor-icons/react'
import ReactECharts from 'echarts-for-react'
import {
  GET_REVENUE_BY_MONTH,
  GET_REVENUE_BY_YEAR
} from '~/pages/Admin/Home/schema'
import { useEffect, useState } from 'react'

const YearlyStatistics = ({ yearInput }) => {
  const client = useApolloClient()
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const {
    data: dataYear,
    loading: loadingYear,
    refetch: refetchYear
  } = useQuery(GET_REVENUE_BY_YEAR, {
    variables: {
      year: yearInput
    }
  })
  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      let revenueData = []

      for (let i = 1; i <= 12; i++) {
        const { data } = await client.query({
          query: GET_REVENUE_BY_MONTH,
          variables: { month: i.toString(), year: yearInput },
          fetchPolicy: 'no-cache'
        })
        revenueData.push({
          Month: i,
          'Hoá đơn': +data?.getRevenueByMonth.revenueInvoice,
          'Đơn hàng': +data?.getRevenueByMonth.revenueOrder
        })
      }
      setMonthlyRevenue(revenueData)
    }
    fetchMonthlyRevenue()
    return () => {
      setMonthlyRevenue([])
    }
  }, [client, yearInput])

  const revenue = [
    {
      value: +dataYear?.getRevenueByYear.revenueInvoice,
      name: 'Hoá đơn'
    },
    {
      value: +dataYear?.getRevenueByYear.revenueOrder,
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
  const optionBar = {
    legend: {},
    tooltip: {
      valueFormatter: (v) => `${Number(v).toLocaleString('vi-VN')} VND`
    },
    dataset: {
      dimensions: ['Month', 'Hoá đơn', 'Đơn hàng'],
      source: monthlyRevenue
    },
    xAxis: { type: 'category' },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} VND'
      },
      axisPointer: {
        snap: true
      }
    },
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
            Tổng doanh thu năm này{' '}
            <Text cl={'primary'}>
              {(
                +dataYear?.getRevenueByYear.revenueInvoice +
                +dataYear?.getRevenueByYear.revenueOrder
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
            {dataYear?.getRevenueByYear?.invoiceNumber}
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
            {dataYear?.getRevenueByYear?.orderNumber}
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

export default YearlyStatistics
