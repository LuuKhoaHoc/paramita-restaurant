import {
  Animation,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  PasswordField,
  Text,
  TextField
} from '@prismane/core'
import { useAnimation, useForm, useScroll } from '@prismane/core/hooks'
import { min } from '@prismane/core/validators'
import emptyField from '../../../utils/emptyField'
import usernameAndEmail from '../../../utils/usernameAndEmail'
import React, { useEffect } from 'react'
import { LoginPic } from '../../../images'
import { Link } from 'react-router-dom'
import { Footer, MainPic } from '../../../components'

const Login = () => {
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('register')
  }, [])
  // const { animate, animating, duration, timing } = useAnimation(
  //   true,
  //   1000,
  //   'ease-in-out'
  // )
  const { handleSubmit, handleReset, register } = useForm({
    fields: {
      username: {
        value: '',
        validators: {
          required: (v) => emptyField(v),
          username: (v) => usernameAndEmail(v)
        }
      },
      password: {
        value: '',
        validators: {
          required: (v) => emptyField(v),
          min: (v) => min(v, 6)
        }
      },
      checkbox: {
        value: false,
        validators: {
          checked: (v) => emptyField(v)
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
        ff={'BalihoScript'}
        fs={'lg'}
        align='center'
        justify='center'
        bd={'1px solid lightgray'}
        bg={'primary'}
      >
        <Animation animation='slide-down' animated={true} duration={1000}>
          <Card
            m={50}
            p={50}
            py={30}
            br={'2xl'}
            bsh={'xl'}
            sx={{
              '.PrismaneCheckbox-error': {
                fontSize: '16px'
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
                handleSubmit(SubmitEvent, (value) => console.log(value))
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
                sx={{
                  '.PrismaneTextField-label': {
                    fontSize: '20px'
                  }
                }}
              />
              <PasswordField
                {...register('password')}
                size='md'
                variant='underlined'
                label='Mật khẩu'
                placeholder='********'
                sx={{
                  '.PrismanePasswordField-label': {
                    fontSize: '20px'
                  }
                }}
              />
              <Checkbox
                {...register('checkbox')}
                name='agreement'
                label='Tôi đồng ý với điều khoản thoả thuận'
              />
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
      <Footer />
    </Box>
  )
}

export default Login
