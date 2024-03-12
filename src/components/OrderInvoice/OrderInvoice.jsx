import React from 'react'
import { Flex, Text, Box, Divider, List, Image, fr } from '@prismane/core'
import { useId } from '@prismane/core/hooks'
import { useResponsive } from '~/utils/responsive'

const OrderInvoice = ({ customer }) => {
  const { isTablet, isMobile } = useResponsive()
  const id = useId()
  const orders = JSON.parse(localStorage.getItem('orders'))
  const lastIndex = orders?.length - 1
  const cart = orders[lastIndex].cart
  const information = orders[lastIndex].information
  const total = orders[lastIndex].totalPrice
  const subTotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  return (
    <Flex
      bg={(theme) => (theme.mode === 'dark' ? '#1a1a1a' : '#fff')}
      br={'xl'}
      direction='column'
      align='center'
    >
      <Text
        as={'h3'}
        fs={isMobile ? 'lg' : 'xl'}
        className='GeomanistMedium-font'
        p={fr(5)}
      >
        Đơn hàng của bạn
      </Text>
      <Box w={'90%'}>
        <Flex direction='column' mb={fr(2)} fs={isMobile ? 'base' : 'lg'}>
          <Text>Mã đơn hàng: #{id}</Text>
          <Text>Tên khách hàng: {information?.name}</Text>
          <Text>Số điện thoại: {information?.phone}</Text>
          <Text>Địa chỉ giao hàng: {information?.address}</Text>
          <Flex gap={fr(2)}>
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
        {/* <Divider /> */}
        <List>
          <List.Item
            justify='around'
            fs={isTablet ? 'md' : isMobile ? 'sm' : 'lg'}
            py={fr(2)}
            fw={'semibold'}
          >
            <Text mr={isMobile ? fr(0) : fr(4)}>STT</Text>
            <Text w={isTablet ? fr(60) : isMobile ? fr(35) : fr(86)}>
              Sản phẩm
            </Text>
            <Text>Giá</Text>
            <Text>Số lượng</Text>
            <Text>Tạm tính</Text>
          </List.Item>
          <Divider />
          {cart?.map((item, index) => (
            <Box key={index}>
              <List.Item
                justify='around'
                py={fr(2)}
                align='center'
                fs={isTablet ? 'md' : isMobile ? 'sm' : 'lg'}
              >
                <Text>{index + 1}</Text>
                <Flex
                  align='center'
                  w={isTablet ? fr(60) : isMobile ? 'fit-content' : fr(86)}
                >
                  <Image
                    src={item.image}
                    w={isTablet ? fr(16) : isMobile ? fr(10) : fr(20)}
                    h={isTablet ? fr(16) : isMobile ? fr(10) : fr(20)}
                    alt={item.title}
                    br={'lg'}
                  />
                  <Box>
                    <Text>{item.title}</Text>
                    <Box>
                      <Text>
                        {item.optionList[0].title} -{' '}
                        {item.optionList[0].selected}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
                <Text>{item.price.toLocaleString('vi-VN')}đ</Text>
                <Text>{item.quantity}</Text>
                <Text>
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </Text>
              </List.Item>
              <Divider />
            </Box>
          ))}
        </List>
        <Flex
          direction='column'
          align='end'
          fs={isMobile ? 'base' : 'lg'}
          gap={fr(2)}
          my={fr(2)}
        >
          <Text>Tổng cộng: {subTotal.toLocaleString('vi-VN')}đ</Text>
          <Text>
            Phí vận chuyển: {information.delivery.toLocaleString('vi-VN')}đ
          </Text>
          <Text>
            Mã giảm giá: {-String(information.voucher).toLocaleString('vi-VN')}đ
          </Text>
          <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
            Tổng thanh toán: {total.toLocaleString('vi-VN')}đ
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default OrderInvoice
