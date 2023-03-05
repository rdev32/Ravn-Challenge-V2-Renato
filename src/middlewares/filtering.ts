import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function filterProducts(tag: string) {
    const filteredProducts = await prisma.product.findMany({ where: { category: tag }})
    return filteredProducts
}