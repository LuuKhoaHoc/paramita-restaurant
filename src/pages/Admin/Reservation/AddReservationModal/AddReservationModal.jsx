import { useMutation, useQuery } from '@apollo/client'
import {
  Calendar,
  CalendarPlus,
  Envelope,
  IdentificationCard,
  Note,
  Phone,
  Timer,
  UserList
} from '@phosphor-icons/react'
import {
  Alert,
  Button,
  Field,
  Flex,
  Form,
  Modal,
  NativeDateField,
  NativeSelectField,
  NumberField,
  SelectField,
  Text,
  TextField,
  TextareaField,
  fr,
  useToast
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { useState } from 'react'
import { z } from 'zod'
import p from '~/utils/zodToPrismane'
import {
  ADD_RESERVATION,
  GET_CUSTOMER_BY_PHONE,
  SEND_MAIL
} from '~/pages/Admin/Reservation/schema'
import { GET_TABLES, UPDATE_TABLE } from '~/pages/Admin/Table/schema'

const AddReservationModal = ({ openModal, setOpenModal, refetch }) => {
  const [addReservation] = useMutation(ADD_RESERVATION)
  const [updateTable] = useMutation(UPDATE_TABLE)
  const [sendMailReservation] = useMutation(SEND_MAIL)
  const {
    loading: loadingTable,
    error: errorTable,
    data: dataTable,
    refetch: refetchTable
  } = useQuery(GET_TABLES)
  const toast = useToast()
  const { register, handleSubmit, handleReset, getValue } = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng nhập tên khách hàng!' })
            ),
          name: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(2, { message: 'Ít nhất 2 kí tự' })
                .regex(/^[\p{L}\s]+$/u, {
                  message: 'Chỉ được chứa chữ có dạng với kí tự'
                })
            )
        }
      },
      phone: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng nhập SĐT khách hàng!' })
            ),
          phone: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(10, { message: 'SĐT khách hàng phải là 10 số!' })
                .regex(/^0[0-9]{9,10}$/, { message: 'SĐT phải là số!' })
            )
        }
      },
      email: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng nhập email khách hàng!' })
            ),
          email: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .email({ message: 'Email khách hàng phải là email!' })
            )
        }
      },
      time: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui lòng nhập thời gian!' })
            )
        }
      },
      date: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui lòng chọn ngày đặt!' })
            )
        }
      },
      table: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Vui này chọn bàn!' }))
        }
      },
      capacity: {
        value: '1',
        validators: {
          capacity: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng nhập số lượng người!' })
            )
        }
      },
      note: {
        value: ''
      }
    }
  })
  let tableAvailable = dataTable?.tableList?.filter(
    (table) =>
      table.capacity >= getValue('capacity') && table.status === 'Trống'
  )
  let customerPhone = getValue('phone')
  const {
    loading: loadingCustomer,
    error: errorCustomer,
    data: dataCustomer
  } = useQuery(GET_CUSTOMER_BY_PHONE, { variables: { phone: customerPhone } })
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => {
          handleReset()
          setOpenModal(false)
        }}
        w={'30vw'}
      >
        <Modal.Header justify='center'>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Thêm đơn đặt bàn
          </Text>
        </Modal.Header>
        <Flex sx={{ '*': { fontFamily: 'GeomanistMedium !important' } }}>
          <Form
            w={'100%'}
            onReset={handleReset}
            onSubmit={(SubmitEvent) => {
              handleSubmit(SubmitEvent, async (v) => {
                await addReservation({
                  variables: {
                    data: {
                      customerId: dataCustomer?.getCustomerByPhone?.customer_id,
                      tableId: +v.table,
                      name: v.name,
                      phone: v.phone,
                      email: v.email,
                      capacity: +v.capacity,
                      note: v.note,
                      reservation_time: v.time,
                      reservation_date: new Date(v.date),
                      status: 'Đã đặt'
                    }
                  },
                  onError: (err) => console.log(err),
                  onCompleted: async (data) => {
                    console.log('🚀 ~ handleSubmit ~ data:', data)
                    await updateTable({
                      variables: {
                        id: data?.createReservation?.table?.table_id,
                        data: {
                          status: 'Đã đặt'
                        },
                        onError: (err) => console.log(err)
                      }
                    }).then((res) => {
                      sendMailReservation({
                        variables: {
                          data: {
                            name: v.name,
                            phone: v.phone,
                            email: v.email,
                            capacity: +v.capacity,
                            reservation_time: v.time,
                            reservation_date: new Date(v.date),
                            status: 'Đã đặt'
                          }
                        }
                      })
                      toast({
                        element: (
                          <Alert variant='success'>
                            <Alert.Title className='GeomanistMedium-font'>
                              Đã thêm đơn đặt bàn thành công
                            </Alert.Title>
                          </Alert>
                        )
                      })
                      refetchTable()
                      refetch()
                      setOpenModal(false)
                    })
                  }
                })
              })
            }}
          >
            <TextField
              label='Tên khách hàng'
              placeholder='Nhập tên khách hàng...'
              icon={<IdentificationCard />}
              {...register('name')}
            />
            <TextField
              label='Số điện thoại'
              placeholder='Nhập số điện thoại khách hàng...'
              icon={<Phone />}
              {...register('phone')}
            />
            <TextField
              label='Email'
              placeholder='Nhập email khách hàng...'
              icon={<Envelope />}
              {...register('email')}
            />
            <TextField
              label='Giờ đặt'
              placeholder='Nhập giờ đặt...'
              icon={<Timer />}
              addons={<Field.Addon ta={'center'}>24 tiếng</Field.Addon>}
              {...register('time')}
            />
            <NativeDateField
              icon={<Calendar />}
              className='GeomanistMedium-font'
              label='Ngày đặt'
              placeholder='Nhập ngày đặt...'
              {...register('date')}
            />
            <NativeSelectField
              label='Chọn bàn'
              placeholder='Chọn bàn...'
              {...register('table')}
              options={tableAvailable?.map((table) => ({
                value: table.table_id,
                label: table.name + ' - ' + table.capacity + ' người'
              }))}
            />
            <NumberField
              icon={<UserList />}
              className='GeomanistMedium-font'
              label='Số lượng người'
              placeholder='Nhập số lượng người...'
              min={1}
              {...register('capacity')}
            />
            <TextareaField
              icon={<Note />}
              label='Ghi chú'
              placeholder='Nhập ghi chú...'
              {...register('note')}
            />
            <Modal.Footer>
              <Button
                icon={<CalendarPlus />}
                size='md'
                full
                br={'full'}
                variant='secondary'
                type='submit'
              >
                <Text className='GeomanistMedium-font'>Thêm đơn đặt bàn</Text>
              </Button>
            </Modal.Footer>
          </Form>
        </Flex>
      </Modal>
    </>
  )
}

export default AddReservationModal
