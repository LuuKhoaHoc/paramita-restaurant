import { Box, Flex, Image, fr } from '@prismane/core'
import React from 'react'
import { HomeFood1, HomeLeaf1 } from '../../images'
import { useResponsive } from '~/utils/responsive'

const   Divider = () => {
  const { isLaptop, isTablet, isMobile } = useResponsive()
  return (
    <Flex
      align='center'
      pos={'relative'}
      justify='between'
      w={'100%'}
      h={isLaptop ? fr(80) : isTablet ? fr(60) : isMobile ? fr(30) : fr(100)}
      my={fr(5)}
    >
      <Box pos={'absolute'} l={0}>
        <Image h={isLaptop ? fr(80) : isTablet ? fr(60) : isMobile ? fr(30) : fr(80) } src={HomeLeaf1} alt='home-leaf' fit='contain' />
      </Box>
      <Box pos={'absolute'} l={'50%'} sx={{ transform: 'translateX(-50%)' }}>
        <Image h={isLaptop ? fr(80) : isTablet ? fr(60) : isMobile ? fr(30) : fr(80) } src={HomeFood1} alt='home-leaf' fit='contain' />
      </Box>
      <Box pos={'absolute'} r={0}>
        <Image
          h={isLaptop ? fr(80) : isTablet ? fr(60) : isMobile ? fr(30) : fr(80) }
          src={HomeLeaf1}
          alt='home-leaf'
          fit='contain'
          sx={{ transform: 'scaleX(-1)' }}
        />
      </Box>
    </Flex>
  )
}

export default Divider
