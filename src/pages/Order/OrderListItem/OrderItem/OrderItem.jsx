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
import { useResponsive } from '~/utils/responsive'
import { AuthContext } from '~/contexts/AuthContext'

const OrderItem = ({ image, title, price, description }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const { isMobile, isTablet } = useResponsive()
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
      optionList
    }
    addCartItem(item)
    toast({
      element: (
        <Alert variant='success'>
          <Alert.Title
            fs={isMobile ? 'sm' : 'md'}
            className='GeomanistMedium-font'
          >
            Đã thêm món vào giỏ hàng thành công
          </Alert.Title>
        </Alert>
      )
    })
    setOpen(false)
  }
  const handleOrder = () => {
    if (
      localStorage.getItem('token') &&
      (isLoggedIn || localStorage.getItem('login') === 'true')
    ) {
      handleSendItem()
    } else {
      setOpen(false)
      toast({
        element: (
          <Alert variant='warning'>
            <Alert.Title fs={'md'} className='GeomanistMedium-font'>
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
        w={isMobile ? '40vh' : '50vh'}
        h={isTablet ? '80vh' : isMobile ? '80vh' : '90vh'}
        open={open}
        onClose={() => setOpen(false)}
        closable
        of={'auto'}
        cl={(theme) => (theme.mode === 'dark' ? 'white' : 'black')}
      >
        <Modal.Header>
          <Text fw='bold' fs='lg' className='GeomanistMedium-font'>
            Thêm món mới
          </Text>
        </Modal.Header>
        <Image
          w={isTablet ? fr(60) : isMobile ? fr(40) : fr(90)}
          h={isTablet ? fr(60) : isMobile ? fr(40) : fr(90)}
          br={'lg'}
          bsh={'md'}
          src={image}
          alt={title}
          mx={'auto'}
        />
        <Text fs={isTablet ? 'xl' : isMobile ? 'lg' : '2xl'}>{title}</Text>
        <Text fs={isTablet ? 'md' : isMobile ? 'base' : 'lg'}>
          {description}
          {/* {description} */}
        </Text>
        <Flex justify='between' align='center' fs={'lg'} mb={fr(2)}>
          <Text>{price.toLocaleString('vi-VN')}đ</Text>
          <QuantityItem onQuantityChange={handleQuantityChange} />
        </Flex>
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
              <Text fs={isTablet ? 'md' : isMobile ? 'base' : 'lg'}>
                {option.title}
              </Text>
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
          size={isMobile ? 'md' : 'lg'}
          br={'full'}
          className='GeomanistMedium-font'
          onClick={handleOrder}
        >
          {price.toLocaleString('vi-VN')}đ - Thêm vào giỏ hàng
        </Button>
      </Modal>
      <Flex
        direction='column'
        ta={'left'}
        w={isMobile ? fr(34) : fr(44)}
        h={isMobile ? fr(60) : fr(70)}
        bsh={'md'}
        br={'xl'}
        p={fr(2)}
        bg={(theme) => (theme.mode === 'dark' ? '#1f2937' : ['sepia', 50])}
      >
        <Image
          src={image}
          alt={title}
          w={'90%'}
          h={'90%'}
          pl={fr(1)}
          mx={'auto'}
          br={'xl'}
        />
        <Text fs={'md'} my={fr(2)} h={fr(16)}>
          {title}
        </Text>
        <Flex align='center' justify='between' w={'100%'}>
          <Text>{price.toLocaleString('vi-VN')}đ</Text>
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
