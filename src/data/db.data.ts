import { Product } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';
import * as fs from 'fs';
const PATH_TO_JSON_FILE = 'src/data/products.json';


async function fetchAPI(){
    let productList: Product[] = [];
    let productModel: ProductModel;
    const response = await fetch('https://fakestoreapi.com/products');
    const json = await response.json();
    json.forEach((element: any) => {
      productModel = new ProductModel(element.id, element.title, element.description, element.category, Math.floor(Math.random() * 100), Number(element.price));
      productList.push(productModel);
    });
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(productList), 'utf8');
}
export default fetchAPI;
