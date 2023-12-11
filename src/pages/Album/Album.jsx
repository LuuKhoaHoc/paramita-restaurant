import { Box } from '@prismane/core'
import React from 'react'
// img
import { AlbumPic } from '../../images'
import { Footer, MainPic} from '../../components'

const Album = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        title={'Album'}
        subtitle='Nơi khoảng khắc sum vầy'
        image={AlbumPic}
      />
      <Footer />
    </Box>
  )
}

export default Album
