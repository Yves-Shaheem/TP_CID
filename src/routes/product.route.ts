import { Router } from 'express';
import {ProductController} from '../controllers/product.controller'
import { ProductModel } from '../models/product.model';

const router = Router();
const productController = new ProductController();
/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - quantity
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           description: Identification number of the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         category:
 *           type: string
 *           description: Category of product
 *         quantity:
 *           type: number
 *           description: Number of products available
 *         price:
 *           type: number
 *           description: Category of product
 *       example:
 *         id: 1
 *         name: Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
 *         description: Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday
 *         category: Men's clothing
 *         quantity: 40
 *         price: 109.95
*/
/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
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
 *                  category:
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
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid query 
 *       404:
 *         description: Product not found
 */      
router.post('/products', productController.createNewProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Modify a product by id
 *     tags: [Products]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid query 
 */      
router.put('/products/:id', productController.modifyProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by id
 *     tags: [Products]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product's id
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid query 
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized user
 */      
router.delete('/products/:id', productController.deleteProduct);

export default router;