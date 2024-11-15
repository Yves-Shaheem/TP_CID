import { json } from 'stream/consumers';
import { IProduct } from '../../interfaces/v1/product.interface';
import { ProductModel } from '../../models/v1/product.model';
import * as fs from 'fs';
import { logger } from '../../utils/logger';
const PATH_TO_JSON_FILE = 'src/data/products.json';

export class ProductService {
  public static async getAllProducts(): Promise<IProduct[]> {
    let productModel: ProductModel;
    let productList: IProduct[] = [];
    const response = fs.readFileSync(PATH_TO_JSON_FILE, 'utf8');
    const json = await JSON.parse(response);
    json.forEach((element: any) => {
      productModel = new ProductModel(element.id, element.name, element.description, element.category, element.quantity, element.price);
      productList.push(productModel);
    });
    logger.info("The product's list have been recuperated ");
    return productList;
  }
  
  public static async createNewProduct(name:string, description:string, category: string, price:number, quantity:number):  Promise<number> {
    let code:number;
    let productList: IProduct[] = await ProductService.getAllProducts();
    try {
      let product = productList.at(-1);
      let id: number = product!.id+1;
      let newProduct: ProductModel = new ProductModel(id, name, description,category,price,quantity)
      productList.push(newProduct);
      logger.info("The product have been created");
      code = 201;
    } catch (error) {
      logger.error("Something bad happen");

      code = 404
    }
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
    return code;
  }
  public static async modifyProduct(id:number,name:string, description:string, category: string, price:number, quantity:number):  Promise<number> {
    let code:number;
    let productList: IProduct[] = await ProductService.getAllProducts();
    try {
      let product = productList.at(id-1);
      if(product != null || product != undefined){
          console.log(product);
          product.name = name;
          product.description = description;
          product.price = price;
          product.quantity = quantity;
          product.category = category;
          code = 200;
          logger.info("The product have been modified");
      }else{
        code = 404;
        logger.error("The products not found");
      }
      
    } catch (error) {
      logger.error("Something bad happen");
      code = 400
    }
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
    return code;
  }
  public static async deleteProduct(id:number):  Promise<number> {
    let code:number;
    let productList: IProduct[] = await ProductService.getAllProducts();
    try {
      let product = productList.at(id-1);
      if(product == null || product == undefined){
        code = 404;
      }else{
          productList.splice(id-1,1);
          code = 204;
          logger.info("The product have been deleted");
      }
    } catch (error) {
      logger.error("Something bad happen");
      code = 400
    }
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
    return code;
  }
  public static async getAllFilteredProducts(filterOption:string, min:number, max:number): Promise<IProduct[]> {
    let productList: IProduct[] = await ProductService.getAllProducts();
    let result: IProduct[] = [];
    if(min > max){
      let temp = max;
      max = min;
      min = temp;
    }
    if(filterOption == "price"){
      productList.forEach((product) => {
        if(product.price >= min && product.price <= max){
          result.push(product); 
        }
      })
      logger.info("The product's list have been recuperated and filtered");
      } else if(filterOption == "quantity"){
      productList.forEach((product) => {
        if(product.quantity >= min && product.quantity <= max){
            result.push(product);
      }
      })
      logger.info("The product's list have been recuperated ");
    } else {
        result = productList;
        logger.error("Something bad happen");
    }
    return result;
  }
}


