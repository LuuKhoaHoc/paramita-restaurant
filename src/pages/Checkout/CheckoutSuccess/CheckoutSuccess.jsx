import { Bank, CheckCircle, Money, PiggyBank } from '@phosphor-icons/react'
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  List,
  Text,
  fr
} from '@prismane/core'
import React from 'react'
import { OrderInvoice } from '~/components'

const CheckoutSuccess = () => {
  if (localStorage.getItem('orderSuccess') !== 'true') {
    window.location.href = '/'
  }

  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} bg='#371b04' />
      <Box w={'100%'} h={'100%'} pos={'relative'} my={fr(5)}>
        <Center direction='column' gap={fr(4)} mb={fr(4)}>
          <Icon size={fr(25)} cl={'primary'}>
            <CheckCircle weight='bold' />
          </Icon>
          <Text as={'h1'} className='GeomanistMedium-font'>
            Cảm ơn bạn đã mua hàng!
          </Text>
          <Text as={'h2'} className='GeomanistLight-font'>
            Đơn hàng của bạn đã được đặt thành công.
          </Text>
        </Center>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <OrderInvoice />
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default CheckoutSuccess
