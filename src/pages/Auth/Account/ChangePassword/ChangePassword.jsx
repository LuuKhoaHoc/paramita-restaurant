import { Button, Flex, PasswordField, Text, fr } from '@prismane/core'
import React from 'react'
const ChangePassword = () => {
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
        Đổi mật khẩu
      </Text>
      <Flex
        direction='column'
        sx={{ '.PrismanePasswordField-label': { fontSize: fr(5) } }}
      >
        <PasswordField label='Mật khẩu cũ' />
        <PasswordField label='Mật khẩu mới' />
        <PasswordField label='Xác nhận mật khẩu mới' />
        <Button
          size='md'
          br={'full'}
          className='GeomanistLight-font'
          ml={'auto'}
          mt={fr(4)}
        >
          <Text fs={'md'}>Cập nhật</Text>
        </Button>
      </Flex>
    </Flex>
  )
}

export default ChangePassword
