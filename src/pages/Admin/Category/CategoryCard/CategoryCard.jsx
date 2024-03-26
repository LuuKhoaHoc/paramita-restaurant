import { Eye, Pen, Trash } from '@phosphor-icons/react'
import {
  ActionButton,
  Card,
  Collapse,
  Flex,
  Image,
  Text,
  fr
} from '@prismane/core'
import { useState } from 'react'
import { LogoIcon } from '~/images'

const CategoryCard = ({ category }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
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
          w={fr(12)}
          h={fr(12)}
          bg={'primary'}
          br={'full'}
          p={fr(2)}
        />
        <Text fs={'xl'}>{category?.name}</Text>
        <Flex ml={'auto'} gap={fr(4)}>
          <ActionButton
            icon={<Eye />}
            fillOnHover
            color='primary'
            onClick={() => {
              setOpen(!open)
            }}
          />
          <ActionButton icon={<Pen />} fillOnHover color='diamond' />
          <ActionButton icon={<Trash />} fillOnHover color='ruby' />
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
              <Image src={menu?.image} alt='image' w={fr(10)} h={fr(10)} />
              <Text>{menu?.name}</Text>
            </Card>
          ))}
        </Flex>
      </Collapse>
    </>
  )
}

export default CategoryCard
