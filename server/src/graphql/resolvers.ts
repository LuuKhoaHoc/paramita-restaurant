import { Context } from '../context'
import { getTsid } from 'tsid-ts'
const tsid = getTsid().timestamp

export const resolvers = {
  // Query
  Query: {
    categoryList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.categories.findMany()
    },
    category: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.categories.findUnique({
        where: { category_id: args.id || undefined }
      })
    },
    menuList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.menu.findMany()
    },
    item: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.menu.findUnique({
        where: { item_id: args.id || undefined }
      })
    },
    contentList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.contents.findMany()
    },
    content: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.contents.findUnique({
        where: { content_id: args.id || undefined }
      })
    },
    customerList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findMany()
    },
    customer: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.customers.findUnique({
        where: { customer_id: args.id || undefined }
      })
    },
    customerLevelList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.customer_level.findMany()
    },
    customerLevel: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.customer_level.findUnique({
        where: { level_id: args.id || undefined }
      })
    },
    customerAddressList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.customer_address.findMany()
    },
    customerAddress: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.customer_address.findUnique({
        where: { address_id: args.id || undefined }
      })
    },
    invoiceList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.invoices.findMany()
    },
    invoice: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.invoices.findUnique({
        where: { invoice_id: args.id || undefined },
        include: { invoice_details: true }
      })
    },
    invoiceDetailList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.invoice_details.findMany()
    },
    invoiceDetail: async (
      parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.invoice_details.findUnique({
        where: { invoice_detail_id: args.id || undefined }
      })
    },
    orderList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.orders.findMany()
    },
    order: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.orders.findUnique({
        where: { order_id: args.id || undefined },
        include: { order_details: true }
      })
    },
    orderDetailList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.order_details.findMany()
    },
    orderDetail: async (
      parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.order_details.findUnique({
        where: { order_detail_id: args.id || undefined }
      })
    },
    pointHistoryList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.point_history.findMany()
    },
    pointHistory: async (
      parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.point_history.findUnique({
        where: { point_history_id: args.id || undefined }
      })
    },
    promotionList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.promotions.findMany()
    },
    promotion: async (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.promotions.findUnique({
        where: { promotion_id: args.id || undefined }
      })
    },
    revenueList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.revenue.findMany()
    },
    revenue: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.revenue.findUnique({
        where: { revenue_id: args.id || undefined }
      })
    },
    tableList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.tables.findMany()
    },
    table: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.tables.findUnique({
        where: { table_id: args.id || undefined }
      })
    },
    reservationList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.reservations.findMany()
    },
    reservation: async (
      parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.reservations.findUnique({
        where: { reservation_id: args.id || undefined }
      })
    },
    reviewList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.reviews.findMany()
    },
    review: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.reviews.findUnique({
        where: { review_id: args.id || undefined }
      })
    },
    voucherList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.vouchers.findMany()
    },
    voucher: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.vouchers.findUnique({
        where: { voucher_id: args.id || undefined }
      })
    },
    employeeList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.employees.findMany()
    },
    employee: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.employees.findUnique({
        where: { employee_id: args.id || undefined }
      })
    },
    positionList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.positions.findMany()
    },
    position: async (_parent, args: { id: number }, context: Context) => {
      return context.prisma.positions.findUnique({
        where: { position_id: args.id || undefined }
      })
    }
  },
  // Mutation
  Mutation: {
    // Category
    createCategory: async (
      _parent: any,
      args: { data: CategoryInput },
      context: Context
    ) => {
      return context.prisma.categories.create({
        data: {
          category_id: tsid,
          name: args.data.name
        }
      })
    },
    // Sau này kt lại xem có cần thiết sử dụng không
    // createCategoryWithMenu: async (
    //   _parent: any,
    //   args: { data: CategoryInput; menu: Menu[] },
    //   context: Context
    // ) => {
    //   return context.prisma.categories.create({
    //     data: {
    //       category_id: tsid,
    //       name: args.data.name,
    //       menu: {
    //         createMany: {
    //           data: args.menu.map((menu) => {
    //             return {
    //               item_id: tsid,
    //               name: menu.name,
    //               description: menu.description,
    //               price: menu.price,
    //               image: menu.image
    //             }
    //           })
    //         }
    //       }
    //     }
    //   })
    // },
    updateCategory: async (
      _parent: any,
      args: { id: number; data: CategoryInput },
      context: Context
    ) => {
      return context.prisma.categories.update({
        where: { category_id: args.id },
        data: {
          name: args.data.name
        }
      })
    },
    deleteCategory: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.categories.delete({
        where: { category_id: args.id }
      })
    },
    // Menu
    createMenu: async (
      _parent: any,
      args: { category_id: number; data: MenuInput },
      context: Context
    ) => {
      return context.prisma.menu.create({
        data: {
          item_id: tsid,
          category_id: args.category_id,
          name: args.data.name,
          description: args.data.description,
          price: args.data.price,
          image: args.data.image
        }
      })
    },
    updateMenu: async (
      _parent: any,
      args: { id: number; cat_id: number; data: MenuInput },
      context: Context
    ) => {
      return context.prisma.menu.update({
        where: { item_id: args.id },
        data: {
          name: args.data.name,
          category_id: args.cat_id,
          description: args.data.description,
          price: args.data.price,
          image: args.data.image
        }
      })
    },
    deleteMenu: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.menu.delete({
        where: { item_id: args.id }
      })
    },
    // Content
    createContent: async (
      _parent: any,
      args: { data: ContentInput },
      context: Context
    ) => {
      return context.prisma.contents.create({
        data: {
          content_id: tsid,
          title: args.data.title,
          slogan: args.data?.slogan,
          description: args.data.description
        }
      })
    },
    updateContent: async (
      _parent: any,
      args: { id: number; data: ContentInput },
      context: Context
    ) => {
      return context.prisma.contents.update({
        where: { content_id: args.id },
        data: {
          title: args.data.title,
          slogan: args.data?.slogan,
          description: args.data.description
        }
      })
    },
    deleteContent: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.contents.delete({
        where: { content_id: args.id }
      })
    },
    // Customer
    createCustomer: async (
      _parent: any,
      args: { data: CustomerInput },
      context: Context
    ) => {
      return context.prisma.customers.create({
        data: {
          customer_id: tsid,
          name: args.data.name,
          phone: args.data.phone,
          email: args.data.email,
          birthday: args.data.birthday,
          points: args.data.points,
          level_id: args.data.level_id,
          status: args.data.status,
          username: args.data.username,
          password: args.data.password
        }
      })
    },
    updateCustomer: async (
      _parent: any,
      args: { id: number; data: CustomerInput },
      context: Context
    ) => {
      return context.prisma.customers.update({
        where: { customer_id: args.id },
        data: {
          name: args.data.name,
          phone: args.data.phone,
          email: args.data.email,
          birthday: args.data.birthday,
          points: args.data.points,
          level_id: args.data.level_id,
          status: args.data.status,
          username: args.data.username,
          password: args.data.password
        }
      })
    },
    deleteCustomer: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.customers.delete({
        where: { customer_id: args.id }
      })
    },
    // Customer address
    createCustomerAddress: async (
      _parent: any,
      args: { data: CustomerAddressInput },
      context: Context
    ) => {
      return context.prisma.customer_address.create({
        data: {
          customer_id: args.data.customer_id,
          address: args.data.address
        }
      })
    },
    updateCustomerAddress: async (
      _parent: any,
      args: { id: number; data: CustomerAddressInput },
      context: Context
    ) => {
      return context.prisma.customer_address.update({
        where: { address_id: args.id },
        data: {
          customer_id: args.data.customer_id,
          address: args.data.address
        }
      })
    },
    deleteCustomerAddress: async (
      _parent: any,
      args: { id: number },
      context: Context
    ) => {
      return context.prisma.customer_address.delete({
        where: { address_id: args.id }
      })
    },
    // Customer Level
    createCustomerLevel: async (_parent: any, args: { data: CustomerLevelInput }, context: Context) => {
      return context.prisma.customer_level.create({
        data: {
          level_id: tsid,
          name: args.data.name,
          description: args.data.description,
          discount: args.data.discount,
          points: args.data.points,
          benefits: args.data.benefits
        }
      })
    },
    updateCustomerLevel: async (_parent: any, args: { id: number; data: CustomerLevelInput }, context: Context) => {
      return context.prisma.customer_level.update({
        where: {level_id: args.id},
        data: {
          name: args.data.name,
          description: args.data.description,
          discount: args.data.discount,
          points: args.data.points,
          benefits: args.data.benefits
        }
      })
    },
    deleteCustomerLevel: async (_parent: any, args: { id: number }, context: Context) => {
      return context.prisma.customer_level.delete({
        where: {level_id: args.id}
      })
    }
  }
}

// Interface

interface CustomerLevelInput {
  name: string
  description: string
  discount: number
  points: number
  benefits: string
}
interface CustomerAddressInput {
  customer_id: number
  address: string
}
interface CustomerInput {
  name: string
  phone: string
  email: string
  addresses: CustomerAddressInput[]
  birthday: Date
  points: number
  level_id: number
  status: boolean
  username: string
  password: string
}
interface ContentInput {
  title: string
  slogan?: string
  description: string
}
interface MenuInput {
  name: string
  description: string
  price: number
  image: string
}
interface CategoryInput {
  name: string
  menu?: MenuInput[]
}
