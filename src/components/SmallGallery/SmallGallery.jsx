import React from 'react'
import LightGallery from 'lightgallery/react'
// import styles
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-autoplay.css'
// import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgAutoPlay from 'lightgallery/plugins/autoplay'
// img
import { Box, Center, Grid, Highlight, Image, Text, fr } from '@prismane/core'

const SmallGallery = ({ images }) => {
  return (
    <Grid templateColumns={12}>
      <Grid.Item columnStart={3} columnEnd={11}>
        <Box w={'100%'} pos={'relative'} my={fr(12)}>
          <Center direction='column'>
            <Text fs={'xl'} my={fr(4)}>
              As Belong With
            </Text>
            <Text fs={'3xl'} ff={'GeomanistBold'} tt={'uppercase'} mb={fr(4)}>
              <Highlight bg={['primary', 100]} cl={'#fff'}>
                @Paramita
              </Highlight>
            </Text>
          </Center>
          <LightGallery
            autoplay
            speed={500}
            startAnimationDuration={1000}
            mode='lg-fade'
            plugins={[lgThumbnail, lgAutoPlay]}
          >
            {images.map((item, index) => (
              <a
                key={index}
                className='gallery-item'
                data-src={item}
                href={item}
              >
                <Image
                  className='img-responsive'
                  src={item}
                  m={fr(1)}
                  br={'md'}
                  bsh={'md'}
                  fit='cover'
                  // w={fr(100)}
                  h={fr(84)}
                  sx={{
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </a>
            ))}
          </LightGallery>
        </Box>
      </Grid.Item>
    </Grid>
  )
}
export default SmallGallery
