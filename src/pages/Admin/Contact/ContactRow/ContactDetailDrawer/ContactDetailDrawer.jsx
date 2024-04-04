import { Button, Drawer, Flex } from '@prismane/core'

const ContactDetailDrawer = ({ contact, open, setOpen }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)} position='right'>
      <Drawer.Header>Chi tiết liên hệ</Drawer.Header>
      <Flex direction='column'>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          {contact?.name}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          {contact?.email}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          {contact?.phone}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          {contact?.message}
        </Text>
        <Text fs={'lg'} className='GeomanistMedium-font'>
          {contact?.createAt}
        </Text>
      </Flex>
      <Drawer.Footer>
        <Button variant='tertiary' color='base'>
          Đóng
        </Button>
      </Drawer.Footer>
    </Drawer>
  )
}

export default ContactDetailDrawer
