import { Eye, Pen, Trash } from '@phosphor-icons/react'
import {
  ActionButton,
  Alert,
  Button,
  Flex,
  Modal,
  Table,
  Text,
  fr,
  useToast
} from '@prismane/core'
import { useState } from 'react'
import { DELETE_CONTACT } from '~/pages/Admin/Contact/schema'
import { useMutation } from '@apollo/client'
import ContactDetailDrawer from '~/pages/Admin/Contact/ContactRow/ContactDetailDrawer/ContactDetailDrawer'

const ContactRow = ({ contact, refetch, employee }) => {
  const toast = useToast()
  const [deleteContact] = useMutation(DELETE_CONTACT)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleDeleteContact = () => {
    deleteContact({
      variables: {
        id: contact?.order_id
      },
      onError: (err) => console.log(err),
      onCompleted: (data) => {
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Đã xoá thành công
              </Alert.Title>
            </Alert>
          )
        })
        setOpenDeleteModal(false)
      }
    })
  }

  return (
    <>
      <Table.Row ta={'center'}>
        <Table.Cell>{contact?.contact_id}</Table.Cell>
        <Table.Cell>{contact?.name}</Table.Cell>
        <Table.Cell>{contact?.email}</Table.Cell>
        <Table.Cell>{contact?.createAt}</Table.Cell>
        <Table.Cell>
          <ContactDetailDrawer
            contact={contact}
            open={openDetailModal}
            setOpen={setOpenDetailModal}
          />
          <Modal
            w={'40vw'}
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          >
            <Modal.Header
              justify={'center'}
              className='GeomanistMedium-font'
              fs={'2xl'}
              cl={'ruby'}
            >
              Cảnh báo
            </Modal.Header>
            <Flex>
              <Text fs={'lg'} className='GeomanistMedium-font'>
                Bạn muốn xóa thông tin liên hệ này ?
              </Text>
            </Flex>
            <Modal.Footer justify='between'>
              <Button
                variant='tertiary'
                size='md'
                br={'full'}
                color='gray'
                fillOnHover
                onClick={() => setOpenDeleteModal(false)}
              >
                Không
              </Button>
              <Button
                variant='tertiary'
                size='md'
                br={'full'}
                color='ruby'
                fillOnHover
                onClick={() => handleDeleteContact()}
              >
                Có
              </Button>
            </Modal.Footer>
          </Modal>
          <Flex gap={fr(4)} justify='center'>
            <Button
              icon={<Eye />}
              variant='tertiary'
              fillOnHover
              onClick={() => setOpenDetailModal(true)}
            >
              Chi tiết
            </Button>
            {employee?.id_admin && (
              <Button
                icon={<Trash />}
                variant='tertiary'
                fillOnHover
                color='ruby'
                onClick={() => setOpenDeleteModal(true)}
              >
                Xoá
              </Button>
            )}
          </Flex>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default ContactRow
