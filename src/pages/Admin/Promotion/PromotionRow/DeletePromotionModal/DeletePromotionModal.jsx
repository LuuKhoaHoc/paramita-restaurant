import { Modal, Button, useToast, Alert } from '@prismane/core'
import { X, Trash } from '@phosphor-icons/react'
import { useMutation } from '@apollo/client'
import {
  DELETE_PROMOTION,
  GET_PROMOTIONS
} from '~/pages/Admin/Promotion/schema'

const DeletePromotionModal = ({ promotion, open, setOpen }) => {
  const toast = useToast()
  const [deletePromotion] = useMutation(DELETE_PROMOTION)
  const handleDelete = () => {
    deletePromotion({
      variables: {
        id: promotion?.promotion_id
      },
      onError: (err) => console.log(err),
      refetchQueries: [GET_PROMOTIONS],
      awaitRefetchQueries: true,
      onCompleted: () => {
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Xóa chương trình khuyến mãi thành công
              </Alert.Title>
            </Alert>
          )
        })
      }
    })
  }
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} closable w={'40vw'}>
        <Modal.Header fs={'xl'} ff={'GeomanistMedium !important'}>
          Bạn có chắc chắn xoá chương trình khuyến mãi này?
        </Modal.Header>
        <Modal.Footer direction='row' justify='between'>
          <Button
            br={'full'}
            size='md'
            variant='secondary'
            color='gray'
            icon={<X />}
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
          <Button
            br={'full'}
            size='md'
            variant='tertiary'
            color='red'
            icon={<Trash />}
            onClick={handleDelete}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeletePromotionModal
