import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.header('Authorization')
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return res
      .sendStatus(401)
      .json({ success: false, message: 'Invalid authorization header' })
  }
  const token = authorizationHeader.split(' ')[1]
  try {
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret as string)
    req.body.user = decoded
    next()
  } catch (error) {
    console.error(error)
    return res
      .sendStatus(401)
      .json({ success: false, message: 'IAuthorization token not found' })
  }
}
export default validateTokenMiddleware
