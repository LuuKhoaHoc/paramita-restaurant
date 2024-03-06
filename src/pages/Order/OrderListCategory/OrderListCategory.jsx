import { NavLink } from 'react-router-dom'
import { LogoIcon } from '~/images'
import { itemToURL } from '~/utils/stringToURL'

import React from 'react'
import { Center, Circle, Image, Text, fr, Flex } from '@prismane/core'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

const GET_CATEGORYLIST = gql`
  query {
    categoryList {
      name
    }
  }
`

const OrderListCategory = ({ data }) => {
  const listCategory = data?.categoryList.map((item) => item.name) || []
  const { isMobile, isTablet } = useResponsive()
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
          m={isTablet ? fr(5) : isMobile ? fr(3) : fr(8)}
        >
          <Circle
            size={isTablet ? fr(15) : isMobile ? fr(12) : fr(20)}
            bg={'#d1e9d5'}
          >
            <Image w={'50%'} h={'50%'} src={LogoIcon} />
          </Circle>
          <Text fs={isTablet ? 'base' : isMobile ? 'base' : 'md'}>{item}</Text>
        </Center>
      ))}
    </Flex>
  )
}

export default OrderListCategory
