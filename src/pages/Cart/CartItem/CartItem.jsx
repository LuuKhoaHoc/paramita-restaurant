import { X } from '@phosphor-icons/react'
import {
  Flex,
  Icon,
  Image,
  NumberField,
  Radio,
  Table,
  Text,
  fr
} from '@prismane/core'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '~/contexts/CartContext'

const CartItem = ({ image, title, price, selected, quantity }) => {
  const { removeCartItem, updateCartItemQuantity, updateCartItemSelected } =
    useContext(CartContext)
  const subtotal = price * quantity * 1000
  const handleRemoveItem = (title) => {
    removeCartItem(title)
  }
  return (
    <>
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
            <Image src={image} w={fr(20)} h={fr(20)} alt={title} br={'lg'} />
            <Text fs={'lg'}>{title}</Text>
          </Flex>
        </Table.Cell>
        <Table.Cell ta={'center'}>
          <Text fs={'lg'}>{price}đ</Text>
        </Table.Cell>
        <Table.Cell ta={'center'}>
          <NumberField
            value={quantity}
            onChange={(e) => {
              const newQuantity = +e.target.value
              updateCartItemQuantity(title, newQuantity)
            }}
            min={1}
          />
        </Table.Cell>
        <Table.Cell ta={'center'}>
          <Text fs={'lg'}>{subtotal.toLocaleString('vi-VN')}đ</Text>
        </Table.Cell>
      </Table.Row>
      <tr>
        <td>
          <Flex gap={fr(4)}>
            <Text fs={'lg'}>Ngũ vị tân</Text>
            <Radio.Group
              name='answer'
              value={selected}
              onChange={(e) => updateCartItemSelected(title, e.target.value)}
            >
              <Radio value='no' label='Không' />
              <Radio value='yes' label='Có' />
            </Radio.Group>
          </Flex>
        </td>
      </tr>
    </>
  )
}

export default CartItem
