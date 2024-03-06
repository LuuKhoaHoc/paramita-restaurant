import React from 'react'
import { Box, Flex, Grid, Icon, Text, Toaster, fr } from '@prismane/core'
import { Loading, MainPic } from '~/components'
import { Leaf } from '@phosphor-icons/react'
import OrderListCategory from '~/pages/Order/OrderListCategory/OrderListCategory'
import OrderListItem from '~/pages/Order/OrderListItem/OrderListItem'
// img
import {
  Orders,
  BanhXeo,
  BunHue,
  BunNam,
  CaTimNuong,
  ChaoNamMoi,
  ComTam,
  DauHuNonChungTuong,
  Lau
} from '~/images'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const GET_CONTENTS = gql`
  query {
    page(name: "Order") {
      page_id
      name
      content {
        title
        slogan
        description
        image
        position
      }
    }
  }
`

const GET_CATEGORYLIST = gql`
  query {
    categoryList {
      name
    }
  }
`

const OrderCategory = () => {
  const { category } = useParams()
  const {
    loading: loadingCategory,
    error: errorCategory,
    data: dataCategory
  } = useQuery(GET_CATEGORYLIST)
  const {
    loading: loadingContent,
    error: errorContent,
    data: dataContent
  } = useQuery(GET_CONTENTS)
  const listFood = [
    {
      image: BanhXeo,
      title: 'Bánh xèo',
      price: '100.000',
      description: 'Món Bánh xèo ngon miệng'
    },
    {
      image: BunHue,
      title: 'Bún Huế Paramita',
      price: '80.000',
      description: 'Món Bún Huế thơm ngon'
    },
    {
      image: BunNam,
      title: 'Bún nấm nướng chả giò',
      price: '100.000',
      description: 'Món Bún nấm nướng chả giò hấp dẫn'
    },
    {
      image: CaTimNuong,
      title: 'Cà tím nướng hành ớt',
      price: '100.000',
      description: 'Món Cà tím nướng hành ớt đậm đà'
    },
    {
      image: ChaoNamMoi,
      title: 'Cháo nấm mối',
      price: '100.000',
      description: 'Món Cháo nấm mối thơm ngon'
    },
    {
      image: ComTam,
      title: 'Cơm tấm Paramita',
      price: '100.000',
      description: 'Món Cơm tấm ngon lành'
    },
    {
      image: DauHuNonChungTuong,
      title: 'Đậu hũ non chưng tương',
      price: '100.000',
      description: 'Món Đậu hũ non chưng tương thơm ngon'
    },
    {
      image: Lau,
      title: 'Lẩu Paramita',
      price: '80.000',
      description: 'Món Lẩu thơm ngon'
    }
  ]
  const { isMobile, isTablet, isLaptop } = useResponsive()
  if (loadingContent) return <Loading />

  return (
    <Toaster position='top-right' t={fr(23)}>
      <Box pos={'relative'} mih={'100vh'}>
        <MainPic
          title={dataContent?.page?.content[0]?.title}
          subtitle={dataContent?.page?.content[0]?.description}
          image={Orders}
        />
        <Box w={'100%'} h={'100%'} pos={'relative'}>
          <Grid templateColumns={12}>
            <Grid.Item
              columnStart={isTablet ? 2 : isMobile ? 1 : 3}
              columnEnd={isTablet ? 12 : isMobile ? 13 : 11}
            >
              <Flex direction='column' justify='between' align='center'>
                <Flex gap={fr(4)} align='center'>
                  <Icon size={fr(10)} cl={'primary'}>
                    <Leaf weight='fill' />
                  </Icon>
                  <Text fs={isTablet ? '2xl' : isMobile ? 'xl' : '3xl'}>
                    Các món từ nhà Paramita
                  </Text>
                </Flex>
                <OrderListCategory data={dataCategory} />
                <OrderListItem listFood={listFood} />
              </Flex>
            </Grid.Item>
          </Grid>
        </Box>
      </Box>
    </Toaster>
  )
}

export default OrderCategory
