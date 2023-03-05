import { Request, Response } from 'express'
import { PrismaClient, Product } from '@prisma/client'
import { generatePagination } from 'middlewares/pagination'

const prisma = new PrismaClient()

interface OrderPurchase {
    creditCard?: string
    cash?: number
    userId: string
    products: Array<Product>
}

interface ProductPurchase {
    product: Product
    quantity: number
}


// get: see products
export async function getProducts(req: Request, res: Response) {
    try {
        const products: Product[] = await prisma.product.findMany()
        const page: number = Number(req.query.page) || 1
        const limit: number = Number(req.query.limit) || 5

        const results = generatePagination(products, page, limit, req)
        res.status(200).json(results)

    } catch (error) {
        res.status(500)
    }
}

// get: see a product
export async function getProduct(req: Request, res: Response) {
    try {
        const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) }})
        res.status(200).json({
            message: 'Product detail',
            data: product
        })
    } catch (error) {
        res.status(500)
    }
}

// post: buy products cart
export async function buyOrder(req: Request, res: Response) {
    const orderBody: OrderPurchase = req.body
    try {
        // iterate all product ids
        res.status(200)
    } catch (error) {
        res.status(500)
    }
}

// post: add product to cart
export async function addItemToOrder(req: Request, res: Response) {
    const sentData: ProductPurchase = req.body
    try {
        const product = await prisma.product.findUnique({ where: { id: req.body.id }})
        if (!product || product.available || product.stock == 0) { 
            return res.status(400).json({ message: 'Product not found', data: {} })
        }

        const owner = await prisma.user.findUnique({ where: { id: req.body.userId }})
        if (!owner) { 
            return res.status(400).json({ message: 'User not found', data: {} })
        }

        const item: Product = {
            name: sentData.product.name,
            price: sentData.product.price,
            available: sentData.product.available,
            likes: sentData.product.likes || 0,
            stock: sentData.product.stock,
            pictures: sentData.product.pictures || []
        } as Product

        /*
       const newItem: Order = await prisma.order.upsert({
            where: { userId: owner.id },
            create: {

            },
            update: {

            }
        })*/

        if (product) return res.status(200).json({
            message: 'Order updated',
            data: {}
        })
        
        res.status(200).json({
            message: 'Order created',
            data: []
        })
    } catch (error) {
        res.status(500)
    }
}

// put: like product
export async function likeProduct(req: Request, res: Response) {
    const { likes } = req.body || 0
    try {
        const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) }})
        if (!product) { return res.status(400).json({ message: 'Product not found', data: {} })}

        const productLiked = await prisma.product.update({ where: { id: product.id }, data: { likes: likes } })
        res.status(200).json({
            message: 'Someone liked this product!',
            data: productLiked
        })
    } catch (error) {
        res.status(500)
    }
}

// get: show my order
export async function getOrder(req: Request, res: Response) {
    try {
        const orderOwner = await prisma.user.findUnique({ where: { id: req.params.id }})
        if (!orderOwner) return res.status(400).json({ message: 'User not found', data: {} })

        const order = await prisma.order.findMany({ where: { userId: orderOwner.id }})
        if (!orderOwner) return res.status(400).json({ message: 'Order not found', data: {} })

        res.status(200).json({
            message: 'Order detail',
            data: order
        })

    } catch (error) {
        res.status(500)
    }
}