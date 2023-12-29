import { Center, fr } from '@prismane/core'
import React from 'react'
import OrderItem from '~/pages/Order/OrderListItem/OrderItem/OrderItem'

const OrderListItem = ({ listFood }) => {
  return (
    <Center  w={'100%'} wrap='wrap' gap={fr(8)}>
      {listFood.map((item, index) => (
        <OrderItem
          key={index}
          image={item.image}
          title={item.title}
          price={item.price}
          description={item.description}
        />
      ))}
    </Center>
  )
}

export default OrderListItem
