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
  TextField,
  fr
} from '@prismane/core'
import { useAnimation, useForm, useScroll } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import usernameAndEmail from '~/utils/usernameAndEmail'
import React, { useEffect, useState, useContext } from 'react'
import { LoginPic } from '~/images'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AlertCustom, Loading, MainPic } from '~/components'
import { Password, User } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { gql, useMutation, useQuery } from '@apollo/client'
import { AuthContext } from '~/contexts/AuthContext'

const CHECK_USERNAME_EXIST = gql`
  query checkUsername($username: String!) {
    checkUsernameExistence(username: $username) {
      username
    }
  }
`
const CHECK_EMAIL_EXIST = gql`
  query checkEmail($email: String!) {
    checkEmailExistence(email: $email) {
      email
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      customer {
        customer_id
        tsid
        status
        username
        email
      }
      token
    }
  }
`
const LOGIN_EMP_MUTATION = gql`
  mutation loginEmp($username: String!, $password: String!) {
    loginEmployee(username: $username, password: $password) {
      employee {
        employee_id
        name
        username
        is_admin
      }
      token
    }
  }
`

const Login = () => {
  const { isLoggedIn, setIsLoggedIn, setToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const [remember, setRemember] = useState(false)
  const { scrollToId } = useScroll()

  useEffect(() => scrollToId('login'), [])
  const { animate, animating, duration, timing } = useAnimation(
    true,
    1000,
    'ease-in'
  )
  const { handleSubmit, handleReset, register, setError, getError } = useForm({
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
  // Mutation
  const [
    login,
    { loading: mutationLoading, error: mutationError, data: mutationData }
  ] = useMutation(LOGIN_MUTATION)
  // Check username exist
  const { data: queryUsername } = useQuery(CHECK_USERNAME_EXIST, {
    variables: { username: register('username').value }
  })
  // check email exist
  const { data: queryEmail } = useQuery(CHECK_EMAIL_EXIST, {
    variables: { email: register('username').value }
  })
  // employee login
  const [loginEmp, { loading: empLoading, error: empError, data: empData }] =
    useMutation(LOGIN_EMP_MUTATION)
  useEffect(() => {
    if (
      (isLoggedIn ||
        localStorage.getItem('login') ||
        sessionStorage.getItem('login')) &&
      localStorage.getItem('token') === mutationData?.login?.token
    ) {
      window.location.reload()
      navigate(-1)
    }
  }, [
    isLoggedIn,
    pathname,
    localStorage.getItem('login'),
    sessionStorage.getItem('login'),
    mutationData?.login?.token
  ])
  // func handle login customer
  const handleLoginCustomer = async (value) => {
    const { data } = await login({
      variables: {
        username: value.username,
        password: value.password
      },
      context: {
        headers: {
          Authorization: `Bearer ${mutationData?.login?.token}`
        }
      }
    })
    sessionStorage.setItem(
      'checkout-information',
      JSON.stringify({
        address: '',
        payment: 'tien-mat',
        notes: '',
        delivery: 15000
      })
    )
    sessionStorage.setItem('login', true)
    if (remember) {
      localStorage.setItem('login', true)
    }
    if (data?.login.token) {
      localStorage.setItem('token', data?.login.token)
      setToken(data?.login.token)
    }
    setIsLoggedIn(true)
    navigate(-1)

    if (!data) {
      throw new Error()
    }
  }
  // func handle login employee and admin
  const handleLoginEmployee = async (value) => {
    try {
      const { data } = await loginEmp({
        variables: {
          username: value.username,
          password: value.password
        },
        context: {
          headers: {
            Authorization: `Bearer ${empData?.login?.token}`
          }
        },
        onCompleted: (res) => {
          setIsLoggedIn(true)
          sessionStorage.setItem('loginEmp', true)
          if (remember) {
            localStorage.setItem('loginEmp', true)
          }
          if (res?.loginEmployee.employee.is_admin) {
            navigate('/admin/home', { replace: true })
            window.location.reload()
          } else {
            navigate('/employee/invoice', { replace: true })
            window.location.reload()
          }
          if (res?.loginEmployee.token) {
            localStorage.setItem('tokenEmp', res?.loginEmployee.token)
            setToken(res?.loginEmployee.token)
          }
        }
      })
    } catch (error) {
      console.log('🚀 ~ handleLoginEmployee ~ error:', error)
      setError('password', 'Mật khẩu không đúng')
    }
  }
  // loading
  if (mutationLoading || empLoading) return <Loading />
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={LoginPic}
        title={'Paramita'}
        sloganCenter={'Chào mừng bạn đến với hệ thống'}
      />
      <Flex
        id='login'
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
              },
              '@media (max-width: 26.5625rem)': {
                '.PrismaneTextField-label, .PrismanePasswordField-label': {
                  fontSize: fr(4)
                }
              }
            }}
          >
            <Card.Header>
              <Text fs={isMobile ? '2xl' : '3xl'} mx={'auto'}>
                Đăng nhập
              </Text>
            </Card.Header>
            <Form
              onSubmit={(SubmitEvent) =>
                handleSubmit(SubmitEvent, async (value) => {
                  const queryResult = value.username.includes('@')
                    ? queryEmail?.checkEmailExistence
                    : queryUsername?.checkUsernameExistence
                  if (!queryResult) {
                    setError(
                      'username',
                      value.username.includes('@')
                        ? 'Email không tồn tại'
                        : 'Tên tài khoảng không tồn tại'
                    )
                  }
                  if (
                    !!queryEmail?.checkEmailExistence ||
                    !!queryUsername?.checkUsernameExistence
                  ) {
                    try {
                      await handleLoginCustomer(value)
                    } catch (error) {
                      await handleLoginEmployee(value)
                    }
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
              <Flex justify='between'>
                <Checkbox
                  name='remember'
                  label='Lưu đăng nhập'
                  value={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <Text
                  as={Link}
                  to={'/forgot-password'}
                  fs={isMobile ? 'base' : 'md'}
                  lh={fr(7.5)}
                  cl={['#0266BE', { hover: 'blue' }]}
                >
                  Quên mật khẩu?
                </Text>
              </Flex>
              <Button
                size='lg'
                variant='tertiary'
                color='primary'
                type='submit'
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
