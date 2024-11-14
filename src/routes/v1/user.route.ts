import { Router } from 'express';
import { UserController } from '../../controllers/v1/user.controller';
import { allRole, administratorRole, employeeRole } from '../../utils/role.util';
import { verifyToken } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/roles.middleware';

const router = Router();
const userController = new UserController();
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Passowrd of the user, it will be encrypted
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: Zjf6Wyf16daw213rOPFvTtIGcuzp9eXvVTo773Xs27mRunsX37uBjBsRogIexh91f0aMusFz2drUPUFnRgl3fzlZZQ==
*/
/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     description: Retrieve a list of users from the API. Can be used to populate a list of users in your system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid query
 *  
 */
router.get('/users', verifyToken, roleMiddleware(administratorRole), userController.getAllUsers);

export default router;