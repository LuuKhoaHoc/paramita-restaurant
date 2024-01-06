import { Minus, Plus } from '@phosphor-icons/react'
import { Circle, Flex, Text, fr } from '@prismane/core'
import React, { useEffect, useState } from 'react'

const QuantityItem = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    onQuantityChange(quantity)
  }, [quantity])

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  return (
    <Flex w={fr(28)} justify='between' align='center'>
      <Circle
        size={fr(8)}
        bg={'primary'}
        cs={'pointer'}
        onClick={decreaseQuantity}
      >
        <Minus weight='bold' />
      </Circle>
      <Text>{quantity}</Text>
      <Circle
        size={fr(8)}
        bg={'primary'}
        cs={'pointer'}
        onClick={increaseQuantity}
      >
        <Plus weight='bold' />
      </Circle>
    </Flex>
  )
}

export default QuantityItem
