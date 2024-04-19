import { useQuery } from '@apollo/client'
import { Flex, Icon, Card, Text, fr } from '@prismane/core'
import { ShoppingCart, Invoice } from '@phosphor-icons/react'
import ReactECharts from 'echarts-for-react'
import {
  GET_REVENUE_BY_MONTH,
  GET_REVENUE_BY_QUARTER
} from '~/pages/Admin/Home/schema'

const QuarterlyStatistics = ({ quarterInput }) => {
  const {
    data: dataQuarter,
    loading: loadingQuarter,
    refetch: refetchQuarter
  } = useQuery(GET_REVENUE_BY_QUARTER, {
    variables: {
      quarter: quarterInput
    }
  })
  let refetchMonth
  let revenues = []
  let startMonth = quarterInput * 3 - 2
  for (let i = 0; i < 3; i++) {
    const month = startMonth + i
    const { data, loading, refetch } = useQuery(GET_REVENUE_BY_MONTH, {
      variables: {
        month: month.toString()
      }
    })
    refetchMonth = refetch
    revenues.push(data)
  }
  if (loadingQuarter) return <div>Loading</div>
  const revenue = [
    {
      value: +dataQuarter?.getRevenueByQuarter.revenueInvoice,
      name: 'Hoá đơn'
    },
    {
      value: +dataQuarter?.getRevenueByQuarter.revenueOrder,
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
      dimensions: ['Month', 'Hoá đơn', 'Đơn hàng'],
      source: [
        {
          Month: `Tháng ${
            quarterInput === '1'
              ? '1'
              : quarterInput === '2'
              ? '4'
              : quarterInput === '3'
              ? '7'
              : '10'
          }`,
          'Đơn hàng': revenues[0]?.getRevenueByMonth?.revenueOrder,
          'Hoá đơn': revenues[0]?.getRevenueByMonth?.revenueInvoice
        },
        {
          Month: `Tháng ${
            quarterInput === '1'
              ? '2'
              : quarterInput === '2'
              ? '5'
              : quarterInput === '3'
              ? '8'
              : '11'
          }`,
          'Đơn hàng': revenues[1]?.getRevenueByMonth?.revenueOrder,
          'Hoá đơn': revenues[1]?.getRevenueByMonth?.revenueInvoice
        },
        {
          Month: `Tháng ${
            quarterInput === '1'
              ? '3'
              : quarterInput === '2'
              ? '6'
              : quarterInput === '3'
              ? '9'
              : '12'
          }`,
          'Đơn hàng': revenues[2]?.getRevenueByMonth?.revenueOrder,
          'Hoá đơn': revenues[2]?.getRevenueByMonth?.revenueInvoice
        }
      ]
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
            {dataQuarter?.getRevenueByQuarter?.invoiceNumber}
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
            {dataQuarter?.getRevenueByQuarter?.orderNumber}
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

export default QuarterlyStatistics
