import { Divider, Flex, Modal, Table, Text, fr } from '@prismane/core'
import { formatTime } from '~/utils/formatTime'

const InvoiceDetailModal = ({ invoice, openModal, setOpenModal }) => {
  let total_price = invoice?.invoice_details?.reduce((acc, item) => {
    return acc + item.total_price
  }, 0)
  return (
    <Modal
      w={'40vw'}
      mah={'90vh'}
      of={'auto'}
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header
        justify='center'
        ff={'GeomanistMedium !important'}
        fs={'xl'}
      >
        Chi tiết hoá đơn
      </Modal.Header>
      <Flex direction='column' gap={fr(2)} fs={'lg'}>
        <Text>Mã hoá đơn: {invoice?.invoice_id}</Text>
        <Text>Thời gian giao dịch: {formatTime(invoice?.invoice_time)}</Text>
        <Text>Tên khách hàng: {invoice?.customer?.name}</Text>
        <Text>Số điện thoại: {invoice?.customer?.phone}</Text>
        <Text>Voucher: {invoice?.voucher?.name || 'Không có'}</Text>
        <Text>Phương thức thanh toán: {invoice?.payment_method}</Text>
        <Text>Trạng thái thanh toán: {invoice?.payment_status}</Text>
        <Text>Ghi chú: {invoice?.note}</Text>
      </Flex>
      <Table>
        <Table.Head ta={'center'}>
          <Table.Row>
            <Table.Cell>
              <Text className='GeomanistMedium-font'>STT</Text>
            </Table.Cell>
            <Table.Cell>
              <Text className='GeomanistMedium-font'>Tên món</Text>
            </Table.Cell>
            <Table.Cell>
              <Text className='GeomanistMedium-font'>Đơn giá</Text>
            </Table.Cell>
            <Table.Cell>
              <Text className='GeomanistMedium-font'>Số lượng</Text>
            </Table.Cell>
            <Table.Cell>
              <Text className='GeomanistMedium-font'>Tổng</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body ta={'center'}>
          {invoice?.invoice_details?.map((item) => {
            return (
              <Table.Row key={item.invoice_detail_id}>
                <Table.Cell>
                  <Text fs={'md'}>
                    {invoice?.invoice_details?.indexOf(item) + 1}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fs={'md'}>{item.item.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fs={'md'}>
                    {item.unit_price.toLocaleString('vi-VN')}đ
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fs={'md'}>{item.quantity}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text fs={'md'}>
                    {item.total_price.toLocaleString('vi-VN')}đ
                  </Text>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      <Divider />
      <Flex direction='column' align='end' mx={fr(4)} fs={'lg'}>
        <Text>Tổng tiền: {total_price.toLocaleString('vi-VN')}đ</Text>
        <Text>Thuế: 5.000đ</Text>
        <Text cl={'primary'} fs={'xl'}>
          Thành tiền: {(total_price + 5000).toLocaleString('vi-VN')}đ
        </Text>
      </Flex>
    </Modal>
  )
}
export default InvoiceDetailModal
