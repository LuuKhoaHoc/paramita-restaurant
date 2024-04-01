import { Alert, Button, Flex, Modal, Text, useToast } from '@prismane/core'
import {
  DELETE_INVOICE,
  DELETE_INVOICE_DETAIL,
  GET_INVOICES
} from '~/pages/Admin/Invoice/schema'
import { useMutation } from '@apollo/client'

const DeleteInvoiceModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  invoice
}) => {
  const toast = useToast()
  // useMutation to delete InvoiceDetail
  const [deleteInvoiceDetail, { loading: loadingDeleteInvoiceDetail }] =
    useMutation(DELETE_INVOICE_DETAIL)
  // useMutation to delete InvoiceDetail
  const [deleteInvoice, { loading: loadingDeleteInvoice }] =
    useMutation(DELETE_INVOICE)

  const handleDeleteInvoice = async () => {
    const invoiceDetailPromises = invoice?.invoice_details?.map((item) =>
      deleteInvoiceDetail({
        variables: {
          id: item.invoice_detail_id
        }
      })
    )

    if (invoiceDetailPromises) {
      try {
        await Promise.all(invoiceDetailPromises)
      } catch (err) {
        console.log(err)
        return
      }
    }

    deleteInvoice({
      variables: {
        id: invoice?.invoice_id
      },
      onError: (err) => console.log(err),
      refetchQueries: [GET_INVOICES, 'getInvoices'],
      awaitRefetchQueries: true,
      onCompleted: () => {
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Bạn đã xoá hoá đơn thành công
              </Alert.Title>
            </Alert>
          )
        })
        setOpenDeleteModal(false)
      }
    })
  }

  return (
    <Modal
      w={'40vw'}
      open={openDeleteModal}
      onClose={() => setOpenDeleteModal(false)}
    >
      <Modal.Header
        justify={'center'}
        className='GeomanistMedium-font'
        fs={'2xl'}
        cl={'ruby'}
      >
        Cảnh báo
      </Modal.Header>
      <Flex>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          Bạn muốn xóa hoá đơn này ?
        </Text>
      </Flex>
      <Modal.Footer justify='between'>
        <Button
          variant='tertiary'
          size='md'
          br={'full'}
          color='gray'
          fillOnHover
          onClick={() => setOpenDeleteModal(false)}
        >
          Không
        </Button>
        <Button
          variant='tertiary'
          size='md'
          br={'full'}
          color='ruby'
          fillOnHover
          onClick={() => handleDeleteInvoice()}
        >
          Có
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default DeleteInvoiceModal
