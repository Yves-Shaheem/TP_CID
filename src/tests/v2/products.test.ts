import {describe, expect, test} from '@jest/globals';
import { ProductService } from "../../services/v2/product.service";
import { config } from '../../config/config';
import {DB_connection}  from '../../data/db.data'
import { Product } from '../../models/v2/product.model';
let id: string;
beforeAll(async () => {
    DB_connection(config.databaseUrl);
    await Product.deleteMany({"name":"IPhone"});
    const product = new Product({
        name: "Book",
        description:"regular book",
        category:"Entertainment",
        quantity:100,
        price:10
    })
    const newProduct = await product.save();
    id = product.id;
    
});
describe("Create a new product", () => {
    test("Should return HTTP code if product have been created", async () =>{
        const products = await ProductService.createNewProduct("IPhone", "Iphone 16 with cable", "electronics",1700,80);
        expect(products).toBe(201);
    })
})
describe("Get all products", ()=> {
    test("Should return all products", async () =>{
        const products =  await ProductService.getAllProducts();
        expect(products?.length).toBe(2);
    })
})
describe("Modifying the product", ()=> {
    test("Should return HTTP code if product have been modified", async () =>{
        const products = await ProductService.modifyProduct(id,"IPhone", "Iphone 16 with cable", "electronics",1700,80);
        expect(products).toBe(200);
    })
})
describe("Deleting the product", ()=> {
    test("Should return HTTP code if product have been deleted", async () =>{
        const products = await ProductService.deleteProduct(id);
        expect(products).toBe(204);
    })
})
describe("Filtered products", ()=>{
    test("Should return filtered list of products", async () =>{
        const products = await ProductService.getAllFilteredProducts("price", 2000, 3000);
        expect(products.length).toBe(0);
    })
})