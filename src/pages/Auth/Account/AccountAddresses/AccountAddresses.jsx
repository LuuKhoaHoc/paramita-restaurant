import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { Pen, X } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { gql, useQuery } from '@apollo/client'

const CREATE_ADDRESS = gql`
  mutation createAddress($data: AddressInput!) {
    createAddress(data: $data) {
      address_id
      address
    }
  }
`

function createAddress(address) {
  const { loading, error, data } = useQuery(CREATE_ADDRESS, {
    variables: {
      address
    }
  })
  if (loading) return <Loading />
  if (error) return <p>Error : {error.message}</p>
  return data
}

const AccountAddresses = ({ customer }) => {
  const { isTablet, isMobile } = useResponsive()
  const [open, setOpen] = useState(false)
  const [addresses, setAddresses] = useState([])
  useEffect(() => {
    setAddresses(customer?.address)
  }, [customer])

  return (
    <>
      <Modal
        w={isMobile ? '80vw' : '40vw'}
        open={open}
        onClose={() => setOpen(false)}
        closable
      >
        <Modal.Header className='GeomanistMedium-font'>
          <Text fs={'2xl'} ta={'center'}>
            Thêm địa chỉ
          </Text>
        </Modal.Header>
        <Flex
          direction='column'
          justify='around'
          sx={{
            '.PrismaneTextField-label': {
              fontSize: fr(4)
            }
          }}
        >
          <TextField w={'100%'} label='Địa chỉ' placeholder='Điền địa chỉ' />
          <TextField
            w={'100%'}
            label='Quận huyện'
            placeholder='Điền quận huyện'
          />
          <TextField
            w={'100%'}
            label='Tỉnh thành'
            placeholder='Điền tỉnh thành'
          />
        </Flex>
        <Modal.Footer>
          <Button
            size='lg'
            br={'full'}
            className='GeomanistMedium-font'
            onClick={() => setOpen(false)}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
      <Flex direction='column' grow pos={'relative'} m={fr(10)}>
        <Text
          pos={['relative', { ':before': 'absolute' }]}
          fs={isMobile ? '2xl' : '4xl'}
          sx={{
            '&::before': {
              content: '',
              width: '25%',
              height: '2px',
              borderRadius: '2px',
              backgroundColor: '#39b54a',
              bottom: '0px',
              left: 0
            }
          }}
        >
          Sổ địa chỉ
        </Text>
        <Stack gap={fr(10)}>
          <Flex pos={'relative'} justify='between'>
            <Text fs={isMobile ? 'lg' : 'xl'}>Địa chỉ giao hàng</Text>
            <Text
              fs={'md'}
              cs={'pointer'}
              cl={['inherit', { hover: 'primary' }]}
              onClick={() => {
                setOpen(!open)
              }}
            >
              Thêm
            </Text>
          </Flex>
          <Flex>
            {addresses?.map((item, index) => (
              <Flex key={index} w={'100%'}>
                <Text tt={'capitalize'} fs={'lg'}>
                  {item.address}
                </Text>
                <Flex ml={'auto'} gap={fr(5)}>
                  <Icon
                    cs={'pointer'}
                    size={fr(6)}
                    cl={['inherit', { hover: 'blue' }]}
                    onClick={() => {}}
                  >
                    <Pen weight='bold' />
                  </Icon>
                  <Icon
                    cs={'pointer'}
                    size={fr(6)}
                    cl={['inherit', { hover: 'red' }]}
                    onClick={() => {}}
                  >
                    <X weight='bold' />
                  </Icon>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Stack>
      </Flex>
    </>
  )
}

export default AccountAddresses
