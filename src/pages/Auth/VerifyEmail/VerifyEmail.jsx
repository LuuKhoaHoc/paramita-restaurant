import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Circle,
  Text,
  fr
} from '@prismane/core'
import { useScroll } from '@prismane/core/hooks'
import React, { useEffect, useState } from 'react'
import { LoginPic } from '~/images'
import { Loading, MainPic } from '~/components'
import { useResponsive } from '~/utils/responsive'
import { useLocation, useNavigate } from 'react-router-dom'
import { Envelope, EnvelopeOpen } from '@phosphor-icons/react'
import { gql, useMutation } from '@apollo/client'
import { GET_CONTENT } from '~/pages/Auth/Login/schema'

const VERIFY_EMAIL = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token) {
      status
      message
    }
  }
`

const VerifyEmail = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [verifyEmail] = useMutation(VERIFY_EMAIL)
  const [validate, setValidate] = useState(false)
  if (sessionStorage.getItem('login') === 'true') {
    window.location.href = '/'
  }
  const token = pathname.split('/')[2]

  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('register')
    verifyEmail({
      variables: { token },
      onCompleted: (data) => {
        console.log('🚀 ~ useEffect ~ data:', data)
        if (data.verifyEmail.status === 'success') {
          setValidate(true)
        }
      }
    })
  }, [])
  // query
  const { data: content } = useQuery(GET_CONTENT)
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
          gap={fr(5)}
          sx={{
            '.PrismaneTextField-label, .PrismanePasswordField-label': {
              fontSize: fr(5)
            },
            '.PrismaneCheckbox-error': {
              fontSize: fr(4)
            }
          }}
        >
          <Card.Header direction='column' align='center'>
            <Text fs={isMobile ? '2xl' : '3xl'} mx={'auto'}>
              Xác thực email
            </Text>
            <Circle
              as={'a'}
              href='https://mail.google.com/'
              target='_blank'
              size={80}
              bg={['primary', 100]}
              cl={'white'}
            >
              {validate ? (
                <EnvelopeOpen size={40} weight='duotone' />
              ) : (
                <Envelope size={40} weight='duotone' />
              )}
            </Circle>
            {validate && (
              <Text className='GeomanistMedium-font' mt={fr(4)}>
                Xác thực thành công
              </Text>
            )}
          </Card.Header>
          <Divider />
          <Card.Footer justify='center'>
            {!validate ? (
              <Flex direction='column' align='center' fs={'xl'}>
                <Text>Còn một bước nữa thôi là bạn có thể đăng kí rồi!!!</Text>
                <Text>Hãy kiểm tra email của bạn nhé~~</Text>
              </Flex>
            ) : (
              <Button
                size='lg'
                variant='text'
                cl={'blue'}
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </Button>
            )}
          </Card.Footer>
        </Card>
      </Flex>
    </Box>
  )
}

export default VerifyEmail
