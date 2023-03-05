import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import 'dotenv/config'

const prisma = new PrismaClient()

export async function verifyJTW(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['access-token'] as string
    if (!token) return res.status(403).json({ message: 'Token not provided', data: {} })

    const packageSent = Object(verify(token, process.env.SECRET as string))

    const user = await prisma.user.findUnique({ where: { id: packageSent.id }})
    if (!user) return res.status(404).json({ message: 'User not found', data: {} })

    next()
}