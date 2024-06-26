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
import { Link, useNavigate } from 'react-router-dom'
import { Loading, MainPic } from '~/components'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { Envelope, Password, User } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { useMutation, useQuery } from '@apollo/client'
import {
  CHECK_EMAIL_EXIST,
  CHECK_USERNAME_EXIST,
  CREATE_CUSTOMER,
  GET_CONTENT
} from '~/pages/Auth/Register/schema'

const Register = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const navigate = useNavigate()
  if (sessionStorage.getItem('login') === 'true') {
    window.location.href = '/'
  }
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('register')
  }, [])
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
  // query
  const { data: content } = useQuery(GET_CONTENT)
  // Mutation
  const [createCustomer, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_CUSTOMER)
  // Check username exist
  const { data: queryUsername } = useQuery(CHECK_USERNAME_EXIST, {
    variables: { username: register('username').value }
  })
  // check email exist
  const { data: queryEmail } = useQuery(CHECK_EMAIL_EXIST, {
    variables: { email: register('email').value }
  })
  // loading
  if (mutationLoading) return <Loading />
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={content?.page?.content[0].image}
        title={content?.page?.content[0].title}
        sloganCenter={content?.page?.content[0].slogan}
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
          m={isTablet ? fr(15) : isMobile ? fr(8) : fr(18)}
          p={isTablet ? fr(15) : isMobile ? fr(10) : fr(18)}
          py={fr(8)}
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
            <Text fs={isMobile ? '2xl' : '3xl'} mx={'auto'}>
              Đăng ký
            </Text>
          </Card.Header>
          <Form
            onSubmit={(SubmitEvent) =>
              handleSubmit(SubmitEvent, async (value) => {
                if (queryUsername?.checkUsernameExistence !== null) {
                  setError('username', 'Tên tài khoản đã tồn tại')
                }
                if (queryEmail?.checkEmailExistence !== null) {
                  setError('email', 'Email đã tồn tại')
                }
                if (
                  queryUsername?.checkUsernameExistence === null &&
                  queryEmail?.checkEmailExistence === null
                ) {
                  await createCustomer({
                    variables: {
                      username: value.username,
                      email: value.email,
                      password: value.password
                    },
                    onCompleted: (data) => {
                      navigate('/verify-email')
                    },
                    onError: (error) => {
                      console.log(error)
                      setError(
                        'username',
                        'Tên tài khoản hoặc email đã tồn tại'
                      )
                      setError('email', 'Tên tài khoản hoặc email đã tồn tại')
                    }
                  })
                }
              })
            }
            onReset={handleReset}
            onError={(error) => {
              console.log(error)
            }}
          >
            <TextField
              {...register('username')}
              size='md'
              variant='underlined'
              label='Tên tài khoản'
              placeholder='paramita'
              icon={<User />}
            />
            <TextField
              {...register('email')}
              size='md'
              variant='underlined'
              label='Email'
              placeholder='xinchao@paramita.com'
              icon={<Envelope />}
            />
            <PasswordField
              {...register('password')}
              size='md'
              variant='underlined'
              label='Mật khẩu'
              placeholder='********'
              icon={<Password weight='fill' />}
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
