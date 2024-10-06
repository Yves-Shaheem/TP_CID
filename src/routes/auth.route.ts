import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid query 
 *       401:
 *         description: Unauthaurised User
 */    
router.post('/users/register', authController.createNewUser);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                email:
 *                  type: string
 *                  description: Email of the user
 *                password:
 *                  type: string
 *                  description: Passowrd of the user, it will be encrypted               
 *     responses:
 *       201:
 *         description: User logged successfully
 *       400:
 *         description: Invalid query 
 *       403:
 *         description: Invalid username or password
 */
router.post('/users/login', authController.login);

export default router;
