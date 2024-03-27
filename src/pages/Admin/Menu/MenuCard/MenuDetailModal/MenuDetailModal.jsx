import { Flex, Image, Modal, Text, fr } from '@prismane/core'

const MenuDetailModal = ({ open, setOpen, menu }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)} w={'40%'}>
      <Modal.Header>
        <Image src={menu?.image} alt={menu?.name} br={'lg'} w={'100%'} />
      </Modal.Header>
      <Flex direction='column' fs={'md'} gap={fr(2)}>
        <Text className='GeomanistMedium-font' ta={'center'} fs={'lg'}>
          {menu?.name}
        </Text>
        <Text className='GeomanistMedium-font'>Giá: {menu?.price}.000đ</Text>
        <Text className='GeomanistMedium-font'>
          Danh mục: {menu?.category[0].name}
        </Text>
        <Text className='GeomanistMedium-font'>
          Mô tả: {menu?.description || 'Chưa có mô tả'}
        </Text>
      </Flex>
    </Modal>
  )
}

export default MenuDetailModal
