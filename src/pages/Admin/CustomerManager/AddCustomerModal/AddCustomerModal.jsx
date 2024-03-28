import { useMutation } from '@apollo/client'
import { UserPlus, X } from '@phosphor-icons/react'
import {
  Alert,
  Button,
  Flex,
  Form,
  Modal,
  NativeDateField,
  PasswordField,
  SelectField,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { z } from 'zod'
import usernameAndEmail from '~/utils/usernameAndEmail'
import p from '~/utils/zodToPrismane'
import { ADD_CUSTOMER } from '~/pages/Admin/CustomerManager/schema'

const AddCustomerModal = ({ open, setOpen, refetch }) => {
  const toast = useToast()
  const [addCustomer] = useMutation(ADD_CUSTOMER)
  const { handleReset, handleSubmit, register, setError } = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          name: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(2, { message: 'Ít nhất 2 kí tự' })
                .regex(/^[\p{L}\s]+$/u, {
                  message: 'Chỉ được chứa chữ có dạng với kí tự'
                })
            )
        }
      },
      email: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          email: (v) =>
            p(v, z.string().trim().email({ message: 'Không phải là email' }))
        }
      },
      phone: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          phone: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(10, { message: 'Số điện ít nhất là 10 số' })
                .regex(/^[0-9]+$/, { message: 'Chỉ được chứa số' })
            )
        }
      },
      birthday: {
        value: ''
      },
      status: {
        value: ''
      },
      username: {
        value: '',
        validators: {
          required: (v) => {
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống' }))
          },
          username: (v) => usernameAndEmail(v)
        }
      },
      password: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          password: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(6, { message: 'Mật khẩu phải trên 6 ký tự' })
            )
        }
      },
      confirmPassword: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          confirmPassword: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(6, { message: 'Mật khẩu phải trên 6 ký tự' })
            )
        }
      }
    }
  })
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      w={'40vw'}
      sx={{
        '.PrismanePasswordField-root': {
          fontFamily: 'GeomanistMedium !important'
        }
      }}
    >
      <Modal.Header justify='center'>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Thêm khách hàng
        </Text>
      </Modal.Header>
      <Form
        onReset={handleReset}
        onSubmit={(SubmitEvent) =>
          handleSubmit(SubmitEvent, async (v) => {
            if (v.password !== v.confirmPassword) {
              setError('confirmPassword', 'Mật khẩu không khớp!')
              return
            }
            await addCustomer({
              variables: {
                data: {
                  name: v.name,
                  phone: v.phone,
                  email: v.email,
                  birthday: new Date(v.birthday),
                  status: Boolean(v.status === 'true' ? 1 : 0),
                  username: v.username,
                  password: v.password
                }
              },
              onError: (err) => console.log(err),
              onCompleted: (data) => {
                refetch()
                handleReset()
                setOpen(false)
                toast({
                  element: (
                    <Alert variant='success'>
                      <Alert.Title className='GeomanistMedium-font'>
                        Thêm khách hàng thành công
                      </Alert.Title>
                    </Alert>
                  )
                })
              }
            })
          })
        }
      >
        <Flex gap={fr(4)}>
          <TextField
            w={'100%'}
            placeholder='Nhập tên khách hàng...'
            {...register('name')}
          />
          <TextField
            w={'50%'}
            placeholder='Nhập SĐT khách hàng...'
            {...register('phone')}
          />
        </Flex>
        <Flex gap={fr(4)}>
          <TextField
            w={'100%'}
            placeholder='Nhập email khách hàng...'
            {...register('email')}
          />
          <NativeDateField
            w={'100%'}
            placeholder='Nhập ngày sinh khách hàng...'
            {...register('birthday')}
          />
        </Flex>

        <TextField
          placeholder='Nhập tên đăng nhập khách hàng...'
          {...register('username')}
        />
        <Flex gap={fr(4)}>
          <PasswordField
            w={'100%'}
            placeholder='Nhập mật khẩu khách hàng...'
            {...register('password')}
          />
          <PasswordField
            w={'100%'}
            placeholder='Nhập lại mật khẩu khách hàng...'
            {...register('confirmPassword')}
          />
        </Flex>
        <SelectField
          className='GeomanistMedium-font'
          placeholder='Chọn trạng thái cho khách hàng...'
          {...register('status')}
          options={[
            { value: true, element: 'Hoạt động' },
            { value: false, element: 'Ẩn' }
          ]}
        />
        <Modal.Footer justify='between'>
          <Button
            variant='secondary'
            color='slate'
            br={'full'}
            size='md'
            icon={<X />}
            type='reset'
            onClick={() => setOpen(false)}
          >
            Huỷ
          </Button>
          <Button
            variant='primary'
            icon={<UserPlus weight='bold' />}
            br={'full'}
            size='md'
            type='submit'
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddCustomerModal
