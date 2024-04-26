import React from 'react'
import { Box, Flex, Grid, Icon, Text, Toaster, fr } from '@prismane/core'
import { Loading, MainPic } from '~/components'
import { Leaf } from '@phosphor-icons/react'
import OrderListCategory from '~/pages/Order/OrderListCategory/OrderListCategory'
import OrderListItem from '~/pages/Order/OrderListItem/OrderListItem'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

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

const Order = () => {
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
  const {
    loading: loadingMenu,
    error: errorMenu,
    data: dataMenu
  } = useQuery(GET_MENU)

  const listFood = dataMenu?.menuList || []
  const { isMobile, isTablet, isLaptop } = useResponsive()
  if (loadingContent) return <Loading />

  return (
    <Toaster position='top-right' t={fr(23)}>
      <Box pos={'relative'} mih={'100vh'}>
        <MainPic
          title={dataContent?.page?.content[0]?.title}
          subtitle={dataContent?.page?.content[0]?.description}
          image={dataContent?.page?.content[0]?.image}
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

export default Order
