import { DotsThree, Pencil, Plus, Trash } from '@phosphor-icons/react'
import {
  fr,
  Text,
  Flex,
  Stack,
  Card,
  Image,
  Center,
  ActionButton,
  Menu
} from '@prismane/core'
import { useState } from 'react'
import ReservationEmpAddEditModal from '~/pages/Employee/Reservation/ReservationEmpAddEditModal/ReservationEmpAddEditModal'
import ReservationEmpDetail from '~/pages/Employee/Reservation/ReservationEmpDetail/ReservationEmpDetail'
const ReservationEmpCard = () => {
  const [openMore, setOpenMore] = useState(false)
  const [openModalAddEdit, setOpenModalAddEdit] = useState(false)
  const [openModalDetail, setOpenModalDetail] = useState(false)
  return (
    <>
      <ReservationEmpAddEditModal
        title={'Sửa'}
        openModalAddEdit={openModalAddEdit}
        setOpenModalAddEdit={setOpenModalAddEdit}
      />
      <ReservationEmpDetail
        openModalDetail={openModalDetail}
        setOpenModalDetail={setOpenModalDetail}
      />
      <Card w={'30%'}>
        <Card.Header cs={'pointer'} onClick={() => setOpenModalDetail(true)}>
          <Image
            src='https://picsum.photos/200'
            alt='đặt bàn'
            w={'100%'}
            h={fr(30)}
            br={'base'}
            fit='cover'
          />
        </Card.Header>
        <Stack direction='row' justify='between' gap={fr(2)} mt={fr(2)}>
          <Flex direction='column' gap={fr(2)}>
            <Text className='GeomanistMedium-font' fs={'lg'}>
              Đặt bàn #1
            </Text>
            <Text className='GeomanistMedium-font' fs={'md'}>
              Lê Thị Thanh Vy
            </Text>
          </Flex>
          <Center direction='column' gap={fr(2)}>
            <Text className='GeomanistMedium-font' fs={'base'} cl={'primary'}>
              12:00
            </Text>
            <Text
              className='GeomanistMedium-font'
              fs={'base'}
              cl={['gray', 400]}
            >
              12/12/2022
            </Text>
          </Center>
        </Stack>
        <Card.Footer align='center' justify='center'>
          <Text
            className='GeomanistMedium-font'
            fs={'xl'}
            cl={'primary'}
            mr={'auto'}
          >
            Đã đặt bàn
          </Text>
          <Flex direction='column'>
            <ActionButton
              mr={'14px'}
              icon={<DotsThree />}
              size='sm'
              onClick={() => {
                setOpenMore(!openMore)
              }}
            />
            <Menu open={openMore} pos={'absolute'} mt={fr(10)}>
              <Menu.Item
                bg={['inherit', { hover: ['blue', 400] }]}
                cl={['inherit', { hover: 'white' }]}
                align='center'
                justify='center'
                onClick={() => {
                  setOpenMore(false)
                  setOpenModalAddEdit(true)
                }}
              >
                <Menu.Icon>
                  <Pencil />
                </Menu.Icon>
                <Text className='GeomanistMedium-font' fs={'base'}>
                  Sửa
                </Text>
              </Menu.Item>
              <Menu.Item
                bg={['inherit', { hover: 'ruby' }]}
                cl={['inherit', { hover: 'white' }]}
                align='center'
                justify='center'
              >
                <Menu.Icon>
                  <Trash />
                </Menu.Icon>
                <Text className='GeomanistMedium-font' fs={'base'}>
                  Xoá
                </Text>
              </Menu.Item>
            </Menu>
          </Flex>
        </Card.Footer>
      </Card>
    </>
  )
}

export default ReservationEmpCard
