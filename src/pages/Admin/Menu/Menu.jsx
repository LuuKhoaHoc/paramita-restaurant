import { DotsThree, Plus } from '@phosphor-icons/react'
import { Button, Flex, Stack, Text, TextField, fr } from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import MenuCard from '~/pages/Admin/Menu/MenuCard/MenuCard'
import AddMenu from '~/pages/Admin/Menu/AddMenu/AddMenu'
import { GET_MENU } from '~/pages/Admin/Menu/schema'
import { useQuery } from '@apollo/client'

const Menu = () => {
  const { loading, error, data, refetch } = useQuery(GET_MENU)
  const { query, setQuery, filtered } = useSearch(data?.menuList || [])
  const [openAddModal, setOpenAddModal] = useState(false)
  return (
    <>
      <AddMenu
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        refetch={refetch}
      />
      <Flex direction='column'>
        <Flex justify='between' align='center' mx={fr(4)} my={fr(4)}>
          <Text className='GeomanistMedium-font' fs={'xl'}>
            Tất cả thực dơn
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
              icon={<Plus weight='bold' />}
              bsh={'sm'}
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Thêm món
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
          {filtered.map((menu) => (
            <MenuCard key={menu?.item_id} menu={menu} refetch={refetch} />
          ))}
        </Stack>
      </Flex>
    </>
  )
}

export default Menu
