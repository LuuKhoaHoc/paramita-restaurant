import { Eye, PencilLine, Trash } from '@phosphor-icons/react'
import { fr, Text, Flex, Table, Icon, NativeSelectField } from '@prismane/core'
import { useState } from 'react'

import InvoiceEmpDetail from '~/pages/Employee/Invoice/InvoiceEmpDetail/InvoiceEmpDetail'
import AddEditInvoice from '~/pages/Employee/Invoice/AddEditInvoice/AddEditInvoice'

const InvoiceEmpRow = ({ item }) => {
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [openModalAddEdit, setOpenModalAddEdit] = useState(false)
  return (
    <Table.Row>
      {/* Invoice detail */}
      <InvoiceEmpDetail
        data={item}
        openModalDetail={openModalDetail}
        setOpenModalDetail={setOpenModalDetail}
      />
      <AddEditInvoice
        openModalAddEdit={openModalAddEdit}
        setOpenModalAddEdit={setOpenModalAddEdit}
        title={'Sửa hoá đơn'}
        invoice_data={item}
      />
      <Table.Cell>
        <Text fs={'md'}>#{item.tsid}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text fs={'md'}>{item?.customer?.name}</Text>
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
        <Text fs={'md'}>{item.invoice_time}</Text>
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
              if (item?.payment_status === 'Chờ thanh toán') {
                setOpenModalAddEdit(true)
              }
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
  )
}

export default InvoiceEmpRow
