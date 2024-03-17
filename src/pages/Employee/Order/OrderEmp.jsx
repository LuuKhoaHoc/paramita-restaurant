import { DotsThree, Eye, MinusCircle, Trash } from '@phosphor-icons/react'
import {
  Grid,
  Animation,
  fr,
  Flex,
  Text,
  Button,
  Table,
  TextField,
  Chip,
  Icon,
  NativeSelectField
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import React, { useState } from 'react'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'
import OrderDetailEmp from '~/pages/Employee/Order/OrderDetailEmp/OrderDetailEmp'

const OrderEmp = ({ employee }) => {
  const [open, setOpen] = useState(
    sessionStorage.getItem('openNavbar') === 'true' ? true : false
  )
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const { query, setQuery, filtered } = useSearch([
    {
      id: '0331313131331',
      name: 'Lê Thị Thanh Vy',
      date: '31/12/2023'
    },
    {
      id: '1231312',
      name: 'Lưu Khoa Học',
      date: '31/12/2023'
    }
  ])
  return (
    <>
      {/* Order detail */}
      <OrderDetailEmp
        openModalDetail={openModalDetail}
        setOpenModalDetail={setOpenModalDetail}
      />
      <Grid templateColumns={12} templateRows={13} h={'100vh'}>
        {/* Navbar */}
        <Grid.Item
          columnStart={1}
          columnEnd={!open ? 2 : 3}
          h={'100vh'}
          bsh={'md'}
        >
          {open ? (
            <Animation animation={'scale-x'} animated={open}>
              <NavbarEmployee />
            </Animation>
          ) : (
            <NavbarEmployeeIcon />
          )}
        </Grid.Item>
        {/* Header */}
        <Grid.Item
          columnStart={!open ? 2 : 3}
          columnEnd={13}
          rowStart={1}
          rowEnd={2}
          bsh={'base'}
        >
          <HeaderEmployee open={open} setOpen={setOpen} employee={employee} />
        </Grid.Item>
        {/* Body */}
        <Grid.Item
          columnStart={!open ? 2 : 3}
          columnEnd={13}
          rowStart={2}
          rowEnd={'auto'}
        >
          <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
            <Text className='GeomanistMedium-font' fs={'xl'}>
              Tất cả đơn hàng
            </Text>
            <Flex align='center' gap={fr(2)}>
              <TextField
                placeholder='Tìm kiếm...'
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                icon={<DotsThree weight='bold' />}
                size='md'
                variant='tertiary'
                bd={'none'}
                bsh={'sm'}
              />
            </Flex>
          </Flex>
          <Table>
            <Table.Head ta={'center'}>
              <Table.Row>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Mã đơn hàng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Tên khách hàng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Trạng thái</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>
                    Phương thức thanh toán
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>
                    Trạng thái thanh toán
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Ngày tạo</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Hành động</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              {filtered.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Text fs={'md'}>#{item.id}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fs={'md'}>{item.name}</Text>
                  </Table.Cell>
                  <Table.Cell align='center'>
                    <NativeSelectField
                      name='statusOrder'
                      options={[
                        { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
                        { label: 'Đang thực hiện', value: 'Đang thực hiện' },
                        { label: 'Đang đến', value: 'Đang đến' },
                        { label: 'Hoàn thành', value: 'Hoàn thành' }
                      ]}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text>Tiền mặt</Text>
                  </Table.Cell>
                  <Table.Cell align='center'>
                    <Chip icon={<MinusCircle />} color='ruby'>
                      Chưa thanh toán
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fs={'md'}>{item.date}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={fr(4)} align='center' justify='center'>
                      <Icon
                        cs={'pointer'}
                        cl={'green'}
                        onClick={() => {
                          setOpenModalDetail(true)
                        }}
                      >
                        <Eye />
                      </Icon>
                      <Icon cs={'pointer'} cl={'red'} onClick={() => {}}>
                        <Trash />
                      </Icon>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Foot ta={'center'}>
              <Table.Row>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Mã đơn hàng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Tên khách hàng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Trạng thái</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>
                    Phương thức thanh toán
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>
                    Trạng thái thanh toán
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Ngày tạo</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Hành động</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Foot>
          </Table>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default OrderEmp
