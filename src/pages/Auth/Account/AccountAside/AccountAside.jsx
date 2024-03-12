import {
  CaretCircleDoubleUp,
  CaretDoubleDown,
  ClockCountdown,
  ListChecks,
  Lock,
  MapPin,
  SignOut,
  User
} from '@phosphor-icons/react'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  List,
  Progress,
  Square,
  Text,
  fr,
  useThemeModeValue
} from '@prismane/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

const GET_NEXTLEVEL = gql`
  query getLevel($id: Int!) {
    customerLevel(id: $id) {
      name
      points
    }
  }
`

const AccountAside = ({ customer }) => {
  console.log('🚀 ~ AccountAside ~ customer:', customer)
  const { isLaptop, isTablet, isMobile } = useResponsive()
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.removeItem('orders')
    localStorage.removeItem('orderSuccess')
    localStorage.removeItem('login')
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const { data: levelData } = useQuery(GET_NEXTLEVEL, {
    variables: {
      id: customer?.level.level_id + 1
    }
  })
  return (
    <>
      {isMobile || isTablet ? (
        <>
          <Box
            w={isTablet ? fr(100) : isMobile ? fr(75) : '100%'}
            mx={'auto'}
            mt={fr(4)}
            pb={fr(4)}
            bg={bgColor}
            bsh={'xl'}
            br={'xl'}
          >
            <Box
              w={'100%'}
              mx={'auto'}
              mt={fr(4)}
              pb={fr(4)}
              bsh={'sm'}
              br={'xl'}
              pos={'relative'}
              cl={'#fff'}
              sx={{
                background: 'linear-gradient(180deg, #6ad078 0%, #004209 100%)'
              }}
            >
              <Center
                pos={'absolute'}
                gap={fr(2)}
                w={fr(30)}
                h={fr(10)}
                t={0}
                r={16}
                sx={{
                  boxShadow: `inset 0px 2px 5px 0 rgb(0 0 0 / 0.5)`,
                  borderRadius: '0 0 8px 8px'
                }}
              >
                <CaretDoubleDown weight='duotone' />
                <Text fs={'sm'} className='GeomanistMedium-font'>
                  Tích điểm
                </Text>
              </Center>
              <Flex direction='column' gap={fr(2)} pt={fr(8)} px={fr(4)}>
                <Text as={'p'} fs={'xl'} className='GeomanistMedium-font'>
                  {customer?.username}
                </Text>
                <Text as={'p'} fs={'lg'} className='GeomanistMedium-font'>
                  {customer?.points} điểm - {customer?.level?.name}
                </Text>
                <Flex fs={'sm'} cl={['base', 50]} w={'100%'} justify='between'>
                  <Text className='GeomanistLight-font'>
                    {customer?.level?.name}
                  </Text>
                  <Text className='GeomanistLight-font'>
                    {levelData?.customerLevel.name}
                  </Text>
                </Flex>
                <Progress
                  w={'100%'}
                  value={
                    (customer?.points / levelData?.customerLevel.points) * 100
                  }
                  label={
                    (
                      (customer?.points / levelData?.customerLevel.points) *
                      100
                    ).toString() + '%'
                  }
                  size={'md'}
                />
              </Flex>
            </Box>
            <Center mt={fr(4)}>
              <Text
                cl={textColor}
                ta={'center'}
                lh={fr(5)}
                className='GeomanistLight-font'
              >
                Còn{' '}
                {Math.abs(customer?.points - levelData?.customerLevel.points)}{' '}
                điểm nữa bạn sẽ thăng hạng. Đổi quà không ảnh hưởng tới việc
                thăng hạng của bạn Hãy dùng điểm này để đổi ưu đãi nhé.
              </Text>
            </Center>
          </Box>
          <List
            direction='row'
            gap={isMobile ? fr(2) : fr(4)}
            wrap='wrap'
            justify='center'
            my={fr(4)}
          >
            <List.Item as={NavLink} to={'/account/information'}>
              <Button
                variant='tertiary'
                size={isMobile ? 'sm' : 'lg'}
                br={fr(3)}
                cl={textColor}
              >
                <User size={isMobile ? fr(6) : fr(7)} weight='duotone' />
              </Button>
            </List.Item>
            <List.Item as={NavLink} to={'/account/addresses'}>
              <Button
                variant='tertiary'
                size={isMobile ? 'sm' : 'lg'}
                br={fr(3)}
                cl={textColor}
              >
                <MapPin size={isMobile ? fr(6) : fr(7)} weight='duotone' />
              </Button>
            </List.Item>
            <List.Item as={NavLink} to={'/account/orders'}>
              <Button
                variant='tertiary'
                size={isMobile ? 'sm' : 'lg'}
                br={fr(3)}
                cl={textColor}
              >
                <ListChecks size={isMobile ? fr(6) : fr(7)} weight='duotone' />
              </Button>
            </List.Item>
            <List.Item as={NavLink} to={'/account/history-purchase'}>
              <Button
                variant='tertiary'
                size={isMobile ? 'sm' : 'lg'}
                br={fr(3)}
                cl={textColor}
              >
                <ClockCountdown
                  size={isMobile ? fr(6) : fr(7)}
                  weight='duotone'
                />
              </Button>
            </List.Item>
            <List.Item as={NavLink} to={'/account/history-point'}>
              <Button
                variant='tertiary'
                size={isMobile ? 'sm' : 'lg'}
                br={fr(3)}
                cl={textColor}
              >
                <CaretCircleDoubleUp
                  size={isMobile ? fr(6) : fr(7)}
                  weight='duotone'
                />
              </Button>
            </List.Item>
            <List.Item as={NavLink} to={'/account/change-password'}>
              <Button
                variant='tertiary'
                size={isMobile ? 'sm' : 'lg'}
                br={fr(3)}
                cl={textColor}
              >
                <Lock size={isMobile ? fr(6) : fr(7)} weight='duotone' />
              </Button>
            </List.Item>
            <List.Item
              onClick={() => handleLogout()}
              sx={{ '&:hover': { color: 'red' } }}
            >
              <Button
                variant='tertiary'
                size={isMobile ? 'sm' : 'lg'}
                br={fr(3)}
                cl={textColor}
              >
                <SignOut size={isMobile ? fr(6) : fr(7)} weight='duotone' />
              </Button>
            </List.Item>
          </List>
        </>
      ) : (
        <Box
          miw={fr(95)}
          maw={fr(95)}
          bg={bgColor}
          bsh={'xl'}
          br={'xl'}
          mx={fr(10)}
          my={fr(6)}
        >
          <Box
            w={'90%'}
            mx={'auto'}
            mt={fr(4)}
            pb={fr(4)}
            bg={bgColor}
            bsh={'xl'}
            br={'xl'}
          >
            <Box
              w={'100%'}
              mx={'auto'}
              mt={fr(4)}
              pb={fr(4)}
              bsh={'sm'}
              br={'xl'}
              pos={'relative'}
              cl={'#fff'}
              sx={{
                background: 'linear-gradient(180deg, #6ad078 0%, #004209 100%)'
              }}
            >
              <Center
                pos={'absolute'}
                gap={fr(2)}
                w={fr(30)}
                h={fr(10)}
                t={0}
                r={16}
                sx={{
                  boxShadow: `inset 0px 2px 5px 0 rgb(0 0 0 / 0.5)`,
                  borderRadius: '0 0 8px 8px'
                }}
              >
                <CaretDoubleDown weight='duotone' />
                <Text fs={'sm'} className='GeomanistMedium-font'>
                  Tích điểm
                </Text>
              </Center>
              <Flex direction='column' gap={fr(2)} pt={fr(8)} px={fr(4)}>
                <Text as={'p'} fs={'xl'} className='GeomanistMedium-font'>
                  {customer?.username}
                </Text>
                <Text as={'p'} fs={'lg'} className='GeomanistMedium-font'>
                  {customer?.points} điểm - {customer?.level?.name}
                </Text>
                <Flex fs={'sm'} cl={['base', 50]} w={'100%'} justify='between'>
                  <Text className='GeomanistLight-font'>
                    {customer?.level?.name}
                  </Text>
                  <Text className='GeomanistLight-font'>
                    {levelData?.customerLevel.name}
                  </Text>
                </Flex>
                <Progress
                  w={'100%'}
                  value={
                    (customer?.points / levelData?.customerLevel.points) * 100
                  }
                  label={
                    (
                      (customer?.points / levelData?.customerLevel.points) *
                      100
                    ).toString() + '%'
                  }
                  size={'md'}
                />
              </Flex>
            </Box>
            <Center mt={fr(4)}>
              <Text
                cl={textColor}
                ta={'center'}
                lh={fr(5)}
                className='GeomanistLight-font'
              >
                Còn{' '}
                {Math.abs(customer?.points - levelData?.customerLevel.points)}{' '}
                điểm nữa bạn sẽ thăng hạng. Đổi quà không ảnh hưởng tới việc
                thăng hạng của bạn Hãy dùng điểm này để đổi ưu đãi nhé.
              </Text>
            </Center>
          </Box>
          <List gap={fr(3)} my={fr(4)} w={'90%'} mx={'auto'} fs={'md'}>
            <List.Item gap={fr(2)} as={NavLink} to={'/account/information'}>
              <List.Icon>
                <User />
              </List.Icon>{' '}
              Thông tin tài khoản
            </List.Item>
            <Divider size='xs' />
            <List.Item gap={fr(2)} as={NavLink} to={'/account/addresses'}>
              <List.Icon>
                <MapPin />
              </List.Icon>{' '}
              Sổ địa chỉ
            </List.Item>
            <Divider size='xs' />
            <List.Item gap={fr(2)} as={NavLink} to={'/account/orders'}>
              <List.Icon>
                <ListChecks />
              </List.Icon>{' '}
              Đơn hàng
            </List.Item>
            <Divider size='xs' />
            <List.Item
              gap={fr(2)}
              as={NavLink}
              to={'/account/history-purchase'}
            >
              <List.Icon>
                <ClockCountdown />
              </List.Icon>{' '}
              Lịch sử mua hàng
            </List.Item>
            <Divider size='xs' />
            <List.Item gap={fr(2)} as={NavLink} to={'/account/history-point'}>
              <List.Icon>
                <CaretCircleDoubleUp />
              </List.Icon>{' '}
              Lịch sử tích điểm
            </List.Item>
            <Divider size='xs' />
            <List.Item gap={fr(2)} as={NavLink} to={'/account/change-password'}>
              <List.Icon>
                <Lock />
              </List.Icon>{' '}
              Đổi mật khẩu
            </List.Item>
            <Divider size='xs' />
            <List.Item
              className='GeomanistMedium-font'
              gap={fr(2)}
              onClick={() => handleLogout()}
              cs={'pointer'}
              sx={{ '&:hover': { color: 'red' } }}
            >
              <List.Icon>
                <SignOut />
              </List.Icon>{' '}
              Đăng xuất
            </List.Item>
            <Divider size='xs' />
          </List>
        </Box>
      )}
    </>
  )
}

export default AccountAside
