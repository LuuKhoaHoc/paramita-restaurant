// component
import {
  Divider,
  Flex,
  Grid,
  Icon,
  Text,
  Transition,
  fr,
} from '@prismane/core'
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
// utils

const Footer = () => {
  return (
    <Transition
      transition='all'
      timing='ease-in-out'
      w={'100%'}
      h={fr(85)}
      bg={(theme) => (theme.mode === 'dark' ? '#000' : '#fff2e5')}
      cl={(theme) => (theme.mode === 'dark' ? '#fff' : '#371b04')}
      ff={'"GeomanistMedium", sans-serif'}
      pos={'relative'}
      fs={'lg'}
      b={0}
      bsh={'inner'}
    >
      <Grid templateColumns={12} w={'100%'} h={'100%'}>
        <Grid.Item columnStart={3} columnEnd={11}>
          <Text
            h={'100%'}
            ta={'center'}
            mt={10}
            fs={'xl'}
            ff={"'GeomanistMedium'"}
          >
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
              size={fr(8)}
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
              size={fr(8)}
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
              size={fr(8)}
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
                <TextFooter as={'a'} href='tel:0987654321'>
                  0987654321
                </TextFooter>
                <TextFooter as={'a'} href='tel:0123456789'>
                  0123456789
                </TextFooter>
              </Flex>
            </Flex>
            <Flex direction='row' align='center' gap={fr(3)}>
              <Icon size={fr(9)}>
                <Envelope />
              </Icon>
              <TextFooter as={'a'} href='mailto:hi@paramita.com'>
                hi@paramita.com
              </TextFooter>
            </Flex>
            <Flex direction='row' gap={fr(3)}>
              <Icon size={fr(9)}>
                <MapPin />
              </Icon>
              <Flex direction='column' gap={fr(1)}>
                <Text tt={'capitalize'}>
                  107 Nguyễn Thị Minh Khai, phường Bến Nghé, quận 1, TP.HCM
                </Text>
                <Text tt={'capitalize'}>
                  108 Lê Văn Sỹ, phường 13, quận 3, TP.HCM
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Grid.Item>
        <Grid.Item columnStart={9} columnEnd={11}>
          <Flex direction='column' gap={fr(3)} justify='center' align='end'>
            <Link to={'/career'}>
              <TextFooter>Tuyển dụng</TextFooter>
            </Link>
            <Link to={'/promotion'}>
              <TextFooter>Khuyến mãi</TextFooter>
            </Link>
            <Link to={'/book-table'}>
              <TextFooter>Đặt bàn</TextFooter>
            </Link>
            <Link to={'/contact'}>
              <TextFooter>Liên hệ</TextFooter>
            </Link>
            <Link to={'/album'}>
              <TextFooter>Album</TextFooter>
            </Link>
          </Flex>
        </Grid.Item>
        <Grid.Item columnStart={5} columnEnd={9}>
          <Divider my={'auto'} />
        </Grid.Item>
        <Grid.Item columnStart={4} columnEnd={10}>
          <Flex direction='row' justify='between' align='center' fs={'md'}>
            <Link to={'/privacy'}>
              <TextFooter>Chính sách bảo mật</TextFooter>
            </Link>
            <Link to={'/term'}>
              <TextFooter>Điều khoản sử dụng</TextFooter>
            </Link>
            <Link to={'/faq'}>
              <TextFooter>FAQ</TextFooter>
            </Link>
          </Flex>
        </Grid.Item>
      </Grid>
    </Transition>
  )
}

export default Footer
