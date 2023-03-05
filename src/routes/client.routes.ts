import { Router } from 'express'
import { verifyJTW } from '../middlewares/authentication'
import * as clientController from '../controllers/client.controller'

const router: Router = Router()

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Lets anyone see the available product list
 *          tags: ['Anon']
 *          responses:
 *              200:
 *                  description: Successfully gave the products list
 *              500:
 *                  description: Server fail
 */
router.get('/products', clientController.getProducts)

/**
 * @swagger
 * /api/product/:id:
 *      get:
 *          summary: Gives product details
 *          tags: ['Anon']
 *          responses:
 *              200:
 *                  description: Gave the product information
 *              400:
 *                  description: Product not found
 *              500:
 *                  description: Server fail
 */
router.get('/product/:id', clientController.getProduct)

/**
 * @swagger
 * /api/purchase:
 *      post:
 *          summary: Buys an order from the cart
 *          tags: ['Client']
 *          responses:
 *              200:
 *                  description: Gave the product information
 *              400:
 *                  description: Product not found
 *              500:
 *                  description: Server fail
 */
router.post('/purchase/', verifyJTW, clientController.buyOrder)

/**
 * @swagger
 * /api/purchase/add:
 *      post:
 *          summary: Adds an item to the cart
 *          tags: ['Client']
 *          responses:
 *              200:
 *                  description: Gave the product information
 *              400:
 *                  description: Product not found
 *              500:
 *                  description: Server fail
 */
router.post('/purchase/add', verifyJTW, clientController.addItemToOrder)

/**
 * @swagger
 * /api/product/like/:id:
 *      put:
 *          summary: Increases the like count of a product by one
 *          tags: ['Client']
 *          responses:
 *              200:
 *                  description: Retrieves the liked product
 *              400:
 *                  description: Product not found
 *              500:
 *                  description: Server fail
 */
router.put('/product/like/:id', verifyJTW, clientController.likeProduct)

/**
 * @swagger
 * /api/order/:id:
 *      get:
 *          summary: Returns the requested order
 *          tags: ['Client']
 *          responses:
 *              200:
 *                  description: Gets the order information
 *              400:
 *                  description: User or product not found on the database
 *              500:
 *                  description: Server fail
 */
router.get('/order/:id', verifyJTW, clientController.getOrder)

export default router