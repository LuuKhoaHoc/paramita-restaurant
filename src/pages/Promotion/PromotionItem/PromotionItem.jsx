import { Box, Center, Divider, Flex, Image, Text, fr } from '@prismane/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { itemToURL } from '~/utils/stringToURL'

const PromotionItem = ({
  image,
  title,
  objectApply,
  description = '',
  dateStart,
  dateEnd
}) => {
  return (
    <Box w={'100%'}>
      <Link to={'/promotion/' + itemToURL(title)}>
        <Flex direction='row' gap={fr(4)}>
          <Box w={fr(43)} h={fr(43)}>
            <Image
              src={image}
              alt={title}
              w={fr(43)}
              h={fr(43)}
              br={'lg'}
              bsh={'md'}
            />
          </Box>
          <Divider orientation='vertical' h={fr(43)} />
          <Box>
            <Text as={'h2'} ff={'GeomanistMedium'}>
              {title}
            </Text>
            <Text as={'p'}>
              Thời gian: {dateStart} - {dateEnd}
            </Text>
            <Text as={'p'}>Đối tượng áp dụng: {objectApply}</Text>
            <Text as={'p'} mt={fr(5)} fs={'lg'}>
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
