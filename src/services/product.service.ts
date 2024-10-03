import { json } from 'stream/consumers';
import { Product } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';
import * as fs from 'fs';
const PATH_TO_JSON_FILE = 'src/data/products.json';

export class ProductService {
  public static async getAllProducts(): Promise<Product[]> {
    let productModel: ProductModel;
    let productList: Product[] = [];
    const response = fs.readFileSync(PATH_TO_JSON_FILE, 'utf8');
    const json = await JSON.parse(response);
    json.forEach((element: any) => {
      productModel = new ProductModel(element.id, element.name, element.description, element.category, element.quantity, element.price);
      productList.push(productModel);
    });
    return productList;
  }
  
  public static async createNewProduct(name:string, description:string, category: string, price:number, quantity:number):  Promise<number> {
    let code:number;
    let productList: Product[] = await ProductService.getAllProducts();
    console.log("Service before try")
    try {
      let product = productList.at(-1);
      let id: number = product!.id+1;
      let newProduct: ProductModel = new ProductModel(id, name, description,category,price,quantity)
      productList.push(newProduct);
      console.log('The new product has been created');
      code = 201;
    } catch (error) {
      console.log("Inside ERR");
      code = 404
    }
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
    return code;
  }
  public static async modifyProduct(id:number,name:string, description:string, category: string, price:number, quantity:number):  Promise<number> {
    let code:number;
    let productList: Product[] = await ProductService.getAllProducts();
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
          console.log(product);
      }else{
        code = 404;
      }
      
    } catch (error) {
      code = 400
    }
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
    return code;
  }
  public static async deleteProduct(id:number):  Promise<number> {
    let code:number;
    let productList: Product[] = await ProductService.getAllProducts();
    try {
      let product = productList.at(id-1);
      if(product == null || product == undefined){
        code = 404;
      }else{
          productList.splice(id-1,1);
          code = 204;
      }
    } catch (error) {
      code = 400
    }
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
    return code;
  }
  public static async getAllFilteredProducts(filterOption:string, min:number, max:number): Promise<Product[]> {
    let productList: Product[] = await ProductService.getAllProducts();
    let filteredProductList: Product[] = [];
    if(filterOption == "price"){
      productList.forEach((product) => {
        if(product.price >= min && product.price <= max){
          filteredProductList.push(product); 
        }
      })
        return filteredProductList;
      } else if(filterOption == "quantity"){
      productList.forEach((product) => {
        if(product.quantity >= min && product.quantity <= max){
            filteredProductList.push(product);
      }
      })
      return filteredProductList;
    }
    
    return productList;
  }
}


