import { X } from '@phosphor-icons/react'
import {
  Button,
  Flex,
  Modal,
  Skeleton,
  Stack,
  Table,
  Text,
  fr
} from '@prismane/core'
import { useQuery } from '@apollo/client'
import { GET_VOUCHER } from '~/pages/Admin/Order/schema'

const OrderDetailModal = ({ order, openModal, setOpenModal }) => {
  const { loading, error, data } = useQuery(GET_VOUCHER, {
    variables: { id: order?.voucher_id }
  })
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  let discountPrice =
    (order?.order_details.reduce((acc, cur) => acc + cur?.total_price, 0) +
      order?.transport_fee) *
    (data?.voucher?.discount / 100)
  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} w={'40%'}>
        <Modal.Header justify='center'>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Chi tiết đơn hàng
          </Text>
        </Modal.Header>
        <Stack fs={'md'}>
          <Flex justify='between'>
            <Text>Mã đơn hàng:</Text>
            <Text>#{order?.tsid}</Text>
          </Flex>
          <Flex justify='between'>
            <Text>Thời gian đặt:</Text>
            <Text>{order?.created_at}</Text>
          </Flex>
          <Flex justify='between'>
            <Text>Khách hàng:</Text>
            <Text>{order?.customer.name}</Text>
          </Flex>
          <Flex justify='between'>
            <Text>Số điện thoại:</Text>
            <Text>{order?.customer.phone}</Text>
          </Flex>
          <Flex justify='between'>
            <Text>Địa chỉ giao hàng:</Text>
            <Text>{order?.delivery_address}</Text>
          </Flex>
          <Flex justify='between'>
            <Text>Mã giảm giá áp dụng:</Text>
            <Text>{data?.voucher?.name}</Text>
          </Flex>
          <Flex justify='between'>
            <Text>Phương thức thanh toán:</Text>
            <Text>
              {
                {
                  'mo-mo': 'MoMo',
                  'tien-mat': 'Tiền mặt',
                  'ngan-hang': 'Ngân hàng'
                }[order?.payment_method]
              }
            </Text>
          </Flex>
          <Flex justify='between'>
            <Text>Trạng thái thanh toán:</Text>
            <Text>{order?.payment_status}</Text>
          </Flex>
          <Flex justify='between'>
            <Text>Trạng thái đơn hàng:</Text>
            <Text>{order?.status}</Text>
          </Flex>
        </Stack>
        <Table>
          <Table.Head ta={'center'}>
            <Table.Row>
              <Table.Cell className='GeomanistMedium-font'>STT</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Tên món</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Số lượng</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Đơn giá</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Tổng giá</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body ta={'center'}>
            {order?.order_details.map((item, index) => (
              <Table.Row key={item.order_detail_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{item.item.name}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>
                  {item.unit_price.toLocaleString('vi-VN')}đ
                </Table.Cell>
                <Table.Cell>
                  {item.total_price.toLocaleString('vi-VN')}đ
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Flex mt={fr(4)} fs={'md'} gap={fr(2)}>
          <Text>Ghi chú:</Text>
          <Text>{order?.note}</Text>
        </Flex>
        <Stack fs={'lg'} align='end' w={'100%'}>
          <Flex align='center' gap={fr(2)}>
            <Text>Tổng giá:</Text>
            <Text>
              {order?.order_details
                .reduce((acc, item) => acc + item.total_price, 0)
                .toLocaleString('vi-VN')}
              đ
            </Text>
          </Flex>
          <Flex align='center' gap={fr(2)}>
            <Text>Phí vận chuyển:</Text>
            <Text>{order?.transport_fee.toLocaleString('vi-VN')}đ</Text>
          </Flex>
          <Flex align='center' gap={fr(2)}>
            <Text>Giảm giá:</Text>
            <Text>-{(discountPrice || 0).toLocaleString('vi-VN')}đ</Text>
          </Flex>
          <Flex align='center' gap={fr(2)}>
            <Text>Thành tiền:</Text>
            <Text>{order?.total_price.toLocaleString('vi-VN')}đ</Text>
          </Flex>
        </Stack>
        <Modal.Footer>
          <Button
            br={'full'}
            bg={['slate', 400]}
            onClick={() => setOpenModal(false)}
            icon={<X />}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default OrderDetailModal
