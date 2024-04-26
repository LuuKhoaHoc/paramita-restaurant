import { DotsThree, ListPlus } from '@phosphor-icons/react'
import {
  Button,
  Center,
  Chip,
  Flex,
  Paper,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import TableItem from '~/pages/Admin/Table/TableItem/TableItem'
import AddTableModal from '~/pages/Admin/Table/AddTableModal/AddTableModal'
import { GET_TABLES } from '~/pages/Admin/Table/schema'

const Table = ({ employee }) => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data, refetch } = useQuery(GET_TABLES)
  const { query, setQuery, filtered } = useSearch(data?.tableList || [])
  return (
    <>
      <AddTableModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        refetch={refetch}
      />
      <Flex direction='column' h={'fit-content'}>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả bàn
          </Text>
          <Flex align='center' gap={fr(2)}>
            <Chip color={'primary'}>Trống</Chip>
            <Chip color='ruby'>Đã đặt</Chip>
            <Chip color='diamond'>Cần dọn</Chip>
            <TextField
              placeholder='Tìm kiếm...'
              value={query || ''}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant='secondary'
              size='md'
              icon={<ListPlus weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm bàn
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
        <Stack
          direction='row'
          px={fr(4)}
          py={fr(2)}
          justify='around'
          wrap='wrap'
          gap={fr(20)}
        >
          {filtered?.map((table) => {
            return (
              <TableItem
                key={table.table_id}
                table={table}
                employee={employee}
              />
            )
          })}
        </Stack>
      </Flex>
    </>
  )
}

export default Table
