import { CaretRight } from '@phosphor-icons/react'
import {
  Center,
  Flex,
  Icon,
  Image,
  Modal,
  Stack,
  Text,
  fr
} from '@prismane/core'
import { useId } from '@prismane/core/hooks'
import React, { useState } from 'react'
import { OrderInvoice } from '~/components'
import { useResponsive } from '~/utils/responsive'

const AccountOrder = () => {
  const { isTablet, isMobile } = useResponsive()
  const id = useId()
  const [open, setOpen] = useState(false)
  const orders = JSON.parse(localStorage.getItem('orders'))
  return (
    <>
      <Modal w={isMobile ? '100vw' : '80vw'} open={open} onClose={() => setOpen(false)} closable>
        <OrderInvoice />
      </Modal>
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
          Đơn hàng
        </Text>
        <Stack align='center'>
          {orders?.map((item, index) => (
            <Flex
              key={index}
              bg={(theme) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')}
              br={'lg'}
              bsh={'md'}
              p={fr(2)}
              my={fr(2)}
              cs={'pointer'}
              align='center'
              onClick={() => {
                setOpen(!open)
              }}
            >
              <Flex align='center'>
                <Image
                  src={item.cart[0].image}
                  alt='order'
                  w={isMobile ? fr(20) : fr(32)}
                  h={isMobile ? fr(20) : fr(32)}
                  br={'lg'}
                />
                <Flex direction='column' ml={isMobile ? fr(1) : fr(2)}>
                  <Text as={'h2'} fs={isMobile ? 'md' : 'inherit'}>
                    #{id}
                  </Text>
                  <Text fs={isMobile ? 'sm' : 'md'}>14/2/2024</Text>
                  <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
                    Đang thực hiện
                  </Text>
                  <Text tt={'capitalize'} fs={isMobile ? 'sm' : 'md'}>
                    {item.information.address}
                  </Text>
                  {isMobile && (
                    <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
                    {item.totalPrice.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </Text>
                  )}
                </Flex>
              </Flex>
              {!isMobile && (
                <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
                  {item.totalPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </Text>
              )}
              <Icon size={isMobile ? fr(4) : fr(6)}>
                <CaretRight />
              </Icon>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </>
  )
}

export default AccountOrder
