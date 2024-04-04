import {
  Box,
  Button,
  Flex,
  Form,
  Grid,
  Icon,
  Link,
  Modal,
  Text,
  TextField,
  TextareaField,
  fr,
  useThemeModeValue
} from '@prismane/core'
// img
import React, { useEffect, useState } from 'react'
// component
import { Loading, MainPic } from '~/components'
import {
  FacebookLogo,
  InstagramLogo,
  PaperPlaneTilt
} from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useForm } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { CREATE_CONTACT } from '~/pages/Admin/Contact/schema'

const GET_CONTENTS = gql`
  query {
    page(name: "Contact") {
      page_id
      name
      content {
        title
        slogan
        image
        description
        position
      }
    }
  }
`

const Contact = () => {
  const { isMobile, isTablet, isLaptop } = useResponsive()
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const [openModal, setOpenModal] = useState(false)
  const [scrollEvent, setScrollEvent] = useState(false)
  const { loading, data } = useQuery(GET_CONTENTS)
  const [createContact] = useMutation(CREATE_CONTACT)
  useEffect(() => {
    const handleScroll = () => {
      setScrollEvent(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const { register, handleSubmit, handleReset } = useForm({
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
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header justify='center'>
          <Text
            ff={'GeomanistMedium !important'}
            cl={'primary'}
            fs={isMobile ? 'md' : 'xl'}
          >
            Chúc mừng bạn đã gửi thông tin liên hệ thành công!!
          </Text>
        </Modal.Header>
        <Text fs={'md'} ta={'center'} sx={{ fontStyle: 'italic' }}>
          ~~Nhà hàng Paramita sẽ liên hệ với bạn trong thời gian ngắn nhất~~{' '}
          <br /> ~~Cảm ơn bạn đã tin tưởng Paramita~~
        </Text>
        <Modal.Footer justify='end'>
          <Button
            variant='tertiary'
            fillOnHover
            color='gray'
            onClick={() => setOpenModal(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <Box pos={'relative'} mih={'100vh'}>
        <MainPic
          image={data?.page?.content[0]?.image}
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
                  <Box h={'50%'}>
                    <Text
                      as={'h1'}
                      fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                      mb={fr(8)}
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
                  <Box h={'50%'}>
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
                  <Box h={'50%'}>
                    <Text
                      as={'h1'}
                      fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                      mb={fr(8)}
                    >
                      Liên hệ
                    </Text>
                    <Flex gap={fr(8)}>
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
                    </Flex>
                  </Box>
                  <Box h={'50%'}>
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
                      '.PrismaneTextField-label, .PrismaneTextareaField-label':
                        {
                          fontSize: '16px'
                        }
                    }
                  }}
                >
                  <Form
                    w={'100%'}
                    onSubmit={(e) =>
                      handleSubmit(e, (v) => {
                        console.log(v)
                        createContact({
                          variables: {
                            data: {
                              name: v.name,
                              email: v.email,
                              phone: v.phone,
                              message: v.message
                            }
                          },
                          onError: (err) => console.log(err),
                          onCompleted: (data) => {
                            console.log(data)
                            setOpenModal(true)
                          }
                        })
                      })
                    }
                  >
                    <TextField
                      label='Họ và tên'
                      variant='outlined'
                      placeholder='Nguyễn Văn A'
                      {...register('name')}
                    />
                    <TextField
                      label='Email'
                      variant='outlined'
                      placeholder='hi@paramita.com'
                      {...register('email')}
                    />
                    <TextField
                      label='Số điện thoại'
                      variant='outlined'
                      placeholder='0123456789'
                      {...register('phone')}
                    />
                    <TextareaField
                      className='GeomanistMedium-font'
                      label='Thông tin'
                      variant='outlined'
                      {...register('message')}
                    />
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
    </>
  )
}

export default Contact
