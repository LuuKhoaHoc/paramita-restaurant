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
import React, { useState } from 'react'
import { OrderInvoice } from '~/components'
import { useResponsive } from '~/utils/responsive'
import timestampToDateTime from '~/utils/timeStampToDateTime'

const AccountHistory = ({ customer }) => {
  const orders = customer?.orders.filter((item) => item.status === 'Hoàn thành')
  const { isTablet, isMobile } = useResponsive()
  const [order, setOrder] = useState()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal
        w={isMobile ? '100vw' : '80vw'}
        open={open}
        onClose={() => setOpen(false)}
        closable
      >
        <OrderInvoice customer={customer} order={order} />
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
          Lịch sử mua hàng
        </Text>
        <Stack align='center'>
          {orders?.map((item) => {
            return (
              <Flex
                key={item?.tsid}
                bg={(theme) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')}
                br={'lg'}
                bsh={'md'}
                p={fr(2)}
                my={fr(2)}
                cs={'pointer'}
                align='center'
                onClick={() => {
                  setOrder(item)
                  setOpen(!open)
                }}
              >
                <Flex align='center'>
                  <Image
                    src={item?.order_details[0].item.image}
                    alt='order'
                    w={isMobile ? fr(20) : fr(32)}
                    h={isMobile ? fr(20) : fr(32)}
                    br={'lg'}
                  />
                  <Flex direction='column' ml={isMobile ? fr(1) : fr(2)}>
                    <Text as={'h2'} fs={isMobile ? 'md' : 'inherit'}>
                      #{item?.tsid}
                    </Text>
                    <Text fs={isMobile ? 'sm' : 'md'}>
                      {timestampToDateTime(+item?.tsid)}
                    </Text>
                    <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
                      {item?.status}
                    </Text>
                    <Text tt={'capitalize'} fs={isMobile ? 'sm' : 'md'}>
                      {item?.delivery_address}
                    </Text>
                    {isMobile && (
                      <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
                        {item?.total_price.toLocaleString('vi-VN')}đ
                      </Text>
                    )}
                  </Flex>
                </Flex>
                {!isMobile && (
                  <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
                    {item?.total_price.toLocaleString('vi-VN')}đ
                  </Text>
                )}
                <Icon size={isMobile ? fr(4) : fr(6)}>
                  <CaretRight />
                </Icon>
              </Flex>
            )
          })}
        </Stack>
      </Flex>
    </>
  )
}

export default AccountHistory
