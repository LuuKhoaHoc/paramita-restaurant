import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { ActionButton, Card, Flex, Image, Text, fr } from '@prismane/core'
import MenuDetailModal from '~/pages/Admin/Menu/MenuCard/MenuDetailModal/MenuDetailModal'
import EditMenuModal from '~/pages/Admin/Menu/MenuCard/EditMenuModal/EditMenuModal'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_MENU } from '~/pages/Admin/Menu/schema'

const MenuCard = ({ menu, refetch }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [deleteMenu] = useMutation(DELETE_MENU)
  const handleDeleteItem = () => {
    deleteMenu({
      variables: {
        id: menu?.item_id
      },
      onError: (error) => {
        console.log(error)
      }
    }).then(() => {
      refetch()
    })
  }
  return (
    <>
      <EditMenuModal
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        menu={menu}
        refetch={refetch}
      />
      <MenuDetailModal
        menu={menu}
        open={openDetailModal}
        setOpen={setOpenDetailModal}
      />
      <Card w={'calc(20% - 48px)'}>
        <Card.Header justify='center'>
          <Image
            src='https://picsum.photos/200'
            alt=''
            br={'xl'}
            w={'100%'}
            h={fr(50)}
            fit='cover'
          />
        </Card.Header>
        <Text className='GeomanistMedium-font' ta={'center'} fs={'lg'}>
          {menu?.name}
        </Text>
        <Card.Footer align='center' justify='center' gap={fr(4)}>
          <ActionButton
            icon={<Eye />}
            fillOnHover
            onClick={() => setOpenDetailModal(true)}
          />
          <ActionButton
            icon={<PencilSimpleLine />}
            color='blue'
            fillOnHover
            onClick={() => setOpenEditModal(true)}
          />
          <ActionButton
            icon={<Trash />}
            color='ruby'
            fillOnHover
            onClick={() => handleDeleteItem()}
          />
        </Card.Footer>
      </Card>
    </>
  )
}

export default MenuCard
