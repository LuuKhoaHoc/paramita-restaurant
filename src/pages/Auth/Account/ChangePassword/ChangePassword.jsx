import {
  Alert,
  Button,
  Flex,
  Form,
  PasswordField,
  Text,
  fr,
  useToast
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import React from 'react'
import { z } from 'zod'
import { useResponsive } from '~/utils/responsive'
import p from '~/utils/zodToPrismane'
import { gql, useMutation } from '@apollo/client'

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $id: Int!
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      id: $id
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      customer_id
      username
    }
  }
`

const ChangePassword = ({ customer }) => {
  const { isTablet, isMobile } = useResponsive()
  const toast = useToast()
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD)
  const { handleSubmit, register, setError, setValue } = useForm({
    fields: {
      oldPassword: {
        value: '',
        validators: {
          required: (v) => {
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
          },
          min: (v) =>
            p(
              v,
              z.string().min(6, { message: 'Mật khẩu ít nhất phải 6 kí tự' })
            )
        }
      },
      password: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          min: (v) =>
            p(
              v,
              z.string().min(6, { message: 'Mật khẩu ít nhất phải 6 kí tự' })
            )
        }
      },
      confirmPassword: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          min: (v) =>
            p(
              v,
              z.string().min(6, { message: 'Mật khẩu ít nhất phải 6 kí tự' })
            )
        }
      }
    }
  })
  return (
    <Flex direction='column' grow pos={'relative'} m={fr(10)}>
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
        Đổi mật khẩu
      </Text>
      <Form
        onSubmit={(SubmitEvent) => {
          handleSubmit(SubmitEvent, async (value) => {
            if (value.oldPassword === value.password) {
              setError('password', 'Mật khẩu mới phải khác mật khẩu cũ')
            }
            if (value.password !== value.confirmPassword) {
              setError('password', 'Mật khẩu mới không khớp nhau')
              setError('confirmPassword', 'Mật khẩu mới không khớp nhau')
            }
            try {
              await changePassword({
                variables: {
                  id: customer?.customer_id,
                  oldPassword: value.oldPassword,
                  newPassword: value.password
                }
              })
              toast({
                element: (
                  <Alert variant='success'>
                    <Alert.Title
                      fs={isMobile ? 'sm' : 'md'}
                      className='Geomanist-font'
                    >
                      Đã thay đổi mật khẩu thành công
                    </Alert.Title>
                  </Alert>
                )
              })
            } catch (error) {
              setError('oldPassword', 'Mật khẩu cũ không đúng')
            }
          })
        }}
      >
        <Flex
          direction='column'
          sx={{
            '.PrismanePasswordField-label': {
              fontSize: fr(5)
            },
            '.PrismanePasswordField-error, .PrismanePasswordField-root': {
              fontSize: fr(4)
            }
          }}
        >
          <PasswordField {...register('oldPassword')} label='Mật khẩu cũ' />
          <PasswordField {...register('password')} label='Mật khẩu mới' />
          <PasswordField
            {...register('confirmPassword')}
            label='Xác nhận mật khẩu mới'
          />
          <Button
            size='md'
            br={'full'}
            className='GeomanistLight-font'
            ml={'auto'}
            mt={fr(4)}
            type='submit'
          >
            <Text fs={'md'}>Cập nhật</Text>
          </Button>
        </Flex>
      </Form>
    </Flex>
  )
}

export default ChangePassword
