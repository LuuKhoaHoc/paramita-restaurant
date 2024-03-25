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
        <img src="https://i.imgur.com/PwVKObJ.png" width="100" height="100" />
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

  return transporter
    .sendMail({
      from: process.env.EMAIL_USERNAME,
      to: args.email,
      subject,
      html: uses === 'resetPassword' ? htmlResetPassword : ''
    })
    .then((info) => {
      console.log('Email sent: ' + info.response)
      return info
    })
    .catch((error) => {
      throw new Error('Failed to send email: ' + error.message)
    })
}
