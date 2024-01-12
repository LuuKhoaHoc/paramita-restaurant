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
  return (
    <Box w={'100%'} h={'100vh'} pos={'relative'}>
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
      <Center
        w={'100%'}
        h={'100%'}
        direction='column'
        cl={'white'}
        cs={'default'}
      >
        {sloganLeft ? (
          <Text fs={'2xl'} mb={-50} mr={300} z={10}>
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
          <Text fs={'lg'} mb={-50} ml={250} z={10}>
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
          <Text fs={'3xl'} mb={-50} ls={5} z={10}>
            <TypeAnimation
              sequence={[sloganCenter, 1000]}
              speed={75}
              cursor={false}
            />
          </Text>
        ) : (
          ''
        )}
        <Text fs={'8xl'} cl={color} z={10}>
          {title}
        </Text>
        {subtitle === 'Paramita' || subtitle === 'Restaurant' ? (
          <Text ls={30} fs={'3xl'} ml={30} mt={-40} z={10}>
            <TypeAnimation
              sequence={[subtitle, 1000]}
              speed={1}
              cursor={false}
            />
          </Text>
        ) : (
          <Text ls={5} fs={'3xl'} ml={30} mt={-20} z={10}>
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
            as={'a'}
            href='#'
            size={60}
            bg='white'
            td={'none'}
            cl={'black'}
            direction='column'
          >
            <Text ta={'center'} mt={10} fs={'xs'} ff={"'GeomanistMedium'"}>
              SCROLL {'\n'} DOWN
            </Text>
            <Icon size={'xs'}>
              <CaretDown weight='fill' />
            </Icon>
          </Circle>
        </Animation>
      </Center>
    </Box>
  )
}

export default MainPic
