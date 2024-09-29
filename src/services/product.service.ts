import { Product } from '../interfaces/product.interface';
import { ProductModel } from '../models/product.model';

export class ProductService {
  public static async getAllProducts(): Promise<Product[]> {
    // Logique pour récupérer tous les utilisateurs
    fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>console.log(json))
    return [new ProductModel(1, 'Phone','Appareil telephonique','Electronics',4,50)];
  }
}