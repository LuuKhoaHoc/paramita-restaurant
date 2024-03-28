import { useMutation } from '@apollo/client'
import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react'
import {
  ActionButton,
  Alert,
  Card,
  Flex,
  Image,
  Text,
  fr,
  useToast
} from '@prismane/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_CUSTOMER } from '~/pages/Admin/CustomerManager/schema'

const CustomerCard = ({ customer, refetch }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER)

  const handleDelete = async () => {
    await deleteCustomer({
      variables: {
        id: customer?.customer_id
      },
      onCompleted: (res) => {
        refetch()
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Xoá khách hàng {res.deleteCustomer.name} thành công~
              </Alert.Title>
            </Alert>
          )
        })
      }
    })
  }
  return (
    <>
      <Card w={'calc(25% - 50px)'}>
        <Card.Header justify='center'>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            alt=''
            br={'full'}
            w={'60%'}
            h={'100%'}
          />
        </Card.Header>
        <Flex justify='between' py={fr(4)}>
          <Flex direction='column' gap={fr(2)}>
            <Text className='GeomanistMedium-font'>Họ tên:</Text>
            <Text className='GeomanistMedium-font'>Email:</Text>
            <Text className='GeomanistMedium-font'>SĐT:</Text>
            <Text className='GeomanistMedium-font'>Rank:</Text>
            <Text className='GeomanistMedium-font'>Trạng thái:</Text>
          </Flex>
          <Flex direction='column' gap={fr(2)} align='end'>
            <Text className='GeomanistMedium-font'>
              {customer?.name || 'Chưa có'}
            </Text>
            <Text className='GeomanistMedium-font'>
              {customer?.email || 'Chưa có'}
            </Text>
            <Text className='GeomanistMedium-font'>
              {customer?.phone || 'Chưa có'}
            </Text>
            <Text className='GeomanistMedium-font'>
              {customer?.level.name || 'Chưa có'}
            </Text>
            <Text className='GeomanistMedium-font'>
              {(customer?.status).toString() === 'true'
                ? 'Đang hoạt động'
                : 'Ẩn'}
            </Text>
          </Flex>
        </Flex>
        <Card.Footer align='center' justify='center' gap={fr(4)}>
          <ActionButton
            icon={<Eye />}
            fillOnHover
            onClick={() =>
              navigate(`${customer?.customer_id}`, { state: customer })
            }
          />
          <ActionButton
            icon={<PencilSimpleLine />}
            color='blue'
            fillOnHover
            onClick={() =>
              navigate(`${customer?.customer_id}/edit`, {
                state: customer
              })
            }
          />
          <ActionButton
            icon={<Trash />}
            color='ruby'
            fillOnHover
            onClick={() => handleDelete()}
          />
        </Card.Footer>
      </Card>
    </>
  )
}
export default CustomerCard
