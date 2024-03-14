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
import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemToURL } from '~/utils/stringToURL'
import { gql, useQuery } from '@apollo/client'
import { useResponsive } from '~/utils/responsive'
import { Loading } from '~/components'

const GET_MENU = gql`
  query {
    menuList {
      item_id
      image
      name
      price
      description
      category {
        name
      }
    }
  }
`

const MenuItemDetail = () => {
  // navigate
  const navigate = useNavigate()
  // responsive
  const { isMobile, isTablet, isLaptop } = useResponsive()
  const { category, item } = useParams()
  const { data, loading, error } = useQuery(GET_MENU)
  const menuList = data?.menuList
  const itemDetail = menuList?.find(
    (menu) => itemToURL(menu.category[0].name) === category && menu
  )
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [itemDetail])

  if (loading) return <Loading />
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <Box h={fr(22.5)} bg='#371b04' />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
          >
            <Breadcrumb
              m={isMobile ? fr(4) : isTablet ? fr(5) : fr(6)}
              fs={isMobile || isTablet ? 'base' : 'md'}
            >
              <Breadcrumb.Item as={Link} to={'/menu'}>
                Menu
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item as={Link} to={'/menu/' + category}>
                {itemDetail.category[0].name}
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item as={Link}>{itemDetail.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Flex
              w={'100%'}
              direction={isMobile ? 'column' : 'row'}
              gap={fr(8)}
              mb={fr(10)}
              align={isMobile ? 'center' : 'start'}
            >
              <Image
                src={itemDetail.image}
                alt={item}
                bsh={'md'}
                br={'lg'}
                w={isMobile ? '80%' : isTablet ? '90%' : '100%'}
                h={isMobile ? fr(70) : isTablet ? fr(80) : fr(100)}
              />
              <Flex
                direction='column'
                gap={fr(4)}
                w={'100%'}
                align={isMobile ? 'center' : 'start'}
              >
                <Text fs={'2xl'}>{itemDetail.name}</Text>
                <Text fs={'2xl'} cl={'primary'}>
                  {(itemDetail.price * 1000).toLocaleString('vi-VN')} đ
                </Text>
                <Button
                  w={isMobile ? '80%' : isTablet ? '90%' : '100%'}
                  bg={'primary'}
                  cl={'#fff'}
                  size='lg'
                  icon={<Package weight='duotone' />}
                  className='GeomanistMedium-font'
                  onClick={() => navigate('/order-online')}
                >
                  Đặt giao tận nơi
                </Button>
              </Flex>
            </Flex>
            <Divider />
            <Box my={fr(6)} ml={isMobile ? fr(4) : fr(0)}>
              <Text as={'h3'} className='GeomanistMedium-font' mb={fr(2)}>
                Mô tả món ăn
              </Text>
              <Text fs={'md'} ml={fr(2)}>
                {itemDetail.description}
              </Text>
            </Box>
            <Divider />
            <Box my={fr(6)} ml={isMobile ? fr(4) : fr(0)}>
              <Text as={'h3'} className='GeomanistMedium-font' mb={fr(2)}>
                Món ăn liên quan
              </Text>
              <Flex justify='around'>
                {menuList.slice(0, 4).map((item, index) => (
                  <Flex direction='column' key={index}>
                    <Link
                      to={
                        '/menu/' +
                        itemToURL(item.category[0].name) +
                        '/' +
                        itemToURL(item.name)
                      }
                    >
                      <Image
                        src={item.image}
                        alt='bun-hue'
                        br={'xl'}
                        bsh={'md'}
                        w={isMobile ? fr(30) : isTablet ? '90%' : fr(43)}
                        h={isMobile ? fr(30) : isTablet ? '90%' : fr(43)}
                      />
                    </Link>
                    <Link
                      to={
                        '/menu/' +
                        itemToURL(item.category[0].name) +
                        '/' +
                        itemToURL(item.name)
                      }
                    >
                      <Text
                        fs={'lg'}
                        cl={['inherit', { hover: 'primary' }]}
                        cs={'pointer'}
                      >
                        {item.name}
                      </Text>
                    </Link>
                    <Text fs={'md'} cl={'base'}>
                      {(item.price * 1000).toLocaleString('vi-VN')} đ
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
