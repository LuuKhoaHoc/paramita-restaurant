import { Box } from '@prismane/core'
// img
import { HomePic } from '../../images'
import React from 'react'

// component
import { MainPic, Footer } from '../../components'

const Home = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        title={'Paramita'}
        image={HomePic}
        sloganRight={'Tịnh tâm - Sống khoẻ - Yêu đời'}
      />

      <Footer />
    </Box>
  )
}

export default Home
