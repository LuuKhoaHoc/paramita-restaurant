import { Box, Flex, Grid, Image, Text, fr } from '@prismane/core'
import { Loading, StyledButton } from '~/components'
import { Link } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

const GET_CONTENTS = gql`
  query {
    page(name: "Error") {
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

const SmallBookTable = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  const { loading, data } = useQuery(GET_CONTENTS)
  if (loading) return <Loading />
  return (
    <Grid templateColumns={12}>
      <Grid.Item columnStart={1} columnEnd={13}>
        <Box pos={'relative'} w={'100%'} my={fr(5)}>
          <Image
            src={data?.page?.content[0]?.image}
            alt='restaurant-space'
            fit='cover'
            w={'100%'}
            h={fr(130)}
            ft={'brightness(80%)'}
            pos={'absolute'}
          />
          <Flex
            justify='center'
            align='center'
            direction='column'
            gap={fr(3)}
            w={isTablet ? '100%' : isMobile ? '100%' : '50%'}
            h={fr(130)}
            pos={'relative'}
            ff={'BalihoScript'}
          >
            <Text fs={isMobile ? 'lg' : '2xl'} cl={'#fff'}>
              {data?.page?.content[0]?.slogan}
            </Text>
            <Text cl={'#fff'} fs={isMobile ? 'xl' : '4xl'} ff={'GeomanistBold'}>
              {data?.page?.content[0].title}
            </Text>
            <Text
              as={'p'}
              cl={'#fff'}
              fs={isLaptop ? 'lg' : isTablet ? 'md' : isMobile ? 'base' : 'xl'}
              w={'50%'}
            >
              {data?.page?.content[0].description}
            </Text>
            <StyledButton
              cl={['primary', 100]}
              p={fr(3)}
              as={Link}
              to={'/book-table'}
            >
              Đặt bàn ngay
            </StyledButton>
          </Flex>
        </Box>
      </Grid.Item>
    </Grid>
  )
}

export default SmallBookTable
