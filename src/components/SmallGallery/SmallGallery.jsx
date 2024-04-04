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
import { useResponsive } from '~/utils/responsive'

const SmallGallery = ({ images }) => {
  const { isLaptop, isTablet, isMobile } = useResponsive()
  return (
    <Grid templateColumns={12}>
      <Grid.Item
        columnStart={isTablet ? 2 : isMobile ? 1 : 3}
        columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
      >
        <Box w={'100%'} pos={'relative'} my={fr(12)}>
          <Center direction='column'>
            <Text fs={isTablet ? 'lg' : isMobile ? 'md' : 'xl'} my={fr(4)}>
              As Belong With
            </Text>
            <Text
              fs={isTablet ? '2xl' : isMobile ? 'xl' : '3xl'}
              ff={'GeomanistBold'}
              tt={'uppercase'}
              mb={fr(4)}
            >
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
                <Box
                  dp={'inline-block'}
                  of={'hidden'}
                  br={'md'}
                  sx={{
                    '&:hover': {
                      img: {
                        transform: 'scale(1.2)'
                      }
                    }
                  }}
                >
                  <Image
                    className='img-responsive'
                    src={item}
                    m={fr(1)}
                    br={'md'}
                    bsh={'md'}
                    fit='cover'
                    // w={'100%'}
                    h={isTablet ? fr(60) : isMobile ? fr(40) : fr(80)}
                    sx={{
                      transition: 'all 0.3s ease-in-out'
                    }}
                  />
                </Box>
              </a>
            ))}
          </LightGallery>
        </Box>
      </Grid.Item>
    </Grid>
  )
}
export default SmallGallery
