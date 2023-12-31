import {
  Animation,
  Box,
  Button,
  Card,
  Flex,
  Form,
  PasswordField,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useAnimation, useForm, useScroll } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import usernameAndEmail from '~/utils/usernameAndEmail'
import React, { useEffect } from 'react'
import { LoginPic } from '~/images'
import { Link } from 'react-router-dom'
import { AlertCustom, MainPic } from '~/components'
import { Password, User } from '@phosphor-icons/react'

const Login = () => {
  const username = 'paramita'
  const password = 'paramita'
  const { scrollToId } = useScroll()
  if (sessionStorage.getItem('login') === 'true') {
    window.location.href = '/'
  }
  useEffect(() => scrollToId('login'), [])
  const { animate, animating, duration, timing } = useAnimation(
    true,
    1500,
    'ease-in'
  )
  const { handleSubmit, handleReset, register, setError } = useForm({
    fields: {
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
        id='login'
        ff={'BalihoScript'}
        fs={'lg'}
        align='center'
        justify='center'
        bd={'1px solid lightgray'}
        bg={'primary'}
      >
        <Animation
          animation='slide-down'
          animated={animating}
          duration={duration}
          timing={timing}
          onScroll={() => animate()}
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
              }
            }}
          >
            <Card.Header>
              <Text fs={'3xl'} mx={'auto'}>
                Đăng nhập
              </Text>
            </Card.Header>
            <Form
              onSubmit={(SubmitEvent) =>
                handleSubmit(SubmitEvent, (value) => {
                  if (
                    value.username === username &&
                    value.password === password
                  ) {
                    sessionStorage.setItem('login', true)
                  } else if (value.username !== username) {
                    setError('username', 'Tài khoản không đúng')
                  } else if (value.password !== password) {
                    setError('password', 'Mật khẩu không đúng')
                  }
                })
              }
              onReset={handleReset}
              my={30}
            >
              <TextField
                {...register('username')}
                size='md'
                variant='underlined'
                label='Tên tài khoản hoặc Email'
                placeholder='paramita/xinchao@paramita.com'
                icon={<User />}
              />
              <PasswordField
                {...register('password')}
                size='md'
                variant='underlined'
                label='Mật khẩu'
                placeholder='********'
                icon={<Password weight='fill' />}
              />
              <Text cl={['#0266BE', { hover: 'blue' }]}>
                <Link to={'/forgot-password'}>Quên mật khẩu?</Link>
              </Text>
              <Button
                size='lg'
                variant='tertiary'
                color='primary'
                type='submit'
                ff={'BalihoScript'}
                mx={'auto'}
                fillOnHover
              >
                Đăng nhập
              </Button>
            </Form>
            <Card.Footer>
              <Text mx={'auto'}>
                Bạn chưa có tài khoản tại Paramita?{' '}
                <Text cl={['#0266BE', { hover: 'blue' }]}>
                  <Link to={'/register'}>Đăng ký</Link>
                </Text>
              </Text>
            </Card.Footer>
          </Card>
        </Animation>
      </Flex>
    </Box>
  )
}

export default Login
