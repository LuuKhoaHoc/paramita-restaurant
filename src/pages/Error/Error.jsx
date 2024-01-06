import { Box, Button, Center, Circle, Image, Text, fr } from '@prismane/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { LogoIcon } from '~/images'

const Error = () => {
  return (
    <Center
      mih={'100vh'}
      bg={(theme) =>
        theme.mode === 'dark' ? ['primary', 600] : ['primary', 100]
      }
      direction='column'
      ff={'GeomanistLight'}
    >
      <Center
        ff={'BalihoScript'}
        cl={(theme) =>
          theme.mode === 'dark' ? ['primary', 100] : ['primary', 600]
        }
        sx={{
          fontSize: '12rem'
        }}
      >
        <Text>4</Text>
        <Box
          w={fr(40)}
          h={fr(40)}
          sx={{
            backgroundImage: `url(${LogoIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        />
        <Text>4</Text>
      </Center>
      <Center gap={fr(4)} fs={'xl'}>
        <Circle size={fr(2)} bg={['red']} />
        <Text>Xin lỗi, Paramita không tồn tại ở đây</Text>
        <Circle size={fr(2)} bg={['red']} />
      </Center>
      <Button as={Link} to={'/'} size='lg' mt={fr(4)} br={'2xl'}>Quay về trang chủ</Button>
    </Center>
  )
}

export default Error
