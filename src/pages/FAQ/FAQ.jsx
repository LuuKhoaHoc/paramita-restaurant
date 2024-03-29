import { Plus } from '@phosphor-icons/react'
import {
  Accordion,
  Box,
  Flex,
  Grid,
  Text,
  Transition,
  fr
} from '@prismane/core'
import React from 'react'
import { useResponsive } from '~/utils/responsive'
const AccordionItem = ({ value, control, panel }) => {
  return (
    <Accordion.Item value={value}>
      <Accordion.Control>
        {control}
        <Accordion.Icon>
          {(active) => (
            <Transition
              as={Plus}
              style={{
                transform: active ? 'rotate(135deg)' : 'rotate(0deg)'
              }}
            />
          )}
        </Accordion.Icon>
      </Accordion.Control>
      <Accordion.Panel cl={'primary'}>{panel}</Accordion.Panel>
    </Accordion.Item>
  )
}

const FAQ = () => {
  const { isLaptop, isMobile, isTablet } = useResponsive()
  return (
    <>
      <Box h={fr(22.5)} bg='#371b04' />
      <Grid templateColumns={12}>
        <Grid.Item
          columnStart={isTablet ? 2 : isMobile ? 1 : 4}
          columnEnd={isTablet ? 12 : isMobile ? 13 : 10}
        >
          <Flex
            w={isMobile ? '90%' : '100%'}
            gap={fr(5)}
            my={fr(5)}
            mx={isMobile ? fr(4) : fr(0)}
            direction='column'
          >
            <Text
              as={'h1'}
              fs={isMobile ? 'xl' : '3xl'}
              ff={'GeomanistBold'}
              ta={'center'}
              tt={'uppercase'}
            >
              FAQ
            </Text>
            <Accordion defaultValue='first' fs={isMobile ? 'md' : 'xl'}>
              <AccordionItem
                value={'first'}
                control={'Nhà hàng có những giờ hoạt động nào trong ngày?'}
                panel={
                  'Nhà hàng Paramita phục vụ quý khách từ 6h30 sáng đến 22h30 tối hằng ngày.'
                }
              />
              <AccordionItem
                value={'second'}
                control={'Tôi có thể đặt bàn/đặt món trước online được không?'}
                panel={
                  'Nhà hàng Paramita phục vụ quý khách từ 6h30 sáng đến 22h30 tối hằng ngày.'
                }
              />
              <AccordionItem
                value={'third'}
                control={'Tôi có thể đổi hoặc hủy đơn hàng được không?'}
                panel={
                  'Quý khách có thể đổi hoặc hủy đơn hàng trước khi nhà hàng thực hiện đơn hàng.'
                }
              />
              <AccordionItem
                value={'fourth'}
                control={'Nhà hàng có giao hàng tận nơi không?'}
                panel={
                  'Không, nhưng Paramita có hỗ trợ giao hàng qua các app như ShopeeFood, Now, Be,...'
                }
              />
              <AccordionItem
                value={'fifth'}
                control={'Tôi có thể thanh toán bằng hình thức nào?'}
                panel={
                  'Quý khách có thể thanh toán bằng tiền mặt hoặc qua thẻ/ví điện tử.'
                }
              />
              <AccordionItem
                value={'sixth'}
                control={'Nhà hàng có bán đồ uống có cồn không?'}
                panel={
                  'Không, Paramita là nhà hàng chay 100% nên không phục vụ bất kỳ đồ uống có cồn nào.'
                }
              />
              <AccordionItem
                value={'seventh'}
                control={
                  'Tôi có thể mang theo thức ăn ngoài vào nhà hàng được không?'
                }
                panel={
                  'Theo chính sách, nhà hàng không cho phép mang thức ăn từ bên ngoài vào. Quý khách vui lòng chỉ dùng các món do nhà hàng phục vụ.'
                }
              />
              <AccordionItem
                value={'eighth'}
                control={'Nhà hàng có tổ chức sinh nhật/tiệc liên hoan không?'}
                panel={
                  'Có, nhà hàng có không gian riêng và cung cấp gói tiệc sinh nhật, tiệc liên hoan với giá cả hợp lý.'
                }
              />
              <AccordionItem
                value={'ninth'}
                control={'Tôi có thể mang về món chưa dùng hết không?'}
                panel={
                  'Được, quý khách có thể yêu cầu nhân viên đóng gói mang về món chưa dùng hết.'
                }
              />
              <AccordionItem
                value={'tenth'}
                control={'Nhà hàng có bãi đỗ xe riêng không?'}
                panel={
                  'Có, nhà hàng có bãi đỗ xe miễn phí cho khách hàng ở ngay phía sau nhà hàng.'
                }
              />
            </Accordion>
          </Flex>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default FAQ
