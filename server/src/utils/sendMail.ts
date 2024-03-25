import nodemailer from 'nodemailer'

export const sendMail = async ({ to, subject, text }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  return transporter
    .sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text
    })
    .then((info) => {
      console.log('Email sent: ' + info.response)
      return info
    })
    .catch((error) => {
      throw new Error('Failed to send email: ' + error.message)
    })
}
