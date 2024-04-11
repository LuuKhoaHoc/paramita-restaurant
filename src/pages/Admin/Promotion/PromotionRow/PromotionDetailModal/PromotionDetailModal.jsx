import {
  Modal,
  Flex,
  fr,
  TextField,
  TextareaField,
  Field,
  Button
} from '@prismane/core'
import { X } from '@phosphor-icons/react'
import { formatTime } from '~/utils/formatTime'

const PromotionDetailModal = ({ promotion, open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      w={'60vw'}
      sx={{ '*': { fontFamily: 'GeomanistMedium !important' } }}
    >
      <Modal.Header justify='center' fs={'xl'}>
        Chi tiết chương trình khuyến mãi
      </Modal.Header>
      <Flex direction='column' gap={fr(2)}>
        <TextField
          defaultValue={promotion?.name}
          addons={
            <Field.Addon position='left' w={'13%'} cl={'primary'} ta={'center'}>
              Tiêu đề
            </Field.Addon>
          }
        />
        <TextField
          defaultValue={promotion?.target}
          addons={
            <Field.Addon position='left' w={'13%'} cl={'primary'} ta={'center'}>
              Đối tượng
            </Field.Addon>
          }
        />
        <TextField
          defaultValue={promotion?.conditions}
          addons={
            <Field.Addon position='left' w={'13%'} cl={'primary'} ta={'center'}>
              Điều kiện
            </Field.Addon>
          }
        />
        <TextField
          defaultValue={Number(promotion?.discount).toLocaleString('vi-VN')}
          addons={
            <>
              <Field.Addon
                position='left'
                w={'13%'}
                cl={'primary'}
                ta={'center'}
              >
                Giảm đến
              </Field.Addon>
              <Field.Addon
                position='right'
                w={'13%'}
                cl={'primary'}
                ta={'center'}
              >
                VNĐ
              </Field.Addon>
            </>
          }
        />
        <TextField
          defaultValue={formatTime(promotion?.start_date)}
          addons={
            <Field.Addon position='left' w={'13%'} cl={'primary'} ta={'center'}>
              Thời gian bắt đầu
            </Field.Addon>
          }
        />
        <TextField
          defaultValue={formatTime(promotion?.end_date)}
          addons={
            <Field.Addon position='left' w={'13%'} cl={'primary'} ta={'center'}>
              Thời gian kết thúc
            </Field.Addon>
          }
        />
        <TextareaField
          addons={
            <Field.Addon position='left' w={'13%'} cl={'primary'} ta={'center'}>
              Nội dung khuyến mãi
            </Field.Addon>
          }
          h={fr(30)}
          defaultValue={promotion?.description}
          sx={{ '*': { height: fr(30) } }}
        />
      </Flex>
      <Button
        icon={<X />}
        type='reset'
        br={'full'}
        onClick={() => setOpen(false)}
        color='gray'
        variant='tertiary'
        mt={fr(10)}
      >
        Đóng
      </Button>
    </Modal>
  )
}

export default PromotionDetailModal
