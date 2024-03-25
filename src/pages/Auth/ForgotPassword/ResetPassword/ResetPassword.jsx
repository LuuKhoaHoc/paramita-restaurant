import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  Form,
  PasswordField,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { useForm, useScroll } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Envelope } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { useMutation } from '@apollo/client'
import { UPDATE_PASSWORD } from '~/pages/Auth/ForgotPassword/schema'

const ResetPassword = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const { state } = useLocation()
  const toast = useToast()
  const [loadingMail, setLoadingMail] = useState(false)
  const navigate = useNavigate()
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('forgot-password')
  }, [])
  const [resetPassword, { loading, error }] = useMutation(UPDATE_PASSWORD)
  const { handleSubmit, handleReset, register, setError } = useForm({
    fields: {
      password: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          password: (v) =>
            p(
              v,
              z.string().min(6, { message: 'Mật khẩu phải từ 6 ký tự trở lên' })
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
          confirmPassword: (v) =>
            p(
              v,
              z.string().trim().min(6, { message: 'Mật không trên 6 ký tự' })
            )
        }
      }
    }
  })
  return (
    <Form
      onSubmit={(SubmitEvent) =>
        handleSubmit(SubmitEvent, async (value) => {
          setLoadingMail(true)
          if (value.password !== value.confirmPassword) {
            setError('confirmPassword', 'Xác nhận mật khẩu không hợp lệ!')
            setLoadingMail(false)
            return
          }
          await resetPassword({
            variables: {
              email: state.email,
              password: value.password
            },
            onCompleted: (data) => {
              setLoadingMail(false)
              toast({
                element: (
                  <Alert variant='success'>
                    <Alert.Title
                      fs={'md'}
                      className='GeomanistMedium-font'
                      cl={'white'}
                    >
                      {data?.resetPassword?.message}
                    </Alert.Title>
                  </Alert>
                )
              })
              navigate('/login')
            },
            onErrorL: (error) => {
              console.log(error)
            }
          })
        })
      }
      onReset={handleReset}
    >
      <PasswordField
        {...register('password')}
        size='md'
        variant='underlined'
        label='Mật khẩu mới'
        placeholder='************'
        // icon={< />}
      />
      <PasswordField
        {...register('confirmPassword')}
        size='md'
        variant='underlined'
        label='Xác nhận mật khẩu mới'
        placeholder='************'
      />
      <Button
        size='lg'
        variant='tertiary'
        color='primary'
        type='submit'
        mx={'auto'}
        fillOnHover
        loading={loadingMail}
      >
        Đổi mật khẩu
      </Button>
    </Form>
  )
}

export default ResetPassword
