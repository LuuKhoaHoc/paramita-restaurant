import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { ActionButton, Card, Flex, Image, Text, fr } from '@prismane/core'
import { useState } from 'react'
import EmployeeDetailModal from '~/pages/Admin/EmployeeManager/EmployeeCard/EmployeeDetailModal/EmployeeDetailModal'
import EmployeeEditModal from '~/pages/Admin/EmployeeManager/EmployeeCard/EmployeeEditModal/EmployeeEditModal'

const EmployeeCard = ({ employee }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  return (
    <>
      <EmployeeEditModal
        employee={employee}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
      />
      <EmployeeDetailModal
        employee={employee}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Card w={'calc(25% - 50px)'}>
        <Card.Header justify='center'>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            alt=''
            br={'full'}
            w={'60%'}
            h={'100%'}
          />
        </Card.Header>
        <Flex justify='between' py={fr(4)}>
          <Flex direction='column' gap={fr(2)}>
            <Text className='GeomanistMedium-font'>Họ tên:</Text>
            <Text className='GeomanistMedium-font'>Email</Text>
            <Text className='GeomanistMedium-font'>SĐT:</Text>
            <Text className='GeomanistMedium-font'>Công việc:</Text>
            <Text className='GeomanistMedium-font'>Trạng thái:</Text>
          </Flex>
          <Flex direction='column' gap={fr(2)} align='end'>
            <Text className='GeomanistMedium-font'>{employee?.name}</Text>
            <Text className='GeomanistMedium-font'>{employee?.email}</Text>
            <Text className='GeomanistMedium-font'>{employee?.phone}</Text>
            <Text className='GeomanistMedium-font'>
              {employee?.position.name}
            </Text>
            <Text className='GeomanistMedium-font'>
              {(employee?.status).toString() === 'true'
                ? 'Đang làm việc'
                : 'Nghỉ việc'}
            </Text>
          </Flex>
        </Flex>
        <Card.Footer align='center' justify='center' gap={fr(4)}>
          <ActionButton
            icon={<Eye />}
            fillOnHover
            onClick={() => setOpenModal(true)}
          />
          <ActionButton
            icon={<PencilSimpleLine />}
            color='blue'
            fillOnHover
            onClick={() => setOpenEditModal(true)}
          />
          <ActionButton icon={<Trash />} color='ruby' fillOnHover />
        </Card.Footer>
      </Card>
    </>
  )
}

export default EmployeeCard
