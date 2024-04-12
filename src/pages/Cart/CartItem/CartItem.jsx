import { Gear, Note, NotePencil, X } from '@phosphor-icons/react'
import {
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Modal,
  NumberField,
  Radio,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import React, { useContext, useState } from 'react'
import { CartContext } from '~/contexts/CartContext'
import { useResponsive } from '~/utils/responsive'

const CartItem = ({ image, title, price, selected, quantity }) => {
  const { isTablet, isMobile } = useResponsive()
  const { removeCartItem, updateCartItemQuantity, updateCartItemSelected } =
    useContext(CartContext)
  const subtotal = price * quantity
  const handleRemoveItem = (title) => {
    removeCartItem(title)
  }
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal
        w={isMobile ? '100%' : '50vw'}
        open={open}
        onClose={() => setOpen(false)}
        closable
      >
        <Modal.Header>
          <Text
            fw='bold'
            fs='3xl'
            cl={(theme) =>
              theme.mode === 'dark' ? ['base', 300] : ['base', 900]
            }
            className='GeomanistMedium-font'
          >
            Tuỳ chọn
          </Text>
        </Modal.Header>
        <Flex w={'100%'} direction='column' px={fr(4)} mx={fr(-4)} gap={fr(4)}>
          {isMobile && (
            <Flex align='center' justify='between'>
              <Text fs={'lg'}>{price.toLocaleString('vi-VN')}đ</Text>
              <NumberField
                w={'fit-content'}
                value={quantity}
                onChange={(e) => {
                  const newQuantity = +e.target.value
                  updateCartItemQuantity(title, newQuantity)
                }}
                min={1}
              />
            </Flex>
          )}
          {selected.map((option, index) => (
            <Flex justify='between' key={index}>
              <Text fs={'lg'} w={fr(25)}>
                {option.title}
              </Text>
              <Radio.Group
                name='answer'
                value={option.selected}
                onChange={(e) =>
                  updateCartItemSelected(title, option.title, e.target.value)
                }
              >
                <Radio value='no' label='Không' />
                <Radio value='yes' label='Có' />
              </Radio.Group>
            </Flex>
          ))}
        </Flex>
        <Modal.Footer justify='end'>
          <Button
            br={'full'}
            className='GeomanistMedium-font'
            size='md'
            onClick={() => setOpen(false)}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <Table.Row>
        <Table.Cell>
          <Flex align='center' gap={fr(2)}>
            <Icon
              mr={fr(2)}
              onClick={() => handleRemoveItem(title)}
              cl={['inherit', { hover: 'red' }]}
              cs={'pointer'}
            >
              <X />
            </Icon>
            <Image
              src={image}
              w={isTablet ? fr(16) : isMobile ? fr(0) : fr(20)}
              h={isTablet ? fr(16) : isMobile ? fr(0) : fr(20)}
              alt={title}
              br={'lg'}
            />
            <Text fs={'lg'}>{title}</Text>
          </Flex>
        </Table.Cell>
        <Table.Cell>
          <Center>
            <Icon cs={'pointer'} size={fr(5)} onClick={() => setOpen(!open)}>
              <NotePencil />
            </Icon>
          </Center>
        </Table.Cell>
        {!isMobile && (
          <Table.Cell ta={'center'}>
            <Text fs={'lg'}>{price.toLocaleString('vi-VN')}đ</Text>
          </Table.Cell>
        )}
        {!isMobile && (
          <Table.Cell ta={'center'}>
            <NumberField
              w={70}
              value={quantity}
              onChange={(e) => {
                const newQuantity = +e.target.value
                updateCartItemQuantity(title, newQuantity)
              }}
              min={1}
            />
          </Table.Cell>
        )}
        <Table.Cell ta={'center'}>
          <Text fs={'lg'}>{subtotal.toLocaleString('vi-VN')}đ</Text>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default CartItem
