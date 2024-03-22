import {
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  Stack,
  Text,
  fr
} from '@prismane/core'

const EmployeeDetailModal = ({ employee, openModal, setOpenModal }) => {
  return (
    <Modal w={'30%'} open={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header justify='center'>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Chi tiết nhân viên
        </Text>
      </Modal.Header>
      <Stack direction='column' gap={fr(4)}>
        <Flex justify='center' align='center'>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            alt=''
            br={'full'}
            w={'60%'}
            h={'100%'}
          />
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Họ tên:</Text>
          <Text className='GeomanistMedium-font'>{employee?.name}</Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Giới tính:</Text>
          <Text className='GeomanistMedium-font'>{employee?.gender}</Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Ngày sinh:</Text>
          <Text className='GeomanistMedium-font'>{employee?.birthday}</Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Số điện thoại:</Text>
          <Text className='GeomanistMedium-font'>{employee?.phone}</Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Email:</Text>
          <Text className='GeomanistMedium-font'>{employee?.email}</Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Địa chỉ:</Text>
          <Text className='GeomanistMedium-font'>{employee?.address}</Text>
        </Flex>
        <Divider />
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Vị trí công việc:</Text>
          <Text className='GeomanistMedium-font'>
            {employee?.position.name}
          </Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Mức lương:</Text>
          <Text className='GeomanistMedium-font'>
            {employee?.position.salary}
          </Text>
        </Flex>
        <Divider />
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Tài khoản:</Text>
          <Text className='GeomanistMedium-font'>{employee?.username}</Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Mật khẩu:</Text>
          <Text className='GeomanistMedium-font'>{employee?.password}</Text>
        </Flex>
        <Flex gap={fr(4)}>
          <Text className='GeomanistMedium-font'>Trạng thái hoạt động:</Text>
          <Text className='GeomanistMedium-font'>
            {(employee?.status).toString() === 'true'
              ? 'Đang làm việc'
              : 'Nghỉ việc'}
          </Text>
        </Flex>
      </Stack>
      <Modal.Footer>
        <Button
          variant='secondary'
          size='md'
          onClick={() => setOpenModal(false)}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EmployeeDetailModal
