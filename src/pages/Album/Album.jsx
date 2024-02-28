import { Box, Flex, Grid, Highlight, Image, Text, fr } from '@prismane/core'
// img
import { AlbumPic } from '~/images'
import React, { useState } from 'react'
// component
import { MainPic, DividerParamita, Loading } from '~/components'
import { Link } from 'react-router-dom'
import { itemToURL } from '~/utils/stringToURL'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

const GET_CONTENTS = gql`
  query {
    page(name: "Album") {
      page_id
      name
      content {
        title
        slogan
        description
        position
      }
    }
  }
`

const Album = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const { loading, data } = useQuery(GET_CONTENTS)
  const imagesCategory = [
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/San-vuon.webp',
      title: 'Sân vườn'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/Tinh-Vien.webp',
      title: 'Phòng tịch viên'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/Hoa-Ai.webp',
      title: 'Phòng hoà ái'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/Tam-Giao.webp',
      title: 'Phòng tâm giao'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/11/KIHA4783-1-1024x683.jpg',
      title: 'Phòng hương thiền'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/tiec-cuoi-1024x682.jpg',
      title: 'Tiệc cưới'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/sinhnhat.jpeg',
      title: 'Sinh nhật'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/11/312664443_490861549728331_635127123780423924_n-1024x683.jpg',
      title: 'Sự kiện khác'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/screenshot_1698397033-1024x681.png',
      title: 'Workshop dạy nấu ăn'
    }
  ]
  const [scrollEvent, setScrollEvent] = useState(false)
  window.addEventListener('scroll', () => {
    setScrollEvent(true)
  })
  if (loading) return <Loading />
  return (
    <Box pos={'relative'} mih={'100vh'} of={'hidden'}>
      <MainPic
        title={data?.page?.content[0].title}
        subtitle={data?.page?.content[0].description}
        image={AlbumPic}
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
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
              mx={isMobile ? fr(5) : fr(0)}
            >
              <Text fs={isTablet ? 'xl' : isMobile ? 'lg' : '2xl'} my={fr(4)}>
                {data?.page?.content[1].description}
              </Text>
              <Text
                fs={isTablet ? '2xl' : isMobile ? 'xl' : '3xl'}
                ff={'GeomanistBold'}
                tt={'uppercase'}
                mb={fr(4)}
              >
                <Highlight bg={['primary', 100]} cl={'#fff'}>
                  @Paramita
                </Highlight>
              </Text>
              <Flex
                w={'100%'}
                wrap='wrap'
                justify='evenly'
                gap={fr(5)}
                align='center'
              >
                {imagesCategory.map((item, index) => (
                  <Box
                    key={index}
                    pos={'relative'}
                    w={isTablet ? fr(70) : isMobile ? fr(60) : fr(83)}
                    h={isTablet ? fr(45) : isMobile ? fr(40) : fr(53)}
                    br={'md'}
                    sx={{
                      backgroundImage: `url(${item.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  >
                    <Box
                      pos={'absolute'}
                      b={8}
                      py={fr(2)}
                      px={fr(8)}
                      bg={'rgba(0,0,0,0.5)'}
                    >
                      <Link to={'/album/' + itemToURL(item.title)} state={item}>
                        <Text
                          cl={'#fff'}
                          op={[0.8, { hover: 1 }]}
                          tt={'capitalize'}
                        >
                          {item.title}
                        </Text>
                      </Link>
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Flex>
            <Flex
              pos={'relative'}
              direction='row'
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            ></Flex>
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <DividerParamita />
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Album
