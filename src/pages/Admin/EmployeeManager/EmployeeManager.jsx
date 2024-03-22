import { useQuery } from '@apollo/client'
import {
  DotsThree,
  PencilSimpleLine,
  Plus,
  Trash,
  UserCirclePlus
} from '@phosphor-icons/react'
import {
  ActionButton,
  Button,
  Card,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import EmployeeCard from '~/pages/Admin/EmployeeManager/EmployeeCard/EmployeeCard'
import { GET_EMPLOYEES } from '~/pages/Admin/EmployeeManager/schema'
import AddEmployee from '~/pages/Admin/EmployeeManager/AddEmployee/AddEmployee'

const EmployeeManager = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data } = useQuery(GET_EMPLOYEES)
  const { query, setQuery, filtered } = useSearch(data?.employeeList || [])
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <AddEmployee open={openAddModal} setOpen={setOpenAddModal} />
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả nhân viên
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
              icon={<UserCirclePlus weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm nhân viên
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

        <Stack direction='row' wrap='wrap' gap={fr(3)} px={fr(4)}>
          {filtered.map((employee) => {
            return (
              <EmployeeCard key={employee.employee_id} employee={employee} />
            )
          })}
        </Stack>
      </Flex>
    </>
  )
}
export default EmployeeManager
