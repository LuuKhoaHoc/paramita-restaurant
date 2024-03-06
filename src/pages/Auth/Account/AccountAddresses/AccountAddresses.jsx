import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Flex,
  Form,
  Icon,
  Modal,
  Stack,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { Pen, X } from '@phosphor-icons/react'
import { useResponsive } from '~/utils/responsive'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useForm } from '@prismane/core/hooks'
import p from '~/utils/zodToPrismane'
import separateAddressParts from '~/utils/separateAddressParts'
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

const AccountAddresses = ({ customer }) => {
  // Create Address
  const [addAddress, { loading, error, data }] = useMutation(CREATE_ADDRESS)
  if (loading) return <Loading />
  if (error) return <p>Error : {error.message}</p>
  // Update Address
  const [
    updateAddress,
    { loading: loadingUpdate, error: errorUpdate, data: dataUpdate }
  ] = useMutation(UPDATE_ADDRESS)
  if (loadingUpdate) return <Loading />
  if (errorUpdate) return <p>Error : {errorUpdate.message}</p>
  // responsive
  const { isTablet, isMobile } = useResponsive()
  // toast
  const toast = useToast()
  // modal
  const [open, setOpen] = useState(false)
  // check update or create
  const [checkModal, setCheckModal] = useState('create')
  // set address data
  const [addresses, setAddresses] = useState([])
  // set address update
  const [addressUpdate, setAddressUpdate] = useState({})
  // slipt address to 3 part
  const { address, district, city } = separateAddressParts(
    addressUpdate?.address
  )
  useEffect(() => {
    if (addressUpdate) {
      setValue('address', address || '')
      setValue('district', district || '')
      setValue('city', city || '')
    }
  }, [addressUpdate])
  // set address after had customer
  useEffect(() => {
    setAddresses(customer?.address)
  }, [customer])

  // set validation field
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
      {/*  Modal */}
      <Modal
        w={isMobile ? '80vw' : '40vw'}
        open={open}
        onClose={() => setOpen(false)}
        closable
      >
        <Modal.Header className='GeomanistMedium-font'>
          <Text fs={'2xl'} ta={'center'}>
            {checkModal === 'create' ? 'Thêm' : 'Sửa'} địa chỉ
          </Text>
        </Modal.Header>
        <Form>
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
              {checkModal === 'create' ? 'Thêm' : 'Sửa'}
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
                setCheckModal('create')
                setAddressUpdate('')
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
                    onClick={() => {
                      setCheckModal('update')
                      setAddressUpdate(item)
                      setOpen(!open)
                    }}
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
