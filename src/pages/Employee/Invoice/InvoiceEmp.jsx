import { DotsThree, Eye, PencilLine, Plus, Trash } from '@phosphor-icons/react'
import {
  Grid,
  Animation,
  fr,
  Divider,
  Text,
  Button,
  Flex,
  Table,
  Icon,
  NativeSelectField,
  Modal,
  TextField
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import React, { useState } from 'react'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'
import AddEditInvoice from '~/pages/Employee/Invoice/AddEditInvoice/AddEditInvoice'
import InvoiceEmpDetail from '~/pages/Employee/Invoice/InvoiceEmpDetail/InvoiceEmpDetail'

const InvoiceEmp = ({ employee }) => {
  // responsive
  // dark mode
  const [open, setOpen] = useState(
    sessionStorage.getItem('openNavbar') === 'true' ? true : false
  )
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [openModalAddEdit, setOpenModalAddEdit] = useState(false)
  const [title, setTitle] = useState('')
  const { query, setQuery, filtered } = useSearch([
    {
      id: '0331313131331',
      name: 'Lê Thị Thanh Vy',
      date: '31/12/2023'
    },
    {
      id: '1231312',
      name: 'Lưu Khoa Học',
      date: '31/12/2023'
    }
  ])
  return (
    <>
      {/* Invoice detail */}
      <InvoiceEmpDetail
        openModalDetail={openModalDetail}
        setOpenModalDetail={setOpenModalDetail}
      />
      {/* add invoice */}
      <AddEditInvoice
        openModalAddEdit={openModalAddEdit}
        setOpenModalAddEdit={setOpenModalAddEdit}
        title={title}
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
              Tất cả hoá đơn
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
                icon={<Plus weight='bold' />}
                bsh={'sm'}
                onClick={() => {
                  setTitle('Thêm hoá đơn')
                  setOpenModalAddEdit(true)
                }}
              >
                Thêm hoá đơn
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
          <Table>
            <Table.Head ta={'center'}>
              <Table.Row>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Mã hoá đơn</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Tên khách hàng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Trạng thái</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>
                    Phương thức thanh toán
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Ngày tạo</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Hành động</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body ta={'center'}>
              {filtered.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Text fs={'md'}>#{item.id}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fs={'md'}>{item.name}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <NativeSelectField
                      // className='GeomanistMedium-font'
                      name='selectStatus'
                      options={[
                        {
                          value: 'pending',
                          label: 'Chờ thanh toán'
                        },
                        {
                          value: 'completed',
                          label: 'Đã thanh toán'
                        }
                      ]}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <NativeSelectField
                      name='selectPaymentMethod'
                      options={[
                        {
                          value: 'tien-mat',
                          label: 'Tiền mặt'
                        },
                        {
                          value: 'ngan-hang',
                          label: 'Ngân hàng'
                        },
                        {
                          value: 'mo-mo',
                          label: 'Momo'
                        }
                      ]}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Text fs={'md'}>{item.date}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={fr(4)} align='center' justify='center'>
                      <Icon
                        cs={'pointer'}
                        cl={'green'}
                        onClick={() => {
                          setOpenModalDetail(true)
                        }}
                      >
                        <Eye />
                      </Icon>
                      <Icon
                        cs={'pointer'}
                        cl={'blue'}
                        onClick={() => {
                          setTitle('Sửa đơn hàng')
                          setOpenModalAddEdit(true)
                        }}
                      >
                        <PencilLine />
                      </Icon>
                      <Icon cs={'pointer'} cl={'red'} onClick={() => {}}>
                        <Trash />
                      </Icon>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Foot ta={'center'}>
              <Table.Row>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Mã hoá đơn</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Tên khách hàng</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Trạng thái</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>
                    Phương thức thanh toán
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Ngày tạo</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className='GeomanistMedium-font'>Hành động</Text>
                </Table.Cell>
              </Table.Row>
            </Table.Foot>
          </Table>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default InvoiceEmp
