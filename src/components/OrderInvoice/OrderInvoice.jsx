import React from 'react'
import { Flex, Text, Box, Divider, List, Image, fr } from '@prismane/core'
import { useResponsive } from '~/utils/responsive'

const OrderInvoice = ({ customer, order }) => {
  console.log('🚀 ~ OrderInvoice ~ order:', order)
  const cart_price = order.order_details.reduce(
    (acc, item) => acc + item.total_price,
    0
  )
  const discount_price = cart_price + order.transport_fee - order.total_price
  console.log('🚀 ~ OrderInvoice ~ discount_price:', discount_price)
  const { isTablet, isMobile } = useResponsive()
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
          <Text>Mã đơn hàng: #{order.tsid}</Text>
          <Text>Tên khách hàng: {order?.customer.name}</Text>
          <Text>Số điện thoại: {order?.customer.phone}</Text>
          <Text>Địa chỉ giao hàng: {order?.delivery_address}</Text>
          <Flex gap={fr(2)}>
            <Text>Phương thức thanh toán: </Text>
            <Text>
              {
                {
                  'mo-mo': 'MoMo',
                  'tien-mat': 'Tiền mặt',
                  'ngan-hang': 'ngân hàng'
                }[order?.payment_method]
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
          {order?.order_details.map((item, index) => {
            return (
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
                      src={item?.item?.image}
                      w={isTablet ? fr(16) : isMobile ? fr(10) : fr(20)}
                      h={isTablet ? fr(16) : isMobile ? fr(10) : fr(20)}
                      alt={item?.item?.name}
                      br={'lg'}
                    />
                    <Box>
                      <Text>{item?.item?.name}</Text>
                    </Box>
                  </Flex>
                  <Text>{item?.unit_price.toLocaleString('vi-VN')}đ</Text>
                  <Text>{item?.quantity}</Text>
                  <Text>{item?.total_price.toLocaleString('vi-VN')}đ</Text>
                </List.Item>
                <Divider />
              </Box>
            )
          })}
        </List>
        <Text>Ghi chú: {order?.note}</Text>
        <Flex
          direction='column'
          align='end'
          fs={isMobile ? 'base' : 'lg'}
          gap={fr(2)}
          my={fr(2)}
        >
          <Text>Tổng cộng: {cart_price.toLocaleString('vi-VN')}đ</Text>
          <Text>
            Phí vận chuyển: {order?.transport_fee?.toLocaleString('vi-VN')}đ
          </Text>
          <Text>Mã giảm giá: -{discount_price.toLocaleString('vi-VN')}đ</Text>
          <Text fs={isMobile ? 'md' : 'xl'} cl={'primary'}>
            Tổng thanh toán: {order?.total_price.toLocaleString('vi-VN')}đ
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default OrderInvoice
