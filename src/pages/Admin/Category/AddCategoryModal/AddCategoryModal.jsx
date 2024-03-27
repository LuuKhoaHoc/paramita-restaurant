import { Plus, X } from '@phosphor-icons/react'
import {
  Alert,
  Button,
  Flex,
  Form,
  Modal,
  Text,
  TextField,
  useToast
} from '@prismane/core'
import { useMutation } from '@apollo/client'
import { ADD_CATEGORY } from '~/pages/Admin/Category/schema'
import { useForm } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { AlertCustom } from '~/components'

const AddCategoryModal = ({ open, setOpen, refetch }) => {
  const [addCategory] = useMutation(ADD_CATEGORY)
  const toast = useToast()
  const { handleSubmit, register, handleReset } = useForm({
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
                .min(1, { message: 'Không được bỏ trống trường này!' })
            )
        }
      }
    }
  })
  return (
    <Modal open={open} onClose={() => setOpen(false)} w={'40%'}>
      <Modal.Header justify='center'>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Thêm danh mục món ăn
        </Text>
      </Modal.Header>
      <Form
        onSubmit={(SubmitEvent) => {
          handleSubmit(SubmitEvent, async (v) => {
            await addCategory({
              variables: {
                data: {
                  name: v.name
                }
              },
              onCompleted: (data) => {
                toast({
                  element: (
                    <Alert variant='success'>
                      <Alert.Title className='GeomanistMedium-font'>
                        Đã thêm danh mục
                      </Alert.Title>
                    </Alert>
                  )
                })
                setOpen(false)
                handleReset()
                refetch()
              }
            })
          })
        }}
        onReset={handleReset}
      >
        <Flex direction='column'>
          <TextField placeholder='Nhập tên danh mục...' {...register('name')} />
        </Flex>
        <Modal.Footer justify='between'>
          <Button
            bg={'gray'}
            br={'full'}
            size='md'
            icon={<X />}
            type='reset'
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
          <Button
            variant='secondary'
            br={'full'}
            size='md'
            icon={<Plus />}
            type='submit'
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddCategoryModal
