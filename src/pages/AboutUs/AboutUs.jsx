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
import {
  DividerLogo,
  AboutUsPic,
  BuddhaRestaurant,
  Space4,
  Space5,
  CanhChua,
  LauParamita,
  NemVuong,
  NamSot
} from '~/images'
import React, { useEffect, useState } from 'react'
// component
import { MainPic, StyledButton, DividerParamita } from '~/components'

const AboutUs = () => {
  const [scrollEvent, setScrollEvent] = useState(false)
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
        title={'Paramita'}
        image={AboutUsPic}
        sloganLeft={'Câu chuyện của'}
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Flex
              pos={'relative'}
              direction='row'
              justify='between'
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
                    w={fr(160)}
                    src={BuddhaRestaurant}
                    alt='restaurant-space'
                    br={'lg'}
                    bsh={'md'}
                    fit='cover'
                  />
                </Animation>
              </Box>
              <Box>
                <Flex
                  w={'100%'}
                  h={fr(160)}
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
                      fs={'3xl'}
                      ff={'GeomanistBold'}
                      cl={'primary'}
                    >
                      <Highlight cl={'#fff'}>Từ trái tim yêu thương</Highlight>
                    </Text>
                  </Animation>
                  <Animation
                    animation={'slide-right'}
                    animated={scrollEvent}
                    duration={1500}
                    delay={0}
                  >
                    <Text as={'p'} fs={'2xl'} ta='center'>
                      "Paramita được lấy cảm hứng từ giá trị từ bi và trí tuệ
                      của Phật giáo để đem lại cho thực khách món ăn ngon lành
                      cùng trải nghiệm yên bình."
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
                w={'100%'}
                h={fr(120)}
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
                    fs={'3xl'}
                    ff={'GeomanistBold'}
                    cl={'primary'}
                  >
                    <Highlight cl={'#fff'}>Thanh lọc tinh thần</Highlight>
                  </Text>
                </Animation>
                <Animation
                  animation={'slide-up'}
                  animated={scrollEvent}
                  duration={2500}
                  delay={0}
                >
                  <Text as={'p'} fs={'2xl'} ta='center' mx={fr(70)}>
                    "Thực phẩm là liều thuốc, là năng lượng nuôi dưỡng cuộc
                    sống. Chúng tôi mong muốn đem tới cho cộng đồng một không
                    gian ăn uống lành mạnh, thanh lọc."
                  </Text>
                </Animation>
              </Flex>
              <Flex
                direction='row'
                justify='center'
                align='center'
                gap={fr(10)}
              >
                <Animation
                  animation={'slide-left'}
                  animated={scrollEvent}
                  duration={2000}
                  delay={0}
                >
                  <Image h={fr(160)} src={Space4} br={'lg'} bsh={'xl'} />
                </Animation>
                <Animation
                  animation={'slide-right'}
                  animated={scrollEvent}
                  duration={2000}
                  delay={0}
                >
                  <Image h={fr(160)} src={Space5} br={'lg'} bsh={'xl'} />
                </Animation>
              </Flex>
            </Flex>
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <DividerParamita />
          </Grid.Item>
          <Grid.Item columnStart={3} columnEnd={11}>
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
                  w={'100%'}
                  h={fr(100)}
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
                      fs={'3xl'}
                      ff={'GeomanistBold'}
                      cl={'primary'}
                    >
                      <Highlight cl={'#fff'}>Viên ngọc quý</Highlight>
                    </Text>
                  </Animation>
                  <Animation
                    animation={'slide-down'}
                    animated={scrollEvent}
                    duration={5000}
                    delay={0}
                  >
                    <Text as={'p'} fs={'2xl'} ta='center' mx={fr(70)}>
                      "Paramita thể hiện tình yêu thương bao la cùng lòng từ bi
                      bằng hương vị ngọt ngào từ các món chay giản đơn mà đầy
                      dinh dưỡng."
                    </Text>
                  </Animation>
                </Flex>
              </Box>
              <Box bd={'1px solid'} bdc={'primary'} br={'md'}>
                <Box bd={'1px solid'} bdc={'primary'} br={'md'} m={fr(5)}>
                  <Flex direction='row' gap={fr(10)} justify='center'>
                    <Image
                      w={fr(140)}
                      h={fr(120)}
                      fit='contain'
                      src={CanhChua}
                      alt='canh-chua'
                    />
                    <Image
                      w={fr(140)}
                      h={fr(120)}
                      fit='contain'
                      src={LauParamita}
                      alt='lau-paramita'
                    />
                  </Flex>
                  <Divider />
                  <Flex direction='row' gap={fr(10)} justify='center'>
                    <Image
                      w={fr(140)}
                      h={fr(120)}
                      fit='contain'
                      src={NemVuong}
                      alt='nem-vuong'
                    />
                    <Image
                      w={fr(140)}
                      h={fr(120)}
                      fit='contain'
                      src={NamSot}
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
