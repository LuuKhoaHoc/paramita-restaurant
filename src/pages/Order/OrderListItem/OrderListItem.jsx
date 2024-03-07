import { Center, fr } from '@prismane/core'
import React from 'react'
import OrderItem from '~/pages/Order/OrderListItem/OrderItem/OrderItem'
import { useResponsive } from '~/utils/responsive'

const OrderListItem = ({ listFood }) => {
  const { isMobile } = useResponsive()
  return (
    <Center
      w={isMobile ? '90%' : '100%'}
      wrap='wrap'
      gap={isMobile ? fr(4) : fr(8)}
    >
      {listFood?.map((item, index) => (
        <OrderItem
          key={index}
          image={item.image}
          title={item.name}
          price={item.price * 1000}
          description={item.description}
        />
      ))}
    </Center>
  )
}

export default OrderListItem
