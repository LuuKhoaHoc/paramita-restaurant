import { Button, Dialog, Text, fr } from '@prismane/core'

const ErrorLogin = () => {
  if (!localStorage.getItem('token')) {
    return (
      <Dialog
        w={fr(96)}
        ta={'center'}
        open={true}
        onClose={() => {
          window.location.href = '/'
        }}
        closable
      >
        <Dialog.Header>
          <Text fs={'lg'} className='GeomanistBold-font'>
            Lỗi đăng nhập!
          </Text>
        </Dialog.Header>
        <Text fs={'md'}>Chúng tôi sẽ chuyển bạn về trang chủ...</Text>
        <Dialog.Footer>
          <Button
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Xác nhận
          </Button>
        </Dialog.Footer>
      </Dialog>
    )
  }
}
export default ErrorLogin
