import { CaretRight } from '@phosphor-icons/react'
import { Center, Flex, Icon, Image, Stack, Text, fr } from '@prismane/core'
import React from 'react'
const HistoryRewardPoint = () => {
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
        Lịch sử tích điểm
      </Text>
      <Stack>
        <Flex
          bg={'#fff'}
          br={'base'}
          bsh={'md'}
          p={fr(2)}
          my={fr(2)}
          cs={'pointer'}
        >
          <Flex direction='column' ml={fr(2)} grow>
            <Text as={'h2'}>Đổi điểm thành công</Text>
            <Text fs={'md'}>13/2/2024</Text>
            <Text fs={'xl'} cl={'primary'}>
              Mã giao địch: 42c6b1ab-feed-4ec0-ade4-03f11444b208
            </Text>
            <Text fs={'lg'}>Mã voucher: 123123</Text>
          </Flex>
          <Center gap={fr(4)}>
            <Text fs={'xl'} cl={'red'}>
              -350 điểm
            </Text>
            <Icon size={fr(6)}>
              <CaretRight />
            </Icon>
          </Center>
        </Flex>
        <Flex
          bg={'#fff'}
          br={'base'}
          bsh={'md'}
          p={fr(2)}
          my={fr(2)}
          cs={'pointer'}
        >
          <Flex direction='column' ml={fr(2)} grow>
            <Text as={'h2'}>Giao địch thành công</Text>
            <Text fs={'md'}>14/2/2024</Text>
            <Text fs={'xl'} cl={'primary'}>
              Mã giao địch: 42c6b1ab-feed-4ec0-ade4-03f11444b208
            </Text>
            <Text fs={'lg'}>Mã đơn hàng: 456456</Text>
          </Flex>
          <Center gap={fr(4)}>
            <Text fs={'xl'} cl={'primary'}>
              250 điểm
            </Text>
            <Icon size={fr(6)}>
              <CaretRight />
            </Icon>
          </Center>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default HistoryRewardPoint
