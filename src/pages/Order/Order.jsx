import { Box, Flex, Grid, Icon, Text, fr } from '@prismane/core'
import React from 'react'
// img
import { Orders } from '~/images'
import { Footer, MainPic } from '~/components'
import { Leaf } from '@phosphor-icons/react'

const Order = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        title={'Đặt hàng'}
        subtitle='Mang Paramita về nhà bạn'
        image={Orders}
      />
      <Box
        w={'100%'}
        h={'100%'}
        ff={'"BalihoScript", sans-serif'}
        pos={'relative'}
      >
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Flex direction='column' justify='between' align='center'>
              <Flex gap={fr(4)} fs={'3xl'} align='center'>
                <Icon size={fr(10)} cl={'primary'}>
                  <Leaf weight='fill' />
                </Icon>
                <Text>Các món từ nhà Paramita</Text>
              </Flex>
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Order
