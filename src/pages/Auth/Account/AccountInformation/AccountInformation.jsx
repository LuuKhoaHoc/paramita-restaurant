import {
  Alert,
  Button,
  Flex,
  Form,
  NativeDateField,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { useEffect } from 'react'
import { useForm } from '@prismane/core/hooks'
import { z } from 'zod'
import { useResponsive } from '~/utils/responsive'
import usernameAndEmail from '~/utils/usernameAndEmail'
import p from '~/utils/zodToPrismane'
import separateName from '~/utils/separateName'
import { gql, useMutation } from '@apollo/client'

const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: Int!, $data: CustomerInput!) {
    updateCustomer(id: $id, data: $data) {
      customer_id
      username
      name
      email
      phone
      points
      level {
        level_id
        name
      }
    }
  }
`
const AccountInformation = ({ customer }) => {
  const { isMobile } = useResponsive()
  const toast = useToast()
  const [updateCustomer, { loading }] = useMutation(UPDATE_CUSTOMER)
  const { handleSubmit, register, setValue } = useForm({
    fields: {
      firstName: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          firstName: (v) =>
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
      lastName: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          lastName: (v) =>
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
      date: {
        value: ''
      }
    }
  })
  useEffect(() => {
    if (customer && customer.username !== register('username').value) {
      const { lastName, firstName } = separateName(customer?.name || '')
      setValue('firstName', firstName || '')
      setValue('lastName', lastName || '')
      setValue('username', customer.username || '')
      setValue('email', customer.email || '')
      setValue('phone', customer.phone || '')
      setValue('date', customer?.birthday?.split('T')[0] || '')
    }
  }, [customer, setValue, register('username').value])
  return (
    <Flex
      direction='column'
      grow
      pos={'relative'}
      m={fr(10)}
      sx={{
        '.PrismaneTextField-label, .PrismaneNativeDateField-label': {
          fontSize: fr(4.5)
        }
      }}
    >
      <Text
        pos={['relative', { ':before': 'absolute' }]}
        fs={isMobile ? '2xl' : '4xl'}
        sx={{
          '&::before': {
            content: '',
            width: '25%',
            height: '2px',
            borderRadius: '2px',
            backgroundColor: '#39b54a',
            bottom: '0px',
            left: 0
          }
        }}
      >
        Thông tin tài khoản
      </Text>
      <Form
        onSubmit={(SubmitEvent) => {
          handleSubmit(SubmitEvent, async (value) => {
            const fullName = `${value.lastName} ${value.firstName}`
            const birthday = new Date(value.date)
            // .toISOString().split('T')[0]
            try {
              await updateCustomer({
                variables: {
                  id: customer?.customer_id,
                  data: {
                    name: fullName,
                    username: value.username,
                    phone: value.phone,
                    email: value.email,
                    birthday: birthday
                  }
                }
              })
              toast({
                element: (
                  <Alert variant='success'>
                    <Alert.Title
                      fs={isMobile ? 'sm' : 'md'}
                      className='GeomanistMedium-font'
                    >
                      Đã cập nhật thông tin thành công
                    </Alert.Title>
                  </Alert>
                )
              })
            } catch (error) {
              console.log('🚀 ~ handleSubmit ~ error:', error)
              toast({
                element: (
                  <Alert variant='error'>
                    <Alert.Title
                      fs={isMobile ? 'sm' : 'md'}
                      className='GeomanistMedium-font'
                    >
                      Cập nhật thông tin không thành công! Vui lòng kiểm tra lại
                      thông tin.
                    </Alert.Title>
                  </Alert>
                )
              })
            }
          })
        }}
      >
        <Flex gap={fr(10)} w={'fit-content'}>
          <TextField
            {...register('lastName')}
            w={'50%'}
            label='Họ'
            placeholder='Nguyễn Văn'
          />
          <TextField
            {...register('firstName')}
            w={'50%'}
            label='Tên'
            placeholder='A'
          />
        </Flex>
        <TextField
          {...register('username')}
          label='Tên tài khoản'
          placeholder='paramita'
        />
        <TextField
          {...register('phone')}
          label='Số điện thoại'
          placeholder='0987 654 321'
        />
        <TextField
          {...register('email')}
          label='Địa chỉ email'
          placeholder='hi@paramita.com'
        />
        <NativeDateField {...register('date')} label='Sinh nhật' />
        <Button type='submit' size='md' br={'full'} ml={'auto'}>
          <Text fs={'md'} className='GeomanistLight-font'>
            Cập nhật
          </Text>
        </Button>
      </Form>
    </Flex>
  )
}

export default AccountInformation
