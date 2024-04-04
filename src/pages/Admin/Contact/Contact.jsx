import {
  Button,
  Flex,
  Skeleton,
  Table,
  Text,
  TextField,
  fr
} from '@prismane/core'
import ContactRow from '~/pages/Admin/Contact/ContactRow/ContactRow'
import { useQuery } from '@apollo/client'

import { GET_CONTACTS } from '~/pages/Admin/Contact/schema'
import { DotsThree } from '@phosphor-icons/react'
import { useSearch } from '@prismane/core/hooks'

const Contact = ({ employee }) => {
  const { loading, error, data, refetch } = useQuery(GET_CONTACTS)
  const { query, setQuery, filtered } = useSearch(data?.contactList || [])
  if (loading) return <Skeleton w={'100%'} h={'100vh'} mih={200} />

  return (
    <>
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả liên hệ
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
              <Table.Cell className='GeomanistMedium-font'>
                Khách hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Email</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Thời gian tạo
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Hành động
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filtered?.map((contact) => (
              <ContactRow
                key={contact.contact_id}
                contact={contact}
                refetch={refetch}
                employee={employee}
              />
            ))}
          </Table.Body>
          <Table.Foot ta={'center'}>
            <Table.Row fs={'md'}>
              <Table.Cell className='GeomanistMedium-font'>ID</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Khách hàng
              </Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>Email</Table.Cell>
              <Table.Cell className='GeomanistMedium-font'>
                Thời gian tạo
              </Table.Cell>
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

export default Contact
