import {
  Box,
  Button,
  Card,
  Flex,
  Form,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useForm, useScroll } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import React, { useEffect, useState } from 'react'
import { LoginPic } from '~/images'
import { useNavigate } from 'react-router-dom'
import { Loading, MainPic } from '~/components'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { z } from 'zod'
import { Envelope } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { gql, useMutation } from '@apollo/client'

const REQUEST_RESET_PASSWORD = gql`
  mutation requestResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      status
      message
    }
  }
`

const ForgotPassword = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const [loadingMail, setLoadingMail] = useState(false)
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
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={LoginPic}
        title={'Paramita'}
        sloganCenter={'Chào mừng bạn đến với hệ thống'}
      />
      <Flex
        id='forgot-password'
        fs={'lg'}
        align='center'
        justify='center'
        bd={'1px solid lightgray'}
        bg={'primary'}
      >
        <Card
          m={isTablet ? fr(15) : isMobile ? fr(8) : fr(18)}
          p={isTablet ? fr(15) : isMobile ? fr(10) : fr(18)}
          br={'2xl'}
          bsh={'xl'}
          sx={{
            '.PrismaneTextField-label, .PrismanePinField-label': {
              fontSize: fr(5)
            }
          }}
        >
          <Card.Header>
            <Text fs={'3xl'} mx={'auto'}>
              Quên mật khẩu
            </Text>
          </Card.Header>
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
              fillOnHover
              loading={loadingMail}
            >
              Gửi mã
            </Button>
          </Form>
          <Card.Footer>
            <Flex
              w={'100%'}
              cs={'pointer'}
              cl={['#0266BE', { hover: 'blue' }]}
              justify='center'
              align='center'
              gap={8}
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              Quay lại
            </Flex>
          </Card.Footer>
        </Card>
      </Flex>
    </Box>
  )
}

export default ForgotPassword
