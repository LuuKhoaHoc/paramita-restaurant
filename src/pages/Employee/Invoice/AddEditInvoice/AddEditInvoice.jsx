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
import {
  ADD_INVOICE,
  ADD_INVOICE_DETAIL,
  UPDATE_INVOICE,
  UPDATE_INVOICE_DETAIL,
  GET_CUSTOMER_BY_PHONE,
  GET_MENU
} from '~/pages/Employee/Invoice/AddEditInvoice/schema'

const AddEditInvoice = ({
  title,
  openModalAddEdit,
  setOpenModalAddEdit,
  invoice_data
}) => {
  //switch title
  const titleButton = title === 'Thêm hoá đơn' ? 'Thêm' : 'Chỉnh sửa'
  // state update quantity
  const [addedItems, setAddedItems] = useState([])
  const [dataItem, setDataItem] = useState(invoice_data?.invoice_details || [])
  const [phoneNumber, setPhoneNumber] = useState('')
  // useQuery data
  const { data, loading, error } = useQuery(GET_MENU)
  // useQuery customer by phone
  const {
    data: customer,
    loading: loadingCustomer,
    error: errorCustomer
  } = useQuery(GET_CUSTOMER_BY_PHONE, {
    variables: {
      phone: phoneNumber
    }
  })
  // useMutation to create Invoice
  const [addInvoice, { loading: loadingAddInvoice }] = useMutation(ADD_INVOICE)
  // useMutation to create InvoiceDetail
  const [addInvoiceDetail, { loading: loadingAddInvoiceDetail }] =
    useMutation(ADD_INVOICE_DETAIL)
  // useMutation to create Invoice
  const [updateInvoice, { loading: loadingUpdateInvoice }] =
    useMutation(UPDATE_INVOICE)
  // useMutation to create InvoiceDetail
  const [updateInvoiceDetail, { loading: loadingUpdateInvoiceDetail }] =
    useMutation(UPDATE_INVOICE_DETAIL)
  // useSearch hook
  const { query, setQuery, filtered } = useSearch(data?.menuList || [])
  // useEffect to get cart from sessionStorage
  useEffect(() => {
    if (title === 'Sửa hoá đơn') {
    } else {
      let cartItem = JSON.parse(sessionStorage.getItem('invoice-cart') || '[]')
      setAddedItems(cartItem)
    }
  }, [])

  // total price
  let totalPrice = addedItems.reduce((acc, item) => {
    return acc + item.price * item.quantity * 1000
  }, 0)

  // func handle add invoice
  const handleAddInvoice = async () => {
    await addInvoice({
      variables: {
        data: {
          customerId: customer?.getCustomerByPhone?.customer_id,
          voucherId: null,
          paymentMethod: 'tiền mặt',
          paymentStatus: 'Chưa thanh toán',
          totalPrice: totalPrice + 5000,
          note: null
        }
      }
    }).then((res) => {
      let cart = JSON.parse(sessionStorage.getItem('invoice-cart') || '[]')
      cart.map(async (item) => {
        await addInvoiceDetail({
          variables: {
            data: {
              invoiceId: res.data.createInvoice.invoice_id,
              itemId: item.item_id,
              quantity: item.quantity,
              price: item.price * 1000,
              total: item.price * item.quantity * 1000
            }
          },
          onCompleted: () => {
            sessionStorage.removeItem('invoice-cart')
            setOpenModalAddEdit(false)
          }
        })
      })
    })
  }
  // func handle update invoice
  const handleUpdateInvoice = async () => {
    await updateInvoice({
      variables: {
        id: invoice_data.invoice_id,
        data: {
          customerId: customer?.getCustomerByPhone?.customer_id,
          voucherId: null,
          paymentMethod: 'tiền mặt',
          paymentStatus: 'Chưa thanh toán',
          totalPrice: totalPrice + 5000,
          note: null
        }
      }
    }).then((res) => {
      let cart = dataItem
      cart.map(async (item) => {
        await updateInvoiceDetail({
          variables: {
            id: item.invoice_detail_id,
            data: {
              invoiceId: res.data.updateInvoice.invoice_id,
              itemId: item.item_id,
              quantity: item.quantity,
              price: item.unit_price,
              total: item.unit_price * item.quantity
            }
          },
          onCompleted: () => {
            sessionStorage.removeItem('invoice-cart')
            setOpenModalAddEdit(false)
          }
        })
      })
    })
  }

  // func handle delete item of existed invoice
  const handleDeleteExistedItem = (item) => {
    setDataItem(
      dataItem.filter((c) => c.invoice_detail_id !== item.invoice_detail_id)
    )
  }
  // func handle update quantity of existed invoice
  const handleUpdateQuantityExistedItem = (item, value) => {
    let cart = dataItem
    cart = cart.map((c) => {
      if (c.invoice_detail_id === item.invoice_detail_id) {
        return {
          ...c,
          quantity: +value
        }
      }
      return c
    })
    setDataItem(cart)
  }
  // func handle add item of existed invoice
  const handleAddItem = (item) => {
    let cart = dataItem
    cart?.map((c) => {
      if (c.item.item_id === item.item_id) {
        handleUpdateQuantityExistedItem(c, c.quantity + 1)
      }
    })
  }
  // func handle delete item
  const handleDeleteItem = (item) => {
    if (dataItem) {
      let cart = JSON.parse(sessionStorage.getItem('invoice-cart') || '[]')
      cart = cart.filter((c) => c.item_id !== item.item_id)
      setAddedItems(cart)
      sessionStorage.setItem('invoice-cart', JSON.stringify(cart))
    }
  }
  // func handle update quantity
  const handleUpdateQuantity = (item, value) => {
    let cart = JSON.parse(sessionStorage.getItem('invoice-cart') || '[]')
    cart = cart.map((c) => {
      if (c.item_id === item.item_id) {
        c.quantity = +value
      }
      return c
    })
    setAddedItems(cart)
    sessionStorage.setItem('invoice-cart', JSON.stringify(cart))
  }
  // func handle add item
  const addItem = (item) => {
    let cart = JSON.parse(sessionStorage.getItem('invoice-cart') || '[]')
    const existItem = cart.find((c) => c.item_id === item.item_id)
    if (existItem) {
      existItem.quantity++
    } else if (dataItem) {
      handleAddItem(item)
      return
    } else {
      cart.push({
        item_id: item.item_id,
        name: item.name,
        price: item.price,
        quantity: 1
      })
    }
    setAddedItems(cart)
    sessionStorage.setItem('invoice-cart', JSON.stringify(cart))
  }
  // func handle submit
  const { handleSubmit, register } = useForm({
    fields: {
      phone: {
        value: ''
      }
    }
  })
  // return error
  if (error) return alert('Lỗi')
  return (
    <Modal
      w={'90vw'}
      open={openModalAddEdit}
      onClose={() => setOpenModalAddEdit(false)}
      closable
      cl={(theme) => (theme.mode === 'dark' ? '#fff' : '#000')}
    >
      <Modal.Header>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          {title}
        </Text>
      </Modal.Header>
      <Stack gap={fr(4)} direction='row'>
        <Flex w={'70%'} direction='column'>
          <Flex align='center'>
            <Text fs={'xl'} mr={'auto'}>
              Danh sách món ăn
            </Text>
            <TextField
              size='md'
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
        <Flex w={'30%'} direction='column'>
          <Text fs={'xl'}>Các món đã chọn</Text>
          <Flex
            h={'100%'}
            bd={'3px solid'}
            bdc={'primary'}
            p={fr(2)}
            br={'md'}
            bsh={'inner'}
            gap={fr(2)}
            direction='column'
          >
            {dataItem?.map((item) => {
              return (
                <Card
                  key={item.invoice_detail_id}
                  direction='row'
                  h={fr(8)}
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
                    onClick={() => handleDeleteExistedItem(item)}
                  >
                    <X />
                  </Circle>
                  <Flex direction='column'>
                    <Text fs={'md'}>{item?.item?.name}</Text>
                    <Text fs={'sm'} cl={['gray', 400]}>
                      {item?.unit_price?.toLocaleString('vi-VN')}đ
                    </Text>
                  </Flex>
                  <NumberField
                    min={1}
                    max={99}
                    variant='underlined'
                    w={'30%'}
                    ml={'auto'}
                    value={item?.quantity}
                    onChange={(e) =>
                      handleUpdateQuantityExistedItem(item, e.target.value)
                    }
                  />
                </Card>
              )
            })}
            {addedItems.map((item) => {
              return (
                <Card
                  key={item.item_id}
                  direction='row'
                  h={fr(8)}
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
                    <Text fs={'sm'} cl={['gray', 400]}>
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
          <Form
            onSubmit={(e) => {
              handleSubmit(e, (v) => {
                setPhoneNumber(v.phone)
              })
            }}
          >
            <Center gap={fr(2)}>
              <TextField
                w={'100%'}
                placeholder='Nhập số điện thoại khách hàng...'
                {...register('phone')}
              />
              <Button
                icon={<MagnifyingGlass />}
                size='md'
                bg={['primary', 200]}
                onClick={() => {}}
              ></Button>
            </Center>
          </Form>
          <Flex bd={'2px solid'} bdc={'green'} br={'md'}>
            {loadingCustomer ? (
              <Skeleton w={'100%'} h={fr(27)} br={'md'} />
            ) : (
              <Flex direction='column' ml={fr(4)} fs={'md'}>
                <Text>
                  Khách hàng:{' '}
                  {invoice_data?.customer
                    ? invoice_data?.customer?.name
                    : customer?.getCustomerByPhone?.name}
                </Text>
                <Text>
                  Số điện thoại:{' '}
                  {invoice_data?.customer
                    ? invoice_data?.customer?.phone
                    : customer?.getCustomerByPhone?.phone}
                </Text>
                <Text>
                  Thành viên:{' '}
                  {invoice_data?.customer
                    ? invoice_data?.customer?.level.name
                    : customer?.getCustomerByPhone?.level.name}
                </Text>
                <Text>
                  Số điểm:{' '}
                  {invoice_data?.customer
                    ? invoice_data?.customer?.points
                    : customer?.getCustomerByPhone?.points}{' '}
                  điểm
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
              <Text>
                Tổng cộng:{' '}
                {invoice_data
                  ? (invoice_data?.total_price - 5000).toLocaleString('vi-VN')
                  : totalPrice.toLocaleString('vi-VN')}
                đ
              </Text>
              <Text>Phí phục vụ: 5.000đ</Text>
              <Text cl={'primary'} fs={'xl'}>
                Thành tiền:{' '}
                {invoice_data
                  ? (invoice_data?.total_price).toLocaleString('vi-VN')
                  : (totalPrice + 5000).toLocaleString('vi-VN')}
                đ
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
        onClick={() => {
          if (title === 'Thêm hoá đơn') {
            handleAddInvoice()
          } else {
            handleUpdateInvoice()
          }
        }}
      >
        {titleButton} hoá đơn
      </Button>
    </Modal>
  )
}

export default AddEditInvoice
