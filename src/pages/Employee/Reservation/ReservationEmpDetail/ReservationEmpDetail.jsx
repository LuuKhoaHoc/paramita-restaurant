import { Button, Divider, Flex, Modal, Stack, Text, fr } from '@prismane/core'

const ReservationEmpDetail = ({ openModalDetail, setOpenModalDetail }) => {
  return (
    <Modal
      open={openModalDetail}
      w={'40vw'}
      cl={(theme) => (theme.mode === 'dark' ? 'white' : 'black')}
    >
      <Modal.Header ta={'center'}>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Chi tiết đơn đặt bàn
        </Text>
      </Modal.Header>
      <Divider />
      <Stack direction='row'>
        <Flex direction='column' gap={fr(4)} fs={'lg'} w={'100%'}>
          <Text>Tên khách hàng: Lê Thị Thanh Vy</Text>
          <Text>Số điện thoại: 034 999 999</Text>
          <Text>Số lượng người: 2</Text>
        </Flex>
        <Flex direction='column' align='end' gap={fr(4)} fs={'lg'} w={'100%'}>
          <Text>Thời gian: 12:00 12/12/2022</Text>
          <Text>Mã số bàn: 1</Text>
          <Text cl={'primary'} fs={'xl'}>
            Trạng thái: Đã đặt bàn
          </Text>
        </Flex>
      </Stack>
      <Divider />
      <Text fs={'lg'}>
        Ghi chú: Cho tôi một chỗ ngồi có view cửa sổ và có ổ điện càng tốt
      </Text>
      <Modal.Footer justify='end'>
        <Button
          variant='secondary'
          size='md'
          onClick={() => setOpenModalDetail(false)}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReservationEmpDetail
