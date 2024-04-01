import { useMutation } from '@apollo/client'
import {
  Alert,
  Button,
  Flex,
  Form,
  Modal,
  NativeSelectField,
  SelectField,
  fr,
  useToast
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { UPDATE_ORDER } from '~/pages/Admin/Order/schema'

const EditOrderModal = ({
  openEditModal,
  setOpenEditModal,
  order,
  refetch
}) => {
  const toast = useToast()
  const [updateOrder] = useMutation(UPDATE_ORDER)
  const { handleReset, handleSubmit, register } = useForm({
    fields: {
      status: { value: order?.status },
      payment_status: { value: order?.payment_status }
    }
  })
  return (
    <Modal
      w={'40vw'}
      p={fr(8)}
      px={fr(6)}
      open={openEditModal}
      onClose={() => {
        handleReset()
        setOpenEditModal(false)
      }}
      sx={{ '*': { fontFamily: 'GeomanistMedium !important' } }}
    >
      <Modal.Header justify='center' fs={'xl'}>
        Cập nhật trạng thái đơn hàng
      </Modal.Header>
      <Form
        onReset={handleReset}
        onSubmit={(SubmitEvent) =>
          handleSubmit(SubmitEvent, (v) => {
            console.log(v)
            updateOrder({
              variables: {
                id: order?.order_id,
                data: {
                  customerId: order?.customer.customer_id,
                  status: v.status,
                  address: order?.delivery_address,
                  transportFee: order?.transport_fee,
                  paymentMethod: order?.payment_method,
                  paymentStatus: v.payment_status,
                  voucherId: order?.voucher?.voucher_id,
                  total: order?.total_price,
                  note: order?.note
                }
              },
              onError: (err) => console.log(err),
              onCompleted: (data) => {
                console.log('🚀 ~ handleSubmit ~ data:', data)
                refetch()
                setOpenEditModal(false)
                toast({
                  element: (
                    <Alert variant='success'>
                      <Alert.Title className='GeomanistMedium-font'>
                        Cập nhật đơn hàng thành công
                      </Alert.Title>
                    </Alert>
                  )
                })
              }
            })
          })
        }
        w={'100%'}
      >
        <SelectField
          label='Trạng thái đơn hàng'
          {...register('status')}
          options={[
            { value: 'Chờ xác nhận', element: 'Chờ xác nhận' },
            { value: 'Đang thực hiện', element: 'Đang thực hiện' },
            { value: 'Đang đến', element: 'Đang đến' },
            { value: 'Hoàn thành', element: 'Hoàn thành' }
          ]}
        />
        <SelectField
          label='Trạng thái thanh toán'
          {...register('payment_status')}
          options={[
            {
              value: 'Chưa thanh toán',
              element: 'Chưa thanh toán'
            },
            {
              value: 'Đã thanh toán',
              element: 'Đã thanh toán'
            }
          ]}
        />
        <Modal.Footer justify='between'>
          <Button
            variant='tertiary'
            size='md'
            br={'full'}
            color='gray'
            fillOnHover
            type='reset'
            onClick={() => {
              setOpenEditModal(false)
            }}
          >
            Đóng
          </Button>
          <Button variant='tertiary' size='md' br={'full'} fillOnHover>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default EditOrderModal
