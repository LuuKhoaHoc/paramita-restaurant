import {
  Box,
  Button,
  Flex,
  Form,
  Grid,
  Icon,
  Link,
  Text,
  TextField,
  TextareaField,
  fr,
  useThemeModeValue
} from '@prismane/core'
// img
import { ContactPic } from '~/images'
import React, { useEffect, useState } from 'react'
// component
import { MainPic } from '~/components'
import {
  FacebookLogo,
  InstagramLogo,
  PaperPlaneTilt
} from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'

const Contact = () => {
  const { isMobile, isTablet, isLaptop } = useResponsive()
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const [scrollEvent, setScrollEvent] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrollEvent(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={ContactPic}
        title={'Liên hệ'}
        subtitle='Kết nối cùng Paramita'
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Flex
              pos={'relative'}
              gap={isMobile ? fr(5) : fr(8)}
              direction='row'
              mx={isMobile ? fr(3) : 0}
              my={fr(5)}
            >
              <Flex direction='column' gap={fr(8)}>
                <Box>
                  <Text
                    as={'h1'}
                    fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                    mb={fr(20)}
                  >
                    Địa chỉ
                  </Text>
                  <Text
                    as={'p'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    tt={'capitalize'}
                  >
                    107 Nguyễn Thị Minh Khai, phường Bến Nghé, quận 1, TP.HCM
                  </Text>
                  <Text
                    as={'p'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    tt={'capitalize'}
                  >
                    108 Lê Văn Sỹ, phường 13, quận 3, TP.HCM
                  </Text>
                </Box>
                <Box>
                  <Text
                    as={'h1'}
                    fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                    mb={fr(8)}
                  >
                    Follow Us
                  </Text>
                  <Link
                    w={'fit-content'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    href='https://www.facebook.com/'
                    cl={[textColor, { hover: 'diamond' }]}
                  >
                    <Icon size={fr(8)}>
                      <FacebookLogo />
                    </Icon>{' '}
                    Facebook
                  </Link>
                  <Link
                    w={'fit-content'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    href='https://www.instagram.com'
                    cl={[textColor, { hover: 'ruby' }]}
                  >
                    <Icon size={fr(8)}>
                      <InstagramLogo />
                    </Icon>{' '}
                    Instagram
                  </Link>
                </Box>
              </Flex>
              <Flex direction='column' gap={fr(8)}>
                <Box>
                  <Text
                    as={'h1'}
                    fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                    mb={fr(8)}
                  >
                    Liên hệ
                  </Text>
                  <Text
                    as={'h2'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    // mb={fr(8)}
                  >
                    Số điện thoại:{' '}
                    <Link
                      href='tel:0123456789'
                      cl={[textColor, { hover: 'primary' }]}
                    >
                      +84 (0)123-456-789
                    </Link>
                  </Text>
                  <Text
                    as={'h2'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    // mb={fr(8)}
                  >
                    Email:{' '}
                    <Link
                      href='mailto:hi@paramita.com'
                      cl={[textColor, { hover: 'primary' }]}
                    >
                      hi@paramita.com
                    </Link>
                  </Text>
                </Box>

                <Box>
                  <Text
                    as={'h1'}
                    fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                    mb={fr(8)}
                  >
                    Giờ mở cửa
                  </Text>
                  <Text
                    as={'p'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    tt={'capitalize'}
                  >
                    Thứ 2 - Chủ nhật
                  </Text>
                  <Text
                    as={'p'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    tt={'capitalize'}
                  >
                    9:00 - 22:00
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Flex
              pos={'relative'}
              gap={isMobile ? fr(5) : fr(8)}
              direction='row'
              mx={isMobile ? fr(3) : 0}
              my={fr(5)}
            >
              <Box w={'30%'}>
                <Text
                  as={'h1'}
                  fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                >
                  LIÊN HỆ VỚI CHÚNG TÔI
                </Text>
                <Text
                  as={'p'}
                  fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                  mt={fr(4)}
                >
                  Paramita luôn sẵn sàng hỗ trợ mọi thắc mắc cũng như góp ý của
                  quý khách hàng. Có bất kỳ câu hỏi hoặc yêu cầu nào, vui lòng
                  điền các thông tin vào form bên cạnh. Chúng tôi sẽ phản hồi
                  lại sớm nhất có thể. Đội ngũ nhân viên của Paramita cam kết
                  lắng nghe, tư vấn và mang đến cho quý khách dịch vụ tốt nhất.
                  Xin cảm ơn!
                </Text>
              </Box>
              <Box
                w={'70%'}
                sx={{
                  '.PrismaneTextField-label, .PrismaneTextarea-label': {
                    fontSize: '20px'
                  },
                  '@media (max-width: 768px)': {
                    '.PrismaneTextField-label, .PrismaneTextarea-label': {
                      fontSize: '16px'
                    }
                  }
                }}
              >
                <Form w={'100%'} onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    label='Họ và tên'
                    variant='outlined'
                    placeholder='Nguyễn Văn A'
                  />
                  <TextField
                    label='Email'
                    variant='outlined'
                    placeholder='hi@paramita.com'
                  />
                  <TextField
                    label='Số điện thoại'
                    variant='outlined'
                    placeholder='0123456789'
                  />
                  <TextareaField label='Thông tin' variant='outlined' />
                  <Button
                    className='GeomanistMedium-font'
                    type='submit'
                    iconPosition='right'
                    icon={<PaperPlaneTilt />}
                  >
                    Gửi
                  </Button>
                </Form>
              </Box>
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Contact
