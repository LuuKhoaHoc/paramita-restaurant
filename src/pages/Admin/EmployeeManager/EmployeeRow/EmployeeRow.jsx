import { useMutation } from '@apollo/client'
import {
  Eye,
  Fire,
  PencilSimpleLine,
  Plugs,
  Trash
} from '@phosphor-icons/react'
import {
  Table,
  Image,
  Text,
  fr,
  Center,
  Circle,
  Button,
  useToast,
  Alert,
  Flex
} from '@prismane/core'
import { useState } from 'react'
import EmployeeDetailModal from '~/pages/Admin/EmployeeManager/EmployeeRow/EmployeeDetailModal/EmployeeDetailModal'
import EmployeeEditModal from '~/pages/Admin/EmployeeManager/EmployeeRow/EmployeeEditModal/EmployeeEditModal'
import { DELETE_EMPLOYEE } from '~/pages/Admin/EmployeeManager/schema'

const EmployeeRow = ({ employee, refetch, position }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const toast = useToast()
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE)
  const handleDeleteEmployee = () => {
    deleteEmployee({
      variables: {
        id: employee?.employee_id
      },
      onError: (err) => console.log(err),
      onCompleted: (data) => {
        refetch()
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Đã xoá nhân viên {data?.deleteEmployee.name} thành công!
              </Alert.Title>
            </Alert>
          )
        })
      }
    })
  }
  return (
    <>
      <EmployeeEditModal
        employee={employee}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        position={position}
        refetch={refetch}
      />
      <EmployeeDetailModal
        employee={employee}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Table.Row>
        <Table.Cell>
          <Text>{employee?.employee_id}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{employee?.name}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{employee?.position.name}</Text>
        </Table.Cell>
        <Table.Cell>
          <Center justify='center' gap={fr(2)}>
            {(employee?.status).toString() === 'true' ? (
              <>
                <Circle bg='primary' cl={'white'} size={fr(5)}>
                  <Fire />
                </Circle>
                Đang làm việc
              </>
            ) : (
              <>
                <Circle bg='ruby' cl={'white'} size={fr(6)}>
                  <Plugs />
                </Circle>
                Nghỉ việc
              </>
            )}
          </Center>
        </Table.Cell>
        <Table.Cell>
          <Center gap={fr(4)}>
            <Button
              icon={<Eye />}
              color='primary'
              fillOnHover
              variant='tertiary'
              onClick={() => setOpenModal(true)}
            >
              Chi tiết
            </Button>
            <Button
              icon={<PencilSimpleLine />}
              color='blue'
              fillOnHover
              variant='tertiary'
              onClick={() => setOpenEditModal(true)}
            >
              Chỉnh sửa
            </Button>
            <Button
              icon={<Trash />}
              color='ruby'
              fillOnHover
              variant='tertiary'
              onClick={() => handleDeleteEmployee()}
            >
              Xoá
            </Button>
          </Center>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default EmployeeRow
