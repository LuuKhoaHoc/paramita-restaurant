import {
  Animation,
  Box,
  Flex,
  Grid,
  Highlight,
  Icon,
  Image,
  Text,
  fr
} from '@prismane/core'
// img
import {
  BangGo,
  BanhXeo,
  BunHue,
  BunNam,
  CaTimNuong,
  ChaoNamMoi,
  ComTam,
  DauHuNonChungTuong,
  DividerLogo,
  HomePic,
  HomePic2,
  Lau
} from '~/images'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
// component
import { MainPic, StyledButton, DividerParamita } from '~/components'
import { Star } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import { useQuery, gql } from '@apollo/client'

const GET_CONTENTS = gql`
  query {
    page(name: "Home") {
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

const Home = () => {
  const { isLaptop, isTablet, isMobile } = useResponsive()
  const imagesFood = [
    { image: BanhXeo, title: 'Bánh xèo', rating: 5 },
    { image: BunHue, title: 'Bún Huế Paramita', rating: 4.5 },
    { image: BunNam, title: 'Bún nấm nướng chả giò', rating: 5 },
    { image: CaTimNuong, title: 'Cà tím nướng hành ớt', rating: 5 },
    { image: ChaoNamMoi, title: 'Cháo nấm mối', rating: 5 },
    { image: ComTam, title: 'Cơm tấm Paramita', rating: 5 },
    { image: DauHuNonChungTuong, title: 'Đậu hũ non chưng tương', rating: 5 },
    { image: Lau, title: 'Lẩu Paramita', rating: 4.5 }
  ]
  const [scrollEvent, setScrollEvent] = useState(false)
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
        image={HomePic}
        sloganRight={data?.page?.content[0]?.slogan}
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Flex
              pos={'relative'}
              direction={isMobile ? 'column' : 'row'}
              justify='between'
              align='center'
              gap={isMobile ? fr(4) : fr(8)}
              my={fr(5)}
              mx={isMobile ? fr(2) : fr(0)}
            >
              <Box>
                <Animation
                  animation={'slide-left'}
                  animated={scrollEvent}
                  duration={1000}
                  timing='ease-in-out'
                  delay={0}
                >
                    {/*TODO: Thêm image nếu có */}
                  <Image
                    w={
                      isLaptop
                        ? fr(100)
                        : isTablet
                        ? fr(80)
                        : isMobile
                        ? fr(60)
                        : fr(120)
                    }
                    h={
                      isLaptop
                        ? fr(140)
                        : isTablet
                        ? fr(120)
                        : isMobile
                        ? fr(80)
                        : fr(160)
                    }
                    src={BangGo}
                    alt='restaurant-space'
                    br={'lg'}
                    bsh={'md'}
                  />
                </Animation>
              </Box>
              <Box>
                {data?.page?.content[1] && (
                  <Flex
                    w={'100%'}
                    h={
                      isLaptop
                        ? fr(140)
                        : isTablet
                        ? fr(120)
                        : isMobile
                        ? fr(100)
                        : fr(160)
                    }
                    direction='column'
                    justify='evenly'
                  >
                    <Text
                      as={'h2'}
                      className='GeomanistLight-font'
                      cl={'primary'}
                      fs={
                        isLaptop
                          ? 'xl'
                          : isTablet
                          ? 'lg'
                          : isMobile
                          ? 'base'
                          : '2xl'
                      }
                    >
                      <Highlight cl={'#fff'} className='GeomanistLight-font'>
                        {data?.page?.content[1]?.title}
                      </Highlight>
                    </Text>
                    <Animation
                      animation={'slide-right'}
                      animated={scrollEvent}
                      duration={1500}
                      timing='ease-in-out'
                      delay={0}
                    >
                      <Text
                        as={'p'}
                        fs={
                          isLaptop
                            ? 'xl'
                            : isTablet
                            ? 'md'
                            : isMobile
                            ? 'sm'
                            : '2xl'
                        }
                      >
                        {data?.page?.content[1]?.description}
                      </Text>
                    </Animation>
                    <Image
                      src={DividerLogo}
                      alt='divider'
                      fit='cover'
                      w={
                        isLaptop
                          ? fr(80)
                          : isTablet
                          ? fr(60)
                          : isMobile
                          ? fr(40)
                          : fr(80)
                      }
                    />
                  </Flex>
                )}
              </Box>
            </Flex>
            <Flex
              pos={'relative'}
              direction={isMobile ? 'column' : 'row'}
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
              mb={isTablet ? fr(25) : fr(0)}
            >
              <Box>
                <Flex
                  w={'100%'}
                  h={
                    isLaptop
                      ? fr(140)
                      : isTablet
                      ? fr(120)
                      : isMobile
                      ? fr(80)
                      : fr(160)
                  }
                  direction='column'
                  align='center'
                  gap={
                    isLaptop
                      ? fr(10)
                      : isTablet
                      ? fr(8)
                      : isMobile
                      ? fr(6)
                      : fr(15)
                  }
                >
                  <Animation
                    animation={'slide-up'}
                    animated={scrollEvent}
                    duration={2500}
                    delay={0}
                  >
                    <Text
                      as={'p'}
                      fs={
                        isLaptop
                          ? 'lg'
                          : isTablet
                          ? 'md'
                          : isMobile
                          ? 'base'
                          : '2xl'
                      }
                    >
                      <Highlight cl={'#fff'}>
                        "{data?.page?.content[2]?.slogan}"
                      </Highlight>
                    </Text>
                  </Animation>
                  <Animation
                    animation={'slide-down'}
                    animated={scrollEvent}
                    duration={2200}
                    delay={0}
                  >
                    <Text
                      fs={
                        isLaptop
                          ? '3xl'
                          : isTablet
                          ? 'xl'
                          : isMobile
                          ? 'md'
                          : '4xl'
                      }
                      ff={'GeomanistBold'}
                      cl={'primary'}
                    >
                      {data?.page?.content[2]?.title}
                    </Text>
                  </Animation>
                  <Animation
                    animation={'slide-left'}
                    animated={scrollEvent}
                    duration={2000}
                    delay={0}
                  >
                    <Text
                      as={'p'}
                      // h={isTablet ? fr(60) : isMobile ? fr(40) : fr(80)}
                      fs={
                        isLaptop
                          ? 'lg'
                          : isTablet
                          ? 'base'
                          : isMobile
                          ? 'sm'
                          : 'xl'
                      }
                      px={isTablet ? fr(5) : isMobile ? fr(2) : fr(10)}
                    >
                      {data?.page?.content[2]?.description}
                    </Text>
                  </Animation>
                  <Animation>
                    <StyledButton>
                      <Link to={'/menu'}>Xem thực đơn</Link>
                    </StyledButton>
                  </Animation>
                </Flex>
              </Box>
              <Box>
                <Animation
                  animation={'slide-down'}
                  animated={scrollEvent}
                  duration={2000}
                  delay={0}
                >
                  {/* TODO: Thêm image nếu có */}
                  <Image
                    w={
                      isLaptop
                        ? fr(100)
                        : isTablet
                        ? fr(80)
                        : isMobile
                        ? fr(60)
                        : fr(120)
                    }
                    h={
                      isLaptop
                        ? fr(140)
                        : isTablet
                        ? fr(120)
                        : isMobile
                        ? fr(100)
                        : fr(160)
                    }
                    src={HomePic2}
                    alt='restaurant-space'
                    br={'lg'}
                    bsh={'md'}
                  />
                </Animation>
              </Box>
            </Flex>
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <DividerParamita />
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <Box w={'100%'} pos={'relative'} my={fr(5)}>
              <Text
                ff={'GeomanistBold'}
                fs={isMobile ? 'lg' : '3xl'}
                ml={fr(10)}
              >
                <Highlight bg={['primary', 100]} cl={'#fff'}>
                  Best seller #1
                </Highlight>
              </Text>
            </Box>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlay
              autoPlaySpeed={10}
              centerMode={false}
              className=''
              containerClass='container-with-dots'
              customTransition='all 1s linear'
              dotListClass=''
              draggable
              focusOnSelect={false}
              infinite
              itemClass=''
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1441
                  },
                  items: 5,
                  partialVisibilityGutter: 40
                },
                laptop: {
                  breakpoint: {
                    max: 1440,
                    min: 1024
                  },
                  items: 3,
                  partialVisibilityGutter: 30
                },
                tablet: {
                  breakpoint: {
                    max: 1023,
                    min: 426
                  },
                  items: 2,
                  partialVisibilityGutter: 30
                },
                mobile: {
                  breakpoint: {
                    max: 425,
                    min: 0
                  },
                  items: 1,
                  partialVisibilityGutter: 30
                }
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=''
              slidesToSlide={1}
              swipeable
              transitionDuration={3000}
            >
              {imagesFood.map((item, index) => (
                <Flex
                  justify='center'
                  align='center'
                  direction='column'
                  key={index}
                  mt={fr(10)}
                >
                  <Link to={'/menu'}>
                    <Image
                      w={fr(80)}
                      src={item.image}
                      alt='restaurant-food'
                      br={'lg'}
                      bsh={'lg'}
                      pos={'relative'}
                    />
                    <Flex
                      gap={fr(2)}
                      justify='center'
                      align='center'
                      pos='absolute'
                      b={0}
                      fs={'xl'}
                      w={fr(80)}
                      bg={'#39b54a'}
                      br={'sm'}
                      bsh={'lg'}
                    >
                      <Text cl={'#fff'}>{item.title}</Text>
                      <Text cl='#ffe234'>{item.rating} </Text>
                      <Icon>
                        <Star color='#ffe234' weight='fill' />
                      </Icon>
                    </Flex>
                  </Link>
                </Flex>
              ))}
            </Carousel>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Home
