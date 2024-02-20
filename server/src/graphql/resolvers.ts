import { Context } from '../context'

export const resolvers = {
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
    position: async(_parent, args: { id: number }, context: Context) => {
      return context.prisma.positions.findUnique({
        where: { position_id: args.id || undefined }
      })
    }
  }
}
