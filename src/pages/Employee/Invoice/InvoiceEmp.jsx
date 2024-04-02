import {
  Button,
  Flex,
  Skeleton,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useQuery } from '@apollo/client'

import { GET_INVOICES } from '~/pages/Admin/Invoice/schema'
import { DotsThree, PlusSquare } from '@phosphor-icons/react'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import AddInvoiceModal from '~/pages/Admin/Invoice/AddInvoiceModal/AddInvoiceModal'
import InvoiceRow from '~/pages/Admin/Invoice/InvoiceRow/InvoiceRow'

const InvoiceEmp = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data, refetch } = useQuery(GET_INVOICES)
  const { query, setQuery, filtered } = useSearch(data?.invoiceList || [])
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <AddInvoiceModal
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        refetch={refetch}
      />
      <Flex direction='column'>
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
              icon={<PlusSquare weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
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
        <Table w={'100%'}>
          <Table.Head ta={'center'}>
            <Table.Row fs={'md'}>
              <Table.Cell className='GeomanistMedium-font'>ID</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Thời gian giao dịch
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Khách hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Tổng giá</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Phương thức thanh toán
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Trạng thái thanh toán
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Hành động
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filtered?.map((invoice) => (
              <InvoiceRow
                key={invoice.invoice_id}
                invoice={invoice}
                refetch={refetch}
              />
            ))}
          </Table.Body>
          <Table.Foot ta={'center'}>
            <Table.Row fs={'md'}>
              <Table.Cell className='GeomanistMedium-font'>ID</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Thời gian giao dịch
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Khách hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Tổng giá</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Phương thức thanh toán
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Trạng thái thanh toán
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Hành động
              </Table.Cell>
            </Table.Row>
          </Table.Foot>
        </Table>
      </Flex>
    </>
  )
}
export default InvoiceEmp
