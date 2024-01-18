import { Box, Center, Divider, Flex, Image, Text, fr } from '@prismane/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useResponsive } from '~/utils/responsive'
import { itemToURL } from '~/utils/stringToURL'

const PromotionItem = ({
  image,
  title,
  objectApply,
  description = '',
  dateStart,
  dateEnd
}) => {
  const { isMobile, isTablet, isLaptop } = useResponsive()

  return (
    <Box w={'100%'}>
      <Link to={'/promotion/' + itemToURL(title)}>
        <Flex direction='row' gap={fr(4)} mx={isMobile ? fr(5) : 0}>
          <Box>
            <Image
              src={image}
              alt={title}
              w={isMobile ? fr(30) : fr(43)}
              h={isMobile ? fr(30) : fr(43)}
              br={'lg'}
              bsh={'md'}
            />
          </Box>
          <Divider orientation='vertical' h={fr(43)} />
          <Box>
            <Text
              as={'h2'}
              fs={isMobile ? 'md' : 'lg'}
              className='GeomanistMedium-font'
            >
              {title}
            </Text>
            <Text as={'p'}>
              Thời gian: {dateStart} - {dateEnd}
            </Text>
            <Text as={'p'}>Đối tượng áp dụng: {objectApply}</Text>
            <Text
              as={'p'}
              mt={fr(5)}
              fs={isMobile ? 'md' : 'lg'}
              h={fr(30)}
              of={'hidden'}
              sx={{
                textOverflow: 'ellipsis'
              }}
            >
              {description}
            </Text>
          </Box>
        </Flex>
      </Link>
      <Divider my={fr(5)} />
    </Box>
  )
}

export default PromotionItem
