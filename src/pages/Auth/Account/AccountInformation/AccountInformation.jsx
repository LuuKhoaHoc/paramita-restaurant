import {
  Button,
  Flex,
  Form,
  NativeDateField,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import React from 'react'
import { z } from 'zod'
import { useResponsive } from '~/utils/responsive'
import usernameAndEmail from '~/utils/usernameAndEmail'
import p from '~/utils/zodToPrismane'

const AccountInformation = () => {
  const { isTablet, isMobile } = useResponsive()
  const { handleSubmit, handleReset, register } = useForm({
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
                .regex(/^[a-zA-Z]+$/, { message: 'Chỉ được chứa chữ cái' })
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
                .regex(/^[a-zA-Z]+$/, { message: 'Chỉ được chứa chữ cái' })
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
      }
    }
  })
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
        onSubmit={(e) => {
          handleSubmit(e, (v) => console.log(v))
        }}
        onReset={handleReset}
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
        <NativeDateField label='Sinh nhật' />
        <Button size='md' br={'full'} ml={'auto'}>
          <Text fs={'md'} className='GeomanistLight-font'>
            Cập nhật
          </Text>
        </Button>
      </Form>
    </Flex>
  )
}

export default AccountInformation
