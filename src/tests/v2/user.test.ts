import {describe, expect, test} from '@jest/globals';
import { ProductService } from "../../services/v2/product.service";
import { UserService } from "../../services/v2/user.service";
import { config } from '../../config/config';
import {DB_connection}  from '../../data/db.data'
import { Product } from '../../models/v2/product.model';
import { User } from '../../models/v2/user.model';
beforeAll(async () => {
    DB_connection(config.databaseUrl);
    await User.deleteMany({"name":"Test"});
});
describe("Create a new product", () => {
    test("Should return HTTP code if product have been created", async () =>{
        const user = await UserService.createNewUser("Test", "test@gmail.com", "abc123");
        expect(user).toBe(201);
    })
})
describe("Get all products", ()=> {
    test("Should return all products", async () =>{
        const users = await UserService.getAllUsers();
        expect(users?.length).toBe(1);
    })
})
describe("Get user email", ()=> {
    test("Should return the user's email", async () =>{
        const user = await UserService.findByEmail("test@gmail.com");
        expect(user?.email).toBe("test@gmail.com");
    })
})
