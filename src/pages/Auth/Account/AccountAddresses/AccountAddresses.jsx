import React, { useEffect, useState } from 'react'
import {
  Button,
  Flex,
  Form,
  Icon,
  Modal,
  Stack,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { Pen, X } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useForm } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import { z } from 'zod'
import { Loading } from '~/components'

const CREATE_ADDRESS = gql`
  mutation createAddress($data: CustomerAddressInput!) {
    createCustomerAddress(data: $data) {
      address_id
      address
    }
  }
`
const UPDATE_ADDRESS = gql`
  mutation updateAddress($id: Int!, $data: CustomerAddressInput!) {
    updateCustomerAddress(id: $id, data: $data) {
      address_id
      address
    }
  }
`

function updateAddress(address) {
  const { address_id, address } = address
  return {
    address_id,
    address
  }
}

const AccountAddresses = ({ customer }) => {
  const { isTablet, isMobile } = useResponsive()
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [addresses, setAddresses] = useState([])
  useEffect(() => {
    setAddresses(customer?.address)
  }, [customer])
  // Create Address
  const [addAddress, { loading, error, data }] = useMutation(CREATE_ADDRESS)
  if (loading) return <Loading />
  if (error) return <p>Error : {error.message}</p>
  // Update Address
  const [
    updateAddress,
    { loading: loadingUpdate, error: errorUpdate, data: dataUpdate }
  ] = useMutation(UPDATE_ADDRESS)
  if (loading) return <Loading />
  if (error) return <p>Error : {error.message}</p>
  const { register, handleSubmit, setValue } = useForm({
    fields: {
      address: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
        }
      },
      district: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
        }
      },
      city: {
        value: '',
        validators: {
          required: (v) =>
            p(
              v,
              z.string().trim().min(1, { message: 'Không được để trống ô này' })
            )
        }
      }
    }
  })

  return (
    <>
      {/* add address Modal */}
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
        <Form
          onSubmit={(SubmitEvent) => {
            handleSubmit(SubmitEvent, async (value) => {
              const { address, district, city } = value
              const addressData = `${address}, ${district}, ${city}`
              const { data: dataAddress } = await addAddress({
                variables: {
                  data: {
                    customerId: customer?.customer_id,
                    address: addressData
                  }
                }
              })
              setAddresses([...addresses, dataAddress?.createCustomerAddress])
              setOpen(false)
            })
          }}
        >
          <Flex
            direction='column'
            justify='around'
            sx={{
              '.PrismaneTextField-label': {
                fontSize: fr(4)
              }
            }}
          >
            <TextField
              {...register('address')}
              w={'100%'}
              label='Địa chỉ'
              placeholder='Điền địa chỉ'
            />
            <TextField
              {...register('district')}
              w={'100%'}
              label='Quận huyện'
              placeholder='Điền quận huyện'
            />
            <TextField
              {...register('city')}
              w={'100%'}
              label='Tỉnh thành'
              placeholder='Điền tỉnh thành'
            />
          </Flex>
          <Modal.Footer justify='end'>
            <Button size='lg' br={'full'} className='GeomanistMedium-font'>
              Thêm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* update address Modal */}
      <Modal
        w={isMobile ? '80vw' : '40vw'}
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        closable
      >
        <Modal.Header className='GeomanistMedium-font'>
          <Text fs={'2xl'} ta={'center'}>
            Sửa địa chỉ
          </Text>
        </Modal.Header>
        <Form
          onSubmit={(SubmitEvent) => {
            handleSubmit(SubmitEvent, async (value) => {
              const { address, district, city } = value
              const addressData = `${address}, ${district}, ${city}`
              const { data: dataAddress } = await updateAddress({
                variables: {
                  data: {
                    customerId: customer?.customer_id,
                    address: addressData
                  }
                }
              })
              setAddresses([...addresses, dataAddress?.createCustomerAddress])
              setOpen(false)
            })
          }}
        >
          <Flex
            direction='column'
            justify='around'
            sx={{
              '.PrismaneTextField-label': {
                fontSize: fr(4)
              }
            }}
          >
            <TextField
              {...register('address')}
              w={'100%'}
              label='Địa chỉ'
              placeholder='Điền địa chỉ'
            />
            <TextField
              {...register('district')}
              w={'100%'}
              label='Quận huyện'
              placeholder='Điền quận huyện'
            />
            <TextField
              {...register('city')}
              w={'100%'}
              label='Tỉnh thành'
              placeholder='Điền tỉnh thành'
            />
          </Flex>
          <Modal.Footer justify='end'>
            <Button size='lg' br={'full'} className='GeomanistMedium-font'>
              Sửa
            </Button>
          </Modal.Footer>
        </Form>
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
          <Flex direction='column'>
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
