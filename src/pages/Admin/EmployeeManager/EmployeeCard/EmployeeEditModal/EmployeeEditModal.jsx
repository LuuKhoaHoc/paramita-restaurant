import {
  AddressBook,
  Cake,
  Envelope,
  GenderIntersex,
  IdentificationCard,
  Phone,
  UserCirclePlus,
  X
} from '@phosphor-icons/react'
import {
  AutocompleteField,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  NativeDateField,
  SelectField,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { useState } from 'react'
import { z } from 'zod'

const EmployeeEditModal = ({ employee, openModal, setOpenModal }) => {
  return (
    <Modal w={'30%'} open={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header justify='center'>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Chỉnh sửa nhân viên
        </Text>
      </Modal.Header>
      <Stack direction='column' gap={fr(4)}>
        <Center>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            w={'30%'}
          />
        </Center>
        <TextField
          placeholder='Nhập tên nhân viên...'
          icon={<IdentificationCard />}
        />
        <SelectField
          icon={<GenderIntersex />}
          className='GeomanistMedium-font'
          placeholder='Chọn giới tính nhân viên...'
          sx={{
            '.PrismaneMenuItem-root': {
              fontFamily: 'GeomanistMedium !important'
            }
          }}
          options={[
            { value: 'Nam', element: 'Nam' },
            { value: 'Nữ', element: 'Nữ' },
            { value: 'Khác', element: 'Khác' }
          ]}
        />
        <TextField
          placeholder='Nhập số điện thoại nhân viên...'
          icon={<Phone />}
        />
        <TextField placeholder='Nhập email nhân viên...' icon={<Envelope />} />
        <TextField
          placeholder='Nhập địa chỉ nhân viên...'
          icon={<AddressBook />}
        />
        <NativeDateField icon={<Cake />} />
        <AutocompleteField
          className='GeomanistMedium-font'
          placeholder='Chọn vị trí công việc nhân viên...'
          options={[{ value: 'Trong nha', element: 'Trong nha' }]}
        />
        <TextField
          placeholder='Nhập tên tài khoản nhân viên...'
          icon={<Envelope />}
        />
        <TextField
          placeholder='Nhập mật khẩu nhân viên...'
          icon={<AddressBook />}
        />
        <AutocompleteField
          className='GeomanistMedium-font'
          placeholder='Chọn trạng thái hoạt động nhân viên...'
          options={[{ value: 'Trong nha', element: 'Trong nha' }]}
        />
      </Stack>
      <Modal.Footer justify='between'>
        <Button
          size='md'
          icon={<X />}
          bg={['gray', 400]}
          bsh={'sm'}
          onClick={() => setOpen(false)}
        >
          Đóng
        </Button>
        <Button
          variant='secondary'
          size='md'
          icon={<UserCirclePlus weight='bold' />}
          bsh={'sm'}
          onClick={() => setOpen(false)}
        >
          Sửa nhân viên
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EmployeeEditModal
