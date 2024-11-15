import { ProductService } from "../services/v1/product.service";

test("Should return all products", async () =>{
    const products =  ProductService.getAllProducts;
    console.log(products);
    expect(products.length).toBe(20);
})
test("Should return HTTP code if product have been created", async () =>{
    const products = await ProductService.createNewProduct("IPhone", "Iphone 16 with cable", "electronics",1700,80);
    expect(products).toBe(201);
})
test("Should return HTTP code if product have been modified", async () =>{
    const products = await ProductService.modifyProduct(1,"IPhone", "Iphone 16 with cable", "electronics",1700,80);
    expect(products).toBe(200);
})
test("Should return filtered list of products", async () =>{
    const products = await ProductService.getAllFilteredProducts("price", 10, 30);
    expect(products.length).toBe(4);
})
test("Should return HTTP code if product have been deleted", async () =>{
    const products = await ProductService.deleteProduct(1);
    expect(products).toBe(204);
})
