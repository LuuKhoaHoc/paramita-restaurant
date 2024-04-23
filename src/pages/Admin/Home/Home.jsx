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
  Tooltip,
  Center,
  AutocompleteField,
  NativeDateField
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
import { useState } from 'react'
import { GET_CUSTOMERS } from '~/pages/Admin/CustomerManager/schema'
import { GET_EMPLOYEES } from '~/pages/Admin/EmployeeManager/schema'
import { GET_ORDERS } from '~/pages/Admin/Order/schema'
import { NavLink } from 'react-router-dom'
import { GET_MENU } from '~/pages/Admin/Menu/schema'
import { GET_TABLES } from '~/pages/Admin/Table/schema'
import { GET_RESERVATIONS } from '~/pages/Admin/Reservation/schema'
import { GET_INVOICES } from '~/pages/Admin/Invoice/schema'
import {
  monthOptions,
  quarterOptions,
  weekOptions,
  yearOptions
} from './selectFieldOptions'
import QuarterlyStatistics from '~/pages/Admin/Home/QuarterlyStatistics/QuarterlyStatistics'
import MonthlyStatistics from '~/pages/Admin/Home/MonthlyStatistics/MonthlyStatistics'
import YearlyStatistics from '~/pages/Admin/Home/YearlyStatistics/YearlyStatistics'
import WeeklyStatistics from '~/pages/Admin/Home/WeeklyStatistics/WeeklyStatistics'

const Home = () => {
  const [statisticsBy, setStatisticsBy] = useState('quarter')
  const [value, setValue] = useState('1')
  const [week, setWeek] = useState('1')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const { loading: loadingCustomer, data: dataCustomer } =
    useQuery(GET_CUSTOMERS)
  const { loading: loadingEmployee, data: dataEmployee } =
    useQuery(GET_EMPLOYEES)
  const { loading: loadingOrder, data: dataOrder } = useQuery(GET_ORDERS)
  const { loading: loadingInvoice, data: dataInvoice } = useQuery(GET_INVOICES)
  const { loading: loadingMenu, data: dataMenu } = useQuery(GET_MENU)
  const { loading: loadingTable, data: dataTable } = useQuery(GET_TABLES)
  const { loading: loadingReservation, data: dataReservation } =
    useQuery(GET_RESERVATIONS)
  const handleRefetch = async () => {}
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
        <Center ml={fr(4)} gap={fr(4)}>
          <Text fs={'lg'} ff={'GeomanistMedium !important'}>
            Thống kê theo
          </Text>
          <NativeSelectField
            className='GeomanistMedium-font'
            value={statisticsBy}
            onChange={(e) => setStatisticsBy(e.target.value)}
            options={[
              { label: 'Quý', value: 'quarter' },
              { label: 'Năm', value: 'year' },
              { label: 'Tháng', value: 'month' },
              { label: 'Tuần', value: 'week' },
              { label: 'Ngày', value: 'day' }
            ]}
          />
        </Center>
        {statisticsBy === 'year' ? (
          <AutocompleteField
            ml={fr(4)}
            placeholder='Nhập năm muốn thống kê'
            gap={fr(0)}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            options={yearOptions}
          />
        ) : statisticsBy === 'day' ? (
          <NativeDateField ml={fr(4)} />
        ) : statisticsBy === 'month' ? (
          <NativeSelectField
            ml={fr(4)}
            className='GeomanistMedium-font'
            name='select1'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{
              '*': {
                cursor: 'pointer'
              }
            }}
            options={monthOptions}
          />
        ) : statisticsBy === 'week' ? (
          <>
            <NativeSelectField
              ml={fr(4)}
              className='GeomanistMedium-font'
              name='select3'
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              sx={{
                '*': {
                  cursor: 'pointer'
                }
              }}
              options={weekOptions}
            />
          </>
        ) : (
          <NativeSelectField
            ml={fr(4)}
            className='GeomanistMedium-font'
            name='select'
            value={value || '1'}
            onChange={(e) => setValue(e.target.value)}
            sx={{
              '*': {
                cursor: 'pointer'
              }
            }}
            options={quarterOptions}
          />
        )}
      </Flex>
      {statisticsBy === 'quarter' ? (
        <QuarterlyStatistics quarterInput={value || '1'} />
      ) : statisticsBy === 'month' ? (
        <MonthlyStatistics
          monthInput={value || (new Date().getMonth() + 1).toString()}
        />
      ) : statisticsBy === 'year' ? (
        <YearlyStatistics yearInput={year} />
      ) : statisticsBy === 'week' ? (
        <WeeklyStatistics weekInput={week} />
      ) : (
        <></>
      )}
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
      <Stack
        direction='row'
        mx={fr(8)}
        gap={fr(4)}
        wrap='wrap'
        justify='center'
      >
        <Card
          direction='row'
          miw={'20%'}
          h={fr(18)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataInvoice?.invoiceList.length}
          </Text>
          <Icon size={fr(12)}>
            <User />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Tổng hoá đơn
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/invoice'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
        <Card
          direction='row'
          miw={'20%'}
          h={fr(18)}
          gap={fr(4)}
          fs={'2xl'}
          justify='center'
          align='center'
        >
          <Text ff={'GeomanistMedium !important'}>
            {dataOrder?.orderList.length}
          </Text>
          <Icon size={fr(12)}>
            <User />
          </Icon>
          <Text ff={'GeomanistMedium !important'} fs={'xl'}>
            Tổng đơn hàng
          </Text>
          <Icon
            size={fr(8)}
            cl={['inherit', { hover: 'primary' }]}
            as={NavLink}
            to={'/admin/order'}
          >
            <ArrowCircleRight />
          </Icon>
        </Card>
        <Card
          direction='row'
          miw={'20%'}
          h={fr(18)}
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
          miw={'20%'}
          direction='row'
          h={fr(18)}
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
          miw={'20%'}
          h={fr(18)}
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
          miw={'20%'}
          direction='row'
          h={fr(18)}
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
          miw={'20%'}
          direction='row'
          h={fr(18)}
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
          miw={'20%'}
          direction='row'
          h={fr(18)}
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
