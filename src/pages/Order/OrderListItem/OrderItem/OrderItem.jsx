import { Note, Plus, ShoppingCart } from '@phosphor-icons/react'
import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  List,
  Modal,
  Radio,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import React, { useContext, useState } from 'react'
import { QuantityItem } from '~/components'
import { CartContext } from '~/contexts/CartContext'

const OrderItem = ({ image, title, price, description }) => {
  const { addCartItem } = useContext(CartContext)
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [optionList, setOptionList] = useState([
    {
      title: 'Ngũ vị tân',
      selected: 'no'
    },
    {
      title: 'Dụng cụ ăn',
      selected: 'no'
    },
    {
      title: 'Gia vị',
      selected: 'no'
    }
  ])
  const [notes, setNotes] = useState('')
  const [quantity, setQuantity] = useState(1)
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity)
  }
  const handleSendItem = () => {
    const item = {
      image,
      title,
      price,
      description,
      quantity,
      notes,
      optionList
    }
    addCartItem(item)
    toast({
      element: (
        <Alert variant='success' ff={'BalihoScript'}>
          <Alert.Title fs={'md'} ff={'Geomanist'}>
            Đã thêm món vào giỏ hàng thành công
          </Alert.Title>
        </Alert>
      )
    })
    setOpen(false)
  }
  const handleOrder = () => {
    if (
      sessionStorage.getItem('login') === 'true' ||
      localStorage.getItem('login') === 'true'
    ) {
      handleSendItem()
    } else {
      setOpen(false)
      toast({
        element: (
          <Alert variant='warning' ff={'BalihoScript'}>
            <Alert.Title fs={'md'} ff={'Geomanist'}>
              Bạn cần đăng nhập để thêm vào giỏ hàng
            </Alert.Title>
          </Alert>
        )
      })
    }
  }
  return (
    <>
      <Modal
        h={'90vh'}
        open={open}
        onClose={() => setOpen(false)}
        closable
        ff={'BalihoScript'}
        of={'auto'}
      >
        <Modal.Header>
          <Text fw='bold' fs='lg' ff={'GeomanistMedium'}>
            Thêm món mới
          </Text>
        </Modal.Header>
        <Image
          w={fr(90)}
          h={fr(90)}
          br={'lg'}
          bsh={'md'}
          src={image}
          alt={title}
          mx={'auto'}
        />
        <Text fs={'2xl'}>{title}</Text>
        <Text fs={'lg'} h={fr(20)}>
          {description}
        </Text>
        <Flex justify='between' align='center' fs={'lg'} mb={fr(2)}>
          <Text>{price}</Text>
          <QuantityItem onQuantityChange={handleQuantityChange} />
        </Flex>
        <TextField
          placeholder='Ghi chú thêm cho món này'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          icon={<Note />}
        />
        <Box
          w={'100%'}
          bg={['base', 100]}
          fs={'md'}
          py={fr(2)}
          mt={fr(2)}
          br={'lg'}
        >
          <Text ml={fr(4)}>Tuỳ chọn</Text>
        </Box>
        <List p={fr(2)}>
          {optionList.map((option, index) => (
            <List.Item key={index} my={fr(2)} justify='between'>
              <Text fs={'lg'}>{option.title}</Text>
              <Radio.Group
                name='answer'
                value={option.selected}
                onChange={(e) =>
                  setOptionList(
                    optionList.map((item, i) => {
                      if (i === index) {
                        return { ...item, selected: e.target.value }
                      }
                      return item
                    })
                  )
                }
              >
                <Radio value='no' label='Không' />
                <Radio value='yes' label='Có' />
              </Radio.Group>
            </List.Item>
          ))}
          <Divider />
        </List>
        <Button
          full
          shadow
          icon={<ShoppingCart weight='bold' />}
          size='lg'
          br={'full'}
          ff={'GeomanistMedium'}
          onClick={handleOrder}
        >
          {price} đ - Thêm vào giỏ hàng
        </Button>
      </Modal>
      <Flex
        direction='column'
        ta={'left'}
        w={fr(44)}
        h={fr(70)}
        bsh={'md'}
        br={'xl'}
        p={fr(2)}
        bg={['sepia', 50]}
      >
        <Image
          src={image}
          alt={title}
          h={fr(42)}
          w={fr(42)}
          pl={fr(1)}
          br={'xl'}
        />
        <Text fs={'md'} my={fr(2)} h={fr(16)}>
          {title}
        </Text>
        <Flex align='center' justify='between' w={'100%'}>
          <Text>{price} đ</Text>
          <Button
            icon={<Plus weight='bold' />}
            br={'full'}
            onClick={() => {
              setOpen(!open)
            }}
          ></Button>
        </Flex>
      </Flex>
    </>
  )
}

export default OrderItem
