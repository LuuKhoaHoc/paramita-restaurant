import { Cardholder } from '@phosphor-icons/react'
import {
  Box,
  Center,
  Flex,
  Grid,
  Icon,
  Stack,
  Tabs,
  Text,
  Toaster,
  fr
} from '@prismane/core'
import CheckoutCart from '~/pages/Checkout/CheckoutCart/CheckoutCart'
import CheckoutShipping from '~/pages/Checkout/CheckoutShipping/CheckoutShipping'
import CheckoutPayment from '~/pages/Checkout/CheckoutPayment/CheckoutPayment'
import CheckoutReview from '~/pages/Checkout/CheckoutReview/CheckoutReview'
import React, { useEffect } from 'react'
import { useResponsive } from '~/utils/responsive'
import { ErrorLogin } from '~/components'

const Checkout = ({ customer }) => {
  const { isMobile, isTablet } = useResponsive()
  window.addEventListener('storage', function (e) {
    if (e.key === 'token' || e.key === 'login') {
      ErrorLogin()
      localStorage.removeItem('login')
      localStorage.removeItem('token')
      window.location.reload()
    }
  })
  if (
    localStorage.getItem('token') &&
    sessionStorage.getItem('checkout-information') === null
  ) {
    sessionStorage.setItem(
      'checkout-information',
      JSON.stringify({
        address: '',
        payment: 'tien-mat',
        notes: '',
        delivery: 15000,
        voucher: 0
      })
    )
  }

  return (
    <Toaster position='top-right' mt={fr(22.5)}>
      <Box pos={'relative'} mih={'100vh'}>
        <Box h={fr(22.5)} bg='#371b04' />
        <Box w={'100%'} h={'100%'} pos={'relative'}>
          <Center fs={isMobile ? '2xl' : '4xl'} gap={fr(4)} p={fr(10)}>
            <Icon size={isMobile ? fr(8) : fr(12)} cl={'primary'}>
              <Cardholder weight='fill' />
            </Icon>
            <Text>Checkout</Text>
          </Center>
          <Grid templateColumns={12}>
            <Grid.Item
              columnStart={isTablet ? 2 : isMobile ? 1 : 3}
              columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
            >
              <Stack
                direction={isMobile ? 'column' : 'row'}
                gap={fr(4)}
                mih={'70vh'}
                mb={fr(4)}
              >
                <Flex
                  w={isMobile ? '80vw' : '60%'}
                  bg={(theme) => (theme.mode === 'dark' ? '#1f2937' : '#fff')}
                  br={'lg'}
                  bsh={'md'}
                  px={fr(4)}
                  mx={'auto'}
                  // mah={'70vh'}
                >
                  <Tabs defaultValue='first'>
                    <Tabs.List justify='end' fs={isMobile ? 'xs' : 'sm'}>
                      <Tabs.Tab
                        className='GeomanistMedium-font'
                        px={isTablet ? fr(5) : isMobile ? fr(4) : fr(6)}
                        py={isTablet ? fr(3) : isMobile ? fr(2) : fr(4)}
                        value='first'
                      >
                        Vận chuyển
                      </Tabs.Tab>
                      <Tabs.Tab
                        className='GeomanistMedium-font'
                        px={isTablet ? fr(5) : isMobile ? fr(4) : fr(6)}
                        py={isTablet ? fr(3) : isMobile ? fr(2) : fr(4)}
                        value='second'
                      >
                        Thanh toán
                      </Tabs.Tab>
                      <Tabs.Tab
                        className='GeomanistMedium-font'
                        px={isTablet ? fr(5) : isMobile ? fr(4) : fr(6)}
                        py={isTablet ? fr(3) : isMobile ? fr(2) : fr(4)}
                        value='third'
                      >
                        Xác nhận
                      </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='first' direction='column'>
                      <CheckoutShipping customer={customer} />
                    </Tabs.Panel>
                    <Tabs.Panel value='second'>
                      <CheckoutPayment customer={customer} />
                    </Tabs.Panel>
                    <Tabs.Panel value='third'>
                      <CheckoutReview customer={customer} />
                    </Tabs.Panel>
                  </Tabs>
                </Flex>
                <Flex
                  w={isMobile ? '80vw' : '40%'}
                  bg={(theme) => (theme.mode === 'dark' ? '#1f2937' : '#fff')}
                  br={'lg'}
                  bsh={'md'}
                  direction='column'
                  px={fr(4)}
                  mx={'auto'}
                >
                  <CheckoutCart customer={customer} />
                </Flex>
              </Stack>
            </Grid.Item>
          </Grid>
        </Box>
      </Box>
    </Toaster>
  )
}

export default Checkout
