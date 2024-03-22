import { CheckCircle } from '@phosphor-icons/react'
import {
  Button,
  Flex,
  Modal,
  Text,
  TextField,
  TextareaField,
  fr
} from '@prismane/core'

const AddMenu = ({ openModal, setOpenModal }) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)} w={'40%'}>
      <Modal.Header justify='center' fs={'xl'}>
        <Text className='GeomanistMedium-font'>Thêm món</Text>
      </Modal.Header>
      <Flex direction='column' gap={fr(4)}>
        <TextField placeholder='Nhập tên món...' />
        <TextareaField
          className='GeomanistMedium-font'
          placeholder='Nhập mô tả...'
        />
      </Flex>
      <Modal.Footer align='center' justify='end'>
        <Button
          icon={<CheckCircle />}
          iconPosition='right'
          size='md'
          variant='secondary'
        >
          <Text className='GeomanistMedium-font' fs={'md'}>
            Thêm
          </Text>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMenu
