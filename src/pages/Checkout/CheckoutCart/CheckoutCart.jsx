import { ArrowLeft, Pen, ShoppingCart } from '@phosphor-icons/react'
import {
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  List,
  Modal,
  Radio,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CountDown, Loading } from '~/components'
import { CartContext } from '~/contexts/CartContext'
import { LogoIcon } from '~/images'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'
import timestampToDateTime from '~/utils/timeStampToDateTime'

const GET_VOUCHERS = gql`
  query {
    voucherList {
      voucher_id
      tsid
      customer {
        customer_id
      }
      name
      code
      description
      discount
      expired_date
      min_spend
      status
    }
  }
`

const GET_VOUCHER = gql`
  query getVoucher($voucherId: Int!) {
    voucher(id: $voucherId) {
      voucher_id
      tsid
      customer {
        customer_id
      }
      name
      code
      description
      discount
      expired_date
      min_spend
      max_discount
      status
    }
  }
`

const CheckoutCart = () => {
  // use route to navigate
  const navigate = useNavigate()
  // responsive
  const { isTablet, isMobile, isLaptop } = useResponsive()
  // state
  const [openModal, setOpenModal] = useState(false)
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [voucherDetail, setVoucherDetail] = useState({})
  const [voucherInput, setVoucherInput] = useState('')
  const [selectedVoucherId, setSelectedVoucherId] = useState(null)
  // cart context
  const { cartItems, removeCartItem } = useContext(CartContext)
  // query to DB
  const { loading, error, data } = useQuery(GET_VOUCHERS)
  const {
    loading: loadingVoucher,
    error: errorVoucher,
    data: dataVoucher
  } = useQuery(GET_VOUCHER, {
    variables: {
      voucherId: selectedVoucherId
    }
  })
  if (loading) return <Loading />
  if (error) return console.log(error.message)
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )

  // call data from DB
  const voucherList = data?.voucherList
  const voucher = dataVoucher?.voucher
  // store total price to variable
  let totalPrice =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    checkoutInformation?.delivery
  // store discount price to variable
  let discountPrice = (totalPrice * voucher?.discount) / 100
  discountPrice = Math.min(discountPrice, voucher?.max_discount * 1000)
  sessionStorage.setItem('discount-price', discountPrice || 0)
  // func to convert timestamp to datetime
  const startTime =
    voucherDetail?.tsid && timestampToDateTime(+voucherDetail.tsid)
  const endTime =
    voucherDetail?.expired_date &&
    voucherDetail.expired_date.split('-').reverse().join('.')
  // check if cartItems is empty
  if (
    cartItems?.length === 0 ||
    sessionStorage.getItem('cartItems').length === 0
  ) {
    setTimeout(() => {
      navigate('/order-online')
    }, 5000)
  }
  function handleApplyVoucher() {
    const foundVoucher = voucherList.find((item) => item.code === voucherInput)
    if (foundVoucher) {
      setSelectedVoucherId(foundVoucher.voucher_id)
      checkoutInformation.voucherId = foundVoucher.voucher_id
      sessionStorage.setItem(
        'checkout-information',
        JSON.stringify(checkoutInformation)
      )
      setOpenModal(false)
    }
  }
  function handleSelectVoucher(id) {
    setSelectedVoucherId(id)
    checkoutInformation.voucherId = id
    sessionStorage.setItem(
      'checkout-information',
      JSON.stringify(checkoutInformation)
    )
  }
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closable
        w={isMobile ? '90%' : isTablet ? '80%' : '35vw'}
      >
        <Modal.Header>
          <Text className='GeomanistBold-font' fs={'lg'}>
            Chọn Paramita Voucher
          </Text>
        </Modal.Header>
        <Center gap={fr(2)} mb={fr(2)}>
          <TextField
            grow
            placeholder='Nhập mã giảm giá paramita'
            value={voucherInput}
            onChange={(e) => setVoucherInput(e.target.value)}
          />
          <Button variant='primary' size='md' onClick={handleApplyVoucher}>
            Áp dụng
          </Button>
        </Center>
        <Stack>
          <Flex wrap='wrap' direction='column' mt={fr(2)} gap={fr(4)}>
            {voucherList?.map((item) => {
              const expiredDate = new Date(
                item.expired_date
              ).toLocaleDateString()
              const isSelected = item.voucher_id === selectedVoucherId

              return (
                <Flex
                  key={item.voucher_id}
                  align='center'
                  br={fr(2)}
                  bsh={'lg'}
                  sx={{
                    borderRadius: fr(2),
                    border: isSelected ? '2px solid #1089ff' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleSelectVoucher(item.voucher_id)}
                >
                  <Center
                    direction='column'
                    p={fr(4)}
                    bg={isSelected ? 'primary' : 'white'}
                    gap={fr(1)}
                  >
                    <Image
                      src={LogoIcon}
                      alt='paramita-icon'
                      w={fr(12)}
                      h={fr(12)}
                    />
                    <Text cl={isSelected ? 'white' : 'gray'}>
                      {isSelected ? 'Paramita' : 'Paramita'}
                    </Text>
                  </Center>
                  <Flex
                    direction='column'
                    ml={fr(2)}
                    fs={isLaptop ? 'base' : 'sm'}
                  >
                    <Text fs={'md'} className='GeomanistMedium-font'>
                      {item.name}
                    </Text>
                    <Text cl={'gray'}>Đơn tối thiểu: đ{item.min_spend}</Text>
                    <Flex>
                      <Text cl={'gray'}>Hết hạn: {expiredDate}</Text>
                      <Text
                        cl={isSelected ? ['blue', 500] : 'gray'}
                        px={fr(4)}
                        fs={'base'}
                        onClick={() => {
                          setVoucherDetail(item)
                          setOpenModalDetail(true)
                        }}
                      >
                        Chi tiết
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
        </Stack>
      </Modal>
      <Modal
        open={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        w={isMobile ? '90%' : isTablet ? '80%' : '50vw'}
      >
        <Modal.Header justify='center' align='center'>
          <Icon
            size={isMobile ? 'md' : 'lg'}
            cs={'pointer'}
            cl={'primary'}
            onClick={() => {
              setOpenModalDetail(false)
            }}
          >
            <ArrowLeft />
          </Icon>
          <Text className='GeomanistBold-font' fs={'lg'} mx={'auto'}>
            Chi tiết Mã giảm giá
          </Text>
        </Modal.Header>
        <Center>
          <Flex align='center' br={fr(3)} bsh={'lg'} mt={fr(2)} pr={fr(4)}>
            <Center
              direction='column'
              p={fr(4)}
              bg={'primary'}
              gap={fr(1)}
              sx={{
                borderTopLeftRadius: fr(3),
                borderBottomLeftRadius: fr(3)
              }}
            >
              <Image src={LogoIcon} alt='paramita-icon' w={fr(12)} h={fr(12)} />
              <Text cl={'white'}>Paramita</Text>
            </Center>
            <Flex direction='column' ml={fr(2)} fs={isLaptop ? 'base' : 'sm'}>
              <Text fs={'md'} className='GeomanistMedium-font'>
                {voucherDetail.name}
              </Text>
              <Text cl={'gray'}>Đơn tối thiểu: đ{voucherDetail.min_spend}</Text>
              <Text cl={['gray', 400]}>Hết hạn: {endTime}</Text>
            </Flex>
          </Flex>
        </Center>
        <List gap={fr(4)} mt={fr(4)}>
          <List.Item direction='column' align='start' fs={'md'}>
            <Text className='GeomanistMedium-font' fw={'bold'}>
              Hạn sử dụng mã
            </Text>
            <Text fs={'md'} cl={['gray', 500]}>
              {startTime + '-' + endTime}
            </Text>
          </List.Item>
          <List.Item direction='column' align='start'>
            <Text className='GeomanistMedium-font' fw={'bold'}>
              Phương thức thanh toán
            </Text>
            <Text fs={'md'} cl={['gray', 500]}>
              Mọi hình thức thanh toán
            </Text>
          </List.Item>
          <List.Item direction='column' align='start'>
            <Text className='GeomanistMedium-font' fw={'bold'}>
              Mô tả
            </Text>
            <Text fs={'md'} cl={['gray', 500]}>
              {voucherDetail.description}
            </Text>
          </List.Item>
        </List>
      </Modal>
      <Flex w={'100%'} justify='between' align='center'>
        <Center my={fr(4)}>
          <Icon size={fr(8)} cl={'primary'}>
            <ShoppingCart weight='fill' />
          </Icon>
          <Text fs={'lg'}>Giỏ hàng</Text>
        </Center>
        <Button
          as={Link}
          to={'/order-online'}
          br={'full'}
          variant='secondary'
          my={fr(4)}
          size={isTablet ? 'sm' : 'base'}
        >
          Thêm món
        </Button>
      </Flex>
      <List grow>
        {cartItems.length === 0 && (
          <Center direction='column'>
            <Text fs={'lg'} as={'p'}>
              Giỏ hàng trống
            </Text>
            <Text as={'p'} fs={'md'}>
              Đang quay lại trang đặt hàng
            </Text>
            <Text as={'p'} fs={'md'}>
              Còn lại <CountDown seconds={5} />
            </Text>
          </Center>
        )}
        {cartItems?.map((item, index) => (
          <List.Item key={index} p={fr(2)} w={'100%'}>
            <Button
              variant='text'
              icon={<Pen />}
              as={Link}
              to={'/cart'}
              p={fr(1)}
            />
            <Text fs={isTablet ? 'md' : 'lg'} ml={fr(4)}>
              {item.quantity} x {item.title}
              <Button variant='text' onClick={() => removeCartItem(item.title)}>
                Xoá
              </Button>
            </Text>
            <Text ml={'auto'} fs={isTablet ? 'md' : 'lg'}>
              {item.price.toLocaleString('vi-VN')}đ
            </Text>
            <Center></Center>
          </List.Item>
        ))}
      </List>
      <Stack direction='column' w={'100%'} justify='end'>
        <Divider />
        <Text
          fs={isTablet ? 'md' : 'xl'}
          className='GeomanistMedium-font'
          cl={'primary'}
          m={fr(4)}
          pos={['relative', { ':before': 'absolute' }]}
          sx={{
            '&::before': {
              content: '',
              width: '15%',
              height: '2px',
              borderRadius: '2px',
              backgroundColor: '#39b54a',
              bottom: -5,
              left: 0
            }
          }}
        >
          Chi tiết thanh toán
        </Text>
        <Flex justify='between'>
          <Text>Tổng tiền hàng</Text>
          <Text>
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toLocaleString('vi-VN')}
            đ
          </Text>
        </Flex>
        <Divider />
        <Flex justify='between'>
          <Text>Tổng phí vận chuyển</Text>
          <Text>{checkoutInformation?.delivery.toLocaleString('vi-VN')}đ</Text>
        </Flex>
        <Divider />
        <Flex>
          <Button variant='text' onClick={() => setOpenModal(true)}>
            Khuyến mãi
          </Button>
          {discountPrice > 0 && (
            <Text ml={'auto'}>-{discountPrice.toLocaleString('vi-VN')}đ</Text>
          )}
        </Flex>
        <Flex
          bg={'primary'}
          justify='between'
          w={'100%'}
          mx={fr(-4)}
          px={fr(4)}
          py={isTablet ? fr(3) : fr(5)}
          cl={'#fff'}
          sx={{
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px'
          }}
        >
          <Text
            as={'h3'}
            fs={isTablet ? 'base' : 'inherit'}
            className='GeomanistLight-font'
          >
            Tổng thanh toán
          </Text>
          <Text
            as={'h3'}
            fs={isTablet ? 'base' : 'inherit'}
            className='GeomanistLight-font'
          >
            {discountPrice
              ? (totalPrice - discountPrice).toLocaleString('vi-VN')
              : totalPrice.toLocaleString('vi-VN')}
            đ
          </Text>
        </Flex>
      </Stack>
    </>
  )
}

export default CheckoutCart
