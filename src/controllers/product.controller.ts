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
    
    res.status(200).json(products);
    
  }

  public async createNewProduct(req: Request, res: Response): Promise<void> {
    let code:number;
    let message:string;
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = req.body.price;
    let quantity = req.body.quantity;
    if(nameRegex(name) && priceRegex(price) && quantityRegex(quantity)){
      code = await ProductService.createNewProduct(name, description,category,price,quantity);
      message = "The new product have been created succesfully";
      logger.info("The new product have been created succesfully");
    }else{
      code = 400;
      message = "Error to create a new product";
      logger.error("Error to create a new product" + code);
      
    }
    res.status(code).json(message);
  }
  public async modifyProduct(req: Request, res: Response){    
    let code:number;
    let message:string;
    let id = parseInt(req.params.id);
    console.log(id)
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = req.body.price;
    let quantity = req.body.quantity;
    if(nameRegex(name) && priceRegex(price) && quantityRegex(quantity)){
      code = await ProductService.modifyProduct(id,name, description,category,price,quantity);
      message = "The new product have been modified succesfully";
      logger.info("The new product have been modified succesfully");
    }else{
      code = 400;
      message = "Error to modify a new product";
      logger.error("Error to modify the product" + code);
    }
    res.status(code).json(message);
  }
  public async deleteProduct(req: Request, res: Response){  
    let message:string;  
    let id = parseInt(req.params.id);
    console.log(id)
    const code = await ProductService.deleteProduct(id);
    if(code == 204 || code == 200){
      message = "The new product have been deleted succesfully";
      logger.info("The new product have been deleted succesfully");
    }else{
      message = "Error to delete a new product";
      logger.error("Error to delete a new product" + code);
    }
    res.status(code).json(message);
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