import { Box, Divider, Flex, Grid, fr } from '@prismane/core'
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
import { MainPic } from '~/components'
import MenuListCategory from '~/pages/Menu/MenuListCategory/MenuListCategory'
import MenuListItem from '~/pages/Menu/MenuListItem/MenuListItem'
import { useResponsive } from '~/utils/responsive'

const Menu = () => {
  const { isMobile, isTablet, isLaptop } = useResponsive()
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
  const listCategory = [
    'Tất cả',
    'Bữa sáng',
    'Tráng miệng',
    'Rau, gỏi',
    'Món chính',
    'Lẩu',
    'Món Âu',
    'Thức uống',
    'Cà phê',
    'Nước ép',
    'Trà thảo mộc',
    'Món thêm'
  ]
  return (
    <Box pos={'relative'} mih={'100vh'}>
      <MainPic image={Menus} title={'Menu'} subtitle='Nơi hương vị thăng hoa' />
      <Box w={'100%'} h={'100%'} pos={'relative'}>
        <Grid templateColumns={12}>
          <Grid.Item
            columnStart={isTablet ? 2 : isMobile ? 1 : 3}
            columnEnd={isTablet ? 12 : isMobile ? 13 : 12}
          >
            <Flex direction='row' gap={fr(15)} my={fr(10)}>
              <MenuListCategory listCategory={listCategory} />
              <Divider orientation='vertical' />
              <MenuListItem items={imagesFood} />
            </Flex>
          </Grid.Item>
        </Grid>
      </Box>
    </Box>
  )
}

export default Menu
