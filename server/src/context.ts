import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
}

export const context = ({ req, res }: Context) => ({
  prisma: new PrismaClient(),
  req,
  res
})
