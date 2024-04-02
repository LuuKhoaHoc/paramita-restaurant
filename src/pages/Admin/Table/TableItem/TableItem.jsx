import { X } from '@phosphor-icons/react'
import {
  ActionButton,
  Center,
  Chip,
  Flex,
  Paper,
  Text,
  fr
} from '@prismane/core'
import { useState } from 'react'
import EditTableModal from '~/pages/Admin/Table/TableItem/EditTableModal/EditTableModal'

const TableItem = ({ table, employee }) => {
  const [open, setOpen] = useState(false)
  const isCapacityOdd = table?.capacity % 2 !== 0
  let capacity = Math.floor(table?.capacity)
  let upperSeating = Array.from({ length: Math.ceil(capacity / 2) }).map(
    (_, i) => <Paper key={i} bg={'gray'} w={fr(10)} br={'2xl'} p={fr(2)} />
  )

  let lowerSeating = isCapacityOdd
    ? Array.from({ length: Math.floor(capacity / 2) }).map((_, i) => (
        <Paper
          key={i + upperSeating.length}
          bg={'gray'}
          w={fr(10)}
          br={'2xl'}
          p={fr(2)}
        />
      ))
    : upperSeating
  let tableWidth = fr(table?.capacity * 15)

  return (
    <>
      <EditTableModal
        open={open}
        setOpen={setOpen}
        table={table}
        employee={employee}
      />
      <Center
        direction='column'
        gap={fr(2)}
        w={'max-content'}
        cs={'pointer'}
        onClick={() => setOpen(true)}
      >
        <Flex justify='around' w={tableWidth}>
          {upperSeating}
        </Flex>
        <Center
          miw={fr(30)}
          w={tableWidth}
          h={fr(25)}
          bg={['gray', 300]}
          br={'2xl'}
        >
          <Chip
            color={
              table?.status === 'Trống'
                ? 'primary'
                : table?.status === 'Đã đặt'
                ? 'ruby'
                : 'diamond'
            }
            p={fr(4)}
            br={'full'}
          >
            <Text className='GeomanistMedium-font'>{table?.name}</Text>
          </Chip>
        </Center>
        <Flex justify='around' w={tableWidth}>
          {lowerSeating}
        </Flex>
      </Center>
    </>
  )
}

export default TableItem
