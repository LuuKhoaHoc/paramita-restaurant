import { useMutation, useQuery } from '@apollo/client'
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
import {
  GET_TABLES,
  UPDATE_TABLE,
  DELETE_TABLE
} from '~/pages/Admin/Table/schema'

const EditTableModal = ({ open, setOpen, table }) => {
  const [status, toggle] = useToggle(['Trống', 'Đã đặt', 'Cần dọn'])
  const { refetch } = useQuery(GET_TABLES)
  const [updateTable] = useMutation(UPDATE_TABLE)
  const [deleteTable] = useMutation(DELETE_TABLE)

  const handleDelete = () => {
    deleteTable({ variables: { id: table?.table_id } }).then((res) => {
      if (res.data.deleteTable) {
        refetch()
        setOpen(false)
      }
    })
  }

  const { handleSubmit, register, handleReset } = useForm({
    fields: {
      name: {
        value: table?.name,
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
        value: table?.capacity,
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
      status: { value: table?.status }
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
          Chỉnh sửa thông tin bàn
        </Text>
      </Modal.Header>
      <Form
        onSubmit={(SubmitEvent) =>
          handleSubmit(SubmitEvent, async (v) => {
            await updateTable({
              variables: {
                id: table?.table_id,
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
          <Button
            variant='secondary'
            br={'full'}
            size='md'
            color={'red'}
            type='button'
            onClick={() => handleDelete()}
          >
            Xoá bàn
          </Button>
          <Button variant='secondary' br={'full'} size='md' type='submit'>
            Sửa
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditTableModal
