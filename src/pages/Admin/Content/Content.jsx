import {
  ActionButton,
  Button,
  Flex,
  NativeSelectField,
  Skeleton,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import ContentRow from '~/pages/Admin/Content/ContentRow/ContentRow'
import { useQuery } from '@apollo/client'

import { GET_CONTENTS } from '~/pages/Admin/Content/schema'
import { CaretDown, DotsThree } from '@phosphor-icons/react'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'

const Content = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, error, data } = useQuery(GET_CONTENTS)
  let numOfPages = Math.ceil(data?.contentList?.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const selectedItems = data?.contentList?.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const { query, setQuery, filtered } = useSearch(data?.contentList || [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />
  return (
    <>
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả nội dung
          </Text>
          <Flex align='center' gap={fr(2)}>
            <NativeSelectField
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              options={[
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 30, label: '30' },
                { value: 50, label: '50' }
              ]}
            />
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
        <Flex justify='center' align='center' gap={fr(4)}>
          {[...Array(numOfPages)].map((_, index) => (
            <Button
              variant='tertiary'
              fillOnHover
              br={'full'}
              key={index}
              onClick={() => {
                scrollToTop()
                setCurrentPage(index + 1)
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Flex>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(2)}>
          <Text
            fs={'md'}
            className='GeomanistMedium-font'
          >{`Trang ${currentPage} / ${numOfPages}`}</Text>
          <ActionButton
            variant='tertiary'
            br={'full'}
            fillOnHover
            icon={<CaretDown />}
            onClick={() => scrollToBottom()}
          />
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
            {query
              ? filtered.map((content) => (
                  <ContentRow key={content.content_id} content={content} />
                ))
              : selectedItems.map((content) => (
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
        <Flex justify='center' gap={fr(4)} my={fr(4)}>
          {[...Array(numOfPages)].map((_, index) => (
            <Button
              variant='tertiary'
              fillOnHover
              br={'full'}
              key={index}
              onClick={() => {
                scrollToTop()
                setCurrentPage(index + 1)
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Flex>
        <Text
          fs={'md'}
          className='GeomanistMedium-font'
        >{`Trang ${currentPage} / ${numOfPages}`}</Text>
      </Flex>
    </>
  )
}

export default Content
