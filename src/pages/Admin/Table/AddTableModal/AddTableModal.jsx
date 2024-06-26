import { useMutation } from '@apollo/client'
import {
  Button,
  Field,
  Flex,
  Form,
  Modal,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useForm, useToggle } from '@prismane/core/hooks'
import { z } from 'zod'
import p from '~/utils/zodToPrismane'
import { CREATE_TABLE } from '~/pages/Admin/Table/schema'

const AddTableModal = ({ open, setOpen, refetch }) => {
  const [status, toggle] = useToggle(['Trống', 'Đã đặt', 'Cần dọn'])
  const [addTable] = useMutation(CREATE_TABLE)

  const { handleSubmit, register, handleReset } = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) => {
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Không được bỏ trống trường này' })
            )
          }
        }
      },
      capacity: {
        value: '',
        validators: {
          required: (v) => {
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Không được bỏ trống trường này' })
            )
          }
        }
      },
      status: { value: '' }
    }
  })
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      w={'30%'}
      sx={{
        '.PrismaneTextField-label': {
          fontSize: fr(4.5)
        }
      }}
    >
      <Modal.Header>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Thêm bàn
        </Text>
      </Modal.Header>
      <Form
        onSubmit={(SubmitEvent) =>
          handleSubmit(SubmitEvent, async (v) => {
            await addTable({
              variables: {
                data: {
                  name: v.name,
                  capacity: Number(v.capacity),
                  status: status
                }
              },
              onCompleted: () => {
                refetch()
                setOpen(false)
                handleReset()
              }
            })
          })
        }
        onReset={() => handleReset()}
      >
        <TextField
          label='Tên bàn'
          placeholder='Nhập tên bàn...'
          {...register('name')}
        />
        <TextField
          label='Số lượng chỗ ngồi'
          placeholder='Nhập số lượng bàn...'
          {...register('capacity')}
        />
        <Flex gap={fr(4)}>
          <Field.Label className='GeomanistMedium-font' fs={'md'}>
            Trạng thái: {status}
          </Field.Label>
          <Button
            variant='tertiary'
            br={'full'}
            type='button'
            onClick={() => toggle()}
          >
            Đổi
          </Button>
        </Flex>
        <Modal.Footer justify='between'>
          <Button
            bg={'gray'}
            br={'full'}
            size='md'
            type='reset'
            onClick={() => {
              setOpen(false)
            }}
          >
            Đóng
          </Button>
          <Button variant='secondary' br={'full'} size='md' type='submit'>
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddTableModal
