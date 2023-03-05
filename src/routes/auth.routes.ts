import { Router } from 'express'
import { signIn, signOut, signUp } from '../controllers/auth.controller'

const router: Router = Router()

/**
 * @swagger
 * /api/signin:
 *      post:
 *          summary: Logs in a user
 *          tags: ['Authentication']
 *          responses:
 *              200:
 *                  description: Gives you a token for authentication
 *              400:
 *                  description: Email not registered
 *              401:
 *                  description: Incorrect password
 *              500:
 *                  description: Server fail
 */
router.post('/signin', signIn)

/**
 * @swagger
 * /api/signup:
 *      post:
 *          summary: Creates a user
 *          tags: ['Authentication']
 *          responses:
 *              200:
 *                  description: Gives you a token for authentication
 *              400:
 *                  description: User already exists
 *              500:
 *                  description: Server fail
 */
router.post('/signup', signUp)

/**
 * @swagger
 * /api/signout:
 *      post:
 *          summary: Logs out a user
 *          tags: ['Authentication']
 *          responses:
 *              200:
 *                  description: Successfully deletes the session
 *              400:
 *                  description: Session not found
 *              500:
 *                  description: Server fail
 */
router.post('/signout', signOut)

export default router