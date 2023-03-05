import 'dotenv/config'
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { compareSync, hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

// login
export async function signIn(req: Request, res: Response) {
    const { email, password, isManager } = req.body
    try {
        const userFound = await prisma.user.findFirst({ where: { email: email } })
        if (!userFound) return res.status(400).json({ message: 'User not found', data: {} })

        const checkPassword = compareSync(password, userFound.password)
        if (!checkPassword) return res.status(401).json({ message: 'Incorrect password', data: {} })
        delete req.body.password

        const token = jwt.sign({ id: userFound.id }, process.env.SECRET as string, { expiresIn: 86400 })
        res.status(200).json({
            message: 'Login success',
            data: {
                token: token
            }
        })

    } catch (error) {
        res.status(500)
    }
}

// logout
export async function signOut(req: Request, res: Response){
    try {
        res.status(200)
    } catch (error) {
        res.status(500)
    }
}

// register
export async function signUp(req: Request, res: Response){
    const { email, password, name, isManager } = req.body
    try {
        const user = await prisma.user.findFirst({ where: { email: email } })
        if (user) return res.status(400).json({ message: 'User already exists', data : user })

        const newUser = await prisma.user.create({
            data :{ 
                email: email,
                password: hashSync(password, 10),
                name: name,
                isManager: isManager || false
            }
        })

        const token = jwt.sign({ id: newUser.id }, process.env.SECRET as string, { expiresIn: 86400 })
        //TODO: store a cookie

        res.status(200).json({
            message: 'New account created',
            data: {
                token: token
            }
        })

    } catch (error) {
        res.status(500)
    }
}