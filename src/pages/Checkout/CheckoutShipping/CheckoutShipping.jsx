import {
  CheckCircle,
  ClockCounterClockwise,
  PushPin
} from '@phosphor-icons/react'
import {
  Box,
  Button,
  Center,
  Flex,
  Form,
  List,
  Text,
  TextField,
  fr
} from '@prismane/core'
import { useForm, useSearch } from '@prismane/core/hooks'
import React, { useEffect } from 'react'
import { useResponsive } from '~/utils/responsive'

const CheckoutShipping = ({ customer }) => {
  const { isTablet, isMobile } = useResponsive()
  const checkoutInformation = JSON.parse(
    sessionStorage.getItem('checkout-information')
  )
  const { handleSubmit, handleReset, register } = useForm({
    fields: {
      address: {
        value: ''
      },
      district: {
        value: ''
      },
      province: {
        value: ''
      }
    }
  })
  // address history
  const addressHistory =
    JSON.parse(localStorage.getItem('address-history')) || []
  // useSearch hook
  const { query, setQuery, filtered } = useSearch(addressHistory)
  // Check information from the previous session
  useEffect(() => {
    if (checkoutInformation.address) {
      setQuery(checkoutInformation.address)
    }
  }, [])
  const addAddress = (newAddress) => {
    addressHistory.push(newAddress)
    localStorage.setItem('address-history', JSON.stringify(addressHistory))
  }
  const accountAddress = customer?.address.map((item) => {
    return item.address
  })
  const handleSetAddress = (v) => {
    checkoutInformation.address = v
    sessionStorage.setItem(
      'checkout-information',
      JSON.stringify(checkoutInformation)
    )
  }
  const handleSetInput = (e) => {
    setQuery(e.target.innerText)
    handleSetAddress(e.target.innerText)
  }
  const handleSetInputByForm = (value) => {
    const { address, district, province } = value
    if (!address || !district || !province) return
    const valueString = `${address}, ${district}, ${province}`
    setQuery(valueString)
    addAddress(valueString)
    handleSetAddress(valueString)
    handleReset()
  }
  function hasTwoCommas(text) {
    var count = (text.match(/,/g) || []).length
    return count >= 2
  }

  return (
    <>
      <Center w={'100%'} h={'fit-content'} my={fr(4)}>
        <Flex direction='column' gap={fr(4)}>
          <TextField
            className='GeomanistMedium-font'
            variant='underlined'
            placeholder='Search...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<CheckCircle color={hasTwoCommas(query) ? '#39b54a' : ''} />}
          />
          <List mah={fr(35)} of={'auto'}>
            {accountAddress?.map((item, index) => (
              <List.Item
                key={index}
                cl={(theme) => (theme.mode === 'dark' ? 'white' : 'black')}
                onClick={handleSetInput}
                bg={['transparent', { hover: ['base', 100] }]}
                br={'md'}
                cs={'pointer'}
              >
                <Button variant='text' cl={'secondary'} icon={<PushPin />}>
                  <Text>{item}</Text>
                </Button>
              </List.Item>
            ))}
            {filtered.map((item, index) => (
              <List.Item
                key={index}
                onClick={handleSetInput}
                bg={['transparent', { hover: ['base', 100] }]}
                br={'md'}
                cs={'pointer'}
              >
                <Button variant='text' icon={<ClockCounterClockwise />}>
                  <Text>{item}</Text>
                </Button>
              </List.Item>
            ))}
          </List>
        </Flex>
      </Center>
      <Box mx={fr(4)}>
        <Text className='GeomanistMedium-font' fs={isTablet ? 'md' : 'xl'}>
          Địa chỉ khác
        </Text>
        <Form
          my={fr(2)}
          mx={fr(2)}
          onSubmit={(e) => {
            handleSubmit(e, (v) => handleSetInputByForm(v))
          }}
          onReset={() => handleReset()}
        >
          <TextField
            size={isTablet ? 'xs' : 'md'}
            className='GeomanistMedium-font'
            variant='underlined'
            label='Địa chỉ'
            placeholder='Nhập địa chỉ'
            {...register('address')}
          />
          <TextField
            size={isTablet ? 'xs' : 'md'}
            className='GeomanistMedium-font'
            variant='underlined'
            label='Quận huyện'
            placeholder='Nhập quận huyện'
            {...register('district')}
          />
          <TextField
            size={isTablet ? 'xs' : 'md'}
            className='GeomanistMedium-font'
            variant='underlined'
            label='Tỉnh Thành'
            placeholder='Nhập tỉnh thành'
            {...register('province')}
          />
          <Flex gap={fr(2)}>
            <Button br={'full'} variant='tertiary' type='submit'>
              <Text
                className='GeomanistMedium-font'
                fs={isTablet ? 'sm' : 'base'}
              >
                Thêm địa chỉ
              </Text>
            </Button>
            <Button br={'full'} color='red' variant='tertiary' type='reset'>
              <Text
                className='GeomanistMedium-font'
                fs={isTablet ? 'sm' : 'base'}
              >
                Xoá
              </Text>
            </Button>
          </Flex>
        </Form>
      </Box>
    </>
  )
}

export default CheckoutShipping
