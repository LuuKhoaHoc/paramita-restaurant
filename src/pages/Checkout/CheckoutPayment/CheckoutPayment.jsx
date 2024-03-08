import { Bank, Money, PiggyBank } from '@phosphor-icons/react'
import {
  Center,
  Flex,
  Form,
  Icon,
  Radio,
  Text,
  TextField,
  TextareaField,
  fr
} from '@prismane/core'
import React, { useEffect, useState } from 'react'
import { useResponsive } from '~/utils/responsive'

const CheckoutPayment = ({ customer }) => {
  console.log('🚀 ~ CheckoutPayment ~ customer:', customer)
  const { isTablet, isMobile } = useResponsive()
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )

  const [name, setName] = useState(checkoutInformation.name || customer?.name)
  const [phone, setPhone] = useState(
    checkoutInformation.phone || customer?.phone
  )
  const [notes, setNotes] = useState(checkoutInformation.notes)
  const [paymentMethod, setPaymentMethod] = useState(
    checkoutInformation.payment
  )
  useEffect(() => {
    checkoutInformation.name = name
    checkoutInformation.phone = phone
    checkoutInformation.notes = notes
    checkoutInformation.payment = paymentMethod
    sessionStorage.setItem(
      'checkout-information',
      JSON.stringify(checkoutInformation)
    )
  }, [name, phone, notes, paymentMethod])
  return (
    <Flex w={'100%'} p={fr(8)} direction='column'>
      <Text
        fs={isTablet ? 'md' : 'lg'}
        className='GeomanistMedium-font'
        cl={'primary'}
        mb={fr(4)}
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
        Thông tin người nhận
      </Text>
      <Form>
        <TextField
          variant='underlined'
          placeholder='Tên người nhận'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant='underlined'
          placeholder='SĐT người nhận'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextareaField
          maxLength={120}
          variant='underlined'
          placeholder='Ghi chú thêm'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Form>
      <Text
        fs={isTablet ? 'md' : 'lg'}
        className='GeomanistMedium-font'
        cl={'primary'}
        my={fr(4)}
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
        Phương thức thanh toán
      </Text>
      <Radio.Group
        direction='column'
        w={!isMobile && !isTablet ? '50%' : '100%'}
        gap={fr(5)}
        name='answer'
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <Center w={'100%'} fs={isTablet ? 'base' : 'lg'} justify='between'>
          <Radio value='tien-mat' />
          <Icon size={fr(8)}>
            <Money />
          </Icon>
          <Text w={fr(20)}>Tiền mặt</Text>
        </Center>
        <Center w={'100%'} fs={isTablet ? 'base' : 'lg'} justify='between'>
          <Radio value='mo-mo' />
          <Icon size={fr(8)}>
            <PiggyBank />
          </Icon>
          <Text w={fr(20)}>Momo</Text>
        </Center>
        <Center w={'100%'} fs={isTablet ? 'base' : 'lg'} justify='between'>
          <Radio value='ngan-hang' />
          <Icon size={fr(8)}>
            <Bank />
          </Icon>
          <Text w={fr(20)}>Ngân hàng</Text>
        </Center>
      </Radio.Group>
    </Flex>
  )
}

export default CheckoutPayment
