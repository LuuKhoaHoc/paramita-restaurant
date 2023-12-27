import { Box, Flex, Image, Text, fr, useThemeModeValue } from '@prismane/core'
import { Link } from 'react-router-dom'
import { itemToURL } from '~/utils/stringToURL'

const MenuItem = ({ image, title, price, category }) => {
  const textColor = useThemeModeValue('#371b04', '#d1e9d5')
  return (
    <Flex direction='column' gap={fr(2)} mb={fr(10)}>
      <Box w={fr(65)} h={fr(65)}>
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
            w={fr(65)}
            h={fr(65)}
          />
        </Link>
      </Box>
      <Box mt={fr(2)} w={fr(65)}>
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
            ff={'GeomanistMedium'}
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
