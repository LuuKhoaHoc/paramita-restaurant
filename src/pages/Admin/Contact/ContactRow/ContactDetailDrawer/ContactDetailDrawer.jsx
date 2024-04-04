import { Button, Drawer, Flex, Text } from '@prismane/core'
import { formatTime } from '~/utils/formatTime'

const ContactDetailDrawer = ({ contact, open, setOpen }) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      position='right'
      size={'md'}
    >
      <Drawer.Header
        className='GeomanistMedium-font'
        justify='center'
        fs={'xl'}
        cl={'primary'}
      >
        Chi tiết liên hệ
      </Drawer.Header>
      <Flex direction='column' justify='evenly' h={'100%'}>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          <Text cl={'gray'}>Tên khách liên hệ:</Text> {contact?.name}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          <Text cl={'gray'}>Email:</Text> {contact?.email}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          <Text cl={'gray'}>Số điện thoại:</Text> {contact?.phone}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          <Text cl={'gray'}>Lời nhắn:</Text> {contact?.message}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          <Text cl={'gray'}>Thời gian tạo:</Text>{' '}
          {formatTime(contact?.createdAt)}
        </Text>
      </Flex>
      <Drawer.Footer>
        <Button variant='tertiary' color='base' onClick={() => setOpen(false)}>
          Đóng
        </Button>
      </Drawer.Footer>
    </Drawer>
  )
}

export default ContactDetailDrawer
