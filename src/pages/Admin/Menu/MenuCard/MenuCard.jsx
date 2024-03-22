import { PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { ActionButton, Card, Flex, Image, Text, fr } from '@prismane/core'

const MenuCard = ({ data }) => {
  return (
    <Card w={'calc(20% - 48px)'}>
      <Card.Header justify='center'>
        <Image
          src='https://picsum.photos/200'
          alt=''
          br={'xl'}
          w={'100%'}
          h={'100%'}
        />
      </Card.Header>
      <Flex direction='column' fs={'md'}>
        <Text className='GeomanistMedium-font'>Bún Huế Paramita</Text>
        <Text className='GeomanistMedium-font'>80.000đ</Text>
        <Text className='GeomanistMedium-font'>Danh mục: Bữa sáng</Text>
      </Flex>
      <Card.Footer align='center' justify='center' gap={fr(4)}>
        <ActionButton icon={<PencilSimpleLine />} fillOnHover />
        <ActionButton icon={<Trash />} color='ruby' fillOnHover />
      </Card.Footer>
    </Card>
  )
}

export default MenuCard
