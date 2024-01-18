import { Cardholder } from '@phosphor-icons/react'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Form,
  Grid,
  Icon,
  List,
  Stack,
  Tabs,
  Text,
  TextField,
  fr
} from '@prismane/core'
import CheckoutCart from '~/pages/Checkout/CheckoutCart/CheckoutCart'
import CheckoutShipping from '~/pages/Checkout/CheckoutShipping/CheckoutShipping'
import CheckoutPayment from '~/pages/Checkout/CheckoutPayment/CheckoutPayment'
import CheckoutReview from '~/pages/Checkout/CheckoutReview/CheckoutReview'
import React, { useEffect } from 'react'

const Checkout = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} bg='#371b04' />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Center fs={'4xl'} gap={fr(4)} p={fr(10)}>
          <Icon size={fr(12)} cl={'primary'}>
            <Cardholder weight='fill' />
          </Icon>
          <Text>Checkout</Text>
        </Center>
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Stack direction='row' gap={fr(4)} mih={'70vh'}>
              <Flex
                w={'60%'}
                bg={(theme) => (theme.mode === 'dark' ? '#1f2937' : '#fff')}
                br={'lg'}
                bsh={'md'}
                mah={'70vh'}
              >
                <Tabs defaultValue='first'>
                  <Tabs.List justify='end' >
                    <Tabs.Tab className='Geomanist-font' px={fr(6)} py={fr(4)} value='first'>
                      Vận chuyển
                    </Tabs.Tab>
                    <Tabs.Tab className='Geomanist-font' px={fr(6)} py={fr(4)} value='second'>
                      Thanh toán
                    </Tabs.Tab>
                    <Tabs.Tab className='Geomanist-font' px={fr(6)} py={fr(4)} value='third'>
                      Xác nhận
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value='first' direction='column'>
                    <CheckoutShipping />
                  </Tabs.Panel>
                  <Tabs.Panel value='second'>
                    <CheckoutPayment />
                  </Tabs.Panel>
                  <Tabs.Panel value='third'>
                    <CheckoutReview />
                  </Tabs.Panel>
                </Tabs>
              </Flex>
              <Flex
                w={'40%'}
                bg={(theme) => (theme.mode === 'dark' ? '#1f2937' : '#fff')}
                br={'lg'}
                bsh={'md'}
                direction='column'
                px={fr(4)}
              >
                <CheckoutCart />
              </Flex>
            </Stack>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Checkout
