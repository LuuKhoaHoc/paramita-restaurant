import {
  Eye,
  Fire,
  PencilSimpleLine,
  Plugs,
  Trash
} from '@phosphor-icons/react'
import {
  ActionButton,
  Table,
  Flex,
  Image,
  Text,
  fr,
  Center,
  Circle,
  Button
} from '@prismane/core'
import { useState } from 'react'
import EmployeeDetailModal from '~/pages/Admin/EmployeeManager/EmployeeRow/EmployeeDetailModal/EmployeeDetailModal'
import EmployeeEditModal from '~/pages/Admin/EmployeeManager/EmployeeRow/EmployeeEditModal/EmployeeEditModal'

const EmployeeRow = ({ employee, refetch, position }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
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
          <Text className='GeomanistMedium-font'>{employee?.employee_id}</Text>
        </Table.Cell>
        <Table.Cell>
          <Center gap={fr(2)}>
            <Image
              src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
              alt=''
              br={'full'}
              w={fr(10)}
              h={fr(10)}
            />
            <Text className='GeomanistMedium-font'>{employee?.name}</Text>
          </Center>
        </Table.Cell>
        <Table.Cell>
          <Text className='GeomanistMedium-font'>
            {employee?.position.name}
          </Text>
        </Table.Cell>
        <Table.Cell>
          <Center justify='center' gap={fr(2)} className='GeomanistMedium-font'>
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
                Đang làm việc
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
