import nodemailer from 'nodemailer'

export const sendMail = async ({ subject, uses, args }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const htmlResetPassword = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Yêu cầu đổi mật khẩu của bạn</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }
        
        .container {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 10px;
        }
        
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        
        .content {
          margin-top: 10px;
        }
        .note{
          margin-top: 10px;
          font-size: 12px;
          color: red;
        }
        .pin {
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
        
        img {
          float: left;
          margin-right: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="https://i.imgur.com/PwVKObJ.png" width="50" height="50" />
        <h1 class="title">Yêu cầu đổi mật khẩu của bạn</h1>
        <p class="content">Xin chào ${args.name},</p>
        <p class="content">Bạn đã yêu cầu đổi mật khẩu cho tài khoản của bạn. Mã PIN của bạn là:</p>
        <p class="pin">${args.pin}</p>
        <p class="content">Vui lòng nhập mã PIN này vào trang quên mật khẩu để hoàn tất quá trình.</p>
        <p class="content">Trân trọng,</p>
        <p class="content">Đội ngũ ${args.appName}</p>
        <p class="note">Lưu ý: Mã PIN này chỉ tồn tại trong vòng 5 phút!</p>
      </div>
    </body>
  </html>
`
  const htmlVerifyEmail = `
<!DOCTYPE html>
<html>
  <head>
    <title>Xác nhận tài khoản của bạn</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
      
      .container {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 10px;
      }
      
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      
      .content {
        margin-top: 10px;
      }
      
      img {
        float: left;
        margin-right: 10px;
      }

      .button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://i.imgur.com/PwVKObJ.png" width="50" height="50" />
      <h1 class="title">Xác thực tài khoản của bạn</h1>
      <p class="content">Xin chào ${args.name},</p>
      <p class="content">Cảm ơn bạn rất nhiều đã đăng ký.</p>
      <p class="content">Hãy nhấn vào nút xác thực dưới đây để hoàn tất việc đăng ký.</p>
      <a href="${args.confirmationLink}" class="button">Xác thực tài khoản</a>
    </div>
  </body>
</html>
`

  const htmlReservationSuccess = `
<!DOCTYPE html>
<html>
  <head>
    <title>Xác nhận đặt bàn của bạn</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
      
      .container {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 10px;
      }
      
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      
      .content {
        margin-top: 10px;
      }

      img {
        float: left;
        margin-right: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://i.imgur.com/PwVKObJ.png" width="50" height="50" />
      <h1 class="title">Xác nhận đặt bàn của bạn</h1>
      <p class="content">Xin chào ${args.name},</p>
      <p class="content">Cảm ơn bạn đã đặt bàn tại nhà hàng của chúng tôi. Dưới đây là thông tin đặt bàn của bạn:</p>
      <p class="content">Tên khách hàng: ${args.name}</p>
      <p class="content">Thời gian: ${args.reservation_time}</p>
      <p class="content">Ngày: ${formatDate(args.reservation_date)}</p>
      <p class="content">Số lượng khách: ${args.capacity}</p>
      <p class="content">Chúng tôi rất mong được phục vụ bạn.</p>
      <p class="content">Trân trọng,</p>
      <p class="content">Đội ngũ ${args.appName}</p>
    </div>
  </body>
</html>
`

  return transporter
    .sendMail({
      from: process.env.EMAIL_USERNAME,
      to: args.email,
      subject,
      html:
        uses === 'resetPassword'
          ? htmlResetPassword
          : uses === 'verifyEmail'
          ? htmlVerifyEmail
          : uses === 'reservation'
          ? htmlReservationSuccess
          : ''
    })
    .then((info) => {
      console.log('Email sent: ' + info.response)
      return info
    })
    .catch((error) => {
      throw new Error('Failed to send email: ' + error.message)
    })
}
function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('-')
}
