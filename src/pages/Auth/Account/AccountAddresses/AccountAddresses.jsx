import React from 'react'
import { Flex, Icon, Stack, Text, fr } from '@prismane/core'
import { Pen, X } from '@phosphor-icons/react'
const AccountAddresses = () => {
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
        Sổ địa chỉ
      </Text>
      <Stack gap={fr(10)}>
        <Flex pos={'relative'} justify='between'>
          <Text fs={'xl'}>Địa chỉ giao hàng</Text>
          <Text
            fs={'md'}
            cs={'pointer'}
            cl={['inherit', { hover: 'primary' }]}
            onClick={() => {}}
          >
            Thêm
          </Text>
        </Flex>
        <Flex>
          <Text tt={'capitalize'} fs={'lg'}>
            184 Lê Đại Hành, quận 11, TP Hồ Chí Minh
          </Text>
          <Flex ml={'auto'} gap={fr(5)}>
            <Icon
              cs={'pointer'}
              size={fr(6)}
              cl={['inherit', { hover: 'blue' }]}
              onClick={() => {}}
            >
              <Pen weight='bold' />
            </Icon>
            <Icon
              cs={'pointer'}
              size={fr(6)}
              cl={['inherit', { hover: 'red' }]}
              onClick={() => {}}
            >
              <X weight='bold' />
            </Icon>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default AccountAddresses
