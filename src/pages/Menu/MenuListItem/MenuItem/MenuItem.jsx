import { Box, Flex, Image, Text, fr, useThemeModeValue } from '@prismane/core'
import { Link } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import { itemToURL } from '~/utils/stringToURL'

const MenuItem = ({ image, title, price, category }) => {
  const { isTablet, isMobile } = useResponsive()
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  return (
    <Flex direction='column' mb={isTablet ? fr(7) : isMobile ? fr(4) : fr(10)}>
      <Box w={isTablet ? fr(48) : isMobile ? fr(25) : fr(56)}>
        <Link
          to={'/menu/' + itemToURL(category) + '/' + itemToURL(title)}
          state={{
            image: image,
            item: title,
            price: price,
            category: category
          }}
        >
          <Image
            src={image}
            alt='image'
            bsh={'md'}
            br={'lg'}
            w={isTablet ? fr(48) : isMobile ? fr(25) : fr(56)}
            h={isTablet ? fr(48) : isMobile ? fr(25) : fr(56)}
          />
        </Link>
      </Box>
      <Box w={isTablet ? fr(48) : isMobile ? fr(25) : fr(56)}>
        <Link
          to={'/menu/' + itemToURL(category) + '/' + itemToURL(title)}
          state={{
            image: image,
            item: title,
            price: price,
            category: category
          }}
        >
          <Text
            as={'h3'}
            cl={[textColor, { hover: 'primary' }]}
            cs={'pointer'}
            fs={isTablet ? 'lg' : isMobile ? 'base' : 'xl'}
          >
            {title}
          </Text>
        </Link>
        <Text cl={'base'}>{price}.000 đ</Text>
      </Box>
    </Flex>
  )
}

export default MenuItem
