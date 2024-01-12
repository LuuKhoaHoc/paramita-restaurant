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

const CheckoutReview = () => {
  // Lấy cartItems và clearCart từ CartContext
  const { cartItems, clearCart } = useContext(CartContext)
  // Lấy thông tin người dùng từ sessionStorage
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )
  // Tính tổng tiền
  const totalPrice =
    cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity * 1000
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
      localStorage.setItem(
        'orders',
        JSON.stringify([
          {
            cart: cartItems,
            information: checkoutInformation,
            totalPrice: totalPrice
          }
        ])
      )
      localStorage.setItem('orderSuccess', 'true')
      sessionStorage.setItem(
        'checkout-information',
        JSON.stringify({
          address: '',
          name: 'paramita',
          phone: '0987654321',
          payment: 'tien-mat',
          notes: '',
          delivery: 15000,
          voucher: 0
        })
      )
      clearCart()
      window.location.href = '/checkout-success'
    }
  }
  return (
    <>
      <Dialog w={fr(96)} open={open} onClose={() => setOpen(false)} closable>
        <Dialog.Header>
          <Text fs={'xl'} ff={'GeomanistMedium'} cl={'primary'}>
            Cảnh báo!
          </Text>
        </Dialog.Header>
        <Text fs='lg'>Vui lòng điền đầy đủ thông tin trước khi đặt hàng!!</Text>
        <Dialog.Footer>
          <Button variant='tertiary' ff={'GeomanistMedium'}>
            Xác nhận
          </Button>
        </Dialog.Footer>
      </Dialog>
      <Center direction='column' w={'100%'} gap={fr(5)}>
        <Image
          src={LogoIcon}
          alt='logo'
          w={fr(40)}
          h={fr(40)}
          fit='cover'
          bsh={'md'}
          br={'full'}
        />
        <Text ff={'GeomanistMedium'} fs={'xl'}>
          Xác nhận đơn hàng
        </Text>
        <Flex w={'80%'} direction='column'>
          <Flex direction='column'>
            <Text as={'p'} ff={'GeomanistMedium'}>
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
            <Text as={'p'} ff={'GeomanistMedium'}>
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
            <Text as={'p'} ff={'GeomanistMedium'}>
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
          ff={'GeomanistMedium'}
          onClick={() => handleInformation()}
        >
          Đặt hàng
        </Button>
      </Center>
    </>
  )
}

export default CheckoutReview
