import { Divider, Flex, Modal, Table, Text, fr } from '@prismane/core'

const InvoiceEmpDetail = ({ openModalDetail, setOpenModalDetail, data }) => {
  let total_price = data?.invoice_details?.reduce((acc, item) => {
    return acc + item.total_price
  }, 0)
  return (
    <Modal
      open={openModalDetail}
      onClose={() => setOpenModalDetail(false)}
      closable
      w={'40vw'}
    >
      <Modal.Header>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Chi tiết hoá đơn
        </Text>
      </Modal.Header>
      <Flex direction='column' gap={fr(4)} fs={'lg'}>
        <Text>Tên khách hàng: {data?.customer?.name}</Text>
        <Text>Số điện thoại: {data?.customer?.phone}</Text>
        <Text>Voucher: {data?.voucher?.name}</Text>
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
          {data?.invoice_details?.map((item) => {
            return (
              <Table.Row key={item.invoice_detail_id}>
                <Table.Cell>
                  <Text fs={'md'}>
                    {data?.invoice_details?.indexOf(item) + 1}
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
        <Text mr={'auto'}>Ghi chú: {data?.note}</Text>
        <Text>Tổng tiền: {total_price.toLocaleString('vi-VN')}đ</Text>
        <Text>Thuế: 5.000đ</Text>
        <Text cl={'primary'} fs={'xl'}>
          Thành tiền: {(total_price + 5000).toLocaleString('vi-VN')}đ
        </Text>
      </Flex>
    </Modal>
  )
}

export default InvoiceEmpDetail
