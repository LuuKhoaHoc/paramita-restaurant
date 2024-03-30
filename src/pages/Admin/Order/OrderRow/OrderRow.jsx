import { Eye, Pen, Trash } from '@phosphor-icons/react'
import {
  ActionButton,
  Alert,
  Button,
  Flex,
  Modal,
  Table,
  Text,
  fr,
  useToast
} from '@prismane/core'
import { useState } from 'react'
import { DELETE_ORDER, DELETE_ORDER_DETAIL } from '~/pages/Admin/Order/schema'
import OrderDetailModal from '~/pages/Admin/Order/OrderRow/OrderDetailModal/OrderDetailModal'
import EditOrderModal from '~/pages/Admin/Order/OrderRow//EditOrderModal/EditOrderModal'
import { useMutation } from '@apollo/client'

const OrderRow = ({ order, refetch }) => {
  const toast = useToast()
  const [deleteOrder] = useMutation(DELETE_ORDER)
  const [deleteOrderDetail] = useMutation(DELETE_ORDER_DETAIL)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const handleDeleteOrder = async () => {
    const orderDetailPromises = order?.order_details?.map((item) =>
      deleteOrderDetail({
        variables: {
          id: item.order_detail_id
        }
      })
    )

    if (orderDetailPromises) {
      try {
        await Promise.all(orderDetailPromises)
      } catch (err) {
        console.log(err)
        return
      }
    }

    deleteOrder({
      variables: {
        id: order?.order_id
      },
      onError: (err) => console.log(err),
      onCompleted: (data) => {
        console.log('🚀 ~ handleDeleteOrder ~ data:', data)
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Bạn đã xoá đơn hàng thành công
              </Alert.Title>
            </Alert>
          )
        })
        setOpenDeleteModal(false)
      }
    })
  }

  return (
    <>
      <Table.Row ta={'center'}>
        <Table.Cell>{order?.order_id}</Table.Cell>
        <Table.Cell>{order?.customer.name}</Table.Cell>
        <Table.Cell>{order?.status}</Table.Cell>
        <Table.Cell>{order?.delivery_address}</Table.Cell>
        <Table.Cell>{(order?.total_price).toLocaleString('vi-VN')}đ</Table.Cell>
        <Table.Cell>
          <OrderDetailModal
            order={order}
            openModal={openDetailModal}
            setOpenModal={setOpenDetailModal}
          />
          <EditOrderModal
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            order={order}
            refetch={refetch}
          />
          <Modal
            w={'40vw'}
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          >
            <Modal.Header
              justify={'center'}
              className='GeomanistMedium-font'
              fs={'2xl'}
              cl={'ruby'}
            >
              Cảnh báo
            </Modal.Header>
            <Flex>
              <Text fs={'lg'} className='GeomanistMedium-font'>
                Bạn muốn xóa đơn hàng này ?
              </Text>
            </Flex>
            <Modal.Footer justify='between'>
              <Button
                variant='tertiary'
                size='md'
                br={'full'}
                color='gray'
                fillOnHover
                onClick={() => setOpenDeleteModal(false)}
              >
                Không
              </Button>
              <Button
                variant='tertiary'
                size='md'
                br={'full'}
                color='ruby'
                fillOnHover
                onClick={() => handleDeleteOrder()}
              >
                Có
              </Button>
            </Modal.Footer>
          </Modal>
          <Flex gap={fr(4)} justify='center'>
            <ActionButton
              icon={<Eye />}
              fillOnHover
              color='slate'
              onClick={() => setOpenDetailModal(true)}
            />
            <ActionButton
              icon={<Pen />}
              fillOnHover
              color='diamond'
              onClick={() => setOpenEditModal(true)}
            />
            <ActionButton
              icon={<Trash />}
              fillOnHover
              color='ruby'
              onClick={() => setOpenDeleteModal(true)}
            />
          </Flex>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default OrderRow
