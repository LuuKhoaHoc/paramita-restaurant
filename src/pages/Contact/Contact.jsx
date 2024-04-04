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
import { Loading, MainPic } from '~/components'
import {
  FacebookLogo,
  InstagramLogo,
  PaperPlaneTilt
} from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'
import { useForm } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'

const GET_CONTENTS = gql`
  query {
    page(name: "Contact") {
      page_id
      name
      content {
        title
        slogan
        description
        position
      }
    }
  }
`

const Contact = () => {
  const { isMobile, isTablet, isLaptop } = useResponsive()
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const [scrollEvent, setScrollEvent] = useState(false)
  const { loading, data } = useQuery(GET_CONTENTS)
  useEffect(() => {
    const handleScroll = () => {
      setScrollEvent(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const {} = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui điền đầy đủ thông tin' })
            )
        }
      },
      email: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui điền đầy đủ thông tin' })
            ),
          email: (v) =>
            p(v, z.string().email({ message: 'Email không hợp lệ' }))
        }
      },
      phone: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui điền đầy đủ thông tin' })
            ),
          phoneNumber: (v) =>
            p(v, z.string().min(10, { message: 'Số điện thoại phải 10 số!' }))
        }
      },
      message: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Vui điền đầy đủ thông tin' })
            )
        }
      }
    }
  })
  if (loading) return <Loading />
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={ContactPic}
        title={data?.page?.content[0]?.title}
        subtitle={data?.page?.content[0]?.description}
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
                    {data?.page?.content[1]?.description}
                  </Text>
                  <Text
                    as={'p'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    tt={'capitalize'}
                  >
                    {data?.page?.content[2]?.description}
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
                    {data?.page?.content[3]?.title}
                    <Link
                      href={'tel:' + data?.page?.content[3].description}
                      cl={[textColor, { hover: 'primary' }]}
                    >
                      {data?.page?.content[3]?.description}
                    </Link>
                    <Link
                      href={'tel:' + data?.page?.content[8].description}
                      cl={[textColor, { hover: 'primary' }]}
                    >
                      {data?.page?.content[8]?.description}
                    </Link>
                  </Text>
                  <Text
                    as={'h2'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    // mb={fr(8)}
                  >
                    {data?.page?.content[4]?.title}
                    <Link
                      href={'mailto:' + data?.page?.content[4]?.description}
                      cl={[textColor, { hover: 'primary' }]}
                    >
                      {data?.page?.content[4]?.description}
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
                    {data?.page?.content[5]?.title}
                  </Text>
                  <Text
                    as={'p'}
                    fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                    tt={'capitalize'}
                  >
                    {data?.page?.content[5]?.description}
                    <br />
                    {data?.page?.content[6]?.description}
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
                  {data?.page?.content[7]?.title}
                </Text>
                <Text
                  as={'p'}
                  fs={isTablet ? 'md' : isMobile ? 'base' : 'xl'}
                  mt={fr(4)}
                >
                  {data?.page?.content[7]?.description}
                </Text>
              </Box>
              <Box
                w={'70%'}
                sx={{
                  '.PrismaneTextField-label, .PrismaneTextareaField-label': {
                    fontSize: '20px'
                  },
                  '@media (max-width: 768px)': {
                    '.PrismaneTextField-label, .PrismaneTextareaField-label': {
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
