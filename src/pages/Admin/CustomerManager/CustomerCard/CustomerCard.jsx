import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { ActionButton, Card, Flex, Image, Text, fr } from '@prismane/core'
import { useState } from 'react'

const CustomerCard = ({ customer }) => {
  console.log('🚀 ~ CustomerCard ~ customer:', customer)
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
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
            <Text className='GeomanistMedium-font'>Email</Text>
            <Text className='GeomanistMedium-font'>Số điện thoại:</Text>
            <Text className='GeomanistMedium-font'>Cấp bậc:</Text>
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
            onClick={() => setOpenModal(true)}
          />
          <ActionButton
            icon={<PencilSimpleLine />}
            color='blue'
            fillOnHover
            onClick={() => setOpenEditModal(true)}
          />
          <ActionButton icon={<Trash />} color='ruby' fillOnHover />
        </Card.Footer>
      </Card>
    </>
  )
}
export default CustomerCard
