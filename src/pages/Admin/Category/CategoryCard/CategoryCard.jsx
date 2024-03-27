import { BowlFood, Eye, Pen, Trash } from '@phosphor-icons/react'
import {
  ActionButton,
  Alert,
  Card,
  Collapse,
  Flex,
  Icon,
  Image,
  Text,
  fr,
  useToast
} from '@prismane/core'
import { useState } from 'react'
import { LogoIcon } from '~/images'
import { useMutation } from '@apollo/client'
import { DELETE_CATEGORY } from '~/pages/Admin/Category/schema'
import EditCategoryModal from '~/pages/Admin/Category/CategoryCard/EditCategoryModal/EditCategoryModal'

const CategoryCard = ({ category, refetch }) => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const toast = useToast()
  const [deleteCategory] = useMutation(DELETE_CATEGORY)
  const handleDeleteCategory = async () => {
    await deleteCategory({
      variables: {
        id: category?.category_id
      },
      onCompleted: () => {
        refetch()
        toast({
          element: (
            <Alert variant='error'>
              <Alert.Title className='GeomanistMedium-font'>
                Xoá danh mục thành công
              </Alert.Title>
            </Alert>
          )
        })
      }
    })
  }
  return (
    <>
      <EditCategoryModal
        open={openEdit}
        setOpen={setOpenEdit}
        category={category}
        refetch={refetch}
      />
      <Card
        direction='row'
        w={'100%'}
        bsh={'md'}
        p={fr(4)}
        align='center'
        gap={fr(4)}
      >
        <Image
          src={LogoIcon}
          w={fr(10)}
          h={fr(10)}
          bg={'primary'}
          br={'full'}
          p={fr(1)}
        />
        <Text fs={'lg'} className='GeomanistMedium-font'>
          {category?.name}
        </Text>
        <Flex ml={'auto'} gap={fr(4)}>
          <ActionButton
            icon={<Eye />}
            fillOnHover
            color='primary'
            onClick={() => {
              setOpen(!open)
            }}
          />
          <ActionButton
            icon={<Pen />}
            fillOnHover
            color='diamond'
            onClick={() => setOpenEdit(true)}
          />
          <ActionButton
            icon={<Trash />}
            fillOnHover
            color='ruby'
            onClick={() => handleDeleteCategory()}
          />
        </Flex>
      </Card>
      <Collapse open={open} w={'inherit'}>
        <Flex gap={fr(4)} wrap='wrap'>
          {category?.menu.map((menu) => (
            <Card
              key={menu?.item_id}
              direction='row'
              align='center'
              gap={fr(4)}
            >
              <Icon>
                <BowlFood />
              </Icon>
              <Text>{menu?.name}</Text>
            </Card>
          ))}
        </Flex>
      </Collapse>
    </>
  )
}

export default CategoryCard
