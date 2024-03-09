import { Pen, ShoppingCart } from '@phosphor-icons/react'
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
import { CountDown } from '~/components'
import { CartContext } from '~/contexts/CartContext'
import { LogoIcon } from '~/images'
import { useResponsive } from '~/utils/responsive'
const CheckoutCart = () => {
  const navigate = useNavigate()
  const { isTablet, isMobile, isLaptop } = useResponsive()
  const [openModal, setOpenModal] = useState(false)
  const [voucherInput, setVoucherInput] = useState('')
  const [voucherSelected, setVoucherSelected] = useState('no')
  const { cartItems, removeCartItem } = useContext(CartContext)
  if (cartItems?.length === 0) {
    setTimeout(() => {
      navigate('/order-online')
    }, 5000)
  }
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closable
        w={isMobile ? '90%' : isTablet ? '80%' : '35vw'}
      >
        <Modal.Header>
          <Text className='GeomanistMedium-font'>Chọn Paramita Voucher</Text>
        </Modal.Header>
        <Center gap={fr(2)}>
          <TextField
            grow
            placeholder='Nhập mã paramita voucher'
            value={voucherInput}
            onChange={(e) => setVoucherInput(e.target.value)}
          />
          <Button variant='primary' size='md'>
            Áp dụng
          </Button>
        </Center>
        <Stack>
          <Flex align='center' br={fr(3)} bsh={'lg'} mt={fr(4)}>
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
                Giảm ngay 5% tối đa đ100k
              </Text>
              <Text cl={'gray'}>Đơn tối thiểu: đ0</Text>
              <Flex>
                <Text cl={['gray', 400]}>Hết hạn: 13.03.2024</Text>
                <Button variant='text' cl={['blue', 500]}>
                  Điều kiện
                </Button>
              </Flex>
            </Flex>
            <Radio.Group
              name='answer'
              value={voucherSelected}
              onChange={(e) => setVoucherSelected(e.target.value)}
              ml={'auto'}
              mr={fr(4)}
            >
              <Radio value='yes' />
            </Radio.Group>
          </Flex>
        </Stack>
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
          Tổng cộng
        </Text>
        <Flex justify='between'>
          <Text>Tạm tính</Text>
          <Text>
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toLocaleString('vi-VN')}
            đ
          </Text>
        </Flex>
        <Divider />
        <Flex justify='between'>
          <Text>Phí giao hàng</Text>
          <Text>{checkoutInformation?.delivery.toLocaleString('vi-VN')}đ</Text>
        </Flex>
        <Divider />
        <Flex>
          <Button variant='text' onClick={() => setOpenModal(true)}>
            Khuyến mãi
          </Button>
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
            Thành tiền
          </Text>
          <Text
            as={'h3'}
            fs={isTablet ? 'base' : 'inherit'}
            className='GeomanistLight-font'
          >
            {(
              cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ) + checkoutInformation?.delivery
            ).toLocaleString('vi-VN')}
            đ
          </Text>
        </Flex>
      </Stack>
    </>
  )
}

export default CheckoutCart
