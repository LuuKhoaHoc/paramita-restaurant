import { useQuery } from '@apollo/client'
import { DotsThree, UserCirclePlus } from '@phosphor-icons/react'
import {
  Button,
  Flex,
  Skeleton,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import EmployeeRow from '~/pages/Admin/EmployeeManager/EmployeeRow/EmployeeRow'
import {
  GET_EMPLOYEES,
  GET_POSITIONS
} from '~/pages/Admin/EmployeeManager/schema'
import AddEmployee from '~/pages/Admin/EmployeeManager/AddEmployee/AddEmployee'

const EmployeeManager = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES)
  const {
    loading: loadingPosition,
    error: errorPosition,
    data: dataPosition
  } = useQuery(GET_POSITIONS)
  const { query, setQuery, filtered } = useSearch(data?.employeeList || [])
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <AddEmployee
        open={openAddModal}
        setOpen={setOpenAddModal}
        refetch={refetch}
        position={dataPosition?.positionList}
      />
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
        <Table>
          <Table.Head ta={'center'}>
            <Table.Row>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>ID</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Họ tên</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Công việc</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Trạng thái</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Hành động</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body ta={'center'}>
            {filtered.map((employee) => {
              return (
                <EmployeeRow
                  key={employee.employee_id}
                  employee={employee}
                  position={dataPosition?.positionList}
                  refetch={refetch}
                />
              )
            })}
          </Table.Body>
          <Table.Foot ta={'center'}>
            <Table.Row>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>ID</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Họ tên</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Công việc</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Trạng thái</Text>
              </Table.Cell>
              <Table.Cell>
                <Text className='GeomanistMedium-font'>Hành động</Text>
              </Table.Cell>
            </Table.Row>
          </Table.Foot>
        </Table>
      </Flex>
    </>
  )
}
export default EmployeeManager
