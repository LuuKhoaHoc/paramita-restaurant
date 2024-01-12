import React, { useState } from 'react'
import {
  Button,
  Flex,
  Icon,
  Modal,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { Pen, X } from '@phosphor-icons/react'
const AccountAddresses = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal w={'20vw'} open={open} onClose={() => setOpen(false)} closable>
        <Modal.Header ff={'GeomanistMedium'}>
          <Text fs={'2xl'} ta={'center'}>
            Thêm địa chỉ
          </Text>
        </Modal.Header>
        <Flex
          direction='column'
          justify='around'
          sx={{
            '.PrismaneTextField-label': {
              fontSize: fr(4)
            }
          }}
        >
          <TextField w={'100%'} label='Địa chỉ' placeholder='Điền địa chỉ' />
          <TextField
            w={'100%'}
            label='Quận huyện'
            placeholder='Điền quận huyện'
          />
          <TextField
            w={'100%'}
            label='Tỉnh thành'
            placeholder='Điền tỉnh thành'
          />
        </Flex>
        <Modal.Footer>
          <Button
            size='lg'
            br={'full'}
            ff={'GeomanistMedium'}
            onClick={() => setOpen(false)}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
      <Flex direction='column' grow pos={'relative'} m={fr(10)}>
        <Text
          pos={['relative', { ':before': 'absolute' }]}
          fs={'4xl'}
          sx={{
            '&::before': {
              content: '',
              width: '25%',
              height: '2px',
              borderRadius: '2px',
              backgroundColor: '#39b54a',
              bottom: '0px',
              left: 0
            }
          }}
        >
          Sổ địa chỉ
        </Text>
        <Stack gap={fr(10)}>
          <Flex pos={'relative'} justify='between'>
            <Text fs={'xl'}>Địa chỉ giao hàng</Text>
            <Text
              fs={'md'}
              cs={'pointer'}
              cl={['inherit', { hover: 'primary' }]}
              onClick={() => {
                setOpen(!open)
              }}
            >
              Thêm
            </Text>
          </Flex>
          <Flex>
            <Text tt={'capitalize'} fs={'lg'}>
              184 Lê Đại Hành, quận 11, TP Hồ Chí Minh
            </Text>
            <Flex ml={'auto'} gap={fr(5)}>
              <Icon
                cs={'pointer'}
                size={fr(6)}
                cl={['inherit', { hover: 'blue' }]}
                onClick={() => {}}
              >
                <Pen weight='bold' />
              </Icon>
              <Icon
                cs={'pointer'}
                size={fr(6)}
                cl={['inherit', { hover: 'red' }]}
                onClick={() => {}}
              >
                <X weight='bold' />
              </Icon>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </>
  )
}

export default AccountAddresses
