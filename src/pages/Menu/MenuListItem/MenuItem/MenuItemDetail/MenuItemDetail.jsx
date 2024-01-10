import { Package } from '@phosphor-icons/react/dist/ssr'
import {
  Box,
  Breadcrumb,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
  fr
} from '@prismane/core'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BanhXeo,
  BunHue,
  BunNam,
  CaTimNuong,
  ChaoNamMoi,
  ComTam,
  DauHuNonChungTuong,
  Lau
} from '~/images'
import { itemToURL } from '~/utils/stringToURL'

const MenuItemDetail = () => {
  const imagesFood = [
    { image: BanhXeo, title: 'Bánh xèo', price: 5, category: 'Món chính' },
    {
      image: BunHue,
      title: 'Bún Huế Paramita',
      price: 4,
      category: 'Bữa sáng'
    },
    {
      image: BunNam,
      title: 'Bún nấm nướng chả giò',
      price: 5,
      category: 'Bữa sáng'
    },
    {
      image: CaTimNuong,
      title: 'Cà tím nướng hành ớt',
      price: 5,
      category: 'Món chính'
    },
    {
      image: ChaoNamMoi,
      title: 'Cháo nấm mối',
      price: 5,
      category: 'Tráng miệng'
    },
    {
      image: ComTam,
      title: 'Cơm tấm Paramita',
      price: 5,
      category: 'Món chính'
    },
    {
      image: DauHuNonChungTuong,
      title: 'Đậu hũ non chưng tương',
      price: 5,
      category: 'Món chính'
    },
    { image: Lau, title: 'Lẩu Paramita', price: 4, category: 'Lẩu' }
  ]
  const { state } = useLocation()
  const { image, item, price, category } = state
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [state])
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} bg='#371b04' />
      <Box
        w={'100%'}
        h={'100%'}
        ff={'"BalihoScript", sans-serif'}
        pos={'relative'}
      >
        <Grid templateColumns={12}>
          <Grid.Item columnStart={3} columnEnd={11}>
            <Breadcrumb m={fr(6)} fs={'lg'}>
              <Breadcrumb.Item as={Link} to={'/menu'}>
                Menu
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item
                as={Link}
                to={'/menu/' + itemToURL(category)}
                state={{ category }}
              >
                {category}
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item as={Link}>{item}</Breadcrumb.Item>
            </Breadcrumb>
            <Flex gap={fr(8)} mb={fr(10)}>
              <Image
                src={image}
                alt={item}
                bsh={'md'}
                br={'lg'}
                w={fr(140)}
                h={fr(140)}
              />
              <Flex direction='column' gap={fr(4)} w={'100%'}>
                <Text fs={'2xl'}>{item}</Text>
                <Text fs={'2xl'} cl={'primary'}>
                  {price} đ
                </Text>
                <Button
                  w={'100%'}
                  bg={'primary'}
                  cl={'#fff'}
                  size='lg'
                  icon={<Package weight='duotone' />}
                  ff={'GeomanistMedium'}
                >
                  Đặt giao tận nơi
                </Button>
              </Flex>
            </Flex>
            <Divider />
            <Box my={fr(6)}>
              <Text as={'h3'} ff={'GeomanistMedium'} mb={fr(2)}>
                Mô tả món ăn
              </Text>
              <Text fs={'md'}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae consequatur minima ipsum laboriosam architecto
                molestias, labore, nisi soluta et modi sint enim dolor! Nemo
                tenetur ipsa veniam aut accusamus obcaecati!
              </Text>
            </Box>
            <Divider />
            <Box my={fr(6)}>
              <Text as={'h3'} ff={'GeomanistMedium'} mb={fr(2)}>
                Món ăn liên quan
              </Text>
              <Flex justify='between'>
                {imagesFood.slice(0, 6).map((item, index) => (
                  <Flex direction='column' key={index}>
                    <Link
                      to={
                        '/menu/' +
                        itemToURL(category) +
                        '/' +
                        itemToURL(item.title)
                      }
                      state={{
                        image: item.image,
                        item: item.title,
                        price: item.price,
                        category: category
                      }}
                    >
                      <Image
                        src={item.image}
                        alt='bun-hue'
                        br={'xl'}
                        bsh={'md'}
                        w={fr(43)}
                        h={fr(43)}
                      />
                    </Link>
                    <Link
                      to={
                        '/menu/' +
                        itemToURL(category) +
                        '/' +
                        itemToURL(item.title)
                      }
                      state={{
                        image: item.image,
                        item: item.title,
                        price: item.price,
                        category: category
                      }}
                    >
                      <Text
                        fs={'lg'}
                        cl={['inherit', { hover: 'primary' }]}
                        cs={'pointer'}
                      >
                        {item.title}
                      </Text>
                    </Link>
                    <Text fs={'md'} cl={'base'}>
                      {item.price} đ
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default MenuItemDetail
