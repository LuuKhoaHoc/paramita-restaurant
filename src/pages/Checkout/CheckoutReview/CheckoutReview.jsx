import { Bank, Money, PiggyBank } from '@phosphor-icons/react'
import {
  Backdrop,
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
    }
  }
`
const CREATE_ORDER_DETAIL = gql`
  mutation createOrderDetail($data: OrderDetailInput!) {
    createOrderDetail(data: $data) {
      order_detail_id
    }
  }
`
const UPDATE_VOUCHER = gql`
  mutation updateVoucherStatus($id: Int!, $status: String!) {
    updateVoucherStatus(id: $id, status: $status) {
      voucher_id
    }
  }
`

const CheckoutReview = ({ customer }) => {
  // responsive
  const { isTablet, isMobile } = useResponsive()
  const [open, setOpen] = useState(false)
  const [showQR, setShowQR] = useState(false)

  // Tạo order lưu vào Db
  const [createOrder, { loading, error, data }] = useMutation(CREATE_ORDER)
  // Tạo order detail lưu vào Db
  const [
    createOrderDetail,
    { loading: loadingOrderDetail, error: errorOrderDetail }
  ] = useMutation(CREATE_ORDER_DETAIL)
  // Sau khi order thành công update voucher sang `đã sử dụng`
  const [updateVoucherStatus, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_VOUCHER)

  // Lấy cartItems và clearCart từ CartContext
  const { cartItems, clearCart } = useContext(CartContext)
  // Lấy thông tin người dùng từ sessionStorage
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )
  const cart = JSON.parse(sessionStorage.getItem('cartItems'))
  const discountPrice = JSON.parse(sessionStorage.getItem('discount-price'))
  // Tính tổng tiền
  const totalPrice =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    checkoutInformation?.delivery -
    discountPrice
  // Hàm xử lý khi người dùng nhấn đặt hàng
  const handleInformation = async () => {
    if (
      !checkoutInformation?.name ||
      !checkoutInformation?.phone ||
      !checkoutInformation?.payment ||
      !checkoutInformation?.address
    ) {
      setOpen(true)
    } else if (checkoutInformation?.payment === 'ngan-hang') {
      setShowQR(true)
    } else {
      const { data: dataOrder } = await createOrder({
        variables: {
          data: {
            customerId: customer?.customer_id,
            status: 'Chờ xác nhận',
            address: checkoutInformation?.address,
            transportFee: checkoutInformation?.delivery,
            paymentMethod: checkoutInformation?.payment,
            paymentStatus: 'Chưa thanh toán',
            voucherId: checkoutInformation?.voucherId,
            total: totalPrice,
            note: checkoutInformation?.notes
          }
        }
      })

      const orderId = dataOrder?.createOrder?.order_id

      const promises = cart.map((item) =>
        createOrderDetail({
          variables: {
            data: {
              orderId,
              itemId: item.id,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity
            }
          }
        })
      )

      await Promise.all(promises)

      if (checkoutInformation?.voucherId) {
        await updateVoucherStatus({
          variables: {
            id: checkoutInformation?.voucherId,
            status: 'Đã sử dụng'
          }
        })
      }

      sessionStorage.setItem('orderSuccess', 'true')
      sessionStorage.setItem(
        'checkout-information',
        JSON.stringify({
          address: '',
          payment: 'tien-mat',
          notes: '',
          delivery: 15000
          // voucherId: null
        })
      )
      clearCart()
      sessionStorage.removeItem('discount-price')
      sessionStorage.removeItem('cartItems')
      window.location.href = '/checkout-success'
    }
  }
  return (
    <>
      {showQR && (
        <Backdrop onClick={() => setShowQR(false)}>
          <Image
            src={`https://img.vietqr.io/image/TIMO-9037041007871-print.png?amount=${totalPrice}&addInfo=Thanh%20toan%20QR&accountName=LUU%20KHOA%20HOC`}
            alt='thanh toán QR code'
          />
        </Backdrop>
      )}
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
