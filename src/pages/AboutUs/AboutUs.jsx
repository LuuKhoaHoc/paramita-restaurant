import { Box } from '@prismane/core'
import React from 'react'
// img
import { AboutUsPic } from '../../images'
import { Footer, MainPic} from '../../components'

const AboutUs = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={AboutUsPic}
        title={'Paramita'}
        sloganLeft={'Câu chuyện của'}
      />
      <Footer />
    </Box>
  )
}

export default AboutUs
