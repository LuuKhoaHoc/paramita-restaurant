import { Box, Flex, Grid, Image, Text, fr } from '@prismane/core'
import { HomePic3 } from '../../images'
import { StyledButton } from '../'
import { Link } from 'react-router-dom'

const SmallBookTable = () => {
  return (
    <Grid templateColumns={12}>
      <Grid.Item columnStart={1} columnEnd={13}>
        <Box pos={'relative'} w={'100%'} my={fr(5)}>
          <Image
            src={HomePic3}
            alt='restaurant-space'
            fit='cover'
            w={'100%'}
            mah={fr(130)}
            ft={'brightness(80%)'}
            pos={'absolute'}
          />
          <Flex
            justify='center'
            align='center'
            direction='column'
            gap={fr(5)}
            w={'50%'}
            h={'100%'}
            pos={'relative'}
            ff={"BalihoScript"}
          >
            <Text fs={'2xl'} cl={'#fff'}>
              Hãy để Paramita giữ chỗ cho bạn
            </Text>
            <Text cl={'#fff'} fs={'4xl'} ff={'GeomanistBold'}>
              Đặt bàn thật đơn giản
            </Text>
            <Text as={'p'} cl={'#fff'} fs={'xl'} w={'50%'}>
              Chào mừng bạn đến với Paramita! Chúng tôi rất vui khi được phục vụ
              bạn. Để tiết kiệm thời gian, bạn có thể đặt bàn trực tuyến với vài
              thao tác đơn giản. Hãy chọn ngày giờ phù hợp với lịch của mình và
              đảm bảo có chỗ ngồi khi đến nhà hàng nhé. Chúng tôi cam kết sẽ
              phục vụ bạn chu đáo với không gian ấm cúng, thức ăn ngon lành. Hẹn
              gặp lại bạn sớm!
            </Text>
            <StyledButton cl={['primary', 100]} p={fr(5)}>
              <Link to={'/book-table'}>Đặt bàn ngay</Link>
            </StyledButton>
          </Flex>
        </Box>
      </Grid.Item>
    </Grid>
  )
}

export default SmallBookTable
