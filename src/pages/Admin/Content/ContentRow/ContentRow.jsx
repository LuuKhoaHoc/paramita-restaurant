import {
  ActionButton,
  Alert,
  Button,
  Flex,
  Form,
  Image,
  Modal,
  Paper,
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
  const [image, setImage] = useState('')
  const toast = useToast()
  const { handleSubmit, register, setValue, handleReset } = useForm({
    fields: {
      title: {
        value: content?.title || ''
      },
      slogan: {
        value: content?.slogan || ''
      },
      description: {
        value: content?.description || ''
      }
    },
    validateOn: 'change'
  })
  const { refetch } = useQuery(GET_CONTENTS)
  const [updateContent, { loading: updateLoading }] =
    useMutation(UPDATE_CONTENT)
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
                    image,
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
                  handleReset()
                  setOpen(false)
                  refetch()
                }
              })
            })
          }}
          onReset={handleReset}
        >
          <Flex
            gap={fr(2)}
            direction='column'
            sx={{
              '.PrismaneTextField-label, .PrismaneTextarea-label, .PrismaneSelectField-label':
                {
                  fontSize: fr(4.5)
                }
            }}
          >
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
              className='GeomanistMedium-font'
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
              disabled
            />
            <SelectField
              className='GeomanistMedium-font'
              label='Vị trí'
              defaultValue={content.position}
              options={[]}
              disabled
            />
          </Flex>
          <Modal.Footer justify='between' align='center' gap={fr(2)}>
            <Button
              size='md'
              variant='secondary'
              color='gray'
              type='reset'
              onClick={() => setOpen(false)}
              loading={updateLoading}
            >
              Đóng
            </Button>
            <Button
              size='md'
              variant='secondary'
              icon={<NotePencil />}
              type='submit'
              loading={updateLoading}
            >
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
          <Image
            src={content.image}
            alt={content.title}
            br={'lg'}
            w={'100%'}
            fit='cover'
          />
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
