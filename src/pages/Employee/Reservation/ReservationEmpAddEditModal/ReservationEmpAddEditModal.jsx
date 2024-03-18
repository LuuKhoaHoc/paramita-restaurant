import { CalendarPlus } from '@phosphor-icons/react'
import {
  Button,
  Flex,
  Modal,
  Text,
  TextField,
  TextareaField,
  fr
} from '@prismane/core'

const ReservationEmpAddEditModal = ({
  title,
  openModalAddEdit,
  setOpenModalAddEdit
}) => {
  return (
    <Modal
      open={openModalAddEdit}
      onClose={() => setOpenModalAddEdit(false)}
      closable
      w={'25vw'}
    >
      <Modal.Header>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          {title} đơn đặt bàn
        </Text>
      </Modal.Header>
      <Flex
        direction='column'
        gap={fr(4)}
        sx={{
          '.PrismaneTextField-label, .PrismaneTextarea-label, .PrismaneTextarea-root':
            {
              fontSize: fr(4.5)
            }
        }}
      >
        <TextField
          label='Tên khách hàng'
          placeholder='Nhập tên khách hàng...'
        />
        <TextField
          label='Số điện thoại'
          placeholder='Nhập số điện thoại khách hàng...'
        />
        <TextField label='Email' placeholder='Nhập email khách hàng...' />
        <TextField label='Giờ đặt' placeholder='Nhập giờ đặt...' />
        <TextField label='Ngày đặt' placeholder='Nhập ngày đặt...' />
        <TextField
          label='Số lượng người'
          placeholder='Nhập số lượng người...'
        />
        <TextareaField label='Ghi chú' placeholder='Nhập ghi chú...' />
      </Flex>
      <Modal.Footer>
        <Button icon={<CalendarPlus />} size='md' full br={'full'}>
          <Text className='GeomanistMedium-font'>{title} đơn đặt bàn</Text>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ReservationEmpAddEditModal
