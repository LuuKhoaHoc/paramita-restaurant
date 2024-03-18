import { DotsThree, Pencil, Plus, Trash } from '@phosphor-icons/react'
import {
  Grid,
  Animation,
  fr,
  Text,
  Flex,
  TextField,
  Button,
  Stack,
  Card,
  Image,
  Center,
  ActionButton,
  Menu
} from '@prismane/core'
import React, { useState } from 'react'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'
import ReservationEmpCard from '~/pages/Employee/Reservation/ReservationEmpCard/ReservationEmpCard'
import ReservationEmpAddEditModal from '~/pages/Employee/Reservation/ReservationEmpAddEditModal/ReservationEmpAddEditModal'

const ReservationEmp = ({ employee }) => {
  const [open, setOpen] = useState(
    sessionStorage.getItem('openNavbar') === 'true' ? true : false
  )
  const [openModalAddEdit, setOpenModalAddEdit] = useState(false)
  return (
    <>
      <ReservationEmpAddEditModal
        title={'Thêm'}
        openModalAddEdit={openModalAddEdit}
        setOpenModalAddEdit={setOpenModalAddEdit}
      />
      <Grid templateColumns={12} templateRows={13} h={'100vh'}>
        {/* Navbar */}
        <Grid.Item
          columnStart={1}
          columnEnd={!open ? 2 : 3}
          h={'100vh'}
          bsh={'md'}
        >
          {open ? (
            <Animation animation={'scale-x'} animated={open}>
              <NavbarEmployee />
            </Animation>
          ) : (
            <NavbarEmployeeIcon />
          )}
        </Grid.Item>
        {/* Header */}
        <Grid.Item
          columnStart={!open ? 2 : 3}
          columnEnd={13}
          rowStart={1}
          rowEnd={2}
          bsh={'base'}
        >
          <HeaderEmployee open={open} setOpen={setOpen} employee={employee} />
        </Grid.Item>
        {/* Body */}
        <Grid.Item
          columnStart={!open ? 2 : 3}
          columnEnd={13}
          rowStart={2}
          rowEnd={'auto'}
        >
          <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
            <Text className='GeomanistMedium-font' fs={'xl'}>
              Tất cả đơn đặt bàn
            </Text>
            <Flex align='center' gap={fr(2)}>
              <TextField
                placeholder='Tìm kiếm...'
                // value={query || ''}
                // onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                variant='secondary'
                size='md'
                icon={<Plus weight='bold' />}
                bsh={'sm'}
                onClick={() => {
                  setOpenModalAddEdit(true)
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
          <Stack direction='row' mx={fr(4)} wrap='wrap'>
            {/* <Card w={'33.33%'}>
            <Card.Header>
              <Image
                src='https://picsum.photos/200'
                alt='đặt bàn'
                w={'100%'}
                h={fr(30)}
                br={'base'}
                fit='cover'
              />
            </Card.Header>
            <Text className='GeomanistMedium-font' fs={'lg'}>
              Đặt bàn #1
            </Text>
            <Stack direction='row' justify='between' gap={fr(2)} mt={fr(2)}>
              <Flex direction='column' gap={fr(2)}>
                <Text className='GeomanistMedium-font' fs={'md'}>
                  Lê Thị Thanh Vy
                </Text>
                <Text className='GeomanistMedium-font' fs={'md'}>
                  Số người: 2
                </Text>
              </Flex>
              <Center direction='column' gap={fr(2)}>
                <Text
                  className='GeomanistMedium-font'
                  fs={'base'}
                  cl={['gray', 400]}
                >
                  12:00 12/12/2022
                </Text>
                <Text className='GeomanistMedium-font' fs={'md'}>
                  Bàn số 1
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
                  >
                    <Menu.Icon>
                      <Pencil />
                    </Menu.Icon>
                    <Text className='GeomanistMedium-font'>Sửa</Text>
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
                    <Text className='GeomanistMedium-font'>Xoá</Text>
                  </Menu.Item>
                </Menu>
              </Flex>
            </Card.Footer>
          </Card> */}
            <ReservationEmpCard />
            <ReservationEmpCard />
            <ReservationEmpCard />
          </Stack>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default ReservationEmp
