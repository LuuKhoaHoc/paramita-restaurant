import {
  ActionButton,
  Alert,
  Button,
  Flex,
  Form,
  Modal,
  SelectField,
  Table,
  Text,
  TextField,
  TextareaField,
  fr,
  useToast
} from '@prismane/core'

import { NotePencil } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useForm } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { GET_CONTENTS, UPDATE_CONTENT } from '~/pages/Admin/Content/schema'
import { useMutation, useQuery } from '@apollo/client'

const ContentRow = ({ content }) => {
  const [open, setOpen] = useState(false)
  const toast = useToast()
  const { handleSubmit, register, setValue } = useForm({
    fields: {
      title: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không bỏ trống tiêu đề' })
            )
        }
      },
      slogan: {
        value: ''
      },
      description: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không bỏ trống mô tả' }))
        }
      }
    },
    validateOn: 'change'
  })
  useEffect(() => {
    setValue('title', content.title)
    setValue('slogan', content.slogan)
    setValue('description', content.description)
  }, [])
  const { refetch } = useQuery(GET_CONTENTS)
  const [updateContent, { loading: updateLoading }] =
    useMutation(UPDATE_CONTENT)

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setValue('title', content.title)
          setValue('slogan', content.slogan)
          setValue('description', content.description)
          setOpen(false)
        }}
        w={'40%'}
      >
        <Modal.Header justify='center'>
          <Text fs={'xl'} className='GeomanistMedium-font'>
            Chỉnh sửa nội dung
          </Text>
        </Modal.Header>
        <Form
          onSubmit={(SubmitEvent) => {
            handleSubmit(SubmitEvent, async (v) => {
              await updateContent({
                variables: {
                  id: content.content_id,
                  data: {
                    title: v.title,
                    slogan: v.slogan,
                    description: v.description,
                    pageId: content.page.page_id
                  }
                },
                onCompleted: () => {
                  toast({
                    element: (
                      <Alert variant='success'>
                        <Alert.Title className='GeomanistMedium-font'>
                          Đã cập nhật nội dung thành công
                        </Alert.Title>
                      </Alert>
                    )
                  })
                  setOpen(false)
                  refetch()
                }
              })
            })
          }}
          onReset={() => {
            setValue('title', content.title)
            setValue('slogan', content.slogan)
            setValue('description', content.description)
            setOpen(false)
          }}
        >
          <Flex
            gap={fr(2)}
            direction='column'
            sx={{
              '.PrismaneTextField-label, .PrismaneTextarea-label': {
                fontSize: fr(4.5)
              }
            }}
          >
            <TextField
              label='Tiêu đề'
              placeholder='Nhập tiêu đề...'
              {...register('title')}
            />
            <TextField
              label='Slogan'
              placeholder='Nhập slogan...'
              {...register('slogan')}
            />
            <TextareaField
              className='Geomanist-font'
              label='Mô tả'
              size='md'
              placeholder='Nhập mô tả...'
              {...register('description')}
            />
            <SelectField
              className='GeomanistMedium-font'
              label='Trang'
              defaultValue={content.page.name}
              options={[]}
            />
            <SelectField
              className='GeomanistMedium-font'
              label='Vị trí'
              defaultValue={content.position}
              options={[]}
            />
          </Flex>
          <Modal.Footer justify='end' align='center' gap={fr(2)}>
            <Button size='md' variant='secondary' color='gray' type='reset'>
              Đóng
            </Button>
            <Button variant='secondary' icon={<NotePencil />} type='submit'>
              Sửa
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Table.Row>
        <Table.Cell>{content.content_id}</Table.Cell>
        <Table.Cell>{content.title}</Table.Cell>
        <Table.Cell>{content.slogan}</Table.Cell>
        <Table.Cell w={'30%'} of={'auto'}>
          {content.description}
        </Table.Cell>
        <Table.Cell>
          <img src={content.image} alt={content.title} />
        </Table.Cell>
        <Table.Cell>{content.page.name}</Table.Cell>
        <Table.Cell>{content.position}</Table.Cell>
        <Table.Cell>
          <ActionButton
            icon={<NotePencil />}
            fillOnHover
            onClick={() => setOpen(true)}
          />
        </Table.Cell>
      </Table.Row>
    </>
  )
}
export default ContentRow
