import {
  Calendar,
  CalendarPlus,
  Envelope,
  IdentificationCard,
  Note,
  Phone,
  Timer,
  UserList
} from '@phosphor-icons/react'
import {
  Button,
  Flex,
  Modal,
  NativeDateField,
  NumberField,
  Text,
  TextField,
  TextareaField,
  fr
} from '@prismane/core'
import { useState } from 'react'

const EditReservationModal = ({ openModal, setOpenModal }) => {
  const [numberPerson, setNumberPerson] = useState(1)
  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} w={'25vw'}>
        <Modal.Header justify='center'>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Sửa đơn đặt bàn
          </Text>
        </Modal.Header>
        <Flex
          direction='column'
          gap={fr(4)}
          sx={{
            '.PrismaneTextField-label, .PrismaneTextarea-label, .PrismaneTextarea-root, .PrismaneNumberField-label, .PrismaneNativeDateField-label':
              {
                fontSize: fr(4.5)
              }
          }}
        >
          <TextField
            label='Tên khách hàng'
            placeholder='Nhập tên khách hàng...'
            icon={<IdentificationCard />}
          />
          <TextField
            label='Số điện thoại'
            placeholder='Nhập số điện thoại khách hàng...'
            icon={<Phone />}
          />
          <TextField
            label='Email'
            placeholder='Nhập email khách hàng...'
            icon={<Envelope />}
          />
          <TextField
            label='Giờ đặt'
            placeholder='Nhập giờ đặt...'
            icon={<Timer />}
          />
          <NativeDateField
            icon={<Calendar />}
            className='GeomanistMedium-font'
            label='Ngày đặt'
            placeholder='Nhập ngày đặt...'
          />
          <NumberField
            icon={<UserList />}
            className='GeomanistMedium-font'
            label='Số lượng người'
            placeholder='Nhập số lượng người...'
            value={numberPerson}
            onChange={(e) => setNumberPerson(e.target.value)}
          />
          <TextareaField
            icon={<Note />}
            label='Ghi chú'
            placeholder='Nhập ghi chú...'
          />
        </Flex>
        <Modal.Footer>
          <Button
            icon={<CalendarPlus />}
            size='md'
            full
            br={'full'}
            variant='secondary'
          >
            <Text className='GeomanistMedium-font'>Sửa đơn đặt bàn</Text>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditReservationModal
