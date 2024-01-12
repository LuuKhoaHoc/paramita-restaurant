import { Box, Flex, Grid, Image, List, Text, fr } from '@prismane/core'
import React from 'react'
import { PromotionPic } from '~/images'

const PromotionDetail = () => {
  let strings = `Thời gian áp dụng: Từ 00h00 ngày 01/01/2023 đến 23h59 ngày 31/01/2023.
  Áp dụng cho các đơn hàng combo có giá trị từ 500.000 VNĐ trở lên.
  Giảm trực tiếp 20% trên tổng giá trị của combo đủ điều kiện.
  Khách hàng có thể đặt nhiều đơn hàng combo và được giảm giá cho từng đơn hàng.
  Không áp dụng chương trình cho các ngày lễ, Tết và các khuyến mãi khác đang diễn ra cùng thời điểm.
  Quý khách vui lòng xuất trình voucher khuyến mãi để được giảm giá khi thanh toán.
  Xin vui lòng liên hệ Hotline XXX để được tư vấn lựa chọn combo phù hợp.`
  const cutStringToArray = (inputString) => {
    return inputString.split('\n')
  }
  const array = cutStringToArray(strings)
  return (
    <>
      <Box h={fr(22.5)} bg='#371b04' />
      <Grid templateColumns={12}>
        <Grid.Item columnStart={3} columnEnd={11}>
          <Flex w={'100%'} my={fr(5)}>
            <Box>
              <Text as={'h1'} ff={'GeomanistMedium'}>
                Ưu đãi lớn - Giảm ngay 20% khi mua combo 500k
              </Text>
              <Text as={'p'} fs={'lg'} cl={'base'}>
                Đối tượng áp dụng: Tất cả
              </Text>
              <Text as={'p'} fs={'lg'} cl={'base'}>
                Thời gian: 01/01/2023 - 01/01/2023
              </Text>
              <List.Unordered ml={fr(5)} fs={'lg'}>
                {array.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List.Unordered>
              <Text as={'p'} fs={'lg'}>
                Chương trình có thể kết thúc sớm nếu hết ngân sách. Mong quý
                khách ủng hộ và cùng nhau thưởng thức các món ngon của nhà hàng!
              </Text>
            </Box>
            <Box>
              <Image h={fr(75)} br={'lg'} bsh={'lg'} src={PromotionPic} />
            </Box>
          </Flex>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default PromotionDetail
