import { MagnifyingGlass, Plus, PlusCircle, X } from '@phosphor-icons/react'
import {
  Button,
  Card,
  Center,
  Circle,
  Flex,
  Image,
  Modal,
  NumberField,
  Stack,
  Text,
  TextField,
  fr,
  useThemeModeValue
} from '@prismane/core'
import { useState } from 'react'

const AddEditInvoice = ({ title, openModalAddEdit, setOpenModalAddEdit }) => {
  const textColor = useThemeModeValue('#000', '#fff')
  const titleButton = title === 'Thêm hoá đơn' ? 'Thêm' : 'Chỉnh sửa'
  const [quantity, setQuantity] = useState(1)
  return (
    <Modal
      w={'90vw'}
      open={openModalAddEdit}
      onClose={() => setOpenModalAddEdit(false)}
      closable
      cl={textColor}
    >
      <Modal.Header>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          {title}
        </Text>
      </Modal.Header>
      <Stack gap={fr(4)} direction='row'>
        <Flex w={'70%'} direction='column'>
          <Text fs={'lg'}>Danh sách món ăn</Text>
          <Flex
            h={'55vh'}
            bd={'3px solid'}
            bdc={'primary'}
            br={'md'}
            bsh={'inner'}
            direction='row'
            gap={fr(2)}
          >
            <Card
              direction='row'
              w={'33.33%'}
              h={fr(16)}
              gap={fr(4)}
              align='center'
            >
              <Image
                src='https://picsum.photos/200/300'
                alt='món-ăn'
                w={fr(18)}
                h={fr(18)}
                br={'md'}
              />
              <Flex direction='column' fs={'lg'}>
                <Text>Bún Huế Paramita</Text>
                <Text fs={'md'} cl={['gray', 400]}>
                  80.000đ
                </Text>
              </Flex>
              <Button
                variant='secondary'
                ml={'auto'}
                br={'full'}
                icon={<Plus />}
              ></Button>
            </Card>
          </Flex>
        </Flex>
        <Flex w={'30%'} direction='column'>
          <Text fs={'lg'}>Các món đã chọn</Text>
          <Flex
            h={'100%'}
            bd={'3px solid'}
            bdc={'primary'}
            p={fr(2)}
            br={'md'}
            bsh={'inner'}
          >
            <Card
              direction='row'
              w={'100%'}
              h={fr(8)}
              gap={fr(4)}
              align='center'
            >
              <Circle
                size={22}
                bg={[['slate', 300], { hover: 'primary' }]}
                cl={[textColor, { hover: 'white' }]}
                cs={'pointer'}
              >
                <X />
              </Circle>
              <Flex direction='column'>
                <Text>Bún Huế Paramita</Text>
                <Text fs={'sm'} cl={['gray', 400]}>
                  80.000đ
                </Text>
              </Flex>
              <NumberField
                min={1}
                max={99}
                variant='underlined'
                w={'30%'}
                ml={'auto'}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Card>
          </Flex>
        </Flex>
      </Stack>
      <Stack gap={fr(4)} direction='row' mt={fr(4)}>
        <Flex w={'70%'} direction='column' gap={fr(2)}>
          <Text fs={'lg'}>Thông tin khách hàng</Text>
          <Center gap={fr(2)}>
            <TextField
              w={'100%'}
              placeholder='Nhập tên khách hàng hoặc nhập số điện thoại'
            />
            <Button
              icon={<MagnifyingGlass />}
              size='md'
              bg={['primary', 200]}
            ></Button>
          </Center>
          <Flex bd={'2px solid'} bdc={'green'} br={'md'}>
            <Flex direction='column' ml={fr(4)} fs={'md'}>
              <Text>Khách hàng: Lê Thị Thanh Vy</Text>
              <Text>Số điện thoại: 034 999 999</Text>
              <Text>Thành viên: Bạc</Text>
              <Text>Số điểm: 500 điểm</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w={'30%'} direction='column'>
          <Text fs={'lg'}>Thành tiền</Text>
          <Flex h={'100%'} bd={'2px solid'} bdc={'green'} br={'md'} align='end'>
            <Flex
              align='end'
              w={'100%'}
              direction='column'
              mr={fr(4)}
              fs={'lg'}
            >
              <Text>Tổng cộng: 100.000đ</Text>
              <Text>Thuế: 5.000đ</Text>
              <Text>Mã giảm giá: -5.000đ</Text>
              <Text cl={'primary'} fs={'xl'}>
                Thành tiền: 100.000đ
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
      <Button
        size='lg'
        ml={'auto'}
        mt={fr(4)}
        bg={['primary', 200]}
        br={'full'}
      >
        {titleButton} hoá đơn
      </Button>
    </Modal>
  )
}
export default AddEditInvoice
