import { useQuery } from '@apollo/client'
import {
  Flex,
  Icon,
  Card,
  Stack,
  Text,
  fr,
  NativeSelectField,
  ActionButton,
  Tooltip
} from '@prismane/core'
import {
  ArrowsClockwise,
  User,
  UserGear,
  ShoppingCart,
  ArrowCircleRight,
  PicnicTable,
  ForkKnife,
  CalendarBlank,
  AddressBookTabs,
  Invoice
} from '@phosphor-icons/react'
import ReactECharts from 'echarts-for-react'
import { useState } from 'react'
import {
  GET_REVENUE_BY_MONTH,
  GET_REVENUE_BY_QUARTER
} from '~/pages/Admin/Home/schema'
import { GET_CUSTOMERS } from '~/pages/Admin/CustomerManager/schema'
import { GET_EMPLOYEES } from '~/pages/Admin/EmployeeManager/schema'
import { GET_ORDERS } from '~/pages/Admin/Order/schema'
import { NavLink } from 'react-router-dom'
import { GET_MENU } from '~/pages/Admin/Menu/schema'
import { GET_TABLES } from '~/pages/Admin/Table/schema'
import { GET_RESERVATIONS } from '~/pages/Admin/Reservation/schema'

const Home = () => {
  const [quarter, setQuarter] = useState('1')
  const { loading: loadingCustomer, data: dataCustomer } =
    useQuery(GET_CUSTOMERS)
  const { loading: loadingEmployee, data: dataEmployee } =
    useQuery(GET_EMPLOYEES)
  const { loading: loadingOrder, data: dataOrder } = useQuery(GET_ORDERS)
  const { loading: loadingMenu, data: dataMenu } = useQuery(GET_MENU)
  const { loading: loadingTable, data: dataTable } = useQuery(GET_TABLES)
  const { loading: loadingReservation, data: dataReservation } =
    useQuery(GET_RESERVATIONS)
  const {
    data: dataQuarter,
    loading: loadingQuarter,
    refetch: refetchQuarter
  } = useQuery(GET_REVENUE_BY_QUARTER, {
    variables: {
      quarter
    }
  })
  let refetchMonth
  let revenues = []
  let startMonth = quarter * 3 - 2
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
  const handleRefetch = () => {
    refetchQuarter()
    refetchMonth()
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
            quarter === '1'
              ? '1'
              : quarter === '2'
              ? '4'
              : quarter === '3'
              ? '7'
              : '10'
          }`,
          'Đơn hàng': revenues[0]?.getRevenueByMonth?.revenueOrder,
          'Hoá đơn': revenues[0]?.getRevenueByMonth?.revenueInvoice
        },
        {
          Month: `Tháng ${
            quarter === '1'
              ? '2'
              : quarter === '2'
              ? '5'
              : quarter === '3'
              ? '8'
              : '11'
          }`,
          'Đơn hàng': revenues[1]?.getRevenueByMonth?.revenueOrder,
          'Hoá đơn': revenues[1]?.getRevenueByMonth?.revenueInvoice
        },
        {
          Month: `Tháng ${
            quarter === '1'
              ? '3'
              : quarter === '2'
              ? '6'
              : quarter === '3'
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
      <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
        <Text className='GeomanistMedium-font' fs={'xl'} mr={'auto'}>
          Thống kê doanh thu
        </Text>
        <Tooltip label='Làm mới!' position='left-start'>
          <ActionButton
            onClick={handleRefetch}
            icon={<ArrowsClockwise />}
            variant='text'
            size='md'
            cl={['gray', { hover: 'primary' }]}
          />
        </Tooltip>
        <NativeSelectField
          ml={fr(4)}
          className='GeomanistMedium-font'
          name='select'
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
          options={[
            { value: 1, label: 'Quý 1' },
            { value: 2, label: 'Quý 2' },
            { value: 3, label: 'Quý 3' },
            { value: 4, label: 'Quý 4' }
          ]}
        />
      </Flex>

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
      <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
        <Text className='GeomanistMedium-font' fs={'xl'} mr={'auto'}>
          Thống kê nhà hàng
        </Text>
        <Tooltip label='Làm mới!' position='left-start'>
          <ActionButton
            onClick={handleRefetch}
            icon={<ArrowsClockwise />}
            variant='text'
            size='md'
            cl={['gray', { hover: 'primary' }]}
          />
        </Tooltip>
      </Flex>
      <Stack direction='row' mx={fr(8)} gap={fr(4)} wrap='wrap'>
        <Card
          direction='row'
          miw={'30%'}
          h={fr(28)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataCustomer?.customerList.length}
          </Text>
          <Icon size={fr(12)}>
            <User />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Khách hàng
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/customers'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
        <Card
          miw={'30%'}
          direction='row'
          h={fr(28)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataEmployee?.employeeList.length}
          </Text>
          <Icon size={fr(12)}>
            <UserGear />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Nhân viên
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/employees'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
        <Card
          direction='row'
          miw={'30%'}
          h={fr(28)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataMenu?.menuList.length}
          </Text>
          <Icon size={fr(12)}>
            <ForkKnife />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Món ăn
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/menu'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
        <Card
          miw={'30%'}
          direction='row'
          h={fr(28)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataTable?.tableList.length}
          </Text>
          <Icon size={fr(12)}>
            <PicnicTable />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Bàn
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/table'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
        <Card
          miw={'30%'}
          direction='row'
          h={fr(28)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataReservation?.reservationList.length}
          </Text>
          <Icon size={fr(12)}>
            <CalendarBlank />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Đơn đặt bàn
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/table'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
        <Card
          miw={'30%'}
          direction='row'
          h={fr(28)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataReservation?.reservationList.length}
          </Text>
          <Icon size={fr(12)}>
            <AddressBookTabs />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Liên hệ
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/contact'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
      </Stack>
    </>
  )
}

export default Home
