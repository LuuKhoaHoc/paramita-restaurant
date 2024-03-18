import { Divider, Flex, Modal, Table, Text, fr } from '@prismane/core'

const InvoiceEmpDetail = ({ openModalDetail, setOpenModalDetail }) => {
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
        <Text>Tên khách hàng: Lê Thị Thanh Vy</Text>
        <Text>Số điện thoại: 034 999 999</Text>
        <Text>Voucher: GIAONHANH5</Text>
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
          <Table.Row>
            <Table.Cell>
              <Text fs={'md'}>1</Text>
            </Table.Cell>
            <Table.Cell>
              <Text fs={'md'}>Bún Huế Paramita</Text>
            </Table.Cell>
            <Table.Cell>
              <Text fs={'md'}>100.000đ</Text>
            </Table.Cell>
            <Table.Cell>
              <Text fs={'md'}>1</Text>
            </Table.Cell>
            <Table.Cell>
              <Text fs={'md'}>100.000đ</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider />
      <Flex direction='column' align='end' mx={fr(4)} fs={'lg'}>
        <Text mr={'auto'}>Ghi chú: </Text>
        <Text>Tổng tiền: 100.000đ</Text>
        <Text>Thuế: 5.000đ</Text>
        <Text>Mã giảm giá: -5.000đ</Text>
        <Text cl={'primary'} fs={'xl'}>
          Thành tiền: 100.000đ
        </Text>
      </Flex>
    </Modal>
  )
}

export default InvoiceEmpDetail
