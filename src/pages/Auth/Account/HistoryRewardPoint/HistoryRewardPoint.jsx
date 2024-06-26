import { CaretRight } from '@phosphor-icons/react'
import { Center, Flex, Icon, Image, Stack, Text, fr } from '@prismane/core'
import { useId } from '@prismane/core/hooks'
import React, { useEffect, useState } from 'react'
import { useResponsive } from '~/utils/responsive'

const HistoryRewardPoint = ({ customer }) => {
  // responsive
  const { isTablet, isMobile } = useResponsive()
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
      <Stack align='center'>
        {customer.point_histories?.map((item, index) => {
          return (
            <Flex
              key={index}
              w={'25vw'}
              align='center'
              bg={(theme) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')}
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
                <Text fs={isMobile ? 'base' : 'base'}>
                  {item?.transaction_date}
                </Text>
                <Text fs={isMobile ? 'base' : 'lg'} cl={'primary'}>
                  Mã giao địch: #{item?.tsid}
                </Text>
                <Text fs={isMobile ? 'base' : 'md'}>
                  Mã đơn hàng: #{item?.order.tsid}
                </Text>
              </Flex>

              <Text fs={isMobile ? 'base' : 'lg'} cl={'primary'}>
                {item?.points_earned} điểm
              </Text>
              <Icon size={isMobile ? fr(4) : fr(6)}>
                <CaretRight />
              </Icon>
            </Flex>
          )
        })}
      </Stack>
    </Flex>
  )
}

export default HistoryRewardPoint
