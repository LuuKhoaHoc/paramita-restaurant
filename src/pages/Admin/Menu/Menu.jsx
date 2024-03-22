import { DotsThree, PencilSimpleLine, Plus, Trash } from '@phosphor-icons/react'
import {
  ActionButton,
  Button,
  Card,
  Flex,
  Image,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useSearch } from '@prismane/core/hooks'
import { useState } from 'react'
import MenuCard from '~/pages/Admin/Menu/MenuCard/MenuCard'
import AddMenu from '~/pages/Admin/Menu/AddMenu/AddMenu'

const Menu = () => {
  const { query, setQuery, filtered } = useSearch([])
  const [openAddModal, setOpenAddModal] = useState(false)
  return (
    <>
      <AddMenu openModal={openAddModal} setOpenModal={setOpenAddModal} />
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
          <MenuCard />
        </Stack>
      </Flex>
    </>
  )
}

export default Menu
