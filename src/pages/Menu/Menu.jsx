import { Box } from '@prismane/core'
import React from 'react'
// img
import { Menus } from '../../images'
import { Footer, MainPic} from '../../components'

const Menu = () => {
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={Menus}
        title={'Menu'}
        subtitle='Nơi hương vị chay thăng hoa'
      />
      <Footer />
    </Box>
  )
}

export default Menu
