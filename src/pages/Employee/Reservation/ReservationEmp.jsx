import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useQuery } from '@apollo/client'
import { CalendarPlus, DotsThree, Plus } from '@phosphor-icons/react'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'

import { GET_RESERVATIONS } from '~/pages/Admin/Reservation/schema'
import ReservationCard from '~/pages/Admin/Reservation/ReservationCard/ReservationCard'
import AddReservationModal from '~/pages/Admin/Reservation/AddReservationModal/AddReservationModal'

const ReservationEmp = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data, refetch } = useQuery(GET_RESERVATIONS)
  const { query, setQuery, filtered } = useSearch(data?.reservationList || [])
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <AddReservationModal
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        refetch={refetch}
      />
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả đơn đặt bàn
          </Text>
          <Flex align='center' gap={fr(2)}>
            <TextField
              placeholder='Tìm kiếm...'
              value={query || ''}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant='secondary'
              size='md'
              icon={<CalendarPlus weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm đơn đặt bàn
            </Button>
            <Button
              icon={<DotsThree weight='bold' />}
              size='md'
              variant='tertiary'
              bd={'none'}
              bsh={'sm'}
            />
          </Flex>
        </Flex>
        <Stack direction='row' wrap='wrap' gap={fr(3)} px={fr(4)}>
          {filtered?.map((reservation) => {
            return (
              <ReservationCard
                key={reservation.reservation_id}
                reservation={reservation}
                refetch={refetch}
              />
            )
          })}
        </Stack>
      </Flex>
    </>
  )
}

export default ReservationEmp
