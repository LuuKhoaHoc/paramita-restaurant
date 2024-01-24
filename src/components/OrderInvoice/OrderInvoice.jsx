import React from 'react'
import { Flex, Text, Box, Divider, List, Image, fr } from '@prismane/core'
import { useId } from '@prismane/core/hooks'

const OrderInvoice = () => {
  const id = useId()
  const orders = JSON.parse(localStorage.getItem('orders'))
  const lastIndex = orders.length - 1
  const cart = orders[lastIndex].cart
  const information = orders[lastIndex].information
  const total = orders[lastIndex].totalPrice
  const subTotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity * 1000
  }, 0)
  return (
    <Flex
      bg={(theme) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')}
      br={'xl'}
      direction='column'
      align='center'
    >
      <Text as={'h3'} fs={'xl'} className='Geomanist-font' p={fr(5)}>
        Đơn hàng của bạn
      </Text>
      <Box w={'90%'}>
        <Flex direction='column' mb={fr(2)}>
          <Text fs={'lg'}>Mã đơn hàng: #{id}</Text>
          <Text fs={'lg'}>Tên khách hàng: {information?.name}</Text>
          <Text fs={'lg'}>Số điện thoại: {information?.phone}</Text>
          <Text fs={'lg'}>Địa chỉ giao hàng: {information?.address}</Text>
          <Flex gap={fr(2)} fs={'lg'}>
            <Text>Phương thức thanh toán: </Text>
            <Text>
              {
                {
                  'mo-mo': 'MoMo',
                  'tien-mat': 'Tiền mặt',
                  'ngan-hang': 'ngân hàng'
                }[information?.payment]
              }
            </Text>
          </Flex>
        </Flex>
        <Divider />
        <List>
          <List.Item justify='around' fs={'lg'} py={fr(2)}>
            <Text mr={fr(4)}>STT</Text>
            <Text w={fr(86)}>Sản phẩm</Text>
            <Text>Giá</Text>
            <Text>Số lượng</Text>
            <Text>Tạm tính</Text>
          </List.Item>
          <Divider />
          {cart?.map((item, index) => (
            <Box key={index}>
              <List.Item justify='around' py={fr(2)} align='center'>
                <Text>{index + 1}</Text>
                <Flex align='center' gap={fr(2)} w={fr(86)}>
                  <Image
                    src={item.image}
                    w={fr(20)}
                    h={fr(20)}
                    alt={item.title}
                    br={'lg'}
                  />
                  <Box>
                    <Text fs={'lg'}>{item.title}</Text>
                    <Flex>
                      <Text>{item.optionList[0].title}</Text>
                      <Text>{item.optionList[0].selected}</Text>
                    </Flex>
                  </Box>
                </Flex>
                <Text fs={'lg'}>{item.price}đ</Text>
                <Text>{item.quantity}</Text>
                <Text fs={'lg'}>
                  {(item.price * item.quantity * 1000).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </Text>
              </List.Item>
              <Divider />
            </Box>
          ))}
        </List>
        <Flex direction='column' align='end' fs={'lg'} gap={fr(2)} my={fr(2)}>
          <Text>
            Tổng cộng:{' '}
            {subTotal.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </Text>
          <Text>
            Phí vận chuyển:{' '}
            {information.delivery.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </Text>
          <Text>
            Mã giảm giá:{' '}
            {
              -String(information.voucher).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
              })
            }
          </Text>
          <Text fs={'xl'} cl={'primary'}>
            Tổng thanh toán:{' '}
            {total.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default OrderInvoice
