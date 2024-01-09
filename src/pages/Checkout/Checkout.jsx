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
import { useForm, useSearch } from '@prismane/core/hooks'
import CheckoutCart from '~/pages/Checkout/CheckoutCart/CheckoutCart'
import CheckoutShipping from '~/pages/Checkout/CheckoutShipping/CheckoutShipping'
import React from 'react'

const Checkout = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} w={'100%'} z={-1} bg={['primary', 100]}></Box>
      <Box
        w={'100%'}
        h={'100%'}
        ff={'"BalihoScript", sans-serif'}
        pos={'relative'}
      >
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
                  <Tabs.List justify='end' ff={'Geomanist'}>
                    <Tabs.Tab px={fr(10)} py={fr(4)} value='first'>
                      Vận chuyển
                    </Tabs.Tab>
                    <Tabs.Tab px={fr(10)} py={fr(4)} value='second'>
                      Thanh toán
                    </Tabs.Tab>
                    <Tabs.Tab px={fr(10)} py={fr(4)} value='third'>
                      Xác nhận
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value='first' direction='column'>
                    <CheckoutShipping />
                  </Tabs.Panel>
                  <Tabs.Panel value='second'>Second</Tabs.Panel>
                  <Tabs.Panel value='third'>Third</Tabs.Panel>
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
