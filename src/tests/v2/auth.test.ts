import {describe, expect, test} from '@jest/globals';
import { UserService } from "../../services/v2/user.service";
import { config } from '../../config/config';
import {DB_connection}  from '../../data/db.data'
import { User } from '../../models/v2/user.model';
import { AuthService } from '../../services/v2/auth.service';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/jwt.util';
beforeAll(async () => {
    DB_connection(config.databaseUrl);
    await User.deleteMany({"name":"AuthTest"});
    const user = new User({
        name: "AuthTest",
        email:"test@gmail.com",
        password:"password",
        role:"employee"
        });
    const newUser = await user.save();
});

afterAll(async () => {
    await User.deleteMany({"name":"AuthTest"});
});

describe("Create a new product", () => {
    test("Should return HTTP code if product have been created", async () =>{
        const token = await AuthService.login("test@gmail.com","password");
        if(token != null){
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return console.log("Error test login");
            let user1 : any = user;
            expect(user1?.name).toBe("AuthTest");
            })
        }   
    })
})
