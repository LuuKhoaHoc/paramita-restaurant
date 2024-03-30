import { MagnifyingGlass, Plus, X } from '@phosphor-icons/react'
import {
  Button,
  Card,
  Center,
  Circle,
  Flex,
  Form,
  Image,
  Modal,
  NumberField,
  Skeleton,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useEffect, useState } from 'react'
import { useForm, useSearch } from '@prismane/core/hooks'
import { useMutation, useQuery } from '@apollo/client'
import { GET_MENU } from '~/pages/Admin/Menu/schema'
import { GET_CUSTOMER_BY_PHONE } from '~/pages/Admin/Reservation/schema'

const AddOrderModal = ({ openModal, setOpenModal }) => {
  const [addedItems, setAddedItems] = useState(
    sessionStorage.getItem('order-cart')
      ? JSON.parse(sessionStorage.getItem('order-cart'))
      : []
  )
  const { loading, error: errorMenu, data: dataMenu } = useQuery(GET_MENU)
  const { query, setQuery, filtered } = useSearch(dataMenu?.menuList || [])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [submitPhone, setSubmitPhone] = useState('')

  const {
    data: customer,
    loading: loadingCustomer,
    error: errorCustomer
  } = useQuery(GET_CUSTOMER_BY_PHONE, {
    variables: {
      phone: submitPhone
    }
  })

  // total price
  let totalPrice = addedItems.reduce((acc, item) => {
    return acc + item.price * item.quantity * 1000
  }, 0)

  // func handle add item
  const addItem = (item) => {
    let cart = JSON.parse(sessionStorage.getItem('order-cart') || '[]')
    const existItem = cart.find((c) => c.item_id === item.item_id)
    if (existItem) {
      existItem.quantity++
    } else {
      cart.push({
        item_id: item.item_id,
        name: item.name,
        price: item.price,
        quantity: 1
      })
    }
    setAddedItems(cart)
    sessionStorage.setItem('order-cart', JSON.stringify(cart))
  }
  // func handle update quantity
  const handleUpdateQuantity = (item, value) => {
    let cart = JSON.parse(sessionStorage.getItem('order-cart') || '[]')
    cart = cart.map((c) => {
      if (c.item_id === item.item_id) {
        c.quantity = +value
      }
      return c
    })
    setAddedItems(cart)
    sessionStorage.setItem('order-cart', JSON.stringify(cart))
  }
  // func handle delete item
  const handleDeleteItem = (item) => {
    let cart = JSON.parse(sessionStorage.getItem('order-cart') || '[]')
    cart = cart.filter((c) => c.item_id !== item.item_id)
    setAddedItems(cart)
    sessionStorage.setItem('order-cart', JSON.stringify(cart))
  }

  return (
    <Modal
      w={'90vw'}
      open={openModal}
      onClose={() => setOpenModal(false)}
      closable
      cl={(theme) => (theme.mode === 'dark' ? '#fff' : '#000')}
    >
      <Modal.Header>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Thêm đơn hàng
        </Text>
      </Modal.Header>
      <Stack gap={fr(4)} direction='row'>
        <Flex w={'70%'} direction='column'>
          <Flex align='center'>
            <Text fs={'xl'} mr={'auto'}>
              Danh sách món ăn
            </Text>
            <TextField
              // size='xs'
              placeholder='Tìm kiếm...'
              value={query || ''}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Flex>
          <Stack
            w={'100%'}
            h={'55vh'}
            bd={'3px solid'}
            bdc={'primary'}
            br={'md'}
            bsh={'inner'}
            of={'auto'}
          >
            <Flex direction='row' wrap='wrap' gap={fr(3)}>
              {loading && <Skeleton w={fr(50)} h={fr(16)} />}
              {filtered?.map((item) => {
                return (
                  <Card
                    key={item?.item_id}
                    direction='row'
                    miw={fr(50)}
                    w={'calc(33.33% - 48px)'}
                    h={fr(16)}
                    gap={fr(4)}
                    align='center'
                  >
                    <Image
                      src='https://picsum.photos/200/300'
                      alt='món-ăn'
                      miw={fr(18)}
                      h={fr(18)}
                      br={'md'}
                    />
                    <Flex direction='column' fs={'lg'}>
                      <Text>{item?.name}</Text>
                      <Text fs={'md'} cl={['gray', 400]}>
                        {(item?.price * 1000).toLocaleString('vi-VN')}đ
                      </Text>
                    </Flex>
                    <Button
                      variant='secondary'
                      ml={'auto'}
                      br={'full'}
                      icon={<Plus />}
                      onClick={() => {
                        addItem(item)
                      }}
                    />
                  </Card>
                )
              })}
            </Flex>
          </Stack>
        </Flex>
        <Flex w={'30%'} mah={'60vh'} direction='column'>
          <Text fs={'xl'} mb={fr(2)}>
            Các món đã chọn
          </Text>
          <Flex
            mih={'53vh'}
            bd={'3px solid'}
            bdc={'primary'}
            p={fr(2)}
            br={'md'}
            bsh={'inner'}
            gap={fr(2)}
            direction='column'
            of={'auto'}
          >
            {addedItems.map((item) => {
              return (
                <Card
                  key={item.item_id}
                  direction='row'
                  mih={fr(8)}
                  gap={fr(4)}
                  align='center'
                >
                  <Circle
                    size={22}
                    bg={[['slate', 300], { hover: 'primary' }]}
                    cl={[
                      (theme) => (theme.mode === 'dark' ? '#fff' : '#000'),
                      { hover: 'white' }
                    ]}
                    cs={'pointer'}
                    onClick={() => handleDeleteItem(item)}
                  >
                    <X />
                  </Circle>
                  <Flex direction='column'>
                    <Text fs={'md'}>{item?.name}</Text>
                    <Text cl={['gray', 400]}>
                      {(item?.price * 1000).toLocaleString('vi-VN')}đ
                    </Text>
                  </Flex>
                  <NumberField
                    min={1}
                    max={99}
                    variant='underlined'
                    w={'30%'}
                    ml={'auto'}
                    value={item?.quantity}
                    onChange={(e) => handleUpdateQuantity(item, e.target.value)}
                  />
                </Card>
              )
            })}
          </Flex>
        </Flex>
      </Stack>
      <Stack gap={fr(4)} direction='row' mt={fr(4)}>
        <Flex w={'70%'} direction='column' gap={fr(2)}>
          <Text fs={'xl'}>Thông tin khách hàng</Text>
          <Center gap={fr(2)}>
            <TextField
              w={'100%'}
              placeholder='Nhập số điện thoại khách hàng...'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              icon={<MagnifyingGlass />}
              variant='tertiary'
              size='md'
              onClick={() => {
                setSubmitPhone(phoneNumber)
              }}
            ></Button>
          </Center>
          <Flex bd={'2px solid'} bdc={'green'} br={'md'}>
            {loadingCustomer ? (
              <Skeleton w={'100%'} h={fr(27)} br={'md'} />
            ) : (
              <Flex direction='column' ml={fr(4)} fs={'md'}>
                <Text>Khách hàng: {customer?.getCustomerByPhone?.name}</Text>
                <Text>
                  Số điện thoại: {customer?.getCustomerByPhone?.phone}
                </Text>
                <Text>
                  Thành viên: {customer?.getCustomerByPhone?.level.name}
                </Text>
                <Text>
                  Số điểm: {customer?.getCustomerByPhone?.points} điểm
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex w={'30%'} direction='column'>
          <Text fs={'xl'}>Thành tiền</Text>
          <Flex h={'100%'} bd={'2px solid'} bdc={'green'} br={'md'} align='end'>
            <Flex
              align='end'
              w={'100%'}
              direction='column'
              mr={fr(4)}
              fs={'lg'}
            >
              <Text>Tổng cộng: {totalPrice.toLocaleString('vi-VN')}đ</Text>
              <Text>Phí phục vụ: 5.000đ</Text>
              <Text cl={'primary'} fs={'xl'}>
                Thành tiền: {(totalPrice + 5000).toLocaleString('vi-VN')}đ
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
      <Button
        size='lg'
        ml={'auto'}
        mt={fr(4)}
        bg={['primary', 200]}
        br={'full'}
        onClick={() => {}}
      >
        Thêm đơn hàng
      </Button>
    </Modal>
  )
}

export default AddOrderModal
