import { Box, Flex, Grid, Highlight, List, Text, fr } from '@prismane/core'
import React from 'react'

const Privacy = () => {
  return (
    <>
      <Box h={fr(22.5)} bg='#371b04' />
      <Grid templateColumns={12}>
        <Grid.Item columnStart={4} columnEnd={10}>
          <Flex w={'100%'} gap={fr(5)} my={fr(5)} direction='column'>
            <Text
              as={'h1'}
              fs={'3xl'}
              ff={'GeomanistBold'}
              ta={'center'}
              tt={'uppercase'}
            >
              Chính sách bảo mật thông tin
            </Text>
            <Text as={'p'} fs={'xl'}>
              Paramita cam kết bảo mật tuyệt đối các thông tin của khách hàng.
              Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và
              bảo vệ thông tin cá nhân của quý khách.
            </Text>
            <Box>
              <Text
                as={'h3'}
                tt={'capitalize'}
                className='GeomanistMedium-font'
              >
                1. Thu thập thông tin
              </Text>
              <Text as={'p'} fs={'lg'}>
                Chúng tôi thu thập các thông tin do khách hàng cung cấp khi đặt
                bàn, đặt món hoặc khi khách tương tác với nhà hàng qua website,
                email, điện thoại... Các thông tin này bao gồm họ tên, số điện
                thoại, email, địa chỉ giao hàng. Chúng tôi cũng thu thập thông
                tin về cách khách hàng sử dụng dịch vụ của nhà hàng.
              </Text>
            </Box>
            <Box>
              <Text
                as={'h3'}
                tt={'capitalize'}
                className='GeomanistMedium-font'
              >
                2. Sử dụng thông tin
              </Text>
              <Text as={'p'} fs={'lg'}>
                Chúng tôi sử dụng thông tin khách hàng để:
                <List.Unordered ml={fr(10)}>
                  <List.Item>Xử lý đơn đặt hàng, giao hàng</List.Item>
                  <List.Item>
                    Gửi thông báo về tình trạng đơn hàng, chương trình khuyến
                    mãi
                  </List.Item>
                  <List.Item>
                    Cải thiện dịch vụ, tăng trải nghiệm khách hàng
                  </List.Item>
                  <List.Item>Giải quyết khiếu nại, tranh chấp</List.Item>
                  <List.Item>Ngăn chặn các hành vi giả mạo, phá hoại</List.Item>
                </List.Unordered>
              </Text>
            </Box>
            <Box>
              <Text
                as={'h3'}
                tt={'capitalize'}
                className='GeomanistMedium-font'
              >
                3. Bảo mật thông tin
              </Text>
              <Text as={'p'} fs={'lg'}>
                Chúng tôi cam kết không chia sẻ thông tin cá nhân của khách hàng
                cho bất kỳ bên thứ ba nào, trừ khi được khách hàng đồng ý hoặc
                theo yêu cầu của các cơ quan pháp luật. Dữ liệu cá nhân của
                khách hàng được lưu trữ bảo mật trên hệ thống máy chủ của nhà
                hàng. Chúng tôi sử dụng các biện pháp tốt nhất để bảo vệ dữ liệu
                này.
              </Text>
            </Box>
            <Box>
              <Text
                as={'h3'}
                tt={'capitalize'}
                className='GeomanistMedium-font'
              >
                4. Thời gian lưu trữ
              </Text>
              <Text as={'p'} fs={'lg'}>
                Thông tin cá nhân của khách hàng sẽ được lưu trữ cho đến khi
                khách hàng có yêu cầu hủy hoặc tự thực hiện hủy bỏ.
              </Text>
            </Box>
            <Box>
              <Text
                as={'h3'}
                tt={'capitalize'}
                className='GeomanistMedium-font'
              >
                5. Liên hệ
              </Text>
              <Text as={'p'} fs={'lg'}>
                Mọi thắc mắc về chính sách bảo mật, quý khách vui lòng liên hệ
                nhà hàng Paramita qua email:{' '}
                <Highlight
                  as={'a'}
                  br={'full'}
                  href='mailto: hi@paramita.com'
                  fs={'xl'}
                  cl={'#fff'}
                >
                  hi@paramita.com
                </Highlight>{' '}
                hoặc hotline:{' '}
                <Highlight
                  as={'a'}
                  br={'full'}
                  href='tel: 0987654321'
                  fs={'xl'}
                  cl={'#fff'}
                >
                  0987 654 321
                </Highlight>
                . Chân thành cảm ơn sự tin tưởng và hợp tác của quý khách!
              </Text>
            </Box>
          </Flex>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default Privacy
