import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interface';
import { ProductModel } from '../models/product.model';
import * as fs from 'fs';
import { UserModel } from '../models/user.model';
import { key } from '../services/auth.service';
const PATH_TO_JSON_FILE_PRODUCT = 'src/data/products.json';
const PATH_TO_JSON_FILE_USER = 'src/data/users.json';



async function fetchDATA(){
  fetchProducts()
  fetchUsers()
}
async function fetchProducts(){
  let productList: Product[] = [];
  let productModel: ProductModel;
  const response = await fetch('https://fakestoreapi.com/products');
  const json = await response.json();
  json.forEach((element: any) => {
    productModel = new ProductModel(element.id, element.title, element.description, element.category, Math.floor(Math.random() * 100), Number(element.price));
    productList.push(productModel);
  });
  if(!fs.existsSync(PATH_TO_JSON_FILE_PRODUCT)){
    fs.writeFileSync(PATH_TO_JSON_FILE_PRODUCT, JSON.stringify(productList), 'utf8');
  }
  
}
async function fetchUsers(){
  let userList: User[] = [];
  let userModel : UserModel;
  const response = await fetch('https://fakestoreapi.com/users');
  const json = await response.json();
  json.forEach((element: any) => {
    let password = key.encrypt(element.password, 'base64');
    userModel = new UserModel(element.id, element.name.firstname + " " + element.name.lastname, element.email, password, "employee" );
    userList.push(userModel);
  });
  const password = key.encrypt('password', 'base64');
  userModel = new UserModel(21, 'Ad Min', 'admin_123$@example.com',password, "administrator");
  userList.push(userModel);
  fs.writeFileSync(PATH_TO_JSON_FILE_USER, JSON.stringify(userList), 'utf8');
  
}


export default fetchDATA;
