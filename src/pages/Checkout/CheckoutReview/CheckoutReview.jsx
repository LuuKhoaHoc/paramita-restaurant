import { Box, Center, Flex, Image, Text, fr } from '@prismane/core'
import React from 'react'
import { LogoIcon } from '~/images'

const CheckoutReview = () => {
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )
  return (
    <Center direction='column' w={'100%'} gap={fr(5)}>
      <Image
        src={LogoIcon}
        alt='logo'
        w={fr(40)}
        h={fr(40)}
        fit='cover'
        bsh={'md'}
        br={'full'}
      />
      <Text ff={'GeomanistMedium'} fs={'xl'}>
        Xác nhận đơn hàng
      </Text>
      <Flex w={'100%'} direction='column'>
        <Box>
          <Text ml={fr(4)}>Thông tin người nhận</Text>
          <Text ml={fr(4)}>Tên người nhận: </Text>
          <Text ml={fr(4)}>Số điện thoại: </Text>
        </Box>

        <Box>
          <Text ml={fr(4)}>Thông tin thanh toán</Text>
          <Text ta={'center'}></Text>
        </Box>
        <Box>
          <Text ml={fr(4)}>Thông tin vận chuyển</Text>
          <Text ta={'center'}></Text>
        </Box>
      </Flex>
    </Center>
  )
}

export default CheckoutReview
