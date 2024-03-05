import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, Center, Flex, Grid, Icon, Text, fr } from '@prismane/core'
import { UserCircle } from '@phosphor-icons/react'
import { Loading } from '~/components'

import AccountAddresses from '~/pages/Auth/Account/AccountAddresses/AccountAddresses'
import AccountInformation from '~/pages/Auth/Account/AccountInformation/AccountInformation'
import AccountOrders from '~/pages/Auth/Account/AccountOrders/AccountOrders'
import AccountHistory from '~/pages/Auth/Account/AccountHistory/AccountHistory'
import ChangePassword from '~/pages/Auth/Account/ChangePassword/ChangePassword'
import AccountAside from '~/pages/Auth/Account/AccountAside/AccountAside'
import HistoryRewardPoint from '~/pages/Auth/Account/HistoryRewardPoint/HistoryRewardPoint'
import { useResponsive } from '~/utils/responsive'

import { gql, useQuery } from '@apollo/client'

const Account = ({ customer }) => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} bg='#371b04' />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Center
              px={fr(12)}
              py={fr(6)}
              fs={'2xl'}
              gap={fr(4)}
              className='GeomanistMedium-font'
            >
              <Icon cl={'primary'} size={fr(10)}>
                <UserCircle weight='fill' />
              </Icon>{' '}
              <Text>Tài khoản của bạn</Text>
            </Center>
            <Flex direction={isTablet ? 'column' : isMobile ? 'column' : 'row'}>
              <AccountAside />
              <Routes>
                <Route
                  path='information'
                  element={<AccountInformation customer={customer} />}
                />
                <Route
                  path='addresses'
                  element={<AccountAddresses customer={customer} />}
                />
                <Route path='orders' element={<AccountOrders />} />
                <Route path='history-purchase' element={<AccountHistory />} />
                <Route path='history-point' element={<HistoryRewardPoint />} />
                <Route path='change-password' element={<ChangePassword />} />
                <Route path='*' element={<AccountInformation />} />
              </Routes>
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Account
