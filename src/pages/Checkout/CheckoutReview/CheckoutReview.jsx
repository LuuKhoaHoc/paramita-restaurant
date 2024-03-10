import { Bank, Money, PiggyBank } from '@phosphor-icons/react'
import {
  Button,
  Center,
  Dialog,
  Flex,
  Icon,
  Image,
  Text,
  fr
} from '@prismane/core'
import React, { useContext, useState } from 'react'
import { CartContext } from '~/contexts/CartContext'
import { LogoIcon } from '~/images'
import { useResponsive } from '~/utils/responsive'

import { gql, useMutation } from '@apollo/client'

const CREATE_ORDER = gql`
  mutation createOrder($data: OrderInput!) {
    createOrder(data: $data) {
      order_id
      customer {
        customer_id
        name
      }
      status
      address
      shippingMethod
      shippingFee
      paymentStatus
      orderDetails {
        item {
          item_id
        }
        quantity
        price
        total
      }
    }
  }
`

const CheckoutReview = ({ customer }) => {
  // responsive
  const { isTablet, isMobile } = useResponsive()
  // Tạo order lưu vào Db
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER)
  // Lấy cartItems và clearCart từ CartContext
  const { cartItems, clearCart } = useContext(CartContext)
  // Lấy thông tin người dùng từ sessionStorage
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )
  // Tính tổng tiền
  const totalPrice =
    cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0) + checkoutInformation?.delivery
  // Tạo state open để mở dialog
  const [open, setOpen] = useState(false)
  // Hàm xử lý khi người dùng nhấn đặt hàng
  const handleInformation = () => {
    if (
      !checkoutInformation?.name ||
      !checkoutInformation?.phone ||
      !checkoutInformation?.payment ||
      !checkoutInformation?.address
    ) {
      setOpen(true)
    } else {
      // localStorage.setItem(
      //   'orders',
      //   JSON.stringify([
      //     {
      //       cart: cartItems,
      //       information: checkoutInformation,
      //       totalPrice: totalPrice
      //     }
      console.log('🚀 ~ handleInformation ~ totalPrice:', totalPrice)
      console.log(
        '🚀 ~ handleInformation ~ checkoutInformation:',
        checkoutInformation
      )
      console.log('🚀 ~ handleInformation ~ cartItems:', cartItems)
      //   ])
      // )
      // localStorage.setItem('orderSuccess', 'true')
      // sessionStorage.setItem(
      //   'checkout-information',
      //   JSON.stringify({
      //     address: '',
      //     payment: 'tien-mat',
      //     notes: '',
      //     delivery: 15000,
      //     voucher: 0
      //   })
      // )
      // clearCart()
      // window.location.href = '/checkout-success'
    }
  }
  return (
    <>
      <Dialog
        w={!isTablet && !isMobile ? fr(96) : '60vw'}
        open={open}
        onClose={() => setOpen(false)}
        closable
      >
        <Dialog.Header>
          <Text fs={'xl'} className='GeomanistMedium-font' cl={'primary'}>
            Cảnh báo!
          </Text>
        </Dialog.Header>
        <Text fs='lg'>Vui lòng điền đầy đủ thông tin trước khi đặt hàng!!</Text>
        <Dialog.Footer>
          <Button variant='tertiary' className='GeomanistMedium-font'>
            Xác nhận
          </Button>
        </Dialog.Footer>
      </Dialog>
      <Center direction='column' w={'100%'} gap={fr(5)} my={fr(4)}>
        <Image
          src={LogoIcon}
          alt='logo'
          w={isTablet ? fr(32) : fr(40)}
          h={isTablet ? fr(32) : fr(40)}
          fit='cover'
          bsh={'md'}
          br={'full'}
        />
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Xác nhận đơn hàng
        </Text>
        <Flex w={'80%'} direction='column'>
          <Flex direction='column'>
            <Text as={'small'} cl={'base'} className='GeomanistMedium-font'>
              Thông tin người nhận
            </Text>
            <Text fs={'md'} ta={'center'}>
              Tên người nhận: {checkoutInformation?.name}
            </Text>
            <Text fs={'md'} ta={'center'}>
              Số điện thoại: {checkoutInformation?.phone}
            </Text>
            <Text fs={'md'} ta={'center'}>
              Ghi chú: {checkoutInformation?.notes}
            </Text>
          </Flex>

          <Flex direction='column'>
            <Text as={'small'} cl={'base'} className='GeomanistMedium-font'>
              Thanh toán
            </Text>
            <Flex justify='center' align='center' gap={fr(4)}>
              <Icon size={fr(8)}>
                {
                  {
                    'mo-mo': <PiggyBank />,
                    'tien-mat': <Money />,
                    'ngan-hang': <Bank />
                  }[checkoutInformation?.payment]
                }
              </Icon>
              <Text fs={'md'}>
                {
                  {
                    'mo-mo': 'Thanh toán qua MoMo',
                    'tien-mat': 'Thanh toán khi nhận hàng',
                    'ngan-hang': 'Thanh toán qua ngân hàng'
                  }[checkoutInformation?.payment]
                }
              </Text>
            </Flex>
          </Flex>
          <Flex direction='column'>
            <Text as={'small'} cl={'base'} className='GeomanistMedium-font'>
              Vận chuyển
            </Text>
            <Text fs={'md'} ta={'center'}>
              {checkoutInformation?.address}
            </Text>
          </Flex>
        </Flex>
        <Button
          size='lg'
          br={'full'}
          variant='secondary'
          className='GeomanistMedium-font'
          onClick={() => handleInformation()}
        >
          Đặt hàng
        </Button>
      </Center>
    </>
  )
}

export default CheckoutReview
