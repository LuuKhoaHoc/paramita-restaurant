import { Box } from '@prismane/core'
import React from 'react'
// img
import { BookTable } from '../../images'
import { Footer, MainPic} from '../../components'

const AboutUs = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={BookTable}
        title={'Đặt bàn'}
        subtitle={'Lựa chọn tối ưu cho mọi cuộc hẹn'}
      />
      <Footer />
    </Box>
  )
}

export default AboutUs
