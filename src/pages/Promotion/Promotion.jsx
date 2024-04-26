import { Box, Flex, Grid, fr, TextField } from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { MagnifyingGlass } from '@phosphor-icons/react'
// img
import { PromotionPic, coffeeCup } from '~/images'
import React, { useState } from 'react'
// component
import { DividerParamita, MainPic } from '~/components'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import PromotionItem from '~/pages/Promotion/PromotionItem/PromotionItem'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'
import { GET_PROMOTIONS } from '~/pages/Admin/Promotion/schema'
import { formatTime } from '~/utils/formatTime'

const GET_CONTENTS = gql`
  query {
    page(name: "Promotion") {
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

const Promotion = () => {
  const {
    loading: loadingPromotion,
    error: errorPromotion,
    data: dataPromotion
  } = useQuery(GET_PROMOTIONS)
  const { filtered, query, setQuery } = useSearch(
    dataPromotion?.promotionList || []
  )
  const responsiveCarousel = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  const { isMobile, isTablet, isLaptop } = useResponsive()
  const { loading, error, data } = useQuery(GET_CONTENTS)
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Carousel
        swipeable
        draggable={false}
        showDots={true}
        responsive={responsiveCarousel}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl
        transitionDuration={500}
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {data?.page?.content?.map((item, index) => (
          <MainPic
            key={index}
            image={item.image || PromotionPic}
            title={item.title}
            subtitle={item.description}
          />
        ))}
        <MainPic
          image={PromotionPic}
          title='Paramita'
          subtitle='Khuyến mãi cực sốc'
        />
      </Carousel>
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Flex my={fr(4)} justify='end'>
              <TextField
                variant='underlined'
                placeholder='Tìm kiếm...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                icon={<MagnifyingGlass />}
              />
            </Flex>
            <Flex
              pos={'relative'}
              direction='column'
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            >
              {filtered?.map((item) => (
                <PromotionItem
                  key={item?.tsid}
                  image={coffeeCup}
                  title={item?.name}
                  objectApply={item?.target}
                  condition={item?.conditions}
                  dateStart={formatTime(item?.start_date)}
                  dateEnd={formatTime(item?.end_date)}
                  description={item?.description}
                />
              ))}
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

export default Promotion
