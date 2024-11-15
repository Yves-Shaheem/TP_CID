import {describe, expect, test} from '@jest/globals';
import { ProductService } from "../../services/v2/product.service";

describe("Create a new product", () => {
    test("Should return HTTP code if product have been created", async () =>{
        const products = await ProductService.createNewProduct("IPhone", "Iphone 16 with cable", "electronics",1700,80);
        expect(products).toBe(201);
    })
})
describe("Get all products", ()=> {
    test("Should return all products", async () =>{
        const products =  ProductService.getAllProducts;
        expect(products.length).toBe(2);
    })
})
describe("Modifying the product", ()=> {
    test("Should return HTTP code if product have been modified", async () =>{
        const products = await ProductService.modifyProduct("6736a8bbb25d7e78ee7dec2d","IPhone", "Iphone 16 with cable", "electronics",1700,80);
        expect(products).toBe(200);
    })
})
describe("Deleting the product", ()=> {
    test("Should return HTTP code if product have been deleted", async () =>{
        const products = await ProductService.deleteProduct("6736a8bbb25d7e78ee7dec2d");
        expect(products).toBe(204);
    })
})
describe("Filtered products", ()=>{
    test("Should return filtered list of products", async () =>{
        const products = await ProductService.getAllFilteredProducts("price", 2000, 3000);
        expect(products.length).toBe(0);
    })
})