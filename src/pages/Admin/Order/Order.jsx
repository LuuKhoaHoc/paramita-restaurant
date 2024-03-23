import {
  Button,
  Flex,
  Skeleton,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import OrderRow from '~/pages/Admin/Order/OrderRow/OrderRow'
import { useQuery } from '@apollo/client'

import { GET_ORDERS } from '~/pages/Admin/Order/schema'
import { DotsThree } from '@phosphor-icons/react'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'

const Order = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data } = useQuery(GET_ORDERS)
  const { query, setQuery, filtered } = useSearch(data?.orderList || [])
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <Flex direction='column'>
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
              variant='secondary'
              size='md'
              // icon={<Shopping weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm đơn hàng
            </Button>
            <Button
              icon={<DotsThree weight='bold' />}
              size='md'
              variant='tertiary'
              bd={'none'}
              bsh={'sm'}
            />
          </Flex>
        </Flex>
        <Table w={'100%'}>
          <Table.Head ta={'center'}>
            <Table.Row fs={'md'}>
              <Table.Cell className='GeomanistMedium-font'>ID</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Khách hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Trạng thái
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Địa chỉ nhận hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Giá thanh toán
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Hành động
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filtered.map((order) => (
              <OrderRow key={order.order_id} order={order} />
            ))}
          </Table.Body>
          <Table.Foot ta={'center'}>
            <Table.Row fs={'md'}>
              <Table.Cell className='GeomanistMedium-font'>ID</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Khách hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Trạng thái
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Địa chỉ nhận hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Giá thanh toán
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Hành động
              </Table.Cell>
            </Table.Row>
          </Table.Foot>
        </Table>
      </Flex>
    </>
  )
}

export default Order
