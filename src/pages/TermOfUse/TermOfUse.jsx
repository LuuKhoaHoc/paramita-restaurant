import { Box, Flex, Grid, List, Table, Text, fr } from '@prismane/core'
import React from 'react'

const TermOfUse = () => {
  return (
    <>
      <Box h={fr(22.5)} bg={['primary', 100]} />
      <Grid templateColumns={12}>
        <Grid.Item columnStart={4} columnEnd={10}>
          <Flex
            w={'100%'}
            ff={'BalihoScript'}
            gap={fr(5)}
            my={fr(5)}
            direction='column'
          >
            <Text
              as={'h1'}
              fs={'3xl'}
              ff={'GeomanistBold'}
              ta={'center'}
              tt={'uppercase'}
            >
              Điều khoản sử dụng
            </Text>
            <Table bd={'1px solid'} bdc={'primary'} br={'xl'}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell fs={'lg'}>
                    <Text as={'p'} fs={'xl'}>
                      Điều khoản sử dụng website
                    </Text>
                    Khi truy cập và sử dụng website của nhà hàng Paramita, quý
                    khách đồng ý tuân theo các điều khoản dưới đây.
                    <br /> Chúng tôi có quyền thay đổi, bổ sung hoặc xóa bỏ bất
                    kỳ phần nào trong Điều khoản mà không cần thông báo trước.
                    Những thay đổi có hiệu lực ngay khi đăng trên web. <br />{' '}
                    Khi tiếp tục sử dụng dịch vụ sau khi cập nhật, quý khách
                    đồng ý chấp nhận những thay đổi đó.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell fs={'lg'}>
                    <Text as={'p'} fs={'lg'}>
                      Tài khoản người dùng
                    </Text>
                    <List.Unordered ml={fr(10)} fs={'md'}>
                      <List.Item>
                        Mỗi số điện thoại chỉ được tạo 1 tài khoản sử dụng cá
                        nhân.
                      </List.Item>
                      <List.Item>
                        Không chia sẻ tài khoản hoặc mật khẩu cho người khác.
                      </List.Item>
                      <List.Item>
                        Chúng tôi có quyền khóa tài khoản vi phạm điều khoản sử
                        dụng.
                      </List.Item>
                    </List.Unordered>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell fs={'lg'}>
                    <Text as={'p'} fs={'lg'}>
                      Đặt bàn & Đặt món
                    </Text>
                    <List.Unordered ml={fr(10)} fs={'md'}>
                      <List.Item>
                        Quý khách chịu trách nhiệm về tính chính xác của thông
                        tin đặt bàn/đặt món.
                      </List.Item>
                      <List.Item>
                        Chúng tôi có quyền từ chối đơn hàng vì lý do khách quan.
                      </List.Item>
                    </List.Unordered>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell fs={'lg'}>
                    <Text as={'p'} fs={'lg'}>
                      Hủy/thay đổi đơn hàng
                    </Text>
                    <List.Unordered ml={fr(10)} fs={'md'}>
                      <List.Item>
                        Quý khách có thể hủy đơn trước khi nhà hàng thực hiện.
                      </List.Item>
                      <List.Item>
                        Chỉ thay đổi địa chỉ, thời gian giao hàng trước khi thực
                        hiện.
                      </List.Item>
                    </List.Unordered>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell fs={'lg'}>
                    <Text as={'p'} fs={'lg'}>
                      Thanh toán và hoàn tiền
                    </Text>
                    <List.Unordered ml={fr(10)} fs={'md'}>
                      <List.Item>
                        Thanh toán bằng tiền mặt hoặc trực tuyến qua thẻ/ví điện
                        tử.
                      </List.Item>
                      <List.Item>
                        Hoàn tiền nhanh chóng nếu đơn hàng không thực hiện được.
                      </List.Item>
                    </List.Unordered>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell fs={'lg'}>
                    <Text as={'p'} fs={'lg'}>
                      Giao nhận
                    </Text>
                    <List.Unordered ml={fr(10)} fs={'md'}>
                      <List.Item>
                        Giao hàng trong bán kính 5km, tối đa 30 phút.
                      </List.Item>
                      <List.Item>
                        Khách kiểm tra hàng khi nhận, từ chối nếu sai sót.
                      </List.Item>
                      <List.Item>
                        Khung giờ hỗ trợ: 7h - 21h hằng ngày.
                      </List.Item>
                    </List.Unordered>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell fs={'lg'}>
                    <Text as={'p'} fs={'lg'}>
                      Chúng tôi mong nhận được sự hợp tác từ quý khách để cùng
                      cải thiện dịch vụ. <br />
                      Xin cảm ơn!
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Flex>
        </Grid.Item>
      </Grid>
    </>
  )
}

export default TermOfUse
