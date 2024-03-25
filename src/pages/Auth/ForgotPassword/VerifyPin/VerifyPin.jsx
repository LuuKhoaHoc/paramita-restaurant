import {
  Alert,
  Animation,
  Box,
  Button,
  Card,
  Flex,
  Form,
  Icon,
  PinField,
  Text,
  fr,
  useToast
} from '@prismane/core'
import { useForm, useScroll } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useMutation } from '@apollo/client'
import {
  REQUEST_RESET_PASSWORD,
  VERIFY_PIN
} from '~/pages/Auth/ForgotPassword/schema'
import { CheckCircle } from '@phosphor-icons/react'

const VerifyPin = () => {
  const [sentPin, setSentPin] = useState(false)
  const { state } = useLocation()
  const toast = useToast()
  const navigate = useNavigate()
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('forgot-password')
  }, [])
  const [
    verifyResetPasswordPin,
    { loading: loadingPin, error: errorPin, data: dataPin }
  ] = useMutation(VERIFY_PIN)
  const [requestResetPassword, { loading: loadingMail, error: errorMail }] =
    useMutation(REQUEST_RESET_PASSWORD)
  const { handleSubmit, handleReset, register, setError } = useForm({
    fields: {
      pin: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Không được để trống mã Pin' })
            ),
          min: (v) =>
            p(v, z.string().length(4, { message: 'Mã Pin phải 4 số' }))
        }
      }
    }
  })
  return (
    <Form
      onSubmit={(SubmitEvent) =>
        handleSubmit(SubmitEvent, async (value) => {
          await verifyResetPasswordPin({
            variables: {
              email: state.email,
              pin: value.pin
            },
            onError: (error) => {
              console.log('🚀 ~ handleSubmit ~ error:', error)
              setError('pin', 'Mã PIN không hợp lệ')
            },
            onCompleted: (data) => {
              if (data?.verifyResetPasswordPin.status == 'success') {
                toast({
                  element: (
                    <Alert variant='success'>
                      <Alert.Title
                        fs={'md'}
                        className='GeomanistMedium-font'
                        cl={'white'}
                      >
                        Mã Pin hợp lệ~~~
                      </Alert.Title>
                    </Alert>
                  )
                })
                navigate('/forgot-password/reset-password', {
                  state: {
                    email: state.email
                  }
                })
              }
              if (data?.verifyResetPasswordPin.status == 'error') {
                setError('pin', `${data?.verifyResetPasswordPin.message}`)
              }
            }
          })
        })
      }
      onReset={handleReset}
    >
      <PinField
        {...register('pin')}
        size='lg'
        variant='underlined'
        label='Mã xác nhận'
      />
      <Button
        disabled={sentPin}
        variant='text'
        onClick={async () => {
          await requestResetPassword({
            variables: {
              email: state.email
            },
            onError: (error) => {
              console.log(error)
            },
            onCompleted: (data) => {
              setSentPin(true)
            }
          })
        }}
      >
        {sentPin ? (
          <Animation animated={sentPin} animation={'fade'} timing='ease'>
            <Flex>
              <Icon>
                <CheckCircle />
              </Icon>
              <Text
                fs={'sm'}
                fw={'medium'}
                cl={'primary'}
                className='GeomanistMedium-font'
              >
                Gửi lại
              </Text>
            </Flex>
          </Animation>
        ) : (
          'Bạn chưa nhận được mã? Gửi lại~~'
        )}
      </Button>
      <Button
        size='lg'
        variant='tertiary'
        color='primary'
        type='submit'
        mx={'auto'}
        fillOnHover
        loading={loadingPin}
      >
        {dataPin?.verifyResetPasswordPin?.status == 'success' ? (
          <Icon>
            <CheckCircle />
          </Icon>
        ) : (
          'Xác nhận'
        )}
      </Button>
    </Form>
  )
}

export default VerifyPin
