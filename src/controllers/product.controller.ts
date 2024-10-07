import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { logger } from '../utils/logger';

export class ProductController {
  public async getProducts(req: Request, res: Response): Promise<void> {
    let filterOption = req.query.filterOption as string;
    let min = parseInt(req.query.min as string);
    let max = parseInt(req.query.max as string);
    let products = [];
    if(filterOption == "price" || filterOption =="quantity"){
        if(Number.isInteger(min) && Number.isInteger(max)){
          products = await ProductService.getAllFilteredProducts(filterOption, min, max);
        }else{
          products = await ProductService.getAllProducts();
        }
    }else{
      products = await ProductService.getAllProducts();
    }
    res.json(products);
    
  }

  public async createNewProduct(req: Request, res: Response): Promise<void> {
    let code:number;
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = req.body.price;
    let quantity = req.body.quantity;
    if(nameRegex(name) && priceRegex(price) && quantityRegex(quantity)){
      code = await ProductService.createNewProduct(name, description,category,price,quantity);
    }else{
      code = 400;
    }
    res.json(code);
  }
  public async modifyProduct(req: Request, res: Response){    
    let code:number;
    let id = parseInt(req.params.id);
    console.log(id)
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = req.body.price;
    let quantity = req.body.quantity;
    if(nameRegex(name) && priceRegex(price) && quantityRegex(quantity)){
      code = await ProductService.modifyProduct(id,name, description,category,price,quantity);
    }else{
      code = 400;
    }
    res.json(code);
  }
  public async deleteProduct(req: Request, res: Response){    
    let id = parseInt(req.params.id);
    console.log(id)
    const code = await ProductService.deleteProduct(id);
    res.json(code);
  }

}
function nameRegex(params:string){
  const nameValidator = /^[a-z A-Z 0-9]{3,50}$/;
  return nameValidator.test(params);
}
function priceRegex(params:string){
  const nameValidator = /^\d+(\.\d+)?$/;
  return nameValidator.test(params);
}
function quantityRegex(params:string){
  const nameValidator = /^\d+$/;
  return nameValidator.test(params);
}