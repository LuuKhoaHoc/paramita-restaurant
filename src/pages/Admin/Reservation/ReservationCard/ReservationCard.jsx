import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { ActionButton, Card, Flex, Image, Text, fr } from '@prismane/core'
import { useState } from 'react'
import EditReservationModal from './EditReservationModal/EditReservationModal'
const ReservationCard = ({ reservation }) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  return (
    <>
      <EditReservationModal
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
      />
      <Card w={'calc(25% - 50px)'}>
        <Card.Header justify='center'>
          <Image
            src='https://picsum.photos/seed/picsum/200/300'
            alt=''
            br={'xl'}
            w={'100%'}
            h={fr(25)}
            fit='cover'
          />
        </Card.Header>
        <Flex justify='between' py={fr(4)}>
          <Flex direction='column' gap={fr(4)}>
            <Text className='GeomanistMedium-font'>Mã đặt bàn:</Text>
            <Text className='GeomanistMedium-font'>Khách hàng:</Text>
            <Text className='GeomanistMedium-font'>Mã bàn:</Text>
            <Text className='GeomanistMedium-font'>Mô tả:</Text>
            <Text className='GeomanistMedium-font'>Ngày đặt:</Text>
            <Text className='GeomanistMedium-font'>Trạng thái:</Text>
          </Flex>
          <Flex direction='column' gap={fr(2)} align='end'>
            {/* <Text className='GeomanistMedium-font'>
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
            </Text> */}
          </Flex>
        </Flex>
        <Card.Footer align='center' justify='center' gap={fr(4)}>
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

export default ReservationCard
