import { Box, Card, Flex, Text, Toaster, fr, useToast } from '@prismane/core'
import { useScroll } from '@prismane/core/hooks'
import React, { useEffect, useState } from 'react'
import { LoginPic } from '~/images'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Loading, MainPic } from '~/components'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

import { useResponsive } from '~/utils/responsive'
import SendEmail from './SendEmail/SendEmail'
import VerifyPin from './VerifyPin/VerifyPin'
import ResetPassword from './ResetPassword/ResetPassword'
import { useQuery } from '@apollo/client'
import { GET_CONTENT } from '~/pages/Auth/Login/schema'

const ForgotPassword = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { scrollToId } = useScroll()
  useEffect(() => {
    scrollToId('forgot-password')
  }, [])
  // query
  const { data: content } = useQuery(GET_CONTENT)
  return (
    <Toaster position='top-right' mt={fr(22.5)}>
      <Box pos={'relative'} mih={'100vh'}>
        <MainPic
          image={content?.page?.content[0].image}
          title={content?.page?.content[0].title}
          sloganCenter={content?.page?.content[0].slogan}
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
            gap={fr(8)}
            sx={{
              '.PrismaneTextField-label, .PrismanePinField-label': {
                fontSize: fr(5)
              }
            }}
          >
            <Card.Header>
              <Text fs={'3xl'} mx={'auto'}>
                {pathname.includes('reset-password')
                  ? 'Đổi mật khẩu'
                  : 'Quên mật khẩu'}
              </Text>
            </Card.Header>

            <Routes>
              <Route path='/' element={<SendEmail />} />
              <Route path='verify-pin' element={<VerifyPin />} />
              <Route path='reset-password' element={<ResetPassword />} />
            </Routes>

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
    </Toaster>
  )
}

export default ForgotPassword
