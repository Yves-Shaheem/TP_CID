import { IProduct } from '../../interfaces/v1/product.interface';

export class ProductModel implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public description:string,
    public category: string, 
    public quantity:number, 
    public price:number
  ) {}
}