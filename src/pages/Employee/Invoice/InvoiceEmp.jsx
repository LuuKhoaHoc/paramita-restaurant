import { gql, useQuery } from '@apollo/client'
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
import React, { useEffect, useState } from 'react'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'
import AddEditInvoice from '~/pages/Employee/Invoice/AddEditInvoice/AddEditInvoice'
import InvoiceEmpRow from '~/pages/Employee/Invoice/InvoiceEmpRow/InvoiceEmpRow'

const GET_INVOICE_LIST = gql`
  query getInvoiceList {
    invoiceList {
      invoice_id
      invoice_time
      tsid
      customer {
        name
      }
      voucher {
        name
      }
      payment_method
      payment_status
      total_price
      note
      invoice_details {
        invoice_detail_id
        item {
          item_id
          name
        }
        quantity
        unit_price
        total_price
      }
    }
  }
`

const InvoiceEmp = ({ employee }) => {
  // responsive
  // dark mode
  const [open, setOpen] = useState(
    sessionStorage.getItem('openNavbar') === 'true' ? true : false
  )
  const [openModalAddEdit, setOpenModalAddEdit] = useState(false)
  const [invoices, setInvoices] = useState([])
  const { query, setQuery, filtered } = useSearch(invoices?.invoiceList || [])
  // useQuery invoice
  const {
    data: invoiceList,
    loading: loadingInvoiceList,
    error: errorInvoiceList
  } = useQuery(GET_INVOICE_LIST)
  // useEffect to update invoice list
  useEffect(() => {
    setInvoices(invoiceList)
  }, [invoiceList])
  return (
    <>
      {/* add invoice */}
      <AddEditInvoice
        openModalAddEdit={openModalAddEdit}
        setOpenModalAddEdit={setOpenModalAddEdit}
        title={'Thêm hoá đơn'}
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
              {filtered.map((item) => {
                return <InvoiceEmpRow key={item?.invoice_id} item={item} />
              })}
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
