import { useQuery } from '@apollo/client'
import { Flex, Icon, Card, Text, fr, Center } from '@prismane/core'
import {
  ShoppingCart,
  Invoice,
  CurrencyCircleDollar
} from '@phosphor-icons/react'
import ReactECharts from 'echarts-for-react'
import { GET_REVENUE_BY_DAY } from '~/pages/Admin/Home/schema'
import { dataTimeOptions } from '~/pages/Admin/Home/selectFieldOptions'
import { useState } from 'react'

const DailyStatistics = ({ dayInput }) => {
  const [day, setDay] = useState('')
  const {
    loading: loadingDay,
    data: dataDay,
    error: errorDay
  } = useQuery(GET_REVENUE_BY_DAY, {
    variables: { day: dayInput },
    onCompleted: (data) => {
      const jsonParse = JSON.parse(data.getRevenueByDay.response)
      setDay(jsonParse)
    }
  })

  const revenue = [
    {
      value: day?.invoice?.reduce((acc, item) => acc + item, 0),
      name: 'Hoá đơn'
    },
    {
      value: day?.order?.reduce((acc, item) => acc + item, 0),
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
      data: dataTimeOptions
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
        smooth: true,
        data: day?.invoice
      },
      {
        type: 'line',
        name: 'Đơn hàng',
        smooth: true,
        data: day?.order
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
            Tổng doanh thu ngày này{' '}
            <Text cl={'primary'}>
              {(revenue[0].value + revenue[1].value).toLocaleString('vi-VN')}{' '}
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
            {day?.invoice?.filter((item) => item !== 0).length}
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
            {day?.order?.filter((item) => item !== 0).length}
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

export default DailyStatistics
