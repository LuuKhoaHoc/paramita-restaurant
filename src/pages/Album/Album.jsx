import { Box, Flex, Grid, Highlight, Image, Text, fr } from '@prismane/core'
// img
import { AlbumPic } from '~/images'
import React, { useState } from 'react'
// component
import { MainPic, DividerParamita } from '~/components'
import { Link } from 'react-router-dom'
import { itemToURL } from '~/utils/stringToURL'

const Album = () => {
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
  const [scrollEvent, setScrollEvent] = useState(false)
  window.addEventListener('scroll', () => {
    setScrollEvent(true)
  })
  return (
    <Box pos={'relative'} mih={'100vh'} of={'hidden'}>
      <MainPic
        title={'Album'}
        subtitle='Không gian trang nhã - Ẩm thực tinh tế'
        image={AlbumPic}
      />
      <Box
        w={'100%'}
        h={'100%'}
        ff={'"BalihoScript", sans-serif'}
        pos={'relative'}
      >
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Flex
              pos={'relative'}
              direction='column'
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            >
              <Text ff={'BalihoScript'} fs={'2xl'} my={fr(4)}>
                Thưởng thức món ngon tại Nhà hàng chay Paramita không chỉ là
                hương vị mà còn là trải nghiệm 5 giác quan đầy thư thái. Hãy
                cùng chiêm ngưỡng vẻ đẹp của không gian và ẩm thực qua góc nhìn
                ảnh nghệ thuật của chúng tôi.
              </Text>
              <Text fs={'3xl'} ff={'GeomanistBold'} tt={'uppercase'} mb={fr(4)}>
                <Highlight bg={['primary', 100]} cl={'#fff'}>
                  @Paramita
                </Highlight>
              </Text>
              <Flex
                w={'100%'}
                wrap='wrap'
                justify='evenly'
                gap={fr(5)}
                align='center'
              >
                {imagesCategory.map((item, index) => (
                  <Box
                    key={index}
                    pos={'relative'}
                    w={fr(83)}
                    h={fr(53)}
                    br={'md'}
                    sx={{
                      backgroundImage: `url(${item.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  >
                    <Box
                      pos={'absolute'}
                      b={8}
                      py={fr(2)}
                      px={fr(8)}
                      bg={'rgba(0,0,0,0.5)'}
                    >
                      <Link to={'/album/' + itemToURL(item.title)} state={item}>
                        <Text
                          cl={'#fff'}
                          op={[0.8, { hover: 1 }]}
                          tt={'capitalize'}
                        >
                          {item.title}
                        </Text>
                      </Link>
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Flex>
            <Flex
              pos={'relative'}
              direction='row'
              justify='between'
              align='center'
              gap={fr(10)}
              my={fr(5)}
            ></Flex>
          </Grid.Item>
          <Grid.Item columnStart={1} columnEnd={13}>
            <DividerParamita />
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Album
