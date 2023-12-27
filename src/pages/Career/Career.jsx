import { Box, Flex, Grid, Image, Text, fr } from '@prismane/core'
import React from 'react'
import { MainPic } from '~/components'
import { BangGo, CareerPic } from '~/images'
import CareerPost from '~/pages/Career/CareerPost/CareerPost'

const Career = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={CareerPic}
        title={'Tuyển dụng'}
        subtitle='Kết nối cùng Paramita'
      />
      <Box
        w={'100%'}
        h={'100%'}
        ff={'"BalihoScript", sans-serif'}
        pos={'relative'}
      >
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Flex pos={'relative'} gap={fr(8)} direction='column' my={fr(5)}>
              <Text as={'h2'} ff={'GeomanistMedium'}>
                Giới thiệu ngắn gọn về công ty, văn hóa doanh nghiệp.
              </Text>
              <Flex justify='around'>
                <Text as={'p'} fs={'2xl'}>
                  Paramita là thương hiệu nhà hàng chay nổi tiếng với phong cách
                  phục vụ chuyên nghiệp, thân thiện. Chúng tôi coi nhân viên là
                  tài sản quý giá nhất, luôn tạo môi trường làm việc năng động,
                  sáng tạo để nhân viên phát huy hết khả năng. Tại Paramita, mọi
                  nhân viên được tôn trọng, đãi ngộ xứng đáng và có nhiều cơ hội
                  thăng tiến. Chúng tôi cùng nhau phục vụ thực khách bằng tất cả
                  tâm huyết và nhiệt huyết. Mong muốn cùng xây dựng một tập thể
                  vững mạnh, gắn kết như gia đình.
                </Text>
                <Image src={BangGo} alt='' h={fr(83)} br={'md'} bsh={'lg'} />
              </Flex>
            </Flex>
            <Flex
              pos={'relative'}
              gap={fr(8)}
              direction='column'
              my={fr(5)}
            >
              <CareerPost/>
              <CareerPost/>
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Career
