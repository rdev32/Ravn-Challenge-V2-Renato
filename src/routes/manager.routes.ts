import { Router } from 'express'
import { verifyJTW } from '../middlewares/authentication'
import * as managerController from '../controllers/manager.controller'

const router: Router = Router()
/**
 *  @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              description: User Model
 *              properties:
 *                  id:
 *                      type: string
 *                      description: User Id
 *                  name:
 *                      type: string
 *                      description: The name of the user
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *                  isManager:
 *                      type: boolean
 *                      description: Indicates whether the user is a manager or not
 *                  order:
 *                      $ref: '#/components/schemas/Order'
 * 
 *          Order:
 *              type: object
 *              description: Order Model
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Order Id
 *                  userId:
 *                      type: string
 *                      description: User Id
 *                  products:
 *                      type: array
 *                      description: The products in the order
 *                      items:
 *                          $ref: '#/components/schemas/Product'
 *                  total:
 *                      type: number
 *                      description: The total price of the order
 * 
 *          Product:
 *              type: object
 *              description: Product Model
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Product Id
 *                  name:
 *                      type: string
 *                      description: The name of the product
 *                  price:
 *                      type: number
 *                      description: The price of the product
 *                  available:
 *                      type: boolean
 *                      description: Indicates whether the product is available for sale or not
 *                  stock:
 *                      type: number
 *                      description: The stock this store has available
 *                  likes:
 *                      type: number
 *                      description: Count of how many users liked this product
 *                  pictures:
 *                      type: array
 *                      description: List of URLs for pictures of the product
 *                      items:
 *                          type: string
 *                          description: URL
 *                  category:
 *                      type: array
 *                      description: List of categories the product belongs to
 *                      items:
 *                          tag:
 *                              type: string
 *                              description: Tag for filtering products
 * 
 *          Response:
 *              type: object
 *              description: API standard response, you'll see it everywhere
 *              properties:
 *                  message: 
 *                      type: string
 *                      description: An information about the request message
 *                  data:
 *                      type: object
 *                      description: The data for the request is here
 * 
 *          Page:
 *              type: object
 *              description: Pagination response
 *              properties:
 *                  data:
 *                      type: object
 *                      description: Data requested
 *                  page: 
 *                      type: number
 *                      description: The page where you are
 *                  next:
 *                      type: object
 *                      description: Contains information for the next page
 *                      items:
 *                          page: 
 *                              type: number
 *                              description: What will the next page be
 *                          limit:
 *                              type: number
 *                              description: The limit of items you'll see
 *                          url: 
 *                              type: string
 *                              description: The URL for the next page
 *                  prev:
 *                      type: object
 *                      description: Contains information for the previous page
 *                      items:
 *                          page: 
 *                              type: number
 *                              description: What will the next page be
 *                          limit:
 *                              type: number
 *                              description: The limit of items you'll see
 *                          url: 
 *                              type: string
 *                              description: The URL for the next page
 */


/**
 * @swagger
 * /api/product:
 *      post:
 *          summary: Creates a product
 *          tags: ['Manager']
 *          responses:
 *              200:
 *                  description: Retrieves the submitted product
 *              400:
 *                  description: Submitted object lacks a required attribute
 *              500:
 *                  description: Server fail
 */
router.post('/product', verifyJTW, managerController.createProduct)

/**
 * @swagger
 * /api/product/:id:
 *      put:
 *          summary: Updates a product
 *          tags: ['Manager']
 *          responses:
 *              200:
 *                  description: Retrieves the new edited product
 *              400:
 *                  description: The product doesn't exist
 *              500:
 *                  description: Server fail
 */
router.put('/product/:id', verifyJTW, managerController.updateProduct)

/**
 * @swagger
 * /api/product/disable/:id:
 *      put:
 *          summary: Disabled a product
 *          tags: ['Manager']
 *          responses:
 *              200:
 *                  description: Retrieves the submitted product
 *              500:
 *                  description: Server fail
 */
router.put('/product/disable/:id', verifyJTW, managerController.disableProduct)
/**
 * @swagger
 * /product:
 *      put:
 *          summary: Creates a product
 *          tags: ['Manager']
 *          responses:
 *              200:
 *                  description: Retrieves the submitted product
 *              500:
 *                  description: Server fail
 */
router.put('/product/images/:id', verifyJTW, managerController.updateImages)
/**
 * @swagger
 * /product:
 *      delete:
 *          summary: Creates a product
 *          tags: ['Manager']
 *          responses:
 *              200:
 *                  description: Retrieves the submitted product
 *              500:
 *                  description: Server fail
 */
router.delete('/product/:id', verifyJTW, managerController.deleteProduct)
/**
 * @swagger
 * /product:
 *      get:
 *          summary: Creates a product
 *          tags: ['Manager']
 *          responses:
 *              200:
 *                  description: Retrieves the submitted product
 *              500:
 *                  description: Server fail
 */
router.get('/client/orders/:id', verifyJTW, managerController.getClientOrders)
/**
 * @swagger
 * /product:
 *      get:
 *          summary: Creates a product
 *          tags: ['Manager']
 *          responses:
 *              200:
 *                  description: Retrieves the submitted product
 *              500:
 *                  description: Server fail
 */
router.get('/clients', verifyJTW, managerController.getClients)

export default router