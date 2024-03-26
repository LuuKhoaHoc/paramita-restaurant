import { DotsThree, ListPlus } from '@phosphor-icons/react'
import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import CategoryCard from '~/pages/Admin/Category/CategoryCard/CategoryCard'
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from '~/pages/Admin/Category/schema'

const Category = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  const { query, setQuery, filtered } = useSearch(data?.categoryList || [])
  const [openAddModal, setOpenAddModal] = useState(false)
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả danh mục
          </Text>
          <Flex align='center' gap={fr(2)}>
            <TextField
              placeholder='Tìm kiếm...'
              value={query || ''}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant='secondary'
              size='md'
              icon={<ListPlus weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm danh mục
            </Button>
            <Button
              icon={<DotsThree weight='bold' />}
              size='md'
              variant='tertiary'
              bd={'none'}
              bsh={'sm'}
            />
          </Flex>
        </Flex>
        <Stack direction='row' wrap='wrap' px={fr(4)}>
          {filtered.map((category) => (
            <CategoryCard key={category.category_id} category={category} />
          ))}
        </Stack>
      </Flex>
    </>
  )
}

export default Category
