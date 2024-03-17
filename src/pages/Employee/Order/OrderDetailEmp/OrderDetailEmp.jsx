import { Box, Flex, Modal, Table, Text, fr } from '@prismane/core'

const OrderDetailEmp = ({ openModalDetail, setOpenModalDetail }) => {
  return (
    <Modal
      open={openModalDetail}
      onClose={() => setOpenModalDetail(false)}
      closable
      w={'80vw'}
    >
      <Modal.Header>
        <Text
          as={'h3'}
          fs={'xl'}
          className='GeomanistMedium-font'
          p={fr(4)}
          mx={'auto'}
        >
          Đơn hàng của bạn
        </Text>
      </Modal.Header>
      <Flex
        bg={(theme) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')}
        br={'xl'}
        direction='column'
        align='center'
      >
        <Box w={'90%'}>
          <Flex direction='column' mb={fr(2)} fs={'lg'}>
            <Text>Mã đơn hàng: #03131231231231</Text>
            <Text>
              Thời gian: 12:00:00 12/12/2021
              {/* {new Date(order?.created_at)
              .toLocaleString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })
              .replace(/[\/\.]/g, '.')} */}
            </Text>
            <Text>Tên khách hàng: Lê Thị Thanh Vy</Text>
            <Text>Số điện thoại: 034 999 999</Text>
            <Text>Địa chỉ giao hàng: Bình Tân, TP.HCM</Text>
            <Flex gap={fr(2)}>
              <Text>Phương thức thanh toán: </Text>
              <Text>
                {/* {
                {
                  'mo-mo': 'MoMo',
                  'tien-mat': 'Tiền mặt',
                  'ngan-hang': 'ngân hàng'
                }[order?.payment_method]
              } */}
                Tiền mặt
              </Text>
            </Flex>
          </Flex>
          <Table w={'100%'}>
            <Table.Head>
              <Table.Row ta={'center'}>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>STT</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Sản phẩm</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Giá</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Số lượng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Tạm tính</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              <Table.Row>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>1</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Bún Huế Paramita</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>100.000đ</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>1</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>100.000đ</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
            <Table.Foot ta={'center'}>
              <Table.Row>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>STT</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Sản phẩm</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Giá</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Số lượng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Tạm tính</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Foot>
          </Table>
          <Flex direction='column' align='end' fs={'lg'} gap={fr(2)} mt={fr(4)}>
            <Text fs={'md'} mr={'auto'}>
              Ghi chú:{' '}
            </Text>
            <Text>Tổng cộng: 100.000đ</Text>
            <Text>Phí vận chuyển: 15.000đ</Text>
            <Text>Mã giảm giá: -5.000đ</Text>
            <Text fs={'xl'} cl={'primary'}>
              Tổng thanh toán: 110.000đ
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}
export default OrderDetailEmp
