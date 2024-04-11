import { Box, Flex, Grid, Image, List, Text, fr } from '@prismane/core'
import React from 'react'
import { PromotionPic } from '~/images'
import { useResponsive } from '~/utils/responsive'
import { useLocation } from 'react-router-dom'

const PromotionDetail = () => {
  const { state } = useLocation()
  console.log('🚀 ~ PromotionDetail ~ state:', state)
  let strings = `Thời gian áp dụng: Từ 00h00 ngày 01/01/2023 đến 23h59 ngày 31/01/2023.
  Áp dụng cho các đơn hàng combo có giá trị từ 500.000 VNĐ trở lên.
  Giảm trực tiếp 20% trên tổng giá trị của combo đủ điều kiện.
  Khách hàng có thể đặt nhiều đơn hàng combo và được giảm giá cho từng đơn hàng.
  Không áp dụng chương trình cho các ngày lễ, Tết và các khuyến mãi khác đang diễn ra cùng thời điểm.
  Quý khách vui lòng xuất trình voucher khuyến mãi để được giảm giá khi thanh toán.
  Xin vui lòng liên hệ Hotline XXX để được tư vấn lựa chọn combo phù hợp.`
  const capitalize = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
  }
  const { isLaptop, isTablet, isMobile } = useResponsive()
  return (
    <>
      <Box h={fr(22.5)} bg='#371b04' />
      <Grid templateColumns={12}>
        <Grid.Item
          columnStart={isTablet ? 2 : isMobile ? 1 : 3}
          columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
        >
          <Flex w={'100%'} my={fr(5)} direction='column'>
            <Box mx={isMobile ? fr(3) : 0}>
              <Image w={'100%'} br={'lg'} bsh={'lg'} src={PromotionPic} />
            </Box>
            <Box mx={isMobile ? fr(3) : 0}>
              <Text
                as={'h1'}
                fs={isMobile ? 'xl' : 'inherit'}
                className='GeomanistMedium-font'
              >
                {state?.title || 'Chương trình khuyết mãi'}
              </Text>
              <Text as={'p'} fs={'lg'} cl={'base'}>
                Đối tượng áp dụng: {state?.objectApply || 'Tất cả'}
              </Text>
              <Text as={'p'} fs={'lg'} cl={'base'}>
                Điều kiện áp dụng: {capitalize(state?.condition) || 'Không có'}
              </Text>
              <Text as={'p'} fs={'lg'} cl={'base'}>
                Thời gian: {state?.dateStart} đến {state?.dateEnd}
              </Text>
              <Box
                ml={fr(5)}
                fs={'lg'}
                dangerouslySetInnerHTML={{
                  __html: state?.description || strings
                }}
              ></Box>
              <Text as={'p'} fs={'lg'}>
                Chương trình có thể kết thúc sớm nếu hết ngân sách. Mong quý
                khách ủng hộ và cùng nhau thưởng thức các món ngon của nhà hàng!
              </Text>
            </Box>
          </Flex>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default PromotionDetail
