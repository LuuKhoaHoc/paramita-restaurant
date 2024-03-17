import {
  Dot,
  DotsThree,
  Eye,
  MagnifyingGlass,
  PaintBrush,
  PencilLine,
  Plus,
  Trash
} from '@phosphor-icons/react'
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
  Stack,
  TextField,
  Center,
  useThemeModeValue
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import React, { useState } from 'react'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'
import AddEditInvoice from '~/pages/Employee/Invoice/AddEditInvoice/AddEditInvoice'
import { useResponsive } from '~/utils/responsive'

const InvoiceEmp = ({ employee }) => {
  // responsive
  const { isMobile, isTablet, isLaptop } = useResponsive()
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
      <Modal
        open={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        closable
        w={isMobile ? '100vw' : isTablet ? '60vw' : '40vw'}
      >
        <Modal.Header>
          <Text className='GeomanistMedium-font' fs={isMobile ? 'lg' : 'xl'}>
            Chi tiết hoá đơn
          </Text>
        </Modal.Header>
        <Flex direction='column' gap={fr(4)} fs={isMobile ? 'md' : 'lg'}>
          <Text>Tên khách hàng: Lê Thị Thanh Vy</Text>
          <Text>Số điện thoại: 034 999 999</Text>
          <Text>Voucher: GIAONHANH5</Text>
        </Flex>
        <Table fs={isMobile ? 'sm' : 'base'}>
          <Table.Head ta={'center'}>
            <Table.Row>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>STT</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Tên món</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Đơn giá</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Số lượng</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Tổng</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body ta={'center'}>
            <Table.Row>
              <Table.Cell>
                <Text fs={'md'}>1</Text>
              </Table.Cell>
              <Table.Cell>
                <Text fs={'md'}>Bún Huế Paramita</Text>
              </Table.Cell>
              <Table.Cell>
                <Text fs={'md'}>100.000đ</Text>
              </Table.Cell>
              <Table.Cell>
                <Text fs={'md'}>1</Text>
              </Table.Cell>
              <Table.Cell>
                <Text fs={'md'}>100.000đ</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider />
        <Flex
          direction='column'
          align='end'
          mx={fr(4)}
          fs={isMobile ? 'md' : 'lg'}
        >
          <Text mr={'auto'}>Ghi chú: </Text>
          <Text>Tổng tiền: 100.000đ</Text>
          <Text>Thuế: 5.000đ</Text>
          <Text>Mã giảm giá: -5.000đ</Text>
          <Text cl={'primary'} fs={isMobile ? 'lg' : 'xl'}>
            Thành tiền: 100.000đ
          </Text>
        </Flex>
      </Modal>
      {/* add invoice */}
      <AddEditInvoice
        openModalAddEdit={openModalAddEdit}
        setOpenModalAddEdit={setOpenModalAddEdit}
        title={title}
      />

      <Grid templateColumns={12} templateRows={13} h={'100vh'}>
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
        <Grid.Item
          columnStart={!open ? 2 : 3}
          columnEnd={13}
          rowStart={1}
          rowEnd={2}
          bsh={'base'}
        >
          <HeaderEmployee open={open} setOpen={setOpen} employee={employee} />
        </Grid.Item>
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
