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
    try {
      let product = productList.at(-1);
      let id: number = product!.id+1;
      let newProduct: ProductModel = new ProductModel(id, name, description,category,price,quantity)
      productList.push(newProduct);
      console.log('The new product has been created');
      code = 201;
    } catch (error) {
      code = 404
    }

   
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
    return code;
  }
}


