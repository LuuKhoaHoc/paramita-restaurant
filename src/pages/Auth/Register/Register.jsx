import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  PasswordField,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useForm, useScroll } from '@prismane/core/hooks'
import React, { useEffect } from 'react'
import { LoginPic } from '~/images'
import { Link } from 'react-router-dom'
import { Footer, MainPic } from '~/components'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { Envelope, Password, User } from '@phosphor-icons/react'

const Register = () => {
  if (sessionStorage.getItem('login') === 'true') {
    window.location.href = '/'
  }
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('register')
  }, [])

  const { handleSubmit, handleReset, register } = useForm({
    fields: {
      username: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            ),
          username: (v) =>
            p(
              v,
              z.string().min(4, {
                message: 'Tên tài khoản ít nhất phải 4 kí tự'
              })
            )
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
            p(v, z.string().email({ message: 'Không phải là email' }))
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
              z
                .string()
                .min(6, { message: 'Mật khẩu phải ít nhất phải 6 kí tự' })
            )
        }
      },
      checkbox: {
        value: false,
        validators: {
          checked: (v) =>
            p(
              v,
              z.boolean().refine((val) => val === true, {
                message: 'Vui lòng chọn vào ô này'
              })
            )
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
        id='register'
        fs={'lg'}
        align='center'
        justify='center'
        bd={'1px solid lightgray'}
        bg={'primary'}
      >
        <Card
          m={50}
          p={50}
          py={30}
          br={'2xl'}
          bsh={'xl'}
          sx={{
            '.PrismaneTextField-label, .PrismanePasswordField-label': {
              fontSize: fr(5)
            },
            '.PrismaneCheckbox-error': {
              fontSize: fr(4)
            },
            '.PrismaneField-field' : {
              fontFamily: 'Geomanist !important'
            }
          }}
        >
          <Card.Header>
            <Text fs={'3xl'} mx={'auto'}>
              Đăng ký
            </Text>
          </Card.Header>
          <Form
            onSubmit={(SubmitEvent) =>
              handleSubmit(SubmitEvent, (value) => console.log(value))
            }
            onReset={handleReset}
          >
            <TextField
              {...register('username')}
              size='md'
              variant='underlined'
              label='Tên tài khoản'
              placeholder='paramita'
              icon={<User />}
              sx={{}}
            />
            <TextField
              {...register('email')}
              size='md'
              variant='underlined'
              label='Email'
              placeholder='xinchao@paramita.com'
              icon={<Envelope />}
              sx={{}}
            />
            <PasswordField
              {...register('password')}
              size='md'
              variant='underlined'
              label='Mật khẩu'
              placeholder='********'
              icon={<Password weight='fill' />}
              sx={{}}
            />
            <Checkbox
              {...register('checkbox')}
              label='Tôi đồng ý với điều khoản thoả thuận'
            />
            <Button
              size='lg'
              variant='tertiary'
              color='primary'
              type='submit'
              mx={'auto'}
              fillOnHover
            >
              Đăng ký
            </Button>
          </Form>
          <Card.Footer>
            <Text mx={'auto'}>
              Bạn đã có tài khoản tại Paramita?{' '}
              <Text cl={['#0266BE', { hover: 'blue' }]}>
                <Link to={'/login'}>Đăng nhập</Link>
              </Text>
            </Text>
          </Card.Footer>
        </Card>
      </Flex>
    </Box>
  )
}

export default Register
