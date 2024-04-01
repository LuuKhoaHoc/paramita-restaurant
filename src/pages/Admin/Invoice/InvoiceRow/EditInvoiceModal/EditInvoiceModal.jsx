import { MagnifyingGlass, Plus, X } from '@phosphor-icons/react'
import {
  Alert,
  Button,
  Card,
  Center,
  Circle,
  Flex,
  Image,
  Modal,
  NumberField,
  Skeleton,
  Stack,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { useState } from 'react'
import { useSearch } from '@prismane/core/hooks'
import { useMutation, useQuery } from '@apollo/client'
import { GET_MENU } from '~/pages/Admin/Menu/schema'
import { GET_CUSTOMER_BY_PHONE } from '~/pages/Admin/Reservation/schema'
import {
  ADD_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  GET_INVOICES,
  UPDATE_INVOICE,
  UPDATE_INVOICE_DETAIL
} from '~/pages/Admin/Invoice/schema'

const EditInvoiceModal = ({ openModal, setOpenModal, refetch, invoice }) => {
  const toast = useToast()
  const [addedItems, setAddedItems] = useState(invoice?.invoice_details || [])
  const [openVoucherModal, setOpenVoucherModal] = useState(false)
  const [voucher, setVoucher] = useState(invoice?.voucher?.name || '')

  // useQuery data
  const { loading, error: errorMenu, data: dataMenu } = useQuery(GET_MENU)
  // useMutation
  // useMutation to create InvoiceDetail
  const [addInvoiceDetail, { loading: loadingAddInvoiceDetail }] =
    useMutation(ADD_INVOICE_DETAIL)
  // useMutation to create Invoice
  const [updateInvoice, { loading: loadingUpdateInvoice }] =
    useMutation(UPDATE_INVOICE)
  // useMutation to create InvoiceDetail
  const [updateInvoiceDetail, { loading: loadingUpdateInvoiceDetail }] =
    useMutation(UPDATE_INVOICE_DETAIL)
  // useMutation to delete InvoiceDetail
  const [deleteInvoiceDetail, { loading: loadingDeleteInvoiceDetail }] =
    useMutation(DELETE_INVOICE_DETAIL)

  const { query, setQuery, filtered } = useSearch(dataMenu?.menuList || [])
  const [phoneNumber, setPhoneNumber] = useState(invoice?.customer?.phone || '')
  const [submitPhone, setSubmitPhone] = useState(invoice?.customer?.phone || '')

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
    return acc + item.unit_price * item.quantity
  }, 0)

  // func handle add item
  const addItem = (item) => {
    let addedItem = addedItems.find((c) => c.item.item_id === item.item_id)
    if (addedItem) {
      try {
        updateInvoiceDetail({
          variables: {
            id: addedItem.invoice_detail_id,
            data: {
              invoiceId: invoice?.invoice_id,
              itemId: addedItem?.item?.item_id,
              quantity: addedItem?.quantity + 1,
              price: addedItem?.unit_price,
              total: addedItem?.unit_price * (addedItem?.quantity + 1)
            }
          },
          refetchQueries: [GET_INVOICES, 'getInvoices'],
          awaitRefetchQueries: true,
          onCompleted: () => {
            setAddedItems((prev) => {
              return prev.map((c) => {
                if (c.invoice_detail_id === addedItem.invoice_detail_id) {
                  return {
                    ...c,
                    quantity: c.quantity + 1
                  }
                }
                return c
              })
            })
          }
        })
      } catch (error) {
        console.log('🚀 ~ addItem ~ error:', error)
      }
    } else {
      try {
        addInvoiceDetail({
          variables: {
            data: {
              invoiceId: invoice?.invoice_id,
              itemId: item?.item_id,
              quantity: 1,
              price: item.price * 1000,
              total: item.price * 1000
            }
          },
          refetchQueries: [GET_INVOICES, 'getInvoices'],
          awaitRefetchQueries: true,
          onCompleted: (data) => {
            setAddedItems((prev) => {
              return [...prev, data?.createInvoiceDetail]
            })
          }
        })
      } catch (error) {
        console.log('🚀 ~ addItem ~ error:', error)
      }
    }
  }
  // func handle update quantity
  const handleUpdateQuantity = (item, value) => {
    try {
      updateInvoiceDetail({
        variables: {
          id: item.invoice_detail_id,
          data: {
            invoiceId: invoice?.invoice_id,
            itemId: item?.item?.item_id,
            quantity: +value,
            price: item?.unit_price,
            total: item?.unit_price * value
          }
        },
        refetchQueries: [GET_INVOICES, 'getInvoices'],
        awaitRefetchQueries: true,
        onError: (err) => console.log(err),
        onCompleted: () => {
          setAddedItems((prev) => {
            return prev.map((c) => {
              if (c.invoice_detail_id === item.invoice_detail_id) {
                return {
                  ...c,
                  quantity: value
                }
              }
              return c
            })
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  // func handle delete item
  const handleDeleteItem = (item) => {
    deleteInvoiceDetail({
      variables: {
        id: item?.invoice_detail_id
      },
      onError: (err) => console.log(err),
      onCompleted: () => {
        setAddedItems((prev) => {
          return prev.filter(
            (c) => c.invoice_detail_id !== item.invoice_detail_id
          )
        })
      }
    })
  }

  // func handle close and save invoice
  const handleCloseAndSaveInvoice = async () => {
    await updateInvoice({
      variables: {
        id: invoice?.invoice_id,
        data: {
          customerId: customer?.getCustomerByPhone?.customer_id || null,
          voucherId: null,
          paymentMethod: 'tiền mặt',
          paymentStatus: 'Chưa thanh toán',
          totalPrice: totalPrice + 5000,
          note: null
        }
      },
      onError: (err) => console.log(err),
      refetchQueries: [GET_INVOICES, 'getInvoices'],
      awaitRefetchQueries: true
    }).then(() => {
      setOpenModal(false)
      toast({
        element: (
          <Alert variant='success'>
            <Alert.Title className='GeomanistMedium-font'>
              Đã lưu hoá đơn
            </Alert.Title>
          </Alert>
        )
      })
    })
  }

  // func handle complete invoice
  const handleCompleteInvoice = () => {
    try {
      updateInvoice({
        variables: {
          id: invoice?.invoice_id,
          data: {
            customerId: customer?.getCustomerByPhone?.customer_id,
            voucherId: null,
            paymentMethod: 'tiền mặt',
            paymentStatus: 'Đã thanh toán',
            totalPrice: totalPrice + 5000,
            note: null
          }
        },
        onError: (err) => console.log(err),
        refetchQueries: [GET_INVOICES, 'getInvoices'],
        awaitRefetchQueries: true,
        onCompleted: () => {
          sessionStorage.removeItem('invoice-cart')
          setOpenModal(false)
          toast({
            element: (
              <Alert variant='info'>
                <Alert.Title className='GeomanistMedium-font'>
                  Xác nhận thanh toán hoá đơn thành công
                </Alert.Title>
              </Alert>
            )
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        w={'90vw'}
        open={openModal}
        onClose={() => setOpenModal(false)}
        closable
        cl={(theme) => (theme.mode === 'dark' ? '#fff' : '#000')}
      >
        <Modal
          w={'40vw'}
          open={openVoucherModal}
          onClose={() => setOpenVoucherModal(false)}
          z={1000}
        >
          <Modal.Header
            justify='center'
            ff={'GeomanistMedium !important'}
            fs={'xl'}
          >
            Mã giảm giá
          </Modal.Header>
          <TextField
            sx={{
              '.PrismaneTextField-label': {
                fontFamily: 'GeomanistMedium !important'
              }
            }}
            placeholder='Nhập mã giảm giá...'
            label='Mã giảm giá'
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <Modal.Footer>
            <Button variant='primary' size='md' full onClick={() => {}}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal.Header>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Thêm hoá đơn
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
                    key={item.invoice_detail_id}
                    direction='row'
                    mih={fr(10)}
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
                      <Text fs={'md'}>{item?.item?.name}</Text>
                      <Text cl={['gray', 400]}>
                        {(item?.unit_price).toLocaleString('vi-VN')}đ
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
                        handleUpdateQuantity(item, e.target.value)
                      }
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
            <Flex
              h={'100%'}
              bd={'2px solid'}
              bdc={'green'}
              br={'md'}
              align='end'
            >
              <Flex
                align='end'
                w={'100%'}
                direction='column'
                mr={fr(4)}
                fs={'lg'}
              >
                <Text>Tổng cộng: {totalPrice.toLocaleString('vi-VN')}đ</Text>
                <Text>Phí phục vụ: 5.000đ</Text>
                <Button
                  variant='text'
                  color='diamond'
                  size='md'
                  onClick={() => setOpenVoucherModal(true)}
                >
                  Mã giảm giá
                </Button>
                <Text cl={'primary'} fs={'xl'}>
                  Thành tiền: {(totalPrice + 5000).toLocaleString('vi-VN')}đ
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Stack>
        <Flex justify='between' mt={fr(4)}>
          <Button
            size='lg'
            bg={['primary', 200]}
            br={'full'}
            onClick={() => {
              handleCompleteInvoice()
            }}
          >
            Xác nhận thanh toán
          </Button>
          <Button
            size='lg'
            bg={['gray', 400]}
            br={'full'}
            onClick={() => {
              handleCloseAndSaveInvoice()
            }}
          >
            Đóng, lưu lại
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default EditInvoiceModal
