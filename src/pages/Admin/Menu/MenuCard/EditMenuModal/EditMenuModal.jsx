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
import { GET_CATEGORIES, UPDATE_MENU } from '~/pages/Admin/Menu/schema'
import { useEffect, useState } from 'react'

const EditMenuModal = ({ openModal, setOpenModal, refetch, menu }) => {
  const toast = useToast()
  const [image, setImage] = useState(menu.image)
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  const [updateMenu, { loading: updateLoading }] = useMutation(UPDATE_MENU)
  const { register, handleSubmit, setError, getError, handleReset, setValue } =
    useForm({
      fields: {
        image: {
          value: image
        },
        name: {
          value: menu?.name || '',
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
          value: menu?.price.toString() || '',
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
          value: menu?.category[0]?.category_id.toString() || '',
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
          value: menu?.description || '',
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
  useEffect(() => {
    setValue('name', menu.name)
    setValue('price', menu.price.toString())
    setValue('category', menu.category[0].category_id.toString())
    setValue('description', menu.description)
  }, [])

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)} w={'40%'}>
      <Modal.Header justify='center' fs={'xl'}>
        <Text className='GeomanistMedium-font'>Chỉnh sửa món ăn</Text>
      </Modal.Header>
      <Form
        onSubmit={(SubmitEvent) => {
          handleSubmit(SubmitEvent, async (v) => {
            await updateMenu({
              variables: {
                id: menu?.item_id,
                data: {
                  name: v.name,
                  image: image,
                  price: Number(v.price),
                  description: v.description,
                  categoryId: Number(v.category)
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
                        Thay đổi món ăn thành công
                      </Alert.Title>
                    </Alert>
                  )
                })
              },
              onError: (error) => {
                console.log('🚀 ~ error:', error)
              }
            })
          })
        }}
      >
        <Flex direction='column' gap={fr(4)}>
          <Image
            src={image}
            alt={menu.name}
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
            {...register('category')}
            className='GeomanistMedium-font'
            cl={'black'}
            options={data?.categoryList.map((category) => ({
              value: category.category_id,
              label: category.name
            }))}
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
            icon={<X />}
            iconPosition='right'
            variant='tertiary'
            size='md'
            color={'gray'}
            type='reset'
            fillOnHover
            onClick={() => setOpenModal(false)}
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
            loading={updateLoading}
          >
            <Text className='GeomanistMedium-font' fs={'md'}>
              Sửa
            </Text>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditMenuModal
