import { Eye, PencilLine, Trash } from '@phosphor-icons/react'
import { Button, Flex, Table, fr } from '@prismane/core'
import InvoiceDetailModal from './InvoiceDetailModal/InvoiceDetailModal'
import { useState } from 'react'
import { formatTime } from '~/utils/formatTime'
import EditInvoiceModal from './EditInvoiceModal/EditInvoiceModal'
import DeleteInvoiceModal from './DeleteInvoiceModal/DeleteInvoiceModal'

const InvoiceRow = ({ invoice }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  return (
    <Table.Row ta={'center'}>
      <Table.Cell>{invoice.invoice_id}</Table.Cell>
      <Table.Cell>{formatTime(invoice?.invoice_time)}</Table.Cell>
      <Table.Cell>{invoice?.customer?.name || 'Không có'}</Table.Cell>
      <Table.Cell>{invoice.total_price.toLocaleString('vi-VN')}đ</Table.Cell>
      <Table.Cell>{invoice.payment_method}</Table.Cell>
      <Table.Cell>{invoice.payment_status}</Table.Cell>
      <Table.Cell>
        <InvoiceDetailModal
          invoice={invoice}
          openModal={openDetailModal}
          setOpenModal={setOpenDetailModal}
        />
        <EditInvoiceModal
          invoice={invoice}
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
        />
        <DeleteInvoiceModal
          invoice={invoice}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
        <Flex gap={fr(4)} justify='center'>
          <Button
            variant='tertiary'
            icon={<Eye />}
            fillOnHover
            onClick={() => setOpenDetailModal(true)}
          >
            Chi tiết
          </Button>
          <Button
            variant='tertiary'
            icon={<PencilLine />}
            color='diamond'
            fillOnHover
            disabled={invoice.payment_status === 'Đã thanh toán'}
            onClick={() => setOpenEditModal(true)}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant='tertiary'
            icon={<Trash />}
            color='ruby'
            fillOnHover
            disabled={invoice.payment_status === 'Đã thanh toán'}
            onClick={() => setOpenDeleteModal(true)}
          >
            Xoá
          </Button>
        </Flex>
      </Table.Cell>
    </Table.Row>
  )
}

export default InvoiceRow
