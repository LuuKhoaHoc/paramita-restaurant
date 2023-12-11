import { Box } from '@prismane/core'
import React from 'react'
// img
import { Orders } from '../../images'
import { Footer, MainPic } from '../../components'

const Order = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        title={'Đặt hàng'}
        subtitle='Mang Paramita về nhà bạn'
        image={Orders}
      />
      <Footer />
    </Box>
  )
}

export default Order
