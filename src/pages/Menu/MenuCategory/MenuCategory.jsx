import { Box, Divider, Flex, Grid, Text, fr } from '@prismane/core'
// img
import {
  BanhXeo,
  BunHue,
  BunNam,
  CaTimNuong,
  ChaoNamMoi,
  ComTam,
  DauHuNonChungTuong,
  Menus,
  Lau
} from '~/images'
// component
import { Loading, MainPic } from '~/components'
import MenuListCategory from '~/pages/Menu/MenuListCategory/MenuListCategory'
import MenuListItem from '~/pages/Menu/MenuListItem/MenuListItem'
import { useParams } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'
import { itemToURL } from '~/utils/stringToURL'

const GET_CONTENTS = gql`
  query {
    page(name: "Menu") {
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

const MenuCategory = () => {
  const { isMobile, isTablet, isLaptop } = useResponsive()
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
  const {
    loading: loadingMenu,
    error: errorMenu,
    data: dataMenu
  } = useQuery(GET_MENU)
  if (loadingContent) return <Loading />

  const categoryName = dataCategory?.categoryList.map((item) => item.name)

  const specifyCategory = categoryName.find(
    (item) => itemToURL(item) === category
  )

  const listFood = dataMenu?.menuList || []
  let listFoodFilter = []
  if (category === 'tat-ca') {
    listFoodFilter = listFood
  } else {
    listFoodFilter = listFood.filter(
      (item) => itemToURL(item.category[0].name) === category
    )
  }
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic
        image={Menus}
        title={dataContent?.page?.content[0].title}
        subtitle={dataContent?.page?.content[0].description}
      />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 12}
          >
            <Flex
              direction='row'
              gap={isTablet ? fr(10) : isMobile ? fr(5) : fr(15)}
              my={fr(10)}
              mx={isMobile ? fr(3) : 0}
            >
              <MenuListCategory categories={categoryName} />
              <Divider orientation='vertical' />
              <Flex direction='column' gap={fr(4)}>
                <Text fs={'xl'} className='GeomanistMedium-font'>
                  {specifyCategory}
                </Text>
                <MenuListItem items={listFoodFilter} />
              </Flex>
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default MenuCategory
