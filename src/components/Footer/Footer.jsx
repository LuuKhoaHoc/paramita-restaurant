// component
import { Box, Divider, Flex, Grid, Icon, Link, Text, fr } from '@prismane/core'
// icon
import {
  ChatCircleDots,
  Envelope,
  FacebookLogo,
  GoogleLogo,
  MapPin,
  Phone,
  YoutubeLogo
} from '@phosphor-icons/react'
// utils
import  capitalizeWords  from '../../utils/capitalizeWords'
import React from 'react'

const Footer = () => {
  return (
    <Box
      w={'100%'}
      h={fr(85)}
      bg={'#000'}
      cl={'white'}
      ff={'"GeomanistMedium", sans-serif'}
      pos={'absolute'}
      fs={'lg'}
    >
      <Grid templateColumns={12} w={'100%'} h={'100%'} >
        <Grid.Item columnStart={3} columnEnd={11}>
          <Text h={'100%'} ta={'center'} mt={10} fs={'xl'} ff={"'GeomanistMedium'"}>
            Contact us
          </Text>
          <Flex
            w={fr(50)}
            direction='row'
            justify='between'
            mx={'auto'}
            mt={fr(2)}
          >
            <Icon
              as={'a'}
              href='#'
              size={fr(8)}
              cl={['#fff', { hover: ['primary', 200] }]}
            >
              <FacebookLogo />
            </Icon>
            <Icon
              as={'a'}
              href='#'
              size={fr(8)}
              cl={['#fff', { hover: ['primary', 200] }]}
            >
              <GoogleLogo />
            </Icon>
            <Icon
              as={'a'}
              href='#'
              size={fr(8)}
              cl={['#fff', { hover: ['primary', 200] }]}
            >
              <YoutubeLogo />
            </Icon>
            <Icon
              as={'a'}
              href='#'
              size={fr(8)}
              cl={['#fff', { hover: ['primary', 200] }]}
            >
              <ChatCircleDots />
            </Icon>
          </Flex>
        </Grid.Item>

        <Grid.Item
          columnStart={3}
          columnEnd={8}
          ff={"'GeomanistMedium', sans-serif'"}
        >
          <Flex direction='column' justify='between' align='left'>
            <Flex direction='row' align='center' gap={fr(3)}>
              <Icon size={fr(9)}>
                <Phone />
              </Icon>
              <Flex direction='column' gap={fr(1)}>
                <Link underline='none' cl={['white',{hover: ['primary', 200]}]} href='tel:0987654321'>
                  0987654321
                </Link>
                <Link underline='none' cl={['white',{hover: ['primary', 200]}]} href='tel:0123456789'>
                  0123456789
                </Link>
              </Flex>
            </Flex>
            <Flex direction='row' align='center' gap={fr(3)}>
              <Icon size={fr(9)}>
                <Envelope />
              </Icon>
              <Link href='mailto:hi@paramita.com' underline='none' cl={['white',{hover: ['primary', 200]}]}>
                hi@paramita.com
              </Link>
            </Flex>
            <Flex direction='row' gap={fr(3)}>
              <Icon size={fr(9)}>
                <MapPin />
              </Icon>
              <Flex direction='column' gap={fr(1)}>
                <Text>
                  {capitalizeWords(
                    '107 Nguyễn Thị Minh Khai, phường Bến Nghé, quận 1, TP.HCM'
                  )}
                </Text>
                <Text>
                  {capitalizeWords('108 Lê Văn Sỹ, phường 13, quận 3, TP.HCM')}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Grid.Item>
        <Grid.Item columnStart={9} columnEnd={11}>
          <Flex direction='column' gap={fr(3)} justify='center' align='end'>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              Tuyển dụng
            </Link>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              Khuyến mãi
            </Link>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              Đặt bàn
            </Link>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              Liên hệ
            </Link>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              Đối tác
            </Link>
          </Flex>
        </Grid.Item>
        <Grid.Item  columnStart={5} columnEnd={9}>
          <Divider my={'auto'} />
        </Grid.Item>
        <Grid.Item columnStart={4} columnEnd={10}>
          <Flex direction='row' justify='between' fs={'md'}>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              Privacy Policy
            </Link>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              Term Of Service
            </Link>
            <Link underline='none' href='#' cl={['white',{hover: ['primary', 200]}]}>
              T&C
            </Link>
          </Flex>
        </Grid.Item>
      </Grid>
    </Box>
  )
}

export default Footer
