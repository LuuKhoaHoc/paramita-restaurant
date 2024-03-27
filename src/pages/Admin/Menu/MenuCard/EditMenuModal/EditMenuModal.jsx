import { CheckCircle, X } from '@phosphor-icons/react'
import {
  Button,
  Field,
  Flex,
  Form,
  Image,
  Modal,
  Paper,
  SelectField,
  Text,
  TextField,
  TextareaField,
  fr
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { z } from 'zod'
import p from '~/utils/zodToPrismane'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CATEGORIES, UPDATE_MENU } from '~/pages/Admin/Menu/schema'
import { useEffect, useState } from 'react'

const EditMenuModal = ({ openModal, setOpenModal, refetch, menu }) => {
  const [image, setImage] = useState(menu.image)
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  const [updateMenu] = useMutation(UPDATE_MENU)
  const { register, handleSubmit, setError, getError, handleReset, setValue } =
    useForm({
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
            if (v.image === '') {
              setError('image', 'Vui lòng chọn hình ảnh!')
            } else {
              let image = v.image?.split('\\').pop()
              await updateMenu({
                variables: {
                  id: menu?.item_id,
                  data: {
                    name: v.name,
                    image,
                    price: Number(v.price),
                    description: v.description,
                    categoryId: Number(v.category)
                  }
                },
                onCompleted: (data) => {
                  setOpenModal(false)
                  handleReset()
                  refetch()
                },
                onError: (error) => {
                  console.log('🚀 ~ error:', error)
                }
              })
            }
          })
        }}
      >
        <Flex direction='column' gap={fr(4)}>
          <Image
            src={
              image ||
              'https://www.viquekitchen.com/wp-content/uploads/2022/10/Nam-bau-ngu-xoc-muoi-Brunchy-abalone-mushroom-Trans-600x400.jpg'
            }
            alt={menu.name}
            w={'80%'}
            h={fr(30)}
            fit='cover'
            mx={'auto'}
            br={'lg'}
            bsh={'md'}
          />
          <Paper
            // w={'100%'}
            // h={fr(30)}
            // bg={'slate'}
            as={'input'}
            type='file'
            // cs={'pointer'}
            {...register('image')}
          />
          <Field.Error>{getError('image')}</Field.Error>
          <SelectField
            placeholder='Chọn danh mục cho món ăn...'
            {...register('category')}
            className='GeomanistMedium-font'
            cl={'black'}
            options={data?.categoryList.map((category) => ({
              value: category.category_id,
              element: category.name
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
            size='md'
            bg={'gray'}
            type='reset'
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
