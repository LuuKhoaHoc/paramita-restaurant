import { useLocation } from 'react-router-dom'
import { Box, Flex, Grid, Image, Text, fr } from '@prismane/core'
import React from 'react'
import LightGallery from 'lightgallery/react'
// import styles
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-autoplay.css'
// import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgAutoPlay from 'lightgallery/plugins/autoplay'

const AlbumDetail = () => {
  const imagesCategory = [
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/San-vuon.webp',
      title: 'Sân vườn'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/Tinh-Vien.webp',
      title: 'Phòng tịch viên'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/Hoa-Ai.webp',
      title: 'Phòng hoà ái'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/Tam-Giao.webp',
      title: 'Phòng tâm giao'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/11/KIHA4783-1-1024x683.jpg',
      title: 'Phòng hương thiền'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/tiec-cuoi-1024x682.jpg',
      title: 'Tiệc cưới'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/sinhnhat.jpeg',
      title: 'Sinh nhật'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/11/312664443_490861549728331_635127123780423924_n-1024x683.jpg',
      title: 'Sự kiện khác'
    },
    {
      image:
        'https://zenhousevietnam.com/wp-content/uploads/2023/10/screenshot_1698397033-1024x681.png',
      title: 'Workshop dạy nấu ăn'
    }
  ]
  return (
    <>
      <Box h={fr(22.5)} bg='#371b04' />
      <Grid templateColumns={12}>
        <Grid.Item columnStart={3} columnEnd={11}>
          <Flex
            w={'100%'}
            ff={'BalihoScript'}
            gap={fr(5)}
            my={fr(5)}
            direction='column'
          >
            <Text fs={'2xl'} ff={'GeomanistLight'} tt={'capitalize'}>
              {useLocation().state.title}
            </Text>
            <LightGallery
              autoplay
              speed={500}
              startAnimationDuration={1000}
              mode='lg-slide'
              plugins={[lgThumbnail, lgAutoPlay]}
            >
              {imagesCategory.map((item, index) => (
                <a
                  key={index}
                  className='gallery-item'
                  data-src={item.image}
                  href={item.image}
                >
                  <Image
                    className='img-responsive'
                    src={item.image}
                    m={fr(1)}
                    br={'md'}
                    bsh={'md'}
                    fit='cover'
                    w={fr(100)}
                    h={fr(75)}
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
          </Flex>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default AlbumDetail
