import {
  Button,
  Flex,
  Skeleton,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import ContentRow from '~/pages/Admin/Content/ContentRow/ContentRow'
import { useQuery } from '@apollo/client'

import { GET_CONTENTS } from '~/pages/Admin/Content/schema'
import { DotsThree, Plus } from '@phosphor-icons/react'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'

const Content = () => {
  const [openAddContent, setOpenAddContent] = useState(false)
  const { loading, error, data } = useQuery(GET_CONTENTS)
  const { query, setQuery, filtered } = useSearch(data?.contentList || [])
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả nội dung
          </Text>
          <Flex align='center' gap={fr(2)}>
            <TextField
              placeholder='Tìm kiếm...'
              value={query || ''}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              icon={<DotsThree weight='bold' />}
              size='md'
              variant='tertiary'
              bd={'none'}
              bsh={'sm'}
            />
          </Flex>
        </Flex>
        <Table w={'100%'}>
          <Table.Head ta={'center'}>
            <Table.Row fs={'md'}>
              <Table.Cell className='GeomanistMedium-font'>ID</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Tiêu đề</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Slogan</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Mô tả</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Hình ảnh</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Trang</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Vị trí</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Hành động
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filtered.map((content) => (
              <ContentRow key={content.content_id} content={content} />
            ))}
          </Table.Body>
          <Table.Foot ta={'center'}>
            <Table.Row fs={'md'}>
              <Table.Cell className='GeomanistMedium-font'>ID</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Tiêu đề</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Slogan</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Mô tả</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Hình ảnh</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Trang</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Vị trí</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Hành động
              </Table.Cell>
            </Table.Row>
          </Table.Foot>
        </Table>
      </Flex>
    </>
  )
}

export default Content
