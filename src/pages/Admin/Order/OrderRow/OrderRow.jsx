import { Eye, Pen, Trash } from '@phosphor-icons/react'
import { ActionButton, Flex, Table, fr } from '@prismane/core'
import { useState } from 'react'
import OrderDetailModal from '~/pages/Admin/Order/OrderRow/OrderDetailModal/OrderDetailModal'

const OrderRow = ({ order }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false)
  return (
    <>
      <OrderDetailModal
        order={order}
        openModal={openDetailModal}
        setOpenModal={setOpenDetailModal}
      />
      <Table.Row ta={'center'}>
        <Table.Cell>{order?.order_id}</Table.Cell>
        <Table.Cell>{order?.customer.name}</Table.Cell>
        <Table.Cell>{order?.status}</Table.Cell>
        <Table.Cell>{order?.delivery_address}</Table.Cell>
        <Table.Cell>{(order?.total_price).toLocaleString('vi-VN')}đ</Table.Cell>
        <Table.Cell>
          <Flex gap={fr(4)}>
            <ActionButton
              icon={<Eye />}
              fillOnHover
              color='slate'
              onClick={() => setOpenDetailModal(true)}
            />
            <ActionButton icon={<Pen />} fillOnHover color='diamond' />
            <ActionButton icon={<Trash />} fillOnHover color='ruby' />
          </Flex>
        </Table.Cell>
      </Table.Row>
    </>
  )
}
export default OrderRow
