import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, Center, Flex, Grid, Icon, Text, fr } from '@prismane/core'
import { UserCircle } from '@phosphor-icons/react'

import AccountAddresses from '~/pages/Auth/Account/AccountAddresses/AccountAddresses'
import AccountInformation from '~/pages/Auth/Account/AccountInformation/AccountInformation'
import AccountOrders from '~/pages/Auth/Account/AccountOrders/AccountOrders'
import AccountHistory from '~/pages/Auth/Account/AccountHistory/AccountHistory'
import ChangePassword from '~/pages/Auth/Account/ChangePassword/ChangePassword'
import AccountAside from '~/pages/Auth/Account/AccountAside/AccountAside'
import HistoryRewardPoint from '~/pages/Auth/Account/HistoryRewardPoint/HistoryRewardPoint'

const Account = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} bg='#371b04' />
      <Box
        w={'100%'}
        h={'100%'}
        ff={'"BalihoScript", sans-serif'}
        pos={'relative'}
      >
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Center p={fr(12)} fs={'2xl'} gap={fr(4)} ff={'GeomanistMedium'}>
              <Icon cl={'primary'} size={fr(10)}>
                <UserCircle weight='fill' />
              </Icon>{' '}
              <Text>Tài khoản của bạn</Text>
            </Center>
            <Flex>
              <AccountAside />
              <Routes>
                <Route path='information' element={<AccountInformation />} />
                <Route path='addresses' element={<AccountAddresses />} />
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
