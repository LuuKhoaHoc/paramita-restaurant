import {
  Animation,
  Box,
  Divider,
  Flex,
  Grid,
  Highlight,
  Image,
  Text,
  fr
} from '@prismane/core'
// img
import { DividerLogo } from '~/images'
import React, { useEffect, useState } from 'react'
// component
import { MainPic, DividerParamita } from '~/components'
import { useResponsive } from '~/utils/responsive'
import { useQuery, gql } from '@apollo/client'

const GET_CONTENTS = gql`
  query {
    page(name: "About Us") {
      page_id
      name
      content {
        title
        slogan
        description
        image
        position
      }
    }
  }
`

const AboutUs = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const [scrollEvent, setScrollEvent] = useState(false)
  // data from api
  const { loading, error, data } = useQuery(GET_CONTENTS)
  useEffect(() => {
    const handleScroll = () => {
      setScrollEvent(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <Box pos={'relative'} mih={'100vh'} of={'hidden'}>
      <MainPic
        title={data?.page?.content[0]?.title}
        image={data?.page?.content[0]?.image}
        sloganLeft={data?.page?.content[0]?.slogan}
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Flex
              pos={'relative'}
              direction={isTablet ? 'column' : isMobile ? 'column' : 'row'}
              align='center'
              gap={fr(10)}
              my={fr(5)}
            >
              <Box>
                <Animation
                  animation={'slide-left'}
                  animated={scrollEvent}
                  duration={1000}
                  delay={0}
                >
                  <Image
                    w={
                      isLaptop
                        ? fr(120)
                        : isTablet
                        ? fr(100)
                        : isMobile
                        ? fr(80)
                        : fr(160)
                    }
                    src={data?.page?.content[1]?.image}
                    alt='restaurant-space'
                    br={'lg'}
                    bsh={'md'}
                    fit='cover'
                  />
                </Animation>
              </Box>
              <Box>
                <Flex
                  w={
                    isLaptop
                      ? fr(120)
                      : isTablet
                      ? fr(100)
                      : isMobile
                      ? fr(80)
                      : fr(160)
                  }
                  h={
                    isLaptop
                      ? fr(140)
                      : isTablet
                      ? fr(80)
                      : isMobile
                      ? fr(60)
                      : fr(160)
                  }
                  direction='column'
                  justify='evenly'
                  align='center'
                >
                  <Animation
                    animation={'fade'}
                    animated={scrollEvent}
                    duration={1000}
                    delay={0}
                  >
                    <Text
                      as={'h1'}
                      fs={isTablet ? '2xl' : isMobile ? 'xl' : '3xl'}
                      ff={'GeomanistBold'}
                      cl={'primary'}
                    >
                      <Highlight cl={'#fff'}>
                        {data?.page?.content[1]?.title}
                      </Highlight>
                    </Text>
                  </Animation>
                  <Animation
                    animation={'slide-right'}
                    animated={scrollEvent}
                    duration={1500}
                    delay={0}
                  >
                    <Text
                      as={'p'}
                      fs={isTablet ? 'xl' : isMobile ? 'md' : '2xl'}
                      ta='center'
                    >
                      "{data?.page?.content[1]?.description}"
                    </Text>
                  </Animation>
                </Flex>
              </Box>
            </Flex>
            <Flex
              pos={'relative'}
              direction='column'
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            >
              <Flex
                w={
                  isLaptop
                    ? fr(140)
                    : isTablet
                    ? fr(100)
                    : isMobile
                    ? fr(80)
                    : fr(160)
                }
                h={
                  isLaptop
                    ? fr(140)
                    : isTablet
                    ? fr(100)
                    : isMobile
                    ? fr(80)
                    : fr(160)
                }
                direction='column'
                justify='evenly'
                align='center'
              >
                <Animation
                  animation={'fade'}
                  animated={scrollEvent}
                  duration={2000}
                  delay={0}
                >
                  <Text
                    as={'h1'}
                    fs={isTablet ? '2xl' : isMobile ? 'xl' : '3xl'}
                    ff={'GeomanistBold'}
                    cl={'primary'}
                  >
                    <Highlight cl={'#fff'}>
                      {data?.page?.content[2]?.title}
                    </Highlight>
                  </Text>
                </Animation>
                <Animation
                  animation={'slide-up'}
                  animated={scrollEvent}
                  duration={2500}
                  delay={0}
                >
                  <Text
                    as={'p'}
                    fs={isTablet ? 'xl' : isMobile ? 'md' : '2xl'}
                    ta='center'
                  >
                    "{data?.page?.content[2]?.description}"
                  </Text>
                </Animation>
              </Flex>
              <Flex
                direction='row'
                justify='center'
                align='center'
                gap={isMobile ? fr(3) : fr(10)}
              >
                <Animation
                  animation={'slide-left'}
                  animated={scrollEvent}
                  duration={2000}
                  delay={0}
                >
                  <Image
                    w={
                      isLaptop
                        ? fr(96)
                        : isTablet
                        ? fr(67)
                        : isMobile
                        ? fr(45)
                        : 'auto'
                    }
                    h={
                      isLaptop
                        ? fr(140)
                        : isTablet
                        ? fr(100)
                        : isMobile
                        ? fr(70)
                        : fr(160)
                    }
                    src={data?.page?.content[2]?.image}
                    br={'lg'}
                    bsh={'xl'}
                  />
                </Animation>
                <Animation
                  animation={'slide-right'}
                  animated={scrollEvent}
                  duration={2000}
                  delay={0}
                >
                  <Image
                    w={
                      isLaptop
                        ? fr(96)
                        : isTablet
                        ? fr(67)
                        : isMobile
                        ? fr(45)
                        : 'auto'
                    }
                    h={
                      isLaptop
                        ? fr(140)
                        : isTablet
                        ? fr(100)
                        : isMobile
                        ? fr(70)
                        : fr(160)
                    }
                    src={data?.page?.content[4]?.image}
                    br={'lg'}
                    bsh={'xl'}
                  />
                </Animation>
              </Flex>
            </Flex>
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <DividerParamita />
          </Grid.Item>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Flex
              pos={'relative'}
              direction='column'
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            >
              <Box>
                <Flex
                  w={
                    isLaptop
                      ? fr(140)
                      : isTablet
                      ? fr(100)
                      : isMobile
                      ? fr(80)
                      : fr(160)
                  }
                  h={
                    isLaptop
                      ? fr(140)
                      : isTablet
                      ? fr(100)
                      : isMobile
                      ? fr(80)
                      : fr(160)
                  }
                  direction='column'
                  justify='evenly'
                  align='center'
                >
                  <Animation
                    animation={'slide-up'}
                    animated={scrollEvent}
                    duration={5000}
                    delay={0}
                  >
                    <Text
                      as={'h1'}
                      fs={isTablet ? '2xl' : isMobile ? 'xl' : '3xl'}
                      ff={'GeomanistBold'}
                      cl={'primary'}
                    >
                      <Highlight cl={'#fff'}>
                        {data?.page?.content[3]?.title}
                      </Highlight>
                    </Text>
                  </Animation>
                  <Animation
                    animation={'slide-down'}
                    animated={scrollEvent}
                    duration={5000}
                    delay={0}
                  >
                    <Text
                      as={'p'}
                      fs={isTablet ? 'xl' : isMobile ? 'md' : '2xl'}
                      ta='center'
                    >
                      "{data?.page?.content[3]?.description}"
                    </Text>
                  </Animation>
                </Flex>
              </Box>
              <Box bd={'1px solid'} bdc={'primary'} br={'md'}>
                <Box bd={'1px solid'} bdc={'primary'} br={'md'} m={fr(5)}>
                  <Flex direction='row' gap={fr(10)} justify='center'>
                    {/* TODO: Thêm ảnh nếu có */}
                    <Image
                      w={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(60)
                          : isMobile
                          ? fr(35)
                          : fr(140)
                      }
                      h={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(80)
                          : isMobile
                          ? fr(60)
                          : fr(120)
                      }
                      fit='contain'
                      src={data?.page?.content[3]?.image}
                      alt='canh-chua'
                    />
                    <Image
                      w={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(60)
                          : isMobile
                          ? fr(35)
                          : fr(140)
                      }
                      h={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(80)
                          : isMobile
                          ? fr(60)
                          : fr(120)
                      }
                      fit='contain'
                      src={data?.page?.content[5]?.image}
                      alt='lau-paramita'
                    />
                  </Flex>
                  <Divider />
                  <Flex direction='row' gap={fr(10)} justify='center'>
                    <Image
                      w={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(60)
                          : isMobile
                          ? fr(35)
                          : fr(140)
                      }
                      h={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(80)
                          : isMobile
                          ? fr(60)
                          : fr(120)
                      }
                      fit='contain'
                      src={data?.page?.content[6]?.image}
                      alt='nem-vuong'
                    />
                    <Image
                      w={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(60)
                          : isMobile
                          ? fr(35)
                          : fr(140)
                      }
                      h={
                        isLaptop
                          ? fr(100)
                          : isTablet
                          ? fr(80)
                          : isMobile
                          ? fr(60)
                          : fr(120)
                      }
                      fit='contain'
                      src={data?.page?.content[7]?.image}
                      alt='nam-sot'
                    />
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <Image src={DividerLogo} alt='divider' fit='cover' w={fr(80)} />
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default AboutUs
