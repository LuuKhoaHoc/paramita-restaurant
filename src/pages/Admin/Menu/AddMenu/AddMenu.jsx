import { CheckCircle, X } from '@phosphor-icons/react'
import {
  Alert,
  Button,
  Field,
  Flex,
  Form,
  Image,
  Modal,
  NativeSelectField,
  Paper,
  SelectField,
  Text,
  TextField,
  TextareaField,
  fr,
  useToast
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { z } from 'zod'
import p from '~/utils/zodToPrismane'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CATEGORIES, ADD_MENU } from '~/pages/Admin/Menu/schema'
import { useState } from 'react'

const AddMenu = ({ openModal, setOpenModal, refetch }) => {
  const toast = useToast()
  const [image, setImage] = useState('')
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  const [addMenu, { loading: addLoading }] = useMutation(ADD_MENU)
  const { register, handleSubmit, setError, getError, handleReset } = useForm({
    fields: {
      image: {
        value: ''
      },
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
      },
      price: {
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
      },
      category: {
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
      },
      description: {
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
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = function () {
      // After the file has been read, the result as base64 will be accessible in reader.result
      setImage(reader.result) // Now reader.result should be the base64 string of your file
    }

    if (file) {
      // Convert the file to base64
      reader.readAsDataURL(file)
    }
  }
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)} w={'40%'}>
      <Modal.Header justify='center' fs={'xl'}>
        <Text className='GeomanistMedium-font'>Thêm món</Text>
      </Modal.Header>
      <Form
        onSubmit={(SubmitEvent) => {
          handleSubmit(
            SubmitEvent,
            async (v) => {
              await addMenu({
                variables: {
                  data: {
                    name: v.name,
                    image,
                    price: Number(v.price),
                    description: v.description,
                    categoryId: Number(v.category),
                    image
                  }
                },
                onCompleted: (data) => {
                  setOpenModal(false)
                  handleReset()
                  refetch()
                  toast({
                    element: (
                      <Alert variant='success'>
                        <Alert.Title ff={'GeomanistMedium !important'}>
                          Đã thêm món ăn thành công
                        </Alert.Title>
                      </Alert>
                    )
                  })
                },
                onError: (error) => {
                  console.log('🚀 ~ error:', error)
                }
              })
            },
            (error) => {
              if (!error.image) {
                setError('image', 'Vui lòng chọn hình ảnh!')
              }
            }
          )
        }}
        onReset={handleReset}
      >
        <Flex direction='column' gap={fr(4)}>
          <Image
            src={
              image ||
              'https://fakeimg.pl/600x300/39b54a/ffffff?text=Paramita&font=lobster'
            }
            alt={'food-image'}
            w={'80%'}
            h={fr(30)}
            fit='cover'
            mx={'auto'}
            br={'lg'}
            bsh={'md'}
          />
          <Paper as={'input'} type='file' onChange={handleFileChange} />
          <Field.Error>{getError('image')}</Field.Error>
          <NativeSelectField
            placeholder='Chọn danh mục cho món ăn...'
            className='GeomanistMedium-font'
            {...register('category')}
            options={data?.categoryList.map((category) => ({
              value: category.category_id,
              label: category.name
            }))}
            sx={{
              '.PrismaneMenu-root-open': {
                overflow: 'auto'
              }
            }}
          />
          <TextField placeholder='Nhập tên món ăn...' {...register('name')} />
          <TextField
            placeholder='Nhập giá món ăn...'
            {...register('price')}
            addons={['.000VNĐ']}
          />
          <TextareaField
            sx={{ '.PrismaneTextarea-root': { minHeight: fr(20) } }}
            {...register('description')}
            className='GeomanistMedium-font'
            placeholder='Nhập mô tả...'
          />
        </Flex>
        <Modal.Footer align='center' justify='between'>
          <Button
            variant='tertiary'
            icon={<X />}
            iconPosition='right'
            size='md'
            color={'gray'}
            type='reset'
            onClick={() => setOpenModal(false)}
            fillOnHover
          >
            <Text className='GeomanistMedium-font' fs={'md'}>
              Đóng
            </Text>
          </Button>
          <Button
            icon={<CheckCircle />}
            iconPosition='right'
            size='md'
            variant='secondary'
            type='submit'
            loading={addLoading}
          >
            <Text className='GeomanistMedium-font' fs={'md'}>
              Thêm
            </Text>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddMenu
