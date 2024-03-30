import { DateTimeResolver } from 'graphql-scalars'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Context } from '../context'
import { getTsid } from 'tsid-ts'
import { sendMail } from '../utils/sendMail'

export const resolvers = {
  // Query
  Query: {
    // Authentication
    checkUsernameExistence: async (
      _parent: any,
      args: { username: string },
      context: Context
    ) => {
      const customerUsername = await context.prisma.customers.findFirst({
        where: {
          username: args.username
        }
      })
      const employeeUsername = await context.prisma.employees.findFirst({
        where: {
          username: args.username
        }
      })
      return customerUsername || employeeUsername
    },
    checkEmailExistence: async (
      _parent: any,
      args: { email: string },
      context: Context
    ) => {
      const customerEmail = await context.prisma.customers.findFirst({
        where: {
          email: args.email
        }
      })
      const employeeEmail = await context.prisma.employees.findFirst({
        where: {
          email: args.email
        }
      })
      return customerEmail || employeeEmail
    },
    checkToken: async (
      _parent: any,
      args: { token: string },
      context: Context
    ) => {
      const token = jwt.verify(
        args.token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload
      if (token) {
        const customer = context.prisma.customers.findFirst({
          where: {
            customer_id: token.userId
          }
        })
        return { customer, token: args.token }
      } else {
        return false
      }
    },
    // get customer by phone
    getCustomerByPhone: async (
      _parent: any,
      args: { phone: string },
      context: Context
    ) => {
      return context.prisma.customers.findFirst({
        where: { phone: args.phone }
      })
    },
    categoryList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.categories.findMany()
    },
    category: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.categories.findUnique({
        where: { category_id: args.id || undefined }
      })
    },
    menuList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.menu.findMany()
    },
    item: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.menu.findUnique({
        where: { item_id: args.id || undefined }
      })
    },
    contentList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.contents.findMany()
    },
    content: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.contents.findUnique({
        where: { content_id: args.id || undefined }
      })
    },
    pageList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.pages.findMany()
    },
    page: async (_parent: any, args: { name: string }, context: Context) => {
      return context.prisma.pages.findUnique({
        where: { name: args.name || undefined }
      })
    },
    customerList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findMany()
    },
    customer: async (_parent: any, args: { id: any }, context: Context) => {
      const customer_id = jwt.verify(
        args.id,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload
      return context.prisma.customers.findUnique({
        where: { customer_id: customer_id.userId || undefined }
      })
    },
    customerLevelList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.customer_level.findMany()
    },
    customerLevel: async (
      _parent: any,
      args: { id: any },
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
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.customer_address.findUnique({
        where: { address_id: args.id || undefined }
      })
    },
    invoiceList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.invoices.findMany()
    },
    invoice: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.invoices.findUnique({
        where: { invoice_id: args.id || undefined },
        include: { invoice_details: true }
      })
    },
    invoiceDetailList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.invoice_details.findMany()
    },
    invoiceDetail: async (parent: any, args: { id: any }, context: Context) => {
      return context.prisma.invoice_details.findUnique({
        where: { invoice_detail_id: args.id || undefined }
      })
    },
    orderList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.orders.findMany()
    },
    order: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.orders.findUnique({
        where: { order_id: args.id || undefined },
        include: { order_details: true }
      })
    },
    orderDetailList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.order_details.findMany()
    },
    orderDetail: async (parent: any, args: { id: any }, context: Context) => {
      return context.prisma.order_details.findUnique({
        where: { order_detail_id: args.id || undefined }
      })
    },
    pointsHistoryList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.point_histories.findMany()
    },
    pointsHistory: async (parent: any, args: { id: any }, context: Context) => {
      return context.prisma.point_histories.findUnique({
        where: { point_history_id: args.id || undefined }
      })
    },
    promotionList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.promotions.findMany()
    },
    promotion: async (parent: any, args: { id: any }, context: Context) => {
      return context.prisma.promotions.findUnique({
        where: { promotion_id: args.id || undefined }
      })
    },
    revenueList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.revenue.findMany()
    },
    revenue: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.revenue.findUnique({
        where: { revenue_id: args.id || undefined }
      })
    },
    tableList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.tables.findMany()
    },
    table: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.tables.findUnique({
        where: { table_id: args.id || undefined }
      })
    },
    reservationList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.reservations.findMany()
    },
    reservation: async (parent: any, args: { id: any }, context: Context) => {
      return context.prisma.reservations.findUnique({
        where: { reservation_id: args.id || undefined }
      })
    },
    reviewList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.reviews.findMany()
    },
    review: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.reviews.findUnique({
        where: { review_id: args.id || undefined }
      })
    },
    voucherList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.vouchers.findMany()
    },
    voucher: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.vouchers.findUnique({
        where: { voucher_id: args.id || undefined }
      })
    },
    employeeList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.employees.findMany()
    },
    employee: async (_parent: any, args: { id: any }, context: Context) => {
      const employee_id = jwt.verify(
        args.id,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload
      return context.prisma.employees.findUnique({
        where: { employee_id: employee_id.userId || undefined }
      })
    },
    positionList: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.positions.findMany()
    },
    position: async (_parent, args: { id: any }, context: Context) => {
      return context.prisma.positions.findUnique({
        where: { position_id: args.id || undefined }
      })
    }
  },
  // Mutation
  Mutation: {
    // Forgot Password
    requestResetPassword: async (
      _parent: any,
      args: { email: string },
      context: Context
    ) => {
      try {
        // 1. Find the user with the provided email.
        const user = await context.prisma.customers.findUnique({
          where: { email: args.email }
        })
        // 2. If user does not exist, return an error.
        if (!user) throw new Error('User not found')

        // 3. Generate a random PIN.
        const pin = Math.floor(1000 + Math.random() * 9000).toString()

        // 4. Update the user in the database with the new PIN.
        await context.prisma.customers.update({
          where: { email: args.email },
          data: { resetPin: pin, resetPinRequestedAt: new Date().toISOString() }
        })

        // 5. Send the PIN to the user's email.
        await sendMail({
          subject: 'Yêu cầu đổi mật khẩu của bạn',
          uses: 'resetPassword',
          args: {
            email: args.email,
            name: user.name || user.username,
            pin,
            appName: 'Paramita Restaurant'
          }
        })
        return {
          status: 'success',
          message: `Mã PIN đã được gửi đến ${args.email}`
        }
      } catch (error) {
        // This is where we handle the error.
        console.error(
          'There was an error sending the reset password email: ' + error
        )
        throw new Error(
          'There was an error sending the reset password email. Please try again later.'
        )
      }
    },
    verifyResetPasswordPin: async (
      _parent: any,
      args: {
        email: string
        pin: string
      },
      context: Context
    ) => {
      const user = await context.prisma.customers.findUnique({
        where: { email: args.email }
      })
      if (!user) {
        throw new Error('User not found')
      }
      if (user.resetPin !== args.pin) {
        return {
          status: 'error',
          message: 'Mã PIN không hợp lệ!'
        }
      }
      if (
        user.resetPinRequestedAt &&
        Date.now() - new Date(user.resetPinRequestedAt).getTime() >
          1000 * 60 * 5
      ) {
        return {
          status: 'error',
          message: 'Mã PIN đã hết hạn!'
        }
      }
      return {
        status: 'success',
        message: 'Mã PIN hợp lệ!'
      }
    },
    resetPassword: async (
      _parent: any,
      args: { email: string; password: string },
      context: Context
    ) => {
      const passwordHash = await bcrypt.hash(args.password, 10)
      const user = await context.prisma.customers.findUnique({
        where: { email: args.email }
      })
      if (!user) {
        throw new Error('User not found')
      }
      await context.prisma.customers.update({
        where: { email: args.email },
        data: { password: passwordHash }
      })
      return {
        status: 'success',
        message: 'Mật khẩu đã được cập nhật!'
      }
    },

    // Category
    createCategory: async (
      _parent: any,
      args: { data: CategoryInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createCategory mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.categories.create({
        data: {
          tsid,
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
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.categories.delete({
        where: { category_id: args.id }
      })
    },
    // Menu
    createMenu: async (
      _parent: any,
      args: { data: MenuInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createMenu mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.menu.create({
        data: {
          tsid,
          category_id: args.data.categoryId,
          name: args.data.name,
          description: args.data.description,
          price: args.data.price,
          image: args.data.image
        }
      })
    },
    updateMenu: async (
      _parent: any,
      args: { id: number; data: MenuInput },
      context: Context
    ) => {
      return context.prisma.menu.update({
        where: { item_id: args.id },
        data: {
          name: args.data.name,
          category_id: args.data.categoryId,
          description: args.data.description,
          price: args.data.price,
          image: args.data.image
        }
      })
    },
    deleteMenu: async (_parent: any, args: { id: any }, context: Context) => {
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
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createContent mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.contents.create({
        data: {
          tsid,
          title: args.data.title,
          slogan: args.data?.slogan,
          description: args.data.description,
          position: args.data.position,
          page_id: args.data.pageId
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
          description: args.data.description,
          position: args.data?.position,
          page_id: args.data?.pageId
        }
      })
    },
    deleteContent: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.contents.delete({
        where: { content_id: args.id }
      })
    },
    // Page
    createPage: async (
      _parent: any,
      args: { data: PageInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createPage mutation."
        )
      }
      return context.prisma.pages.create({
        data: {
          name: args.data.name
        }
      })
    },
    updatePage: async (
      _parent: any,
      args: { id: number; data: PageInput },
      context: Context
    ) => {
      return context.prisma.pages.update({
        where: { page_id: args.id },
        data: {
          name: args.data.name
        }
      })
    },
    deletePage: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.pages.delete({
        where: { page_id: args.id }
      })
    },
    // Login
    login: async (
      _parent: any,
      args: { username: string; password: string },
      context: Context
    ) => {
      const existingCustomer = await context.prisma.customers.findFirst({
        where: {
          OR: [{ username: args.username }, { email: args.username }]
        }
      })
      const customer = existingCustomer
      if (!customer) {
        throw new Error('Tài khoản không đúng')
      }
      if (
        customer &&
        !(await bcrypt.compare(args.password, customer.password))
      ) {
        throw new Error('Mật khẩu không đúng')
      }
      const token = jwt.sign(
        { userId: customer.customer_id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '24h'
        }
      )
      return { customer, token }
    },
    // Change Password
    changePassword: async (
      _parent,
      {
        id,
        oldPassword,
        newPassword
      }: { id: number; oldPassword: string; newPassword: string },
      { prisma }: Context
    ) => {
      const passwordHash = await bcrypt.hash(newPassword, 10)
      const oldCustomer = await prisma.customers.findFirst({
        where: { customer_id: id },
        select: {
          customer_id: true,
          password: true
        }
      })
      if (
        !oldCustomer ||
        !(await bcrypt.compare(oldPassword, oldCustomer.password))
      ) {
        throw new Error('Mật khẩu cũ không đúng')
      }
      const customer = await prisma.customers.update({
        where: { customer_id: id },
        data: { password: passwordHash }
      })
      if (!customer) {
        throw new Error('Cập nhập không thành công')
      }
      return customer
    },
    verifyEmail: async (
      _parent: any,
      args: { token: string },
      context: Context
    ) => {
      const token = jwt.verify(
        args.token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload
      const customer = await context.prisma.customers.update({
        where: { customer_id: Number(token.userId) },
        data: { status: true },
        select: { status: true }
      })
      if (customer?.status) {
        return {
          status: 'success',
          message: 'Email đã được xác thực thành công'
        }
      } else {
        return { status: 'error', message: 'Email không xác thực!' }
      }
    },
    // Customer
    createCustomer: async (
      _parent: any,
      args: { data: CustomerInput },
      context: Context
    ) => {
      const existingCustomer = await context.prisma.customers.findFirst({
        where: {
          OR: [{ username: args.data.username }, { email: args.data.email }]
        }
      })

      if (existingCustomer) {
        throw new Error('Tài khoản đã tồn tại')
      }
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createCustomer mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      const passwordHash = await bcrypt.hash(args.data?.password, 10)
      const createdCustomer = await context.prisma.customers.create({
        data: {
          tsid,
          email: args.data.email,
          username: args.data.username,
          password: passwordHash
        }
      })
      const token = jwt.sign(
        { userId: createdCustomer.customer_id },
        process.env.JWT_SECRET as string
      )
      await sendMail({
        subject: 'Xác thực email tài khoản',
        uses: 'verifyEmail',
        args: {
          name: createdCustomer.username,
          email: createdCustomer.email,
          confirmationLink: `http://localhost:3000/verify-email/${token}`
        }
      })
      return {
        customer: createdCustomer,
        token
      }
    },
    addCustomer: async (
      _parent: any,
      args: { data: CustomerInput },
      context: Context
    ) => {
      const tsid = getTsid().timestamp.toString()
      const passwordHash = await bcrypt.hash(args.data?.password, 10)
      const createdCustomer = await context.prisma.customers.create({
        data: {
          tsid,
          name: args.data.name,
          phone: args.data.phone,
          email: args.data.email,
          birthday: args.data.birthday,
          status: args.data.status,
          username: args.data.username,
          password: passwordHash
        }
      })
      return createdCustomer
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
          level_id: args.data.levelId,
          status: args.data.status,
          username: args.data.username,
          password: args.data.password
        }
      })
    },
    deleteCustomer: async (
      _parent: any,
      args: { id: any },
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
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createCustomerAddress mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.customer_address.create({
        data: {
          customer_id: args.data.customerId,
          tsid,
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
          customer_id: args.data.customerId,
          address: args.data.address
        }
      })
    },
    deleteCustomerAddress: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.customer_address.delete({
        where: { address_id: args.id }
      })
    },
    // Customer Level
    createCustomerLevel: async (
      _parent: any,
      args: { data: CustomerLevelInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createCustomerLevel mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.customer_level.create({
        data: {
          tsid,
          name: args.data.name,
          description: args.data.description,
          discount: args.data.discount,
          points: args.data.points,
          benefits: args.data.benefits
        }
      })
    },
    updateCustomerLevel: async (
      _parent: any,
      args: { id: number; data: CustomerLevelInput },
      context: Context
    ) => {
      return context.prisma.customer_level.update({
        where: { level_id: args.id },
        data: {
          name: args.data.name,
          description: args.data.description,
          discount: args.data.discount,
          points: args.data.points,
          benefits: args.data.benefits
        }
      })
    },
    deleteCustomerLevel: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.customer_level.delete({
        where: { level_id: args.id }
      })
    },
    // Invoice Detail
    createInvoiceDetail: async (
      _parent: any,
      args: { data: InvoiceDetailInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createInvoiceDetail mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.invoice_details.create({
        data: {
          tsid,
          invoice_id: args.data.invoiceId,
          item_id: args.data.itemId,
          quantity: args.data.quantity,
          unit_price: args.data.price,
          total_price: args.data.total
        }
      })
    },
    updateInvoiceDetail: async (
      _parent: any,
      args: { id: number; data: InvoiceDetailInput },
      context: Context
    ) => {
      return context.prisma.invoice_details.update({
        where: { invoice_detail_id: args.id },
        data: {
          invoice_id: args.data.invoiceId,
          item_id: args.data.itemId,
          quantity: args.data.quantity,
          unit_price: args.data.price,
          total_price: args.data.total
        }
      })
    },
    deleteInvoiceDetail: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.invoice_details.delete({
        where: { invoice_detail_id: args.id }
      })
    },
    // Invoice
    createInvoice: async (
      _parent: any,
      args: {
        data: InvoiceInput
      },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createInvoice mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.invoices.create({
        data: {
          tsid,
          customer_id: args.data?.customerId,
          voucher_id: args.data?.voucherId,
          payment_method: args.data.paymentMethod,
          payment_status: args.data.paymentStatus,
          total_price: args.data.totalPrice,
          note: args.data?.note
        }
      })
    },
    updateInvoice: async (
      _parent: any,
      args: { id: number; data: InvoiceInput },
      context: Context
    ) => {
      return context.prisma.invoices.update({
        where: { invoice_id: args.id },
        data: {
          customer_id: args.data.customerId,
          voucher_id: args.data.voucherId,
          payment_method: args.data.paymentMethod,
          payment_status: args.data.paymentStatus,
          total_price: args.data.totalPrice,
          note: args.data?.note
        }
      })
    },
    deleteInvoice: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.invoices.delete({ where: { invoice_id: args.id } })
    },
    // Order Detail
    createOrderDetail: async (
      _parent: any,
      args: { data: OrderDetailInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createOrderDetail mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.order_details.create({
        data: {
          tsid,
          order_id: args.data.orderId,
          item_id: args.data.itemId,
          quantity: args.data.quantity,
          unit_price: args.data.price,
          total_price: args.data.total
        }
      })
    },
    updateOrderDetail: async (
      _parent: any,
      args: { id: number; data: OrderDetailInput },
      context: Context
    ) => {
      return context.prisma.order_details.update({
        where: { order_detail_id: args.id },
        data: {
          order_id: args.data.orderId,
          item_id: args.data.itemId,
          quantity: args.data.quantity,
          unit_price: args.data.price,
          total_price: args.data.total
        }
      })
    },
    deleteOrderDetail: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.order_details.delete({
        where: { order_detail_id: args.id }
      })
    },
    // Order
    createOrder: async (
      _parent: any,
      args: { orderDetailId?: number; data: OrderInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createOrder mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.orders.create({
        data: {
          tsid,
          customer_id: args.data.customerId,
          status: args.data.status,
          delivery_address: args.data.address,
          transport_fee: args.data.transportFee,
          payment_method: args.data.paymentMethod,
          payment_status: args.data.paymentStatus,
          voucher_id: args.data?.voucherId,
          total_price: args.data.total,
          note: args.data?.note
          // order_details: {
          //   connect: {
          //     order_detail_id: args.orderDetailId
          //   }
          // }
        }
      })
    },
    updateOrder: async (
      _parent: any,
      args: { id: number; orderDetailId?: number; data: OrderInput },
      context: Context
    ) => {
      return context.prisma.orders.update({
        where: { order_id: args.id },
        data: {
          customer_id: args.data.customerId,
          status: args.data.status,
          delivery_address: args.data.address,
          payment_method: args.data.paymentMethod,
          payment_status: args.data.paymentStatus,
          transport_fee: args.data.transportFee,
          order_details: {
            connect: { order_detail_id: args.orderDetailId }
          }
        }
      })
    },
    deleteOrder: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.orders.delete({ where: { order_id: args.id } })
    },
    // PointHistory
    createPointsHistory: async (
      _parent: any,
      args: { data: PointsHistoryInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createPointsHistory mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.point_histories.create({
        data: {
          tsid,
          transaction_date: args.data.transactionDate,
          customer_id: args.data.customerId,
          order_id: args.data?.orderId,
          invoice_id: args.data?.invoiceId,
          voucher_id: args.data?.voucherId,
          points_earned: args.data?.earnedPoints,
          points_deducted: args.data?.deductedPoints
        }
      })
    },
    updatePointsHistory: async (
      _parent: any,
      args: { id: number; data: PointsHistoryInput },
      context: Context
    ) => {
      return context.prisma.point_histories.update({
        where: { point_history_id: args.id },
        data: {
          transaction_date: args.data.transactionDate,
          customer_id: args.data.customerId,
          order_id: args.data?.orderId,
          invoice_id: args.data?.invoiceId,
          voucher_id: args.data?.voucherId,
          points_earned: args.data?.earnedPoints,
          points_deducted: args.data?.deductedPoints
        }
      })
    },
    deletePointsHistory: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.point_histories.delete({
        where: { point_history_id: args.id }
      })
    },
    // Promotion
    createPromotion: async (
      _parent: any,
      args: { data: PromotionInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createPromotion mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.promotions.create({
        data: {
          tsid,
          name: args.data.name,
          description: args.data.description,
          start_date: args.data.startDate,
          end_date: args.data.endDate,
          target: args.data.target,
          conditions: args.data.condition,
          discount: args.data.discount,
          status: args.data.status
        }
      })
    },
    updatePromotion: async (
      _parent: any,
      args: { id: number; data: PromotionInput },
      context: Context
    ) => {
      return context.prisma.promotions.update({
        where: { promotion_id: args.id },
        data: {
          name: args.data.name,
          description: args.data.description,
          start_date: args.data.startDate,
          end_date: args.data.endDate,
          target: args.data.target,
          conditions: args.data.condition,
          discount: args.data.discount,
          status: args.data.status
        }
      })
    },
    deletePromotion: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.promotions.delete({
        where: { promotion_id: args.id }
      })
    },
    // Revenue
    createRevenue: async (
      _parent: any,
      args: { data: RevenueInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createRevenue mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.revenue.create({
        data: {
          tsid,
          date: args.data.date,
          revenue: args.data.revenue,
          cost: args.data.cost
        }
      })
    },
    updateRevenue: async (
      _parent: any,
      args: { id: number; data: RevenueInput },
      context: Context
    ) => {
      return context.prisma.revenue.update({
        where: { revenue_id: args.id },
        data: {
          date: args.data.date,
          revenue: args.data.revenue,
          cost: args.data.cost
        }
      })
    },
    deleteRevenue: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.revenue.delete({
        where: { revenue_id: args.id }
      })
    },
    // Table
    createTable: async (
      _parent: any,
      args: { data: TableInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createTable mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.tables.create({
        data: {
          tsid,
          name: args.data.name,
          capacity: args.data.capacity,
          status: args.data.status
        }
      })
    },
    updateTable: async (
      _parent: any,
      args: { id: number; data: TableInput },
      context: Context
    ) => {
      return context.prisma.tables.update({
        where: { table_id: args.id },
        data: {
          name: args.data.name,
          capacity: args.data.capacity,
          status: args.data.status
        }
      })
    },
    deleteTable: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.tables.delete({
        where: { table_id: args.id }
      })
    },
    // Reservation
    createReservation: async (
      _parent: any,
      args: { data: ReservationInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createReservation mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.reservations.create({
        data: {
          tsid,
          customer_id: args.data?.customerId,
          table_id: args.data?.tableId,
          name: args.data.name,
          phone: args.data.phone,
          email: args.data.email,
          capacity: args.data.capacity,
          note: args.data.note,
          reservation_time: args.data.reservation_time,
          reservation_date: args.data.reservation_date,
          status: args.data.status
        }
      })
    },
    // send mail after reservation
    sendMailReservation: async (
      _parent: any,
      args: { data: ReservationInput },
      context: Context
    ) => {
      await sendMail({
        subject: 'Cảm ơn bạn đã đặt bàn tại Paramita!',
        uses: 'reservation',
        args: {
          name: args.data.name,
          email: args.data.email,
          capacity: args.data.capacity,
          reservation_time: args.data.reservation_time,
          reservation_date: args.data.reservation_date,
          appName: 'Paramita Restaurant'
        }
      })
      return {
        status: 'success',
        message: `Đã gửi mail thông báo đến ${args.data.email}`
      }
    },
    updateReservation: async (
      _parent: any,
      args: { id: number; data: ReservationInput },
      context: Context
    ) => {
      return context.prisma.reservations.update({
        where: { reservation_id: args.id },
        data: {
          customer_id: args.data.customerId,
          table_id: args.data.tableId,
          name: args.data.name,
          phone: args.data.phone,
          email: args.data.email,
          capacity: args.data.capacity,
          note: args.data.note,
          reservation_time: args.data.reservation_time,
          reservation_date: args.data.reservation_date,
          status: args.data.status
        }
      })
    },
    deleteReservation: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.reservations.delete({
        where: { reservation_id: args.id }
      })
    },
    // Review
    createReview: async (
      _parent: any,
      args: { data: ReviewInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createReview mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.reviews.create({
        data: {
          tsid,
          customer_id: args.data.customerId,
          content: args.data.content,
          rating: args.data.rating,
          status: args.data.status
        }
      })
    },
    updateReview: async (
      _parent: any,
      args: { id: number; data: ReviewInput },
      context: Context
    ) => {
      return context.prisma.reviews.update({
        where: { review_id: args.id },
        data: {
          customer_id: args.data.customerId,
          content: args.data.content,
          rating: args.data.rating,
          status: args.data.status
        }
      })
    },
    deleteReview: async (_parent: any, args: { id: any }, context: Context) => {
      return context.prisma.reviews.delete({
        where: { review_id: args.id }
      })
    },
    // Voucher
    createVoucher: async (
      _parent: any,
      args: { data: VoucherInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createVoucher mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.vouchers.create({
        data: {
          tsid,
          customer_id: args.data.customerId,
          name: args.data.name,
          code: args.data.code,
          description: args.data.description,
          discount: args.data.discount,
          expired_date: args.data.expiredDate,
          min_spend: args.data.minSpend,
          max_discount: args.data.maxDiscount,
          status: args.data.status
        }
      })
    },
    updateVoucher: async (
      _parent: any,
      args: { id: number; data: VoucherInput },
      context: Context
    ) => {
      return context.prisma.vouchers.update({
        where: { voucher_id: args.id },
        data: {
          customer_id: args.data.customerId,
          name: args.data.name,
          code: args.data.code,
          description: args.data.description,
          discount: args.data.discount,
          expired_date: args.data.expiredDate,
          min_spend: args.data.minSpend,
          status: args.data.status
        }
      })
    },
    deleteVoucher: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.vouchers.delete({
        where: { voucher_id: args.id }
      })
    },
    updateVoucherStatus: async (
      _parent: any,
      args: { id: any; status: string },
      context: Context
    ) => {
      return context.prisma.vouchers.update({
        where: { voucher_id: args.id },
        data: {
          status: args.status
        }
      })
    },
    // Login Employee
    loginEmployee: async (
      _parent: any,
      args: { username: string; password: string },
      context: Context
    ) => {
      const existingEmployee = await context.prisma.employees.findFirst({
        where: {
          OR: [{ username: args.username }, { email: args.username }]
        }
      })
      const employee = existingEmployee
      if (!employee) {
        throw new Error('Tài khoản không đúng')
      }
      if (employee && !(args.password === employee.password)) {
        throw new Error('Mật khẩu không đúng')
      }
      const token = jwt.sign(
        { userId: employee?.employee_id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '24h'
        }
      )
      return { employee, token }
    },
    // Employee
    createEmployee: async (
      _parent: any,
      args: { data: EmployeeInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createEmployee mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.employees.create({
        data: {
          tsid,
          name: args.data.name,
          email: args.data.email,
          phone: args.data.phone,
          address: args.data.address,
          birthday: args.data.birthday,
          gender: args.data.gender,
          status: args.data.status,
          is_admin: args.data.isAdmin,
          position_id: args.data.positionId,
          username: args.data.username,
          password: args.data.password
        }
      })
    },
    updateEmployee: async (
      _parent: any,
      args: { id: number; data: EmployeeInput },
      context: Context
    ) => {
      return context.prisma.employees.update({
        where: { employee_id: args.id },
        data: {
          name: args.data.name,
          email: args.data.email,
          phone: args.data.phone,
          address: args.data.address,
          birthday: args.data.birthday,
          gender: args.data.gender,
          status: args.data.status,
          is_admin: args.data.isAdmin,
          position_id: args.data.positionId,
          username: args.data.username,
          password: args.data.password
        }
      })
    },
    deleteEmployee: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.employees.delete({
        where: { employee_id: args.id }
      })
    },
    // Position
    createPosition: async (
      _parent: any,
      args: { employeeId?: number; data: PositionInput },
      context: Context
    ) => {
      if (!args.data) {
        throw new Error(
          "Missing required 'data' argument in createPosition mutation."
        )
      }
      const tsid = getTsid().timestamp.toString()
      return context.prisma.positions.create({
        data: {
          tsid,
          name: args.data.name,
          salary: args.data.salary,
          description: args.data.description
        }
      })
    },
    updatePosition: async (
      _parent: any,
      args: { id: number; employeeId?: number; data: PositionInput },
      context: Context
    ) => {
      return context.prisma.positions.update({
        where: {
          position_id: args.id
        },
        data: {
          name: args.data.name,
          salary: args.data.salary,
          description: args.data.description
        }
      })
    },
    deletePosition: async (
      _parent: any,
      args: { id: any },
      context: Context
    ) => {
      return context.prisma.positions.delete({
        where: { position_id: args.id }
      })
    }
  },
  DateTime: DateTimeResolver,
  // Relationship
  Category: {
    menu: (_parent: any, _args: any, context: Context) => {
      return context.prisma.menu.findMany({
        where: { categories: { category_id: _parent.category_id } }
      })
    }
  },
  Menu: {
    category: (_parent: any, _args: any, context: Context) => {
      return context.prisma.categories.findMany({
        where: { menu: { some: { item_id: _parent.item_id } } }
      })
    }
  },

  Content: {
    page: (parent: any, _args: any, context: Context) => {
      return context.prisma.pages.findUnique({
        where: { page_id: parent?.page_id }
      })
    }
  },
  Page: {
    content: (parent: any, _args: any, context: Context) => {
      return context.prisma.contents.findMany({
        where: { page_id: parent?.page_id }
      })
    }
  },
  AuthPayload: {
    customer: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findUnique({
        where: { username: parent?.customer.username }
      })
    }
  },
  Customer: {
    level: (parent: any, _args: any, context: Context) => {
      return context.prisma.customer_level.findUnique({
        where: { level_id: parent?.level_id }
      })
    },
    address: (parent: any, _args: any, context: Context) => {
      return context.prisma.customer_address.findMany({
        where: { customer_id: parent?.customer_id }
      })
    },
    vouchers: (parent: any, _args: any, context: Context) => {
      return context.prisma.vouchers.findMany({
        where: { customer_id: parent?.customer_id }
      })
    },
    orders: (parent: any, _args: any, context: Context) => {
      return context.prisma.orders.findMany({
        where: { customer_id: parent?.customer_id }
      })
    },
    point_histories: (parent: any, _args: any, context: Context) => {
      return context.prisma.point_histories.findMany({
        where: {
          customer_id: parent?.customer_id
        }
      })
    }
  },
  CustomerLevel: {
    customers: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findMany({
        where: { level_id: parent?.level_id }
      })
    }
  },
  CustomerAddress: {
    customer: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findUnique({
        where: { customer_id: parent?.customer_id }
      })
    }
  },
  Invoice: {
    customer: (parent: any, _args: any, context: Context) => {
      if (parent?.customer_id) {
        return context.prisma.customers.findFirst({
          where: { customer_id: parent?.customer_id }
        })
      }
    },
    invoice_details: (parent: any, _args: any, context: Context) => {
      return context.prisma.invoice_details.findMany({
        where: { invoice_id: parent?.invoice_id }
      })
    }
  },
  InvoiceDetail: {
    invoice: (parent: any, _args: any, context: Context) => {
      return context.prisma.invoices.findUnique({
        where: { invoice_id: parent?.invoice_id }
      })
    },
    item: (parent: any, _args: any, context: Context) => {
      return context.prisma.menu.findUnique({
        where: { item_id: parent?.item_id }
      })
    }
  },
  Order: {
    customer: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findFirst({
        where: { customer_id: parent?.customer_id }
      })
    },
    order_details: (parent: any, _args: any, context: Context) => {
      return context.prisma.order_details.findMany({
        where: { order_id: parent?.order_id }
      })
    }
  },
  OrderDetail: {
    order: (parent: any, _args: any, context: Context) => {
      return context.prisma.orders.findUnique({
        where: { order_id: parent?.order_id }
      })
    },
    item: (parent: any, _args: any, context: Context) => {
      return context.prisma.menu.findUnique({
        where: { item_id: parent?.item_id }
      })
    }
  },
  PointsHistory: {
    customer: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findUnique({
        where: { customer_id: parent?.customer_id }
      })
    },
    voucher: (parent: any, _args: any, context: Context) => {
      return context.prisma.vouchers.findFirst({
        where: { voucher_id: parent?.voucher_id }
      })
    },
    order: (parent: any, _args: any, context: Context) => {
      return context.prisma.orders.findFirst({
        where: { order_id: parent?.order_id }
      })
    },
    invoice: (parent: any, _args: any, context: Context) => {
      if (parent?.invoice_id) {
        return context.prisma.invoices.findFirst({
          where: { invoice_id: parent.invoice_id }
        })
      } else {
        return null
      }
    }
  },
  Reservation: {
    table: (parent: any, _args: any, context: Context) => {
      return context.prisma.tables.findFirst({
        where: { table_id: parent?.table_id }
      })
    },
    customer: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findUnique({
        where: { customer_id: parent?.customer_id }
      })
    }
  },
  Review: {
    customer: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers
        .findUnique({
          where: { customer_id: parent?.customer_id }
        })
        .reviews()
    }
  },
  Voucher: {
    customer: (parent: any, _args: any, context: Context) => {
      return context.prisma.customers.findFirst({
        where: { customer_id: parent?.customer_id }
      })
    }
  },
  AuthEmployee: {
    employee: (parent: any, _args: any, context: Context) => {
      return context.prisma.employees.findUnique({
        where: { employee_id: parent?.employee.employee_id }
      })
    }
  },
  Employee: {
    position: (parent: any, _args: any, context: Context) => {
      return context.prisma.positions.findUnique({
        where: { position_id: parent?.position_id }
      })
    }
  },
  Position: {
    employees: (parent: any, _args: any, context: Context) => {
      return context.prisma.employees.findMany({
        where: { position_id: parent?.position_id }
      })
    }
  }
}

