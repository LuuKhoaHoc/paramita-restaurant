// component
import {
  Animation,
  Box,
  Center,
  Circle,
  Icon,
  Image,
  Text,
  Transition,
  fr
} from '@prismane/core'
import { TypeAnimation } from 'react-type-animation'
// icon
import { CaretDown } from '@phosphor-icons/react'

import React, { useState } from 'react'
import { useResponsive } from '~/utils/responsive'

const MainPic = ({
  title,
  subtitle = 'Restaurant',
  sloganLeft,
  sloganRight,
  sloganCenter,
  image,
  color
}) => {
  const [onHovered, setOnHovered] = useState(false)
  const { isLaptop, isTablet, isMobile } = useResponsive()
  return (
    <Box w={'100%'} h={'100vh'} pos={'relative'} cl={'white'}>
      <Transition
        alt='main pic'
        w='100%'
        h='100%'
        pos='absolute'
        transition='all'
        timing='ease-in'
        ft={'brightness(0.5)'}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <Center w={'100%'} h={'100%'} direction='column' cs={'default'}>
        {sloganLeft ? (
          <Text
            fs={isMobile ? 'md' : 'xl'}
            mb={-50}
            mr={isMobile ? 200 : 300}
            z={10}
            cl={'white'}
          >
            <TypeAnimation
              sequence={[sloganLeft, 1000]}
              speed={75}
              cursor={false}
            />
          </Text>
        ) : (
          ''
        )}
        {sloganRight ? (
          <Text
            fs={isTablet ? 'lg' : isMobile ? 'base' : 'xl'}
            mb={-50}
            ml={isMobile ? 150 : 250}
            cl={'white'}
            z={10}
          >
            <TypeAnimation
              sequence={[sloganRight, 1000]}
              speed={75}
              cursor={false}
            />
          </Text>
        ) : (
          ''
        )}
        {sloganCenter ? (
          <Text
            fs={isTablet ? '2xl' : isMobile ? 'lg' : '3xl'}
            mb={-50}
            ls={5}
            z={10}
            cl={'white'}
          >
            <TypeAnimation
              sequence={[sloganCenter, 1000]}
              speed={75}
              cursor={false}
            />
          </Text>
        ) : (
          ''
        )}
        <Text
          fs={isTablet ? '7xl' : isMobile ? '6xl' : '8xl'}
          cl={color}
          my={isTablet ? fr(5) : isMobile ? fr(10) : 0}
          z={10}
        >
          {title}
        </Text>
        {subtitle === 'Paramita' || subtitle === 'Restaurant' ? (
          <Text
            ls={isMobile ? 20 : 30}
            fs={isTablet ? '2xl' : isMobile ? 'lg' : '3xl'}
            ml={30}
            mt={-40}
            z={10}
            cl={'white'}
          >
            <TypeAnimation
              sequence={[subtitle, 1000]}
              speed={1}
              cursor={false}
            />
          </Text>
        ) : (
          <Text
            ls={5}
            fs={isTablet ? '2xl' : isMobile ? 'lg' : '3xl'}
            ta={isMobile ? 'center' : 'left'}
            ml={30}
            mt={-20}
            z={10}
            cl={'white'}
          >
            <TypeAnimation
              sequence={[subtitle, 1000]}
              speed={75}
              cursor={false}
            />
          </Text>
        )}
        <Animation
          animation={'bounce'}
          w={fr(15)}
          h={fr(15)}
          onMouseEnter={() => setOnHovered(true)}
          onMouseLeave={() => setOnHovered(false)}
          animated={onHovered}
          pos={'absolute'}
          b={0}
        >
          <Circle
            size={isMobile ? 40 : 60}
            bg='white'
            td={'none'}
            cl={'black'}
            direction='column'
            cs={'pointer'}
            onClick={() => window.scrollTo({ top: 820, behavior: 'smooth' })}
          >
            {isMobile ? (
              <>
                <Icon size={'xs'}>
                  <CaretDown weight='fill' />
                </Icon>
              </>
            ) : (
              <>
                <Text
                  ta={'center'}
                  mt={10}
                  fs='xs'
                  className='GeomanistMedium-font'
                >
                  SCROLL {'\n'} DOWN
                </Text>
                <Icon size={'xs'}>
                  <CaretDown weight='fill' />
                </Icon>
              </>
            )}
          </Circle>
        </Animation>
      </Center>
    </Box>
  )
}

export default MainPic
