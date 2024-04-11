import {
  Modal,
  Form,
  TextField,
  TextareaField,
  NativeSelectField,
  NativeDateField,
  Field,
  Button,
  fr,
  useToast,
  Alert
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { Plus, X } from '@phosphor-icons/react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useMutation, useQuery } from '@apollo/client'
import { GET_RANK } from '~/pages/Admin/CustomerManager/schema'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { ADD_PROMOTION, GET_PROMOTIONS } from '~/pages/Admin/Promotion/schema'
import { checkPromotion } from '~/pages/Admin/Promotion/checkPromotion'
import { toolbarOptions } from '~/utils/toolbarOption'

const AddPromotionModal = ({ open, setOpen }) => {
  const toast = useToast()
  const { loading, data } = useQuery(GET_RANK)
  const [description, setDescription] = useState('')
  const [desError, setDesError] = useState('')
  const [addPromotion] = useMutation(ADD_PROMOTION)

  const module = {
    toolbar: toolbarOptions
  }
  const { register, handleSubmit, handleReset } = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, {
                message: 'Vui lòng nhập tên chương trình khuyến mãi'
              })
            )
        }
      },
      condition: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng nhập điều kiện áp dụng' })
            )
        }
      },
      discount: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng nhập giá trị khuyến mãi' })
            )
        }
      },
      target: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng chọn đối tượng áp dụng' })
            )
        }
      },
      startDate: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui là chọn ngày đặt bàn' })
            )
        }
      },
      endDate: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui là chọn ngày đặt bàn' })
            )
        }
      }
    }
  })
  const handleResetForm = () => {
    setDescription('')
    setDesError('')
    handleReset()
    setOpen(false)
  }
  return (
    <Modal
      open={open}
      onClose={handleResetForm}
      w={'60vw'}
      sx={{
        '*': {
          fontFamily: 'GeomanistMedium !important'
        }
      }}
    >
      <Modal.Header justify='center' className='GeomanistMedium-font' fs={'xl'}>
        Thêm chương trình khuyến mãi
      </Modal.Header>
      <Form
        onReset={handleReset}
        onSubmit={(SubmitEvent) =>
          handleSubmit(SubmitEvent, (v) => {
            if (description === '<p><br></p>') {
              setDesError('Vui lòng nhập một nội dung chương trình khuyến mãi')
              return
            } else {
              setDesError('')
              try {
                addPromotion({
                  variables: {
                    data: {
                      name: v.name,
                      description: description,
                      startDate: new Date(v.startDate),
                      endDate: new Date(v.endDate),
                      target: v.target,
                      condition: v.condition,
                      discount: +v.discount,
                      status: checkPromotion(v.startDate, v.endDate)
                    }
                  },
                  onError: (err) => console.log(err),
                  refetchQueries: [{ query: GET_PROMOTIONS }],
                  awaitRefetchQueries: true,
                  onCompleted: () => {
                    toast({
                      element: (
                        <Alert variant='success'>
                          <Alert.Title className='GeomanistMedium-font'>
                            Thêm chương trình khuyến mãi thành công
                          </Alert.Title>
                        </Alert>
                      ),
                      duration: 2000
                    })
                    handleReset()
                    setDescription('')
                    setOpen(false)
                  }
                })
              } catch (error) {
                console.log('🚀 ~ handleSubmit ~ error:', error)
              }
            }
          })
        }
      >
        <TextField
          addons={
            <Field.Addon w={'13%'} position='left'>
              Tiêu đề
            </Field.Addon>
          }
          placeholder='Nhập tiêu đề chương trình khuyến mãi...'
          {...register('name')}
        />
        <TextField
          addons={
            <Field.Addon w={'13%'} position='left'>
              Điều kiện
            </Field.Addon>
          }
          placeholder='Nhập điều kiện áp dụng khuyến mãi...'
          {...register('condition')}
        />
        <TextField
          addons={
            <>
              <Field.Addon w={'13%'} position='left'>
                Giảm
              </Field.Addon>
              <Field.Addon position='right'>VNĐ</Field.Addon>
            </>
          }
          placeholder='Nhập giá trị khuyến mãi...'
          {...register('discount')}
        />
        <NativeSelectField
          addons={
            <Field.Addon w={'13%'} position='left'>
              Chọn đối tượng
            </Field.Addon>
          }
          {...register('target')}
          options={data?.customerLevelList?.map((item) => ({
            label: item.name,
            value: item.id
          }))}
        />
        <NativeDateField
          addons={
            <Field.Addon w={'13%'} position='left'>
              Ngày bắt đầu
            </Field.Addon>
          }
          {...register('startDate')}
        />
        <NativeDateField
          addons={
            <Field.Addon w={'13%'} position='left'>
              Ngày kết thúc
            </Field.Addon>
          }
          {...register('endDate')}
        />
        <ReactQuill
          theme='snow'
          modules={module}
          style={{
            height: fr(50)
          }}
          value={description}
          onChange={(v) => setDescription(v)}
        />
        <Field.Error>{desError}</Field.Error>
        <Modal.Footer justify='between' mt={fr(10)}>
          <Button
            icon={<X />}
            type='reset'
            br={'full'}
            onClick={handleResetForm}
            color='gray'
            variant='tertiary'
          >
            Đóng
          </Button>
          <Button
            icon={<Plus />}
            type='submit'
            br={'full'}
            variant='tertiary'
            fillOnHover
          >
            Tạo
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default AddPromotionModal