// Interface
interface PositionInput {
  name: string
  description: string
  salary: string
}
interface EmployeeInput {
  name: string
  gender: string
  email: string
  phone: string
  address: string
  birthday: Date
  positionId: number
  isAdmin: boolean
  status: boolean
  username: string
  password: string
}
interface VoucherInput {
  customerId: number
  name: string
  code: string
  description: string
  discount: number
  expiredDate: string
  minSpend: number
  maxDiscount: number
  status: string
}
interface ReviewInput {
  customerId: number
  content: string
  rating: number
  status: string
}
interface ReservationInput {
  customerId?: number
  tableId?: number
  name: string
  phone: string
  email: string
  capacity: number
  note: string
  reservation_time: string
  reservation_date: Date
  status: string
}
interface TableInput {
  name: string
  capacity: number
  status: string
}
interface RevenueInput {
  date: Date
  revenue: number
  cost: number
}
interface PromotionInput {
  name: string
  description: string
  startDate: Date
  endDate: Date
  target: string
  condition: string
  discount: number
  status: string
}
interface PointsHistoryInput {
  customerId: number
  orderId?: number
  invoiceId?: number
  voucherId?: number
  earnedPoints?: number
  deductedPoints?: number
  transactionDate: Date
}
interface OrderDetailInput {
  orderId: number
  itemId: number
  quantity: number
  price: number
  total: number
}
interface OrderInput {
  date: Date
  customerId: number
  status: string
  address: string
  voucherId: number
  transportFee: number
  paymentMethod: string
  paymentStatus: string
  total: number
  note?: string
  orderDetails: OrderDetailInput[]
}
interface InvoiceDetailInput {
  invoiceId: number
  itemId: number
  quantity: number
  price: number
  total: number
}
interface InvoiceInput {
  customerId?: number
  voucherId?: number
  paymentMethod: string
  paymentStatus: string
  totalPrice: number
  note?: string
  invoiceDetails: InvoiceDetailInput[]
}
interface CustomerLevelInput {
  name: string
  description: string
  discount: number
  points: number
  benefits: string
}
interface CustomerAddressInput {
  customerId: number
  address: string
}
interface CustomerInput {
  name?: string
  phone?: string
  email: string
  addresses?: CustomerAddressInput[]
  birthday?: Date
  points?: number
  levelId?: number
  status?: boolean
  username: string
  password: string
}
interface PageInput {
  name: string
}
interface ContentInput {
  title: string
  slogan?: string
  image?: string
  description: string
  position?: number
  pageId?: number
}
interface MenuInput {
  categoryId: number
  name: string
  description: string
  price: number
  image: string
}
interface CategoryInput {
  name: string
  menu?: MenuInput[]
}
