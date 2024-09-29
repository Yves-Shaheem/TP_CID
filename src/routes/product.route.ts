import { Router } from 'express';
import {ProductController} from '../controllers/product.controller'

const router = Router();
const productController = new ProductController();
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products from the API. Can be used to populate a list of products in your system.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  id:
 *                     type: integer
 *                     example: 1
 *                  name:
 *                     type: string
 *                     example: Iphone 16 pro
 *                  description:
 *                     type: string
 *                     example : iPhone 16 Pro helps you write, express yourself and get things done effortlessly
 *                  categorie:
 *                      type: string
 *                      example: Electronics
 *                  quantity:
 *                      type: number 
 *                      example: 50
 *                  price:
 *                      type: number
 *                      example: 1700
 *
*/         
router.get('/products', productController.getAllProducts);

export default router;