import { useMutation } from '@apollo/client'
import {
  AddressBook,
  Briefcase,
  Cake,
  ChartBar,
  Envelope,
  GenderIntersex,
  IdentificationCard,
  Password,
  Phone,
  User,
  UserCirclePlus,
  X
} from '@phosphor-icons/react'
import {
  Alert,
  Button,
  Center,
  Flex,
  Form,
  Image,
  Modal,
  NativeDateField,
  SelectField,
  Text,
  TextField,
  fr,
  useToast
} from '@prismane/core'
import { useForm } from '@prismane/core/hooks'
import { useState } from 'react'
import { z } from 'zod'
import { ADD_EMPLOYEE } from '~/pages/Admin/EmployeeManager/schema'
import usernameAndEmail from '~/utils/usernameAndEmail'
import p from '~/utils/zodToPrismane'

const AddEmployee = ({ open, setOpen, refetch, position }) => {
  const toast = useToast()
  const [addEmployee] = useMutation(ADD_EMPLOYEE)
  const { register, handleSubmit, setValue, handleReset } = useForm({
    fields: {
      name: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          name: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(2, { message: 'Ít nhất 2 kí tự' })
                .regex(/^[\p{L}\s]+$/u, {
                  message: 'Chỉ được chứa chữ có dạng với kí tự'
                })
            )
        }
      },
      gender: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
        }
      },
      phone: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          phone: (v) =>
            p(
              v,
              z
                .string()
                .trim()
                .min(10, { message: 'Ít nhất 10 kí tự' })
                .regex(/^[0-9]+$/, {
                  message: 'Chỉ là số'
                })
            )
        }
      },
      email: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          email: (v) =>
            p(v, z.string().trim().email({ message: 'Email không hợp lệ' }))
        }
      },
      address: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
        }
      },
      birthday: {
        value: ''
      },
      position: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
        }
      },
      status: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' }))
        }
      },
      username: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không được bỏ trống!' })),
          username: (v) => usernameAndEmail(v)
        }
      },
      password: {
        value: '',
        validators: {
          required: (v) =>
            p(v, z.string().trim().min(1, { message: 'Không	được bỏ trống!' })),
          password: (v) =>
            p(v, z.string().trim().min(6, { message: 'Ít nhất 6 kí tự' }))
        }
      }
    }
  })
  return (
    <Modal open={open} onClose={() => setOpen(false)} w={'30%'}>
      <Modal.Header justify='center'>
        <Text className='GeomanistMedium-font' fs={'xl'}>
          Thêm nhân viên
        </Text>
      </Modal.Header>
      <Form
        onSubmit={(SubmitEvent) =>
          handleSubmit(SubmitEvent, async (v) => {
            await addEmployee({
              variables: {
                data: {
                  name: v.name,
                  gender: v.gender,
                  phone: v.phone,
                  email: v.email,
                  address: v.address,
                  birthday: new Date(v.birthday),
                  positionId: Number(v.position),
                  status: Boolean(v.status === 'true' ? 1 : 0),
                  username: v.username,
                  password: v.password
                }
              },
              onError: (err) => console.log(err),
              onCompleted: (data) => {
                refetch()
                setOpen(false)
                handleReset()
                toast({
                  element: (
                    <Alert variant='success'>
                      <Alert.Title className='GeomanistMedium-font'>
                        Đã thêm nhân viên thành công
                      </Alert.Title>
                    </Alert>
                  )
                })
              }
            })
          })
        }
        onReset={handleReset}
      >
        <Center>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            w={'30%'}
          />
        </Center>
        <Flex align='center' justify='center' gap={fr(2)}>
          <TextField
            w={'100%'}
            placeholder='Nhập tên nhân viên...'
            icon={<IdentificationCard />}
            {...register('name')}
          />
          <SelectField
            w={'100%'}
            icon={<GenderIntersex />}
            className='GeomanistMedium-font'
            placeholder='Chọn giới tính nhân viên...'
            gap={fr(0)}
            sx={{
              '.PrismaneMenuItem-root': {
                fontFamily: 'GeomanistMedium !important'
              }
            }}
            {...register('gender')}
            options={[
              { value: 'Nam', element: 'Nam' },
              { value: 'Nữ', element: 'Nữ' },
              { value: 'Khác', element: 'Khác' }
            ]}
          />
        </Flex>
        <Flex align='center' justify='center' gap={fr(2)}>
          <TextField
            w={'100%'}
            placeholder='Nhập số điện thoại nhân viên...'
            icon={<Phone />}
            {...register('phone')}
          />
          <TextField
            w={'100%'}
            placeholder='Nhập email nhân viên...'
            icon={<Envelope />}
            {...register('email')}
          />
        </Flex>

        <TextField
          placeholder='Nhập địa chỉ nhân viên...'
          icon={<AddressBook />}
          {...register('address')}
        />
        <NativeDateField icon={<Cake />} {...register('birthday')} />
        <SelectField
          icon={<Briefcase />}
          className='GeomanistMedium-font'
          placeholder='Chọn vị trí công việc nhân viên...'
          sx={{
            '.PrismaneMenuItem-root': {
              fontFamily: 'GeomanistMedium !important'
            }
          }}
          {...register('position')}
          options={position?.map((item) => ({
            value: item.position_id.toString(),
            element: item.name
          }))}
        />
        <SelectField
          icon={<ChartBar />}
          className='GeomanistMedium-font'
          placeholder='Chọn trạng thái hoạt động...'
          sx={{
            '.PrismaneMenuItem-root': {
              fontFamily: 'GeomanistMedium !important'
            }
          }}
          {...register('status')}
          options={[
            { value: 'true', element: 'Đang làm việc' },
            { value: 'false', element: 'Nghỉ việc' }
          ]}
        />
        <TextField
          placeholder='Nhập tên tài khoản nhân viên...'
          icon={<User />}
          {...register('username')}
        />
        <TextField
          placeholder='Nhập mật khẩu nhân viên...'
          icon={<Password />}
          {...register('password')}
        />
        <Modal.Footer justify='between'>
          <Button
            size='md'
            icon={<X />}
            bg={['gray', 400]}
            bsh={'sm'}
            type='reset'
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
          <Button
            variant='secondary'
            size='md'
            icon={<UserCirclePlus weight='bold' />}
            bsh={'sm'}
            type='submit'
          >
            Thêm nhân viên
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddEmployee
