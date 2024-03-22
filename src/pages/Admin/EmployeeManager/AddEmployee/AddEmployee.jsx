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

const AddEmployee = ({ open, setOpen }) => {
  const { handleSubmit, register } = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          name: (v) =>
            p(
              v,
              z
                .string()
                .min(2, { message: 'Ít nhất 2 kí tự' })
                .regex(/^[\p{L}\s]+$/u, {
                  message: 'Chỉ được chứa chữ cái và khoảng trắng'
                })
            )
        }
      },
      gender: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
        }
      },
      phone: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          phone: (v) =>
            p(v, z.string().regex(/^[0-9]+$/, { message: 'Chỉ được chứa số' }))
        }
      },
      email: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          email: (v) =>
            p(v, z.string().email({ message: 'Email không hợp lệ' }))
        }
      },
      address: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
        }
      },
      birthday: {
        value: ''
      },
      position: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
        }
      },
      is_admin: {
        value: ''
      },
      image: {
        value: ''
      },
      username: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          username: (v) => usernameAndEmail(v)
        }
      },
      password: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
        }
      },
      status: {
        value: ''
      }
    }
  })
  return (
    <Modal open={open} onClose={() => setOpen(false)} w={'40%'}>
      <Modal.Header justify='center'>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Thêm nhân viên
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
          Thêm nhân viên
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEmployee
