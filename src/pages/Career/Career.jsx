import { Box, Flex, Grid, Image, Text, fr } from '@prismane/core'
import React from 'react'
import { MainPic } from '~/components'
import { BangGo, CareerPic } from '~/images'
import CareerPost from '~/pages/Career/CareerPost/CareerPost'
import { useResponsive } from '~/utils/responsive'

const Career = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={CareerPic}
        title={'Tuyển dụng'}
        subtitle='Kết nối cùng Paramita'
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
                Giới thiệu ngắn gọn về công ty, văn hóa doanh nghiệp.
              </Text>
              <Flex
                justify='around'
                direction={isTablet ? 'column' : isMobile ? 'column' : 'row'}
              >
                <Text as={'p'} fs={isTablet ? 'lg' : isMobile ? 'md' : 'xl'}>
                  Paramita là thương hiệu nhà hàng chay nổi tiếng với phong cách
                  phục vụ chuyên nghiệp, thân thiện. Chúng tôi coi nhân viên là
                  tài sản quý giá nhất, luôn tạo môi trường làm việc năng động,
                  sáng tạo để nhân viên phát huy hết khả năng. Tại Paramita, mọi
                  nhân viên được tôn trọng, đãi ngộ xứng đáng và có nhiều cơ hội
                  thăng tiến. Chúng tôi cùng nhau phục vụ thực khách bằng tất cả
                  tâm huyết và nhiệt huyết. Mong muốn cùng xây dựng một tập thể
                  vững mạnh, gắn kết như gia đình.
                </Text>
                <Image
                  src={BangGo}
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
