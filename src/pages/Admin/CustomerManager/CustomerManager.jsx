import { useQuery } from '@apollo/client'
import { DotsThree, UserPlus } from '@phosphor-icons/react'
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
import CustomerCard from '~/pages/Admin/CustomerManager/CustomerCard/CustomerCard'

import { GET_CUSTOMERS } from '~/pages/Admin/CustomerManager/schema'

const CustomerManager = ({ customer }) => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const { loading, error, data } = useQuery(GET_CUSTOMERS)
  const { query, setQuery, filtered } = useSearch(data?.customerList || [])
  return (
    <>
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả khách hàng
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
              icon={<UserPlus weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm khách hàng
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

        <Stack direction='row' wrap='wrap' gap={fr(3)} px={fr(4)}>
          {filtered?.map((customer, index) => (
            <CustomerCard key={customer?.tsid || index} customer={customer} />
          ))}
        </Stack>
      </Flex>
    </>
  )
}
export default CustomerManager
