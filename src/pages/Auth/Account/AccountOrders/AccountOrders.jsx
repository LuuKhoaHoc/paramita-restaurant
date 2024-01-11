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

const AccountOrder = () => {
  const id = useId()
  const [open, setOpen] = useState(false)
  const orders = JSON.parse(localStorage.getItem('orders'))
  return (
    <>
      <Modal w={'80vw'} open={open} onClose={() => setOpen(false)} closable>
        <OrderInvoice />
      </Modal>
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
          {orders.map((item, index) => (
            <Flex
              key={index}
              bg={(theme) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')}
              br={'lg'}
              bsh={'md'}
              p={fr(2)}
              my={fr(2)}
              cs={'pointer'}
              onClick={() => {
                setOpen(!open)
              }}
            >
              <Image
                src={item.cart[0].image}
                alt='order'
                w={fr(32)}
                h={fr(32)}
                br={'lg'}
              />
              <Flex direction='column' ml={fr(2)} grow>
                <Text as={'h2'}>#{id}</Text>
                <Text fs={'md'}>14/2/2024</Text>
                <Text fs={'xl'} cl={'primary'}>
                  Đang thực hiện
                </Text>
                <Text tt={'capitalize'} fs={'md'}>
                  {item.information.address}
                </Text>
              </Flex>
              <Center gap={fr(4)}>
                <Text fs={'xl'} cl={'primary'}>
                  {item.totalPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </Text>
                <Icon size={fr(6)}>
                  <CaretRight />
                </Icon>
              </Center>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </>
  )
}

export default AccountOrder
