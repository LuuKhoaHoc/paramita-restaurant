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
  Center,
  Divider,
  Flex,
  Grid,
  List,
  Progress,
  Text,
  fr,
  useThemeModeValue
} from '@prismane/core'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const AccountAside = () => {
  const navigate = useNavigate()
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  const bgColor = useThemeModeValue('#fff2e5', '#1d2b1f')
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  }
  return (
    <Box w={fr(95)} bg={bgColor} bsh={'xl'} br={'xl'} m={fr(10)}>
      <Box
        w={'90%'}
        h={fr(58)}
        mx={'auto'}
        mt={fr(4)}
        bg={bgColor}
        bsh={'xl'}
        br={'xl'}
      >
        <Box
          w={'100%'}
          h={fr(35)}
          mx={'auto'}
          mt={fr(4)}
          bsh={'sm'}
          br={'xl'}
          pos={'relative'}
          cl={'#fff'}
          ff={'GeomanistMedium'}
          sx={{
            background: 'linear-gradient(180deg, #6ad078 0%, #004209 100%)'
          }}
        >
          <Center
            pos={'absolute'}
            gap={fr(2)}
            w={fr(30)}
            h={fr(10)}
            // br={'lg'}
            t={0}
            r={16}
            sx={{
              boxShadow: `inset 0px 2px 5px 0 rgb(0 0 0 / 0.5)`,
              borderRadius: '0 0 8px 8px'
            }}
          >
            <CaretDoubleDown weight='duotone' />
            <Text fs={'sm'}>Tích điểm</Text>
          </Center>
          <Flex direction='column' gap={fr(2)} pt={fr(8)} px={fr(4)}>
            <Text as={'p'} fs={'xl'}>
              Paramita
            </Text>
            <Text as={'p'} fs={'lg'}>
              450 điểm - Vàng
            </Text>
            <Flex
              fs={'sm'}
              ff={'GeomanistLight'}
              cl={['base', 50]}
              w={'100%'}
              justify='between'
            >
              <Text>Vàng</Text>
              <Text>Kim cương</Text>
            </Flex>
            <Progress w={'100%'} value={65} label='65%' size={'md'} />
          </Flex>
        </Box>
        <Center mt={fr(4)}>
          <Text cl={textColor} ta={'center'} lh={fr(5)} ff={'GeomanistLight'}>
            Còn 1554 điểm nữa bạn sẽ thăng hạng. Đổi quà không ảnh hưởng tới
            việc thăng hạng của bạn Hãy dùng điểm này để đổi ưu đãi nhé.
          </Text>
        </Center>
      </Box>
      <List gap={fr(2)} my={fr(4)} w={'90%'} mx={'auto'} fs={'lg'}>
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
        <List.Item gap={fr(2)} as={NavLink} to={'/account/history-purchase'}>
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
      </List>
    </Box>
  )
}

export default AccountAside
