import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [
      { email: 'user1@example.com', password: hashSync('password1', 10) },
      { email: 'user2@example.com', password: hashSync('password2', 10) },
      { email: 'user3@example.com', password: hashSync('password3', 10) },
      { email: 'admin@example.com', password: 'admin', isManager: true }
    ],
  })

  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Chocolate bar',
        price: 1.99,
        stock: 100,
        pictures: ['https://example.com/chocolate.jpg'],
        category: 'Sweet Snacks'
      },
      {
        name: 'Chips',
        price: 2.99,
        stock: 50,
        pictures: ['https://example.com/chips.jpg'],
        category: 'Salt Snacks'
      },
      {
        name: 'Soda',
        price: 0.99,
        stock: 200,
        pictures: ['https://example.com/soda.jpg'],
        category: 'Beverages'
      },
      {
        name: 'Candy',
        price: 0.49,
        stock: 150,
        pictures: ['https://example.com/candy.jpg'],
        category: 'Sweet Snacks'
      },
      {
        name: 'Gum',
        price: 0.25,
        stock: 300,
        pictures: ['https://example.com/gum.jpg'],
        category: 'Sweet Snacks'
      },
    ],
  })

  console.log('Submited\n', { users, products });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })