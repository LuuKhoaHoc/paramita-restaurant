import {
  Box,
  Button,
  Card,
  Flex,
  Form,
  PinField,
  Text,
  fr
} from '@prismane/core'
import { useForm, useScroll } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import React, { useEffect } from 'react'
import { LoginPic } from '~/images'
import { useNavigate } from 'react-router-dom'
import { Loading, MainPic } from '~/components'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { z } from 'zod'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

const VerifyPin = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const navigate = useNavigate()
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('forgot-password')
  }, [])
  const { handleSubmit, handleReset, register } = useForm({
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
              handleSubmit(SubmitEvent, (value) => console.log(value))
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
              size='lg'
              variant='tertiary'
              color='primary'
              type='submit'
              mx={'auto'}
              fillOnHover
            >
              Xác nhận
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

export default VerifyPin
