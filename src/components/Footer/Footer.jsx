// component
import { Divider, Flex, Grid, Icon, Text, Transition, fr } from '@prismane/core'
import TextFooter from '~/components/Footer/TextFooter/TextFooter'
import { Link } from 'react-router-dom'
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
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'
import { Loading } from '~/components'

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

// utils

const Footer = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const { loading, data } = useQuery(GET_CONTENTS)
  if (loading) return <Loading />
  return (
    <Transition
      transition='all'
      timing='ease-in-out'
      w={'100%'}
      h={isMobile ? fr(120) : fr(85)}
      bg={(theme) => (theme.mode === 'dark' ? '#000' : '#fff2e5')}
      cl={(theme) => (theme.mode === 'dark' ? '#fff' : '#371b04')}
      className='GeomanistMedium-font'
      pos={'relative'}
      fs={isTablet ? 'md' : isMobile ? 'sm' : 'lg'}
      b={0}
      bsh={'inner'}
    >
      <Grid templateColumns={12} w={'100%'} h={'100%'}>
        <Grid.Item columnStart={3} columnEnd={11}>
          <Text h={'100%'} ta={'center'} mt={10} fs={'xl'}>
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
              size={isMobile ? fr(7) : fr(8)}
              cl={(theme) =>
                theme.mode === 'dark'
                  ? ['#fff', { hover: ['primary', 200] }]
                  : ['#371b04', { hover: ['primary', 200] }]
              }
            >
              <FacebookLogo />
            </Icon>
            <Icon
              as={'a'}
              href='#'
              size={isMobile ? fr(7) : fr(8)}
              cl={(theme) =>
                theme.mode === 'dark'
                  ? ['#fff', { hover: ['primary', 200] }]
                  : ['#371b04', { hover: ['primary', 200] }]
              }
            >
              <GoogleLogo />
            </Icon>
            <Icon
              as={'a'}
              href='#'
              size={isMobile ? fr(7) : fr(8)}
              cl={(theme) =>
                theme.mode === 'dark'
                  ? ['#fff', { hover: ['primary', 200] }]
                  : ['#371b04', { hover: ['primary', 200] }]
              }
            >
              <YoutubeLogo />
            </Icon>
            <Icon
              as={'a'}
              href='#'
              size={isMobile ? fr(7) : fr(8)}
              cl={(theme) =>
                theme.mode === 'dark'
                  ? ['#fff', { hover: ['primary', 200] }]
                  : ['#371b04', { hover: ['primary', 200] }]
              }
            >
              <ChatCircleDots />
            </Icon>
          </Flex>
        </Grid.Item>

        <Grid.Item
          columnStart={isTablet ? 2 : isMobile ? 3 : 3}
          columnEnd={isMobile ? 11 : 8}
        >
          <Flex direction='column' justify='between' align='left'>
            <Flex direction='row' align='center' gap={fr(3)}>
              <Icon size={isMobile ? fr(7) : fr(9)}>
                <Phone />
              </Icon>
              <Flex direction='column' gap={fr(1)}>
                <TextFooter as={'a'} href='tel:0987654321'>
                  0987654321
                </TextFooter>
                <TextFooter as={'a'} href='tel:0123456789'>
                  0123456789
                </TextFooter>
              </Flex>
            </Flex>
            <Flex direction='row' align='center' gap={fr(3)}>
              <Icon size={isMobile ? fr(7) : fr(9)}>
                <Envelope />
              </Icon>
              <TextFooter as={'a'} href='mailto:hi@paramita.com'>
                hi@paramita.com
              </TextFooter>
            </Flex>
            <Flex direction='row' gap={fr(3)}>
              <Icon size={isMobile ? fr(7) : fr(9)}>
                <MapPin />
              </Icon>
              <Flex direction='column' gap={fr(1)}>
                <Text className='GeomanistMedium-font' tt={'capitalize'}>
                  107 Nguyễn Thị Minh Khai, phường Bến Nghé, quận 1, TP.HCM
                </Text>
                <Text className='GeomanistMedium-font' tt={'capitalize'}>
                  108 Lê Văn Sỹ, phường 13, quận 3, TP.HCM
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Grid.Item>
        {isMobile && (
          <Grid.Item columnStart={5} columnEnd={9}>
            <Divider my={'auto'} />
          </Grid.Item>
        )}
        <Grid.Item
          columnStart={isMobile ? 3 : 8}
          columnEnd={isMobile ? 11 : 11}
        >
          <Flex
            direction='column'
            gap={fr(3)}
            justify='center'
            align={isMobile ? 'center' : 'end'}
          >
            <Link to={'/career'}>
              <TextFooter className='GeomanistMedium-font'>
                Tuyển dụng
              </TextFooter>
            </Link>
            <Link to={'/promotion'}>
              <TextFooter className='GeomanistMedium-font'>
                Khuyến mãi
              </TextFooter>
            </Link>
            <Link to={'/book-table'}>
              <TextFooter className='GeomanistMedium-font'>Đặt bàn</TextFooter>
            </Link>
            <Link to={'/contact'}>
              <TextFooter className='GeomanistMedium-font'>Liên hệ</TextFooter>
            </Link>
            <Link to={'/album'}>
              <TextFooter className='GeomanistMedium-font'>Album</TextFooter>
            </Link>
          </Flex>
        </Grid.Item>
        <Grid.Item columnStart={5} columnEnd={9}>
          <Divider my={'auto'} />
        </Grid.Item>
        <Grid.Item columnStart={3} columnEnd={11}>
          <Flex
            direction='row'
            justify='between'
            align='center'
            fs={isTablet ? 'base' : isMobile ? 'xs' : 'md'}
          >
            <TextFooter
              as={Link}
              to={'/privacy'}
              className='GeomanistMedium-font'
            >
              Bảo mật
            </TextFooter>

            <TextFooter as={Link} to={'/term'} className='GeomanistMedium-font'>
              Điều khoản
            </TextFooter>

            <TextFooter as={Link} to={'/faq'} className='GeomanistMedium-font'>
              FAQ
            </TextFooter>
          </Flex>
        </Grid.Item>
      </Grid>
    </Transition>
  )
}

export default Footer
