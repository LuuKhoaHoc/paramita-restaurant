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

const Contact = () => {
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
          <Grid.Item columnStart={3} columnEnd={11}>
            <Flex pos={'relative'} gap={fr(8)} direction='column' my={fr(5)}>
              <Flex direction='row' justify='around' gap={fr(8)}>
                <Box w={fr(100)}>
                  <Text as={'h1'} mb={fr(14)}>
                    Liên hệ
                  </Text>
                  <Text as={'p'} fs={'xl'} tt={'capitalize'}>
                    107 Nguyễn Thị Minh Khai, phường Bến Nghé, quận 1, TP.HCM
                  </Text>
                  <Text as={'p'} fs={'xl'} tt={'capitalize'}>
                    108 Lê Văn Sỹ, phường 13, quận 3, TP.HCM
                  </Text>
                </Box>
                <Box w={fr(100)}>
                  <Text as={'h1'}>
                    Số điện thoại:{' '}
                    <Link
                      href='tel:0123456789'
                      cl={[textColor, { hover: 'primary' }]}
                    >
                      +84 (0)123-456-789
                    </Link>
                  </Text>
                  <Text as={'h1'}>
                    Email:{' '}
                    <Link
                      href='mailto:hi@paramita.com'
                      cl={[textColor, { hover: 'primary' }]}
                    >
                      hi@paramita.com
                    </Link>
                  </Text>
                </Box>
              </Flex>
              <Flex direction='row' justify='around' gap={fr(8)}>
                <Box w={fr(100)}>
                  <Text as={'h1'} mb={fr(8)}>
                    Follow Us
                  </Text>
                  <Link
                    w={'fit-content'}
                    fs={'xl'}
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
                    fs={'xl'}
                    href='https://www.instagram.com'
                    cl={[textColor, { hover: 'ruby' }]}
                  >
                    <Icon size={fr(8)}>
                      <InstagramLogo />
                    </Icon>{' '}
                    Instagram
                  </Link>
                </Box>
                <Box w={fr(100)}>
                  <Text as={'h1'} mb={fr(8)}>
                    Giờ mở cửa
                  </Text>
                  <Text as={'p'} fs={'xl'} tt={'capitalize'}>
                    Thứ 2 - Chủ nhật
                  </Text>
                  <Text as={'p'} fs={'xl'} tt={'capitalize'}>
                    9:00 - 22:00
                  </Text>
                </Box>
              </Flex>
            </Flex>
            <Flex pos={'relative'} gap={fr(8)} direction='row' my={fr(5)}>
              <Box w={'30%'}>
                <Text as={'h1'}>LIÊN HỆ VỚI CHÚNG TÔI</Text>
                <Text as={'p'} fs={'xl'} mt={fr(4)}>
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
                  }
                }}
              >
                <Form>
                  <TextField
                    label='Họ và tên'
                    variant='outlined'
                    size='md'
                    placeholder='Nguyễn Văn A'
                  />
                  <TextField
                    label='Email'
                    variant='outlined'
                    size='md'
                    placeholder='hi@paramita.com'
                  />
                  <TextField
                    label='Số điện thoại'
                    variant='outlined'
                    size='md'
                    placeholder='0123456789'
                  />
                  <TextareaField
                    label='Thông tin'
                    variant='outlined'
                    size='md'
                  />
                  <Button
                    ff={'GeomanistMedium'}
                    type='submit'
                    size='md'
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
