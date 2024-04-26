import { Box, Divider, Flex, Grid, Text, fr } from '@prismane/core'
// component
import { Loading, MainPic } from '~/components'
import MenuListCategory from '~/pages/Menu/MenuListCategory/MenuListCategory'
import MenuListItem from '~/pages/Menu/MenuListItem/MenuListItem'
import { useParams } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'
import { itemToURL } from '~/utils/stringToURL'
import { GET_CATEGORYLIST, GET_CONTENTS, GET_MENU } from '~/pages/Menu/schema'

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
        image={dataContent?.page?.content[0]?.image}
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
