import {
  Animation,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Form,
  Grid,
  Image,
  Link,
  NativeDateField,
  NumberField,
  Text,
  TextField,
  TextareaField,
  fr
} from '@prismane/core'
// img
import { HomePic2, DividerLogo, Space6, BookTablePic, HomePic1 } from '~/images'
import React, { useEffect, useState } from 'react'

// component
import { MainPic, DividerParamita } from '~/components'
import { useForm } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { useResponsive } from '~/utils/responsive'

const BookTable = () => {
  const { handleReset, handleSubmit, register } = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Vui lòng nhập họ tên' })),
          fullName: (v) =>
            p(
              v,
              z.string().trim().min(6, { message: 'Họ tên ít nhất 6 kí tự' })
            )
        }
      },
      phone: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui lòng nhập số điện thoại' })
            ),
          phoneNumber: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(10, { message: 'Số điện thoại ít nhất phải 10 kí tự' })
            )
        }
      },
      email: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Vui lòng nhập email' })),
          email: (v) =>
            p(v, z.string().trim().email({ message: 'Không phải là email' }))
        }
      },
      date: {
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string({
                  required_error: 'Vui lòng chọn ngày đặt bàn',
                  invalid_type_error: 'Sai định dạng ngày'
                })
                .trim()
                .min(1, { message: 'Vui là chọn ngày đặt bàn' })
            )
        }
      },
      time: {
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string({
                  required_error: 'Vui lòng nhập giờ đặt bàn',
                  invalid_type_error: 'Sai định dạng giờ'
                })
                .trim()
                .min(1, { message: 'Vui là chọn ngày đặt bàn' })
            )
        }
      },
      people: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(1, { message: 'Vui là chọn số lượng người' })
            )
        }
      },
      checkbox: {
        value: false,
        validators: {
          checked: (v) =>
            p(
              v,
              z.boolean().refine((val) => val === true, {
                message: 'Vui lòng chọn vào ô này'
              })
            )
        }
      }
    }
  })

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
  const { isMobile, isTablet, isLaptop } = useResponsive()
  return (
    <Box pos={'relative'} mih={'100vh'} of={'hidden'}>
      <MainPic
        image={BookTablePic}
        title={'Đặt bàn'}
        subtitle={'Lựa chọn tối ưu cho mọi cuộc hẹn'}
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Flex
              direction={isTablet ? 'column' : isMobile ? 'column' : 'row'}
              justify='center'
              align='center'
              gap={fr(10)}
              my={fr(10)}
            >
              <Box w={isTablet ? '100%' : isMobile ? '90%' : '70%'}>
                <Text
                  as={'h1'}
                  fs={isTablet ? 'xl' : isMobile ? 'lg' : 'inherit'}
                  tt={'uppercase'}
                  mb={fr(4)}
                  cl={'primary'}
                >
                  "Nhà hàng chay Paramita - đồng hành cùng mọi khoảnh khắc quý
                  giá của bạn! "
                </Text>
                <Flex direction='row' gap={fr(4)}>
                  <Box w={isTablet ? '50%' : isMobile ? '50%' : '100%'}>
                    <Text as={'h2'}>Đặt chỗ bằng điện thoại</Text>
                    <Text
                      as={'p'}
                      fs={isTablet ? 'lg' : isMobile ? 'md' : 'xl'}
                    >
                      Để được tư vấn và giữ chỗ tại khu vực yêu thích trong nhà
                      hàng, Quý khách vui lòng gọi Hotline{' '}
                      <Link w={'fit-content'} href='tel: +84 xxx xxx xxx'>
                        +84 xxx xxx xxx{' '}
                      </Link>
                      để được nhân viên phục vụ nhiệt tình hỗ trợ. Cảm ơn Quý
                      khách đã quan tâm đến dịch vụ của nhà hàng!
                    </Text>
                  </Box>
                  <Box w={isTablet ? '50%' : isMobile ? '50%' : '100%'}>
                    <Text as={'h2'}>Đặt chỗ sự kiện & nhóm</Text>
                    <Text
                      as={'p'}
                      fs={isTablet ? 'lg' : isMobile ? 'md' : 'xl'}
                    >
                      Với không gian ấm cúng và riêng tư cho mọi sự kiện và họp
                      nhóm, hãy liên hệ Paramita để được tư vấn và giữ chỗ
                      trước. Chúng mình có đội ngũ chuyên biệt tổ chức những sự
                      kiện và cuộc hẹn quan trọng dành cho từng yêu cầu của thực
                      khách.
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box w={isTablet ? '100%' : isMobile ? '90%' : '30%'}>
                <Box bd={'1px solid'} bdc={'primary'}>
                  <Center direction='column' gap={fr(4)} m={fr(4)} fs={'lg'}>
                    <Text as={'h2'}>Thời gian mở cửa</Text>
                    <Text ta={'center'}>Thứ 2 - Chủ nhật & 6:30 - 22:30</Text>
                    <Text as={'h3'}>Địa điểm</Text>
                    <Text ta={'center'}>
                      107 Nguyễn Thị Minh Khai, phường Bến Nghé, Quận 1, TP.HCM
                      & 108 Lê Văn Sỹ, phường 13, Quận 3, TP.HCM
                    </Text>
                  </Center>
                </Box>
              </Box>
            </Flex>
            <Flex
              direction={isTablet ? 'column' : isMobile ? 'column' : 'row'}
              justify='center'
              align='center'
              gap={fr(10)}
            >
              <Animation
                animation={'slide-down'}
                animated={scrollEvent}
                duration={1500}
                w={isTablet ? '100%' : isMobile ? '90%' : '50%'}
              >
                <Box
                  p={fr(4)}
                  br={'xl'}
                  bsh={'md'}
                  bg={(theme) =>
                    theme.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255)'
                  }
                  sx={{
                    '.PrismaneTextarea-label, .PrismaneTextField-label, .PrismaneNativeDateField-label':
                      {
                        fontSize: '20px'
                      },
                    '.PrismaneCheckbox-error': {
                      fontSize: '16px'
                    }
                  }}
                >
                  <Form
                    onSubmit={(SubmitEvent) =>
                      handleSubmit(SubmitEvent, (value) => console.log(value))
                    }
                    onReset={handleReset}
                    my={30}
                  >
                    <TextField
                      {...register('name')}
                      label='Họ và tên'
                      size='md'
                      variant='underlined'
                      placeholder='Nguyễn Văn A'
                      sx={{}}
                    />
                    <TextField
                      {...register('phone')}
                      label='Số điện thoại'
                      size='md'
                      variant='underlined'
                      placeholder='08 xxx xxx xxx'
                      sx={{}}
                    />
                    <TextField
                      {...register('email')}
                      label='Email'
                      size='md'
                      variant='underlined'
                      placeholder='hi@paramita.com'
                      sx={{}}
                    />
                    <NativeDateField
                      {...register('date')}
                      name='date'
                      label='Ngày đặt bàn'
                      variant='underlined'
                      size='md'
                      sx={{}}
                    />
                    <TextField
                      {...register('time')}
                      label='Ngày đặt giờ'
                      variant='underlined'
                      size='md'
                    />
                    <NumberField
                      {...register('people')}
                      label='Số lượng người'
                      min={1}
                      variant='underlined'
                      size='md'
                    />
                    <TextareaField
                      label='Ghi chú:'
                      placeholder='Không gian yên tĩnh,...'
                      size='md'
                      variant='underlined'
                    />
                    <Checkbox
                      {...register('checkbox')}
                      label='Tôi đồng ý với các điều khoản đặt cọc và hủy bàn của nhà hàng.'
                    />
                    <Button
                      size='lg'
                      className='GeomanistMedium-font'
                      type='submit'
                    >
                      Đặt bàn ngay
                    </Button>
                  </Form>
                </Box>
              </Animation>
              <Animation
                animation={'slide-right'}
                animated={scrollEvent}
                duration={1500}
                w={isTablet ? '100%' : isMobile ? '90%' : '50%'}
              >
                <Box>
                  <Image
                    w={'100%'}
                    src={HomePic1}
                    alt='table'
                    br={'lg'}
                    bsh={'md'}
                    fit='cover'
                  />
                </Box>
              </Animation>
            </Flex>
            {isTablet || isMobile ? <Divider my={fr(10)} /> : <></>}
            <Flex
              pos={'relative'}
              direction={isTablet ? 'column' : isMobile ? 'column' : 'row'}
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            >
              <Animation
                animation={'slide-left'}
                animated={scrollEvent}
                duration={1000}
                delay={0}
                w={isMobile ? '90%' : '100%'}
              >
                <Image
                  w={isMobile ? '100%' : fr(160)}
                  src={Space6}
                  alt='restaurant-space'
                  br={'lg'}
                  bsh={'md'}
                  fit='cover'
                />
              </Animation>
              <Flex
                w={isMobile ? '90%' : '100%'}
                h={isTablet ? fr(60) : isMobile ? fr(30) : fr(160)}
                direction='column'
                justify='center'
                align='center'
              >
                <Animation
                  animation={'fade'}
                  animated={scrollEvent}
                  duration={1000}
                  delay={0}
                >
                  <Text
                    as={'h1'}
                    fs={isTablet ? '2xl' : isMobile ? 'lg' : '3xl'}
                    className='GeomanistBold-font'
                    cl={'primary'}
                  >
                    "Hương thơm tinh khiết, hài hòa giữa hương và vị. Tiếp đón
                    bạn là nụ cười ấm áp, thân thiện."
                  </Text>
                </Animation>
                <Animation
                  animation={'slide-right'}
                  animated={scrollEvent}
                  duration={1500}
                  delay={0}
                >
                  <Text
                    as={'p'}
                    fs={isTablet ? 'lg' : isMobile ? 'md' : '2xl'}
                    ta='center'
                    tt={'uppercase'}
                  >
                    NGÔI NHÀ CỦA NHỮNG KHOẢNH KHẮC SUM VẦY
                  </Text>
                </Animation>
              </Flex>
            </Flex>
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <DividerParamita />
            <Image src={DividerLogo} alt='divider' fit='cover' w={fr(80)} />
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default BookTable
