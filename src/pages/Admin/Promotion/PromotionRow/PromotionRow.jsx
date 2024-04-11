import { PencilSimpleLine, Eye, Trash } from '@phosphor-icons/react'
import { Button, Flex, fr, Table, Modal } from '@prismane/core'
import { formatTime } from '~/utils/formatTime'
import PromotionDetailModal from '~/pages/Admin/Promotion/PromotionRow/PromotionDetailModal/PromotionDetailModal'
import { useState } from 'react'

const PromotionRow = ({ promotion }) => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  return (
    <>
      <Table.Row>
        <Table.Cell>{promotion?.promotion_id}</Table.Cell>
        <Table.Cell>{promotion?.name}</Table.Cell>
        <Table.Cell>{promotion?.target}</Table.Cell>
        <Table.Cell>{promotion?.conditions}</Table.Cell>
        <Table.Cell>{formatTime(promotion?.start_date)}</Table.Cell>
        <Table.Cell>{formatTime(promotion?.end_date)}</Table.Cell>
        <Table.Cell>
          <PromotionDetailModal
            promotion={promotion}
            open={openAddModal}
            setOpen={setOpenAddModal}
          />
          <Flex gap={fr(2)} justify='center'>
            <Button
              variant='tertiary'
              fillOnHover
              icon={<Eye />}
              onClick={() => setOpenAddModal(true)}
            >
              Chi tiết
            </Button>
            <Button
              variant='tertiary'
              fillOnHover
              color='diamond'
              icon={<PencilSimpleLine />}
            >
              Chỉnh sửa
            </Button>
            <Button
              variant='tertiary'
              fillOnHover
              color='ruby'
              icon={<Trash />}
            >
              Xoá
            </Button>
          </Flex>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default PromotionRow
