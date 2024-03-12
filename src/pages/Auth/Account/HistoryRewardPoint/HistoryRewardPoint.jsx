import { CaretRight } from '@phosphor-icons/react'
import { Center, Flex, Icon, Image, Stack, Text, fr } from '@prismane/core'
import { useId } from '@prismane/core/hooks'
import React from 'react'
import { useResponsive } from '~/utils/responsive'
const HistoryRewardPoint = ({ customer }) => {
  const { isTablet, isMobile } = useResponsive()
  const id = useId()
  return (
    <Flex direction='column' grow pos={'relative'} m={fr(10)}>
      <Text
        pos={['relative', { ':before': 'absolute' }]}
        fs={isMobile ? '2xl' : '4xl'}
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
          align='center'
          bg={'#fff'}
          br={'base'}
          bsh={'md'}
          p={fr(2)}
          my={fr(2)}
          cs={'pointer'}
        >
          <Flex direction='column' ml={fr(2)} grow>
            <Text as={'h2'} fs={isMobile ? 'md' : 'inherit'}>
              Đổi điểm thành công
            </Text>
            <Text fs={isMobile ? 'base' : 'lg'}>13/2/2024</Text>
            <Text fs={isMobile ? 'base' : 'xl'} cl={'primary'}>
              Mã giao địch: #{id}
            </Text>
            <Text fs={isMobile ? 'base' : 'lg'}>Mã voucher: 123123</Text>
          </Flex>
          <Text fs={isMobile ? 'base' : 'xl'} cl={'red'}>
            -350 điểm
          </Text>
          <Icon size={isMobile ? fr(4) : fr(6)}>
            <CaretRight />
          </Icon>
        </Flex>
        <Flex
          align='center'
          bg={'#fff'}
          br={'base'}
          bsh={'md'}
          p={fr(2)}
          my={fr(2)}
          cs={'pointer'}
        >
          <Flex direction='column' ml={fr(2)} grow>
            <Text as={'h2'} fs={isMobile ? 'md' : 'inherit'}>
              Giao địch thành công
            </Text>
            <Text fs={isMobile ? 'base' : 'lg'}>14/2/2024</Text>
            <Text fs={isMobile ? 'base' : 'xl'} cl={'primary'}>
              Mã giao địch: #{id}
            </Text>
            <Text fs={isMobile ? 'base' : 'lg'}>Mã đơn hàng: 456456</Text>
          </Flex>

          <Text fs={isMobile ? 'base' : 'xl'} cl={'primary'}>
            250 điểm
          </Text>
          <Icon size={isMobile ? fr(4) : fr(6)}>
            <CaretRight />
          </Icon>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default HistoryRewardPoint
