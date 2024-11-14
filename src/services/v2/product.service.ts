import { logger } from '../../utils/logger';
import {Product} from '../../models/v2/product.model';

export class ProductService {
  public static async getAllProducts() {
   try {
      const products = await Product.find();
      logger.info("The products have been recuperated");
      return products;
    } catch (error) {
      logger.error("Not able to recuperate the products Error:"+ error);
   }
  }
  
  public static async createNewProduct(name:string, description:string, category: string, price:number, quantity:number):  Promise<number> {
    let code:number;
    const product = new Product({
      name: name,
      description:description,
      category:category,
      quantity:quantity,
      price:price
    })
    try {
      const newProduct = await product.save();
      logger.info("The product have been created");
      code = 201;
    } catch (error) {
      logger.error("Something bad happen:" + error);
      code = 404
    }
    return code;
  }
  public static async modifyProduct(id:number,name:string, description:string, category: string, price:number, quantity:number):  Promise<number> {
    let code:number;
    let updatedData = {
        name:name,
        description:description,
        category:category,
        quantity:quantity,
        price:price
    }
    try {
      const res = await Product.findByIdAndUpdate(id, updatedData)
      code = 200;
      logger.info("The product have been modified");
      
    } catch (error) {
      logger.error("Something bad happen");
      code = 400
    }
    return code;
  }
  public static async deleteProduct(id:number):  Promise<number> {
    let code:number;
    try {
      const res = await Product.findByIdAndDelete(id);
      code = 204;
      logger.info("The product have been deleted");
    } catch (error) {
      logger.error("Something bad happen");
      code = 400
    }
    return code;
  }
  public static async getAllFilteredProducts(filterOption:string, min:number, max:number) {
    if(min > max){
      let temp = max;
      max = min;
      min = temp;
    }
    if(filterOption == "price"){
        const products = Product.find({"price":{"$gt":min , "$lt": max}});
        logger.info("The filtered products have been recuperated");
        return products;
      }
      else if(filterOption == "quantity"){
          const products = Product.find({"quantity":{"$gt":min , "$lt": max}});
          logger.info("The filtered products have been recuperated");
          return products;
      }
      else {
        const products = Product.find();
        logger.error("All products have been recuperated");
        return products;
    }
  }
}


