import { Request, Response } from 'express'
import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()

// post: create product
export async function createProduct(req: Request, res: Response) {
    const { name, price, available, stock, likes, pictures } = req.body

    const product: Product = {
        name: name,
        price: price,
        available: available,
        stock: stock,
        likes: likes,
        pictures: pictures
    } as Product

    try {
        const data: Product = await prisma.product.create({ data: product })
        if (!data) {
            return res.status(400).json({
                message: 'Product structure did not followed criteria',
                data: product
            })
        }
        res.status(201).json({
            message: 'Product has been created',
            data: data
        })
    } catch (error) {
        res.status(500)
    }
}

// put: update products
export async function updateProduct(req: Request, res: Response) {
    const { name, price, available, stock, likes, pictures } = req.body

    try {
        const data = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
        if (!data) return res.status(400).json({ message: 'Product was not found', data: {} })

        const newProduct: Product = {
            name: name,
            price: price,
            available: available,
            stock: stock,
            likes: likes,
            pictures: pictures
        } as Product

        const dataUpdate: Product = await prisma.product.update({ where: { id: Number(req.params.id) }, data: newProduct })

        res.status(201).json({
            message: 'Product has been modified',
            data: dataUpdate
        })
    } catch (error) {
        res.status(500)
    }
}

// put: disable product
export async function disableProduct(req: Request, res: Response) {
    try {
        const data = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
        if (!data) return res.status(400).json({ message: 'Product was not found', data: {} })

        const product: Product = await prisma.product.update({ where: { id: Number(req.params.id) }, data: { available: false } })
        res.status(200).json({
            message: 'Product disabled',
            data: product
        })
    } catch (error) {
        res.status(500)
    }
}

// put: update images
export async function updateImages(req: Request, res: Response) {
    const newPictures: Array<string> = req.body
    try {
        const data = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
        if (!data) return res.status(400).json({ message: 'Product was not found', data: {} })

        const product: Product = await prisma.product.update({ where: { id: Number(req.params.id) }, data: { pictures: newPictures } })
        res.status(200).json({
            message: 'Product images updated',
            data: product
        })
        res.status(200)
    } catch (error) {
        res.status(500)
    }
}

// delete: delete products
export async function deleteProduct(req: Request, res: Response) {
    try {
        const data = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
        if (!data) return res.status(400).json({ message: 'Product was not found', data: {} })

        await prisma.product.delete({ where: { id: Number(req.params.id) } })
        res.status(200).json({
            message: 'Product deleted',
            data: {}
        })
    } catch (error) {
        res.status(500)
    }
}

// get: show client orders
export async function getClientOrders(req: Request, res: Response) {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id } })
        if (!user) return res.status(400).json({ message: 'User was not found', data: {} })

        const orders = await prisma.order.findMany({ where: { ownerId: user.id }})
        res.status(200).json({
            message: 'Client orders',
            data: orders
        })
    } catch (error) {
        res.status(500)
    }
}

export async function getClients(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({
            message: 'Client List',
            data: users
        })
    } catch (error) {
        res.status(500)
    }
}