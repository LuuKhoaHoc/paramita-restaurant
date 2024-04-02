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
  UPDATE_RESERVATION,
  GET_CUSTOMER_BY_PHONE
} from '~/pages/Admin/Reservation/schema'
import { GET_TABLES, UPDATE_TABLE } from '~/pages/Admin/Table/schema'

const EditReservationModal = ({
  openModal,
  setOpenModal,
  reservation,
  refetch,
  viewMode = false
}) => {
  const toast = useToast()
  const {
    loading: loadingTable,
    error: errorTable,
    data: dataTable,
    refetch: refetchTable
  } = useQuery(GET_TABLES)
  const [updateReservation] = useMutation(UPDATE_RESERVATION)
  const [updateTable] = useMutation(UPDATE_TABLE)
  const { register, handleSubmit, handleReset, getValue } = useForm({
    fields: {
      name: {
        value: reservation?.name,
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
        value: reservation?.phone,
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
        value: reservation?.email,
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
        value: reservation?.reservation_time,
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui lòng nhập thời gian!' })
            )
        }
      },
      date: {
        value: reservation?.reservation_date?.slice(0, 10),
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui lòng chọn ngày đặt!' })
            )
        }
      },
      table: {
        value: reservation?.table?.table_id.toString(),
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Vui này chọn bàn!' }))
        }
      },
      capacity: {
        value: reservation?.capacity.toString(),
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
        value: reservation?.note
      },
      status: {
        value: reservation?.status
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
      <Modal open={openModal} onClose={() => setOpenModal(false)} w={'25vw'}>
        <Modal.Header justify='center'>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            {viewMode ? 'Chi tiết đơn đặt bàn' : 'Sửa đơn đặt bàn'}
          </Text>
        </Modal.Header>
        <Flex sx={{ '*': { fontFamily: 'GeomanistMedium !important' } }}>
          <Form
            w={'100%'}
            onReset={handleReset}
            onSubmit={(SubmitEvent) =>
              handleSubmit(SubmitEvent, (v) => {
                updateReservation({
                  variables: {
                    id: reservation?.reservation_id,
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
                      status: v.status
                    }
                  },
                  onError: (err) => console.log(err),
                  onCompleted: async (data) => {
                    await updateTable({
                      variables: {
                        id: data?.updateReservation?.table?.table_id,
                        data: {
                          status: 'Đã đặt'
                        }
                      },
                      onCompleted: (data) => {
                        if (
                          data?.updateTable?.table_id !==
                          reservation?.table?.table_id
                        ) {
                          updateTable({
                            variables: {
                              id: reservation?.table?.table_id,
                              data: {
                                status: 'Trống'
                              }
                            }
                          })
                        }
                      }
                    }).then(() => {
                      refetch()
                      refetchTable()
                      setOpenModal(false)
                      toast({
                        element: (
                          <Alert variant='info'>
                            <Alert.Title className='GeomanistMedium-font'>
                              Sửa đơn đặt bàn thành công
                            </Alert.Title>
                          </Alert>
                        )
                      })
                    })
                  }
                })
              })
            }
          >
            <TextField
              label='Tên khách hàng'
              placeholder='Nhập tên khách hàng...'
              icon={<IdentificationCard />}
              {...register('name')}
              disabled={viewMode}
            />
            <TextField
              label='Số điện thoại'
              placeholder='Nhập số điện thoại khách hàng...'
              icon={<Phone />}
              {...register('phone')}
              disabled={viewMode}
            />
            <TextField
              label='Email'
              placeholder='Nhập email khách hàng...'
              icon={<Envelope />}
              {...register('email')}
              disabled={viewMode}
            />
            <TextField
              label='Giờ đặt'
              placeholder='Nhập giờ đặt...'
              icon={<Timer />}
              addons={<Field.Addon ta={'center'}>24 tiếng</Field.Addon>}
              {...register('time')}
              disabled={viewMode}
            />
            <NativeDateField
              icon={<Calendar />}
              className='GeomanistMedium-font'
              label='Ngày đặt'
              placeholder='Nhập ngày đặt...'
              {...register('date')}
              disabled={viewMode}
            />
            <NativeSelectField
              label='Chọn bàn'
              placeholder='Chọn bàn...'
              {...register('table')}
              disabled={viewMode}
              options={tableAvailable?.map((table) => ({
                value: table.table_id,
                label: table.name + ' - ' + table.capacity + ' người'
              }))}
            />
            <NativeSelectField
              label='Chọn trạng thái'
              placeholder='Chọn trạng thái...'
              {...register('status')}
              disabled={viewMode}
              options={[
                {
                  value: 'Chờ xác nhận',
                  label: 'Chờ xác nhận'
                },
                {
                  value: 'Đã đặt',
                  label: 'Đã đặt'
                },
                {
                  value: 'Hoàn thành',
                  label: 'Hoàn thành'
                }
              ]}
            />
            <NumberField
              icon={<UserList />}
              className='GeomanistMedium-font'
              label='Số lượng người'
              placeholder='Nhập số lượng người...'
              min={1}
              {...register('capacity')}
              disabled={viewMode}
            />
            <TextareaField
              icon={<Note />}
              label='Ghi chú'
              placeholder='Nhập ghi chú...'
              {...register('note')}
              disabled={viewMode}
            />
            <Button
              icon={<CalendarPlus />}
              size='md'
              full
              br={'full'}
              variant='secondary'
              type='submit'
              disabled={viewMode}
            >
              <Text className='GeomanistMedium-font'>
                {' '}
                {viewMode ? 'Chi tiết đơn đặt bàn' : 'Sửa đơn đặt bàn'}
              </Text>
            </Button>
          </Form>
        </Flex>
      </Modal>
    </>
  )
}

export default EditReservationModal
