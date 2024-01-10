import { ArrowLeft, ShoppingCart } from '@phosphor-icons/react'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Icon,
  Stack,
  Table,
  Text,
  fr
} from '@prismane/core'
import CartItem from '~/pages/Cart/CartItem/CartItem'
import React, { useContext, useState } from 'react'
import { CartContext } from '~/contexts/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cartItems } = useContext(CartContext)
  const data = cartItems
  const subTotal = data.reduce((acc, item) => {
    return acc + item.price * item.quantity * 1000
  }, 0)
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} bg='#371b04' />
      <Box
        w={'100%'}
        h={'100%'}
        ff={'"BalihoScript", sans-serif'}
        pos={'relative'}
      >
        <Center fs={'4xl'} gap={fr(4)} p={fr(10)}>
          <Icon size={fr(12)} cl={'primary'}>
            <ShoppingCart weight='fill' />
          </Icon>
          <Text>Giỏ hàng</Text>
        </Center>
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Flex gap={fr(4)} direction='column'>
              <Table>
                <Table.Head ta={'center'}>
                  <Table.Row fs={'lg'} ff={'Geomanist'}>
                    <Table.Cell w={fr(180)}>Sản phẩm</Table.Cell>
                    <Table.Cell>Tuỳ chọn</Table.Cell>
                    <Table.Cell>Giá</Table.Cell>
                    <Table.Cell>Số lượng</Table.Cell>
                    <Table.Cell>Tạm tính</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {data.length === 0 && (
                    <Table.Row>
                      <Table.Cell colSpan={5} ta={'center'} fs={'lg'}>
                        Không có sản phẩm nào trong giỏ hàng
                      </Table.Cell>
                    </Table.Row>
                  )}
                  {data.map((item, index) => (
                    <CartItem
                      key={index}
                      image={item.image}
                      title={item.title}
                      price={item.price}
                      selected={item.optionList}
                      quantity={item.quantity}
                    />
                  ))}
                </Table.Body>
              </Table>
              <Divider />
              <Flex fs={'xl'}>
                <Text>Tổng cộng</Text>
                <Text ml={'auto'}>{subTotal.toLocaleString('vi-VN')}đ</Text>
              </Flex>
              <Flex ml={'auto'} align='center' gap={fr(4)} my={fr(5)}>
                <Center
                  gap={fr(2)}
                  as={Link}
                  to={'/order-online'}
                  cl={['inherit', { hover: 'blue' }]}
                >
                  <Icon>
                    <ArrowLeft />
                  </Icon>
                  <Text fs={'md'}>Tiếp tục mua hàng</Text>
                </Center>
                <Button
                  size='lg'
                  br={'full'}
                  ff={'GeomanistMedium'}
                  {...(data.length === 0
                    ? { disabled: true }
                    : {
                        as: Link,
                        to: '/checkout'
                      })}
                >
                  <Center>
                    <Icon size={fr(5)} mr={fr(2)}>
                      <ShoppingCart weight='bold' />
                    </Icon>
                    Tiến hành đặt hàng
                  </Center>
                </Button>
              </Flex>
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Cart
