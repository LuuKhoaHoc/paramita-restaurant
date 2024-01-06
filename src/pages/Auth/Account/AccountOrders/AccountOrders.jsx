import { CaretRight } from '@phosphor-icons/react'
import { Center, Flex, Icon, Image, Stack, Text, fr } from '@prismane/core'
import React from 'react'

const AccountOrder = () => {
  return (
    <Flex direction='column' grow pos={'relative'} m={fr(10)}>
      <Text
        pos={['relative', { ':before': 'absolute' }]}
        fs={'4xl'}
        sx={{
          '&::before': {
            content: '',
            width: '25%',
            height: '2px',
            borderRadius: '2px',
            backgroundColor: '#39b54a',
            bottom: '0px',
            left: 0
          }
        }}
      >
        Đơn hàng
      </Text>
      <Stack>
        <Flex bg={'#fff'} br={'base'} bsh={'md'} p={fr(2)} my={fr(2)} cs={'pointer'}>
          <Image
            src='https://www.viquekitchen.com/wp-content/uploads/2022/05/Banh-xeo-Xeo-cake-Trans-300x300.jpg'
            alt='banh-xeo'
            w={fr(32)}
            h={fr(32)}
          />
          <Flex direction='column' ml={fr(2)} grow>
            <Text as={'h2'}>e828ca0e-5adc-433e-9521-98d6e9d28b61</Text>
            <Text fs={'md'}>14/2/2024</Text>
            <Text fs={'xl'} cl={'primary'}>
              Đang thực hiện
            </Text>
            <Text tt={'capitalize'} fs={'md'}>
              184 Lê Đại Hành, quận 11, TP Hồ Chí Minh
            </Text>
          </Flex>
          <Center gap={fr(4)}>
            <Text fs={'xl'} cl={'primary'}>
              100.000 đ
            </Text> 
            <Icon size={fr(6)}>
              <CaretRight  />
            </Icon>
          </Center>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default AccountOrder
