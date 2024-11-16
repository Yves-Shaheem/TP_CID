import {describe, expect, test} from '@jest/globals';
import { UserService } from "../../services/v2/user.service";
import { config } from '../../config/config';
import {DB_connection}  from '../../data/db.data'
import { User } from '../../models/v2/user.model';
beforeAll(async () => {
    DB_connection(config.databaseUrl);
    await User.deleteMany({"name":"Test"});
});
afterAll(async () => {
    await User.deleteMany({"name":"Test"});
});
describe("Create a new User", () => {
    test("Should return HTTP code if user have been created", async () =>{
        const user = await UserService.createNewUser("Test", "test@gmail.com", "abc123");
        expect(user).toBe(201);
    })
})
describe("Get all users", ()=> {
    test("Should return all users", async () =>{
        await User.deleteMany({"name":"AuthTest"});
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
