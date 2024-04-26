import { Box, Flex, Grid, Image, Text, fr } from '@prismane/core'
import React from 'react'
import { Loading, MainPic } from '~/components'
import CareerPost from '~/pages/Career/CareerPost/CareerPost'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

const GET_CONTENTS = gql`
  query {
    page(name: "Career") {
      page_id
      name
      content {
        title
        slogan
        image
        description
        position
      }
    }
  }
`

const Career = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const { loading, data } = useQuery(GET_CONTENTS)
  if (loading) return <Loading />
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={data?.page?.content[0]?.image}
        title={data?.page?.content[0].title}
        subtitle={data?.page?.content[0].description}
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Flex
              gap={fr(8)}
              direction='column'
              my={fr(5)}
              mx={isMobile ? fr(5) : fr(0)}
            >
              <Text
                as={'h2'}
                fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                className='GeomanistMedium-font'
              >
                {data?.page?.content[1].title}
              </Text>
              <Flex
                justify='around'
                direction={isTablet ? 'column' : isMobile ? 'column' : 'row'}
              >
                <Text as={'p'} fs={isTablet ? 'lg' : isMobile ? 'md' : 'xl'}>
                  {data?.page?.content[1].description}
                </Text>
                <Image
                  src={data?.page?.content[1]?.image}
                  alt=''
                  w={isTablet ? fr(80) : isMobile ? fr(50) : 'inherit'}
                  h={isTablet ? 'inherit' : isMobile ? 'inherit' : fr(83)}
                  br={'md'}
                  bsh={'lg'}
                  mx={'auto'}
                />
              </Flex>
            </Flex>
            <Flex
              gap={fr(8)}
              direction='column'
              my={fr(5)}
              mx={isMobile ? fr(5) : fr(0)}
            >
              <CareerPost />
              <CareerPost />
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Career
