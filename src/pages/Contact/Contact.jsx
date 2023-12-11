import { Box } from '@prismane/core'
import React from 'react'
// img
import { ContactPic } from '../../images'
import { Footer, MainPic} from '../../components'

const Contact = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        title={'Liên hệ'}
        subtitle='Kết nối với Paramita'
        image={ContactPic}
      />
      <Footer />
    </Box>
  )
}

export default Contact
