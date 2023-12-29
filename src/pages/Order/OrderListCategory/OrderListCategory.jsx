import { NavLink } from 'react-router-dom'
import { LogoIcon } from '~/images'
import { itemToURL } from '~/utils/stringToURL'

import React from 'react'
import { Center, Circle, Image, Text, fr, Flex } from '@prismane/core'

const OrderListCategory = ({ listCategory }) => {
  return (
    <Flex
      w={'100%'}
      direction='row'
      align='center'
      wrap='wrap'
      justify='center'
    >
      {listCategory.map((item, index) => (
        <Center
          key={index}
          direction='column'
          as={NavLink}
          to={'/order-online/' + itemToURL(item)}
          m={fr(8)}
        >
          <Circle size={fr(20)} bg={'#d1e9d5'}>
            <Image w={fr(11)} h={fr(11)} src={LogoIcon} />
          </Circle>
          <Text fs={'md'}>{item}</Text>
        </Center>
      ))}
    </Flex>
  )
}

export default OrderListCategory
