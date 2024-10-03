import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';

export class ProductController {
  public async getAllProducts(req: Request, res: Response): Promise<void> {
    const products = await ProductService.getAllProducts();
    res.json(products);
  }
  public async createNewProduct(req: Request, res: Response): Promise<void> {
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = req.body.price;
    let quantity = req.body.quantity;
    const code = await ProductService.createNewProduct(name, description,category,price,quantity);
    res.json(code);
  }
  public async modifyProduct(req: Request, res: Response){    
    let id = parseInt(req.params.id);
    console.log(id)
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = req.body.price;
    let quantity = req.body.quantity;
    const code = await ProductService.modifyProduct(id,name, description,category,price,quantity);
    res.json(code);
  }
  public async deleteProduct(req: Request, res: Response){    
    let id = parseInt(req.params.id);
    console.log(id)
    const code = await ProductService.deleteProduct(id);
    res.json(code);
  }
  
}