import { ArrowLeft } from '@phosphor-icons/react'
import {
  ActionButton,
  Flex,
  Form,
  NativeDateField,
  SelectField,
  Stack,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useLocation, useNavigate } from 'react-router-dom'

const CustomerDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { query, setQuery, filtered } = useSearch(Object.keys(state) || [])
  console.log('🚀 ~ CustomerDetail ~ state:', state)

  return (
    <>
      <Stack direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <ActionButton
            icon={<ArrowLeft weight='bold' />}
            size='md'
            variant='text'
            bd={'none'}
            bsh={'sm'}
            onClick={() => navigate(-1)}
          />
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Chi tiết tài khoản ID: {state?.customer_id}
          </Text>

          <TextField
            placeholder='Tìm kiếm...'
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Flex>
        <Flex
          direction='column'
          align='center'
          justify='center'
          gap={fr(4)}
          sx={{
            '*': {
              fontFamily: 'GeomanistMedium !important'
            }
          }}
        >
          <Form w={'50%'}>
            <TextField placeholder='Họ tên...' label='Họ tên:' />
            <TextField placeholder='Số điện thoại...' label='Số điện thoại:' />
            <TextField placeholder='Email...' label='Email:' />
            <TextField placeholder='Điểm...' label='Điểm:' />
            <NativeDateField label='Sinh nhật:' />
            <TextField placeholder='Tên tài khoản...' label='Tên tài khoản:' />
            <SelectField placeholder='Cấp độ...' label='Cấp độ:' options={[]} />
            <SelectField
              placeholder='Trạng thái...'
              label='Trạng thái:'
              options={[]}
            />
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
