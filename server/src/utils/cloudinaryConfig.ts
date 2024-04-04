import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export const uploadImage = async (fileStr, folder) => {
  try {
    const response = await cloudinary.uploader.upload(fileStr, {
      folder: `samples/${folder}`
    })
    return response.url
  } catch (error: any) {
    console.log(error.message)
  }
}
