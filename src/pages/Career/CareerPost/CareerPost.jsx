import { Box, Flex, List, Text, fr } from '@prismane/core'
import React from 'react'

const CareerPost = () => {
  return (
    <Box>
      <Text as={'h1'}>Tuyển dụng</Text>
      <Text as={'h2'}>Vị trí đầu bếp</Text>
      <Flex
        direction='column'
        w={fr(245)}
        h={fr(220)}
        of={'auto'}
        p={fr(8)}
        br={'lg'}
        fs={'xl'}
      >
        <Text as={'p'}>Nhà hàng chay Paramita</Text>
        <Text as={'p'}>Vị trí: Đầu bếp</Text>
        <Text as={'p'}>Số lượng: 2</Text>
        <Text as={'p'}>Mô tả công việc</Text>
        <List.Unordered ml={fr(4)}>
          <List.Item>
            Chịu trách nhiệm chế biến các món ăn chay theo thực đơn của nhà
            hàng.
          </List.Item>
          <List.Item>
            Đảm bảo chất lượng và vệ sinh an toàn thực phẩm của các món ăn.
          </List.Item>
          <List.Item>
            Phối hợp với nhân viên phục vụ để phục vụ khách hàng.
          </List.Item>
        </List.Unordered>
        <Text as={'p'}>Yêu cầu</Text>
        <List.Unordered ml={fr(4)}>
          <List.Item>
            Tốt nghiệp trung cấp trở lên chuyên ngành nấu ăn, chế biến món ăn.
          </List.Item>
          <List.Item>
            Có kinh nghiệm làm việc tại nhà hàng chay là một lợi thế.
          </List.Item>
          <List.Item>Am hiểu về ẩm thực chay.</List.Item>
          <List.Item>Có kỹ năng chế biến món ăn ngon, sáng tạo.</List.Item>
          <List.Item>Có kỹ năng giao tiếp tốt.</List.Item>
        </List.Unordered>
        <Text as={'p'}>Quyền lời</Text>
        <List.Unordered ml={fr(4)}>
          <List.Item>Mức lương: Thoả thuận</List.Item>
          <List.Item>
            Được hưởng các chế độ phúc lợi theo quy định của nhà nước.
          </List.Item>
          <List.Item>
            Được làm việc trong môi trường chuyên nghiệp, năng động.
          </List.Item>
        </List.Unordered>
        <Text as={'p'}>Cách thức ứng tuyển</Text>
        <List.Unordered ml={fr(4)}>
          <List.Item>Gửi hồ sơ trực tiếp tại nhà hàng chay Paramita</List.Item>
          <List.Item>Gửi hồ sơ qua email: career@paramita.com</List.Item>
        </List.Unordered>
        <Text as={'p'}>Hạn nộp hồ sơ: 31/12/2023</Text>
        <Text as={'p'}>Thông tin liên hệ:</Text>
        <List.Unordered ml={fr(4)}>
          <List.Item>
            Địa chỉ: Tầng trời ơi là trời, Cao ốc Bươu Vàng, Quận Ba Gà, Thành
            Phố Trên Không
          </List.Item>
          <List.Item>Số điện thoại: 0987.654.321</List.Item>
        </List.Unordered>
      </Flex>
    </Box>
  )
}

export default CareerPost
