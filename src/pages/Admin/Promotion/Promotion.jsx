import { DotsThree, RowsPlusTop } from '@phosphor-icons/react'
import { Button, Table, Chip, Flex, Text, TextField, fr } from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROMOTIONS } from '~/pages/Admin/Promotion/schema'
import AddPromotionModal from '~/pages/Admin/Promotion/AddPromotionModal/AddPromotionModal'
import PromotionRow from '~/pages/Admin/Promotion/PromotionRow/PromotionRow'

const Promotion = ({ employee }) => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data, refetch } = useQuery(GET_PROMOTIONS)
  const { query, setQuery, filtered } = useSearch(data?.promotionList || [])
  return (
    <>
      <AddPromotionModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        refetch={refetch}
      />
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả chương trình khuyến mãi
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
              icon={<RowsPlusTop weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm chương trình khuyến mãi
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
          <Table.Head
            ta={'center'}
            sx={{ '*': { fontFamily: 'GeomanistMedium !important' } }}
            fs={'md'}
          >
            <Table.Row>
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>Tiêu đề</Table.Cell>
              <Table.Cell>Đối tượng</Table.Cell>
              <Table.Cell>Điều kiện</Table.Cell>
              <Table.Cell>Thời gian bắt đầu</Table.Cell>
              <Table.Cell>Thời gian kết thúc</Table.Cell>
              <Table.Cell>Hành động</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body ta={'center'}>
            {filtered?.map((promotion) => (
              <PromotionRow key={promotion.tsid} promotion={promotion} />
            ))}
          </Table.Body>
          <Table.Foot
            ta={'center'}
            sx={{ '*': { fontFamily: 'GeomanistMedium !important' } }}
            fs={'md'}
          >
            <Table.Row>
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>Tiêu đề</Table.Cell>
              <Table.Cell>Đối tượng</Table.Cell>
              <Table.Cell>Điều kiện</Table.Cell>
              <Table.Cell>Thời gian bắt đầu</Table.Cell>
              <Table.Cell>Thời gian kết thúc</Table.Cell>
              <Table.Cell>Hành động</Table.Cell>
            </Table.Row>
          </Table.Foot>
        </Table>
      </Flex>
    </>
  )
}

export default Promotion
