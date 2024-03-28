import { useMutation, useQuery } from '@apollo/client'
import { ArrowLeft } from '@phosphor-icons/react'
import {
  ActionButton,
  Alert,
  Button,
  Flex,
  Form,
  NativeDateField,
  PasswordField,
  SelectField,
  Stack,
  Table,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { useForm, useSearch } from '@prismane/core/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import p from '~/utils/zodToPrismane'
import {
  GET_CUSTOMERS,
  GET_RANK,
  UPDATE_CUSTOMER
} from '~/pages/Admin/CustomerManager/schema'
import { Loading } from '~/components'

const CustomerDetail = ({ edit }) => {
  const toast = useToast()
  const { state, pathname } = useLocation()
  edit = pathname.includes('edit')
  const navigate = useNavigate()
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER)
  const { loading, error, data } = useQuery(GET_RANK)
  const { refetch } = useQuery(GET_CUSTOMERS)
  const { handleSubmit, handleReset, register } = useForm({
    fields: {
      name: {
        value: state?.name,
        validators: {
          required: (v) => {
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
          }
        }
      },
      phone: {
        value: state?.phone,
        validators: {
          required: (v) => {
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
          },
          phone: (v) => {
            p(
              v,
              z
                .string()
                .trim()
                .min(10, { message: 'Số điện thoại ít nhất phải 10 số!' })
                .regex(/^[0-9]+$/, { message: 'Số điện thoại phải là số!' })
            )
          }
        }
      },
      email: {
        value: state?.email,
        validators: {
          required: (v) => {
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
          },
          email: (v) => {
            p(v, z.string().trim().email({ message: 'Không phải là email' }))
          }
        }
      },
      points: {
        value: state?.points,
        validators: {
          required: (v) => {
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
          },
          number: (v) => {
            p(
              v,
              z
                .string()
                .trim()
                .regex(/^[0-9]+$/, { message: 'Số điểm phải là số!' })
            )
          }
        }
      },
      username: {
        value: state?.username,
        validators: {
          required: (v) => {
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
          }
        }
      },
      birthday: {
        value: state?.birthday?.slice(0, 10) || ''
      },
      level: {
        value: state?.level.level_id
      },
      status: {
        value: state?.status
      }
    }
  })
  if (loading) return <Loading />
  return (
    <>
      <Stack direction='column'>
        <Flex justify='center' align='center' mx={fr(4)} my={fr(4)}>
          <ActionButton
            icon={<ArrowLeft weight='bold' />}
            size='md'
            variant='text'
            bd={'none'}
            bsh={'sm'}
            mr={'auto'}
            onClick={() => navigate(-1)}
          />
          <Text className='GeomanistMedium-font' fs={'xl'} mr={'auto'}>
            Chi tiết tài khoản ID: {state?.customer_id}
          </Text>
        </Flex>
        <Flex
          direction='column'
          align='center'
          justify='center'
          gap={fr(4)}
          my={fr(4)}
          sx={{
            '*': {
              fontFamily: 'GeomanistMedium !important'
            }
          }}
        >
          <Form
            w={'50%'}
            onReset={handleReset}
            onSubmit={(SubmitEvent) => {
              handleSubmit(SubmitEvent, async (v) => {
                await updateCustomer({
                  variables: {
                    id: state?.customer_id,
                    data: {
                      name: v.name,
                      phone: v.phone,
                      email: v.email,
                      birthday: new Date(v.birthday),
                      levelId: +v.level,
                      points: v.points,
                      status: v.status === 'true' ? true : false,
                      username: v.username
                    }
                  },
                  onError: (err) => console.log(err),
                  onCompleted: (data) => {
                    toast({
                      element: (
                        <Alert variant='success'>
                          <Alert.Title className='GeomanistMedium-font'>
                            Đã cập nhật khách hàng {data?.updateCustomer.name}
                          </Alert.Title>
                        </Alert>
                      )
                    })
                    navigate(-1)
                    refetch()
                  }
                })
              })
            }}
          >
            <TextField
              placeholder='Họ tên...'
              label='Họ tên:'
              {...register('name')}
              disabled={!edit ? true : false}
            />
            <TextField
              placeholder='Số điện thoại...'
              label='Số điện thoại:'
              {...register('phone')}
              disabled={!edit ? true : false}
            />
            <TextField
              placeholder='Email...'
              label='Email:'
              {...register('email')}
              disabled={!edit ? true : false}
            />
            <TextField
              placeholder='Điểm...'
              label='Điểm:'
              {...register('points')}
              disabled={!edit ? true : false}
            />
            <NativeDateField
              label='Sinh nhật:'
              {...register('birthday')}
              disabled={!edit ? true : false}
            />
            <TextField
              placeholder='Tên tài khoản...'
              label='Tên tài khoản:'
              {...register('username')}
              disabled={!edit ? true : false}
            />
            <SelectField
              placeholder='Cấp độ...'
              label='Cấp độ:'
              {...register('level')}
              disabled={!edit ? true : false}
              options={data?.customerLevelList?.map((level) => ({
                value: level.level_id,
                element: level.name
              }))}
            />
            <SelectField
              placeholder='Trạng thái...'
              label='Trạng thái:'
              {...register('status')}
              disabled={!edit ? true : false}
              options={[
                { value: true, element: 'Đang hoạt động' },
                { value: false, element: 'Ẩn' }
              ]}
            />
            <Flex>
              <Button
                variant='secondary'
                size='md'
                br={'2xl'}
                type='reset'
                disabled={!edit ? true : false}
              >
                Huỷ thay đổi
              </Button>
              <Button
                size='md'
                br={'2xl'}
                ml={'auto'}
                type='submit'
                disabled={!edit ? true : false}
              >
                Lưu
              </Button>
            </Flex>
          </Form>
          <Text fs={'xl'}>Số địa chỉ</Text>
          <Flex direction='column' align='center' gap={fr(2)}>
            {state?.address?.map((address) => (
              <Text fs={'lg'} key={address.address_id}>
                {address?.address}
              </Text>
            ))}
          </Flex>
          <Text fs={'xl'}>Danh sách voucher</Text>
          <Table>
            <Table.Head ta={'center'}>
              <Table.Row>
                <Table.Cell>STT</Table.Cell>
                <Table.Cell>Tên voucher</Table.Cell>
                <Table.Cell>Trạng thái</Table.Cell>
                <Table.Cell>Mã</Table.Cell>
                <Table.Cell>Đơn tối thiểu</Table.Cell>
                <Table.Cell>Giảm tối đa</Table.Cell>
                <Table.Cell>Ngày hết hạn</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              {state?.vouchers?.map((voucher, index) => (
                <Table.Row key={voucher.voucher_id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{voucher.name}</Table.Cell>
                  <Table.Cell>{voucher.status}</Table.Cell>
                  <Table.Cell>{voucher.code}</Table.Cell>
                  <Table.Cell>{voucher.min_spend}</Table.Cell>
                  <Table.Cell>{voucher.max_discount}</Table.Cell>
                  <Table.Cell>{voucher.expired_date}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Text fs={'xl'}>Lịch sử tích điểm</Text>
          <Table>
            <Table.Head ta={'center'}>
              <Table.Row>
                <Table.Cell>STT</Table.Cell>
                <Table.Cell>ID đơn hàng</Table.Cell>
                <Table.Cell>ID hoá đơn</Table.Cell>
                <Table.Cell>ID voucher</Table.Cell>
                <Table.Cell>Điểm nhận được</Table.Cell>
                <Table.Cell>Điểm bị trừ</Table.Cell>
                <Table.Cell>Ngày giao dịch</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              {state?.point_histories?.map((history, index) => (
                <Table.Row key={history.point_history_id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    {history?.order?.order_id || 'Không có đơn hàng'}
                  </Table.Cell>
                  <Table.Cell>
                    {history?.invoice?.invoice_id || 'Không có hoá đơn'}
                  </Table.Cell>
                  <Table.Cell>
                    {history?.voucher?.voucher_id || 'Không có voucher'}
                  </Table.Cell>
                  <Table.Cell>{history?.points_earned || '0'}</Table.Cell>
                  <Table.Cell>{history?.points_deducted || '0'} </Table.Cell>
                  <Table.Cell>{history?.transaction_date}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Text fs={'xl'}>Danh sách đơn hàng</Text>
          <Table>
            <Table.Head ta={'center'}>
              <Table.Row>
                <Table.Cell>STT</Table.Cell>
                <Table.Cell>ID đơn hàng</Table.Cell>
                <Table.Cell>Địa chỉ nhận hàng</Table.Cell>
                <Table.Cell>Phương thức thanh toán</Table.Cell>
                <Table.Cell>Trạng thái thanh toán</Table.Cell>
                <Table.Cell>Giá tiền</Table.Cell>
                <Table.Cell>Trạng thái đơn hàng</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              {state?.orders?.map((order, index) => (
                <Table.Row key={order.order_id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{order?.order_id}</Table.Cell>
                  <Table.Cell>{order?.delivery_address}</Table.Cell>
                  <Table.Cell>{order?.payment_method}</Table.Cell>
                  <Table.Cell>{order?.payment_status}</Table.Cell>
                  <Table.Cell>
                    {order?.total_price?.toLocaleString('vi-VN')}đ{' '}
                  </Table.Cell>
                  <Table.Cell>{order?.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Text fs={'xl'}>Danh sách hoá đơn</Text>
          <Table>
            <Table.Head ta={'center'}>
              <Table.Row>
                <Table.Cell>STT</Table.Cell>
                <Table.Cell>ID hoá đơn</Table.Cell>
                <Table.Cell>Thời gian giao dịch</Table.Cell>
                <Table.Cell>ID voucher</Table.Cell>
                <Table.Cell>Phương thức thanh toán</Table.Cell>
                <Table.Cell>Trạng thái thanh toán</Table.Cell>
                <Table.Cell>Giá tiền</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              {state?.invoice?.map((item, index) => (
                <Table.Row key={item.invoice_id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item?.invoice_id}</Table.Cell>
                  <Table.Cell>{item?.invoice_time}</Table.Cell>
                  <Table.Cell>{item?.voucher_id}</Table.Cell>
                  <Table.Cell>{item?.payment_method}</Table.Cell>
                  <Table.Cell>{item?.payment_status}</Table.Cell>
                  <Table.Cell>
                    {item?.total_price?.toLocaleString('vi-VN')}đ{' '}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Text fs={'xl'}>Danh sách đơn đặt bàn</Text>
          <Table>
            <Table.Head ta={'center'}>
              <Table.Row>
                <Table.Cell>STT</Table.Cell>
                <Table.Cell>ID đơn đặt bàn</Table.Cell>
                <Table.Cell>ID bàn</Table.Cell>
                <Table.Cell>Mô tả</Table.Cell>
                <Table.Cell>Ngày đặt bàn</Table.Cell>
                <Table.Cell>Số lượng người</Table.Cell>
                <Table.Cell>Trạng thái</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              {state?.invoice?.map((item, index) => (
                <Table.Row key={item.invoice_id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item?.invoice_id}</Table.Cell>
                  <Table.Cell>{item?.invoice_time}</Table.Cell>
                  <Table.Cell>{item?.voucher_id}</Table.Cell>
                  <Table.Cell>{item?.payment_method}</Table.Cell>
                  <Table.Cell>{item?.payment_status}</Table.Cell>
                  <Table.Cell>
                    {item?.total_price?.toLocaleString('vi-VN')}đ{' '}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Flex>
      </Stack>
    </>
  )
}

export default CustomerDetail
