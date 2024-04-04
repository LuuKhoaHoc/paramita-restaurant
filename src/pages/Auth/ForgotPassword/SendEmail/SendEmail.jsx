import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  Form,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { useForm, useScroll } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Envelope } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { useMutation } from '@apollo/client'
import { REQUEST_RESET_PASSWORD } from '~/pages/Auth/ForgotPassword/schema'

const SendEmail = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const [loadingMail, setLoadingMail] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('forgot-password')
  }, [])
  const [requestResetPassword, { loading, error }] = useMutation(
    REQUEST_RESET_PASSWORD
  )
  const { handleSubmit, handleReset, register } = useForm({
    fields: {
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
    <Form
      onSubmit={(SubmitEvent) =>
        handleSubmit(SubmitEvent, async (value) => {
          setLoadingMail(true)
          await requestResetPassword({
            variables: {
              email: value.email
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
                      {data?.requestResetPassword.message}
                    </Alert.Title>
                  </Alert>
                )
              })
            }
          })
          navigate('verify-pin', { state: value })
        })
      }
      onReset={handleReset}
    >
      <TextField
        {...register('email')}
        size='md'
        variant='underlined'
        label='Email'
        placeholder='hi@paramita.com'
        icon={<Envelope />}
      />
      <Button
        size='lg'
        variant='tertiary'
        color='primary'
        type='submit'
        mx={'auto'}
        full
        loading={loadingMail}
      >
        Gửi mã
      </Button>
    </Form>
  )
}

export default SendEmail
