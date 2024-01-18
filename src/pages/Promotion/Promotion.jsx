import { Box, Flex, Grid, fr } from '@prismane/core'
// img
import {
  BanhXeo,
  BunHue,
  BunNam,
  CaTimNuong,
  ChaoNamMoi,
  ComTam,
  DauHuNonChungTuong,
  Lau,
  PromotionPic,
  coffeeCup
} from '~/images'
import React, { useState } from 'react'
// component
import { DividerParamita, MainPic } from '~/components'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import PromotionItem from '~/pages/Promotion/PromotionItem/PromotionItem'
import { useResponsive } from '~/utils/responsive'

const Promotion = () => {
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
        <MainPic
          image={PromotionPic}
          title={'Paramita'}
          subtitle='Giảm giá đến 20% cho hoá đơn trên 500k'
        />
        <MainPic
          image={PromotionPic}
          title={'Paramita'}
          subtitle='Giảm giá đến 20% cho hoá đơn trên 500k'
        />
        <MainPic
          image={PromotionPic}
          title={'Paramita'}
          subtitle='Giảm giá đến 20% cho hoá đơn trên 500k'
        />
      </Carousel>
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item 
          columnStart={isTablet ? 2 : isMobile ? 1 : 3}
          columnEnd={isTablet ? 12 : isMobile ? 13 : 11}>
            <Flex
              pos={'relative'}
              direction='column'
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            >
              <PromotionItem
                title={'Ưu đãi lớn - Giảm ngay 20% khi mua combo 500k'}
                objectApply={'Tất cả'}
                image={imagesFood[0].image}
                description='Đây là cơ hội tuyệt vời để thưởng thức
                các combo ngon miệng tại nhà hàng với mức giá hấp dẫn chưa từng có. 
                Từ ngày 01/01 đến 31/01/2023, combo từ 500k sẽ được giảm ngay 20% giá trị.
                Không giới hạn đơn hàng và không áp dụng vào dịp lễ Tết. 
                Hãy liên hệ ngay để đặt combo và nhận ưu đãi cực lớn này!'
                dateStart={'01/01/2023'}
                dateEnd={'01/01/2023'}
              />
              <PromotionItem
                title={'Giảm ngay 35% khi mua combo 500k'}
                objectApply={'Vàng'}
                image={imagesFood[0].image}
                description='Đây là cơ hội tuyệt vời để thưởng thức
                các combo ngon miệng tại nhà hàng với mức giá hấp dẫn chưa từng có. 
                Từ ngày 01/01 đến 31/01/2023, combo từ 500k sẽ được giảm ngay 20% giá trị.
                Không giới hạn đơn hàng và không áp dụng vào dịp lễ Tết. 
                Hãy liên hệ ngay để đặt combo và nhận ưu đãi cực lớn này!'
                dateStart={'01/01/2023'}
                dateEnd={'01/01/2023'}
              />
              <PromotionItem
                title={'Paramita chính thức mở bán coffee'}
                objectApply={'Vàng'}
                image={coffeeCup}
                description='
                Paramita chính thức mở bán cà phê tại quận Bình Tân 
                và quận Tân Phú từ ngày 1/11. 
                Với thời gian hoạt động từ 7h30 đến 22h00, 
                quán hứa hẹn sẽ mang đến cho quý khách những trải nghiệm 
                cà phê thơm ngon và hấp dẫn nhất.'
                dateStart={'01/01/2023'}
                dateEnd={'01/01/2023'}
              />
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
