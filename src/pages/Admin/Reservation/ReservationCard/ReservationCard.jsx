import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react'
import {
  ActionButton,
  Button,
  Card,
  Flex,
  Image,
  Text,
  fr,
  useToast
} from '@prismane/core'
import { useState } from 'react'
import EditReservationModal from './EditReservationModal/EditReservationModal'
import { useMutation } from '@apollo/client'
import { DELETE_RESERVATION } from '~/pages/Admin/Reservation/schema'

const ReservationCard = ({ reservation, refetch, employee }) => {
  const [viewMode, setViewMode] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const toast = useToast()
  const [deleteReservation] = useMutation(DELETE_RESERVATION)
  const handleDelete = () => {
    deleteReservation({
      variables: {
        id: reservation.reservation_id
      },
      onCompleted: () => {
        refetch()
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Đã xoá đơn đặt bàn thành công
              </Alert.Title>
            </Alert>
          )
        })
      }
    })
  }
  return (
    <>
      <EditReservationModal
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        reservation={reservation}
        refetch={refetch}
        viewMode={viewMode}
      />
      <Card
        w={'calc(33% - 50px)'}
        sx={{ '*': { fontFamily: 'GeomanistMedium !important' } }}
      >
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
            <Text>Mã đặt bàn:</Text>
            <Text>ID Khách hàng:</Text>
            <Text>Tên người đặt:</Text>
            <Text>Bàn:</Text>
            <Text>Mô tả:</Text>
            <Text>Ngày đặt:</Text>
            <Text>Trạng thái:</Text>
          </Flex>
          <Flex direction='column' gap={fr(4)} align='end'>
            <Text>{reservation?.reservation_id || 'Chưa có'}</Text>
            <Text>{reservation?.customer.customer_id || 'Chưa có'}</Text>
            <Text>{reservation?.name || 'Chưa có'}</Text>
            <Text>{reservation?.table.name || 'Chưa có'}</Text>
            <Text>{reservation?.note || 'Chưa có'}</Text>
            <Text>
              {reservation?.reservation_date?.toString().substring(0, 10) +
                ' - ' +
                reservation?.reservation_time || 'Chưa có'}
            </Text>
            <Text>{reservation?.status || 'Chưa có'}</Text>
          </Flex>
        </Flex>
        <Card.Footer align='center' justify='center' gap={fr(4)}>
          <Button
            icon={<Eye />}
            variant='tertiary'
            fillOnHover
            onClick={() => {
              setViewMode(true)
              setOpenEditModal(true)
            }}
          >
            Chi tiết
          </Button>
          <Button
            icon={<PencilSimpleLine />}
            color='blue'
            variant='tertiary'
            fillOnHover
            onClick={() => {
              setViewMode(false)
              setOpenEditModal(true)
            }}
          >
            Chỉnh sửa
          </Button>
          {employee?.is_admin && (
            <Button
              icon={<Trash />}
              color='ruby'
              variant='tertiary'
              fillOnHover
              onClick={() => handleDelete()}
            >
              Xoá
            </Button>
          )}
        </Card.Footer>
      </Card>
    </>
  )
}

export default ReservationCard
