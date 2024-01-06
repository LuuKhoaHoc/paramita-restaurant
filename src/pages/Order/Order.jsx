import React from 'react'
import { Box, Flex, Grid, Icon, Text, Toaster, fr } from '@prismane/core'
import { MainPic } from '~/components'
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

const Order = () => {
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
    <Toaster b={fr(15)}>
      <Box pos={'relative'} mih={'100vh'}>
        <MainPic
          title={'Đặt hàng'}
          subtitle='Mang Paramita về nhà bạn'
          image={Orders}
        />
        <Box
          w={'100%'}
          h={'100%'}
          ff={'"BalihoScript", sans-serif'}
          pos={'relative'}
        >
          <Grid templateColumns={12}>
            <Grid.Item columnStart={3} columnEnd={11}>
              <Flex direction='column' justify='between' align='center'>
                <Flex gap={fr(4)} align='center'>
                  <Icon size={fr(10)} cl={'primary'}>
                    <Leaf weight='fill' />
                  </Icon>
                  <Text fs={'3xl'}>Các món từ nhà Paramita</Text>
                </Flex>
                <OrderListCategory listCategory={listCategory} />
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
