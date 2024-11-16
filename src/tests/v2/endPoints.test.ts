import request from 'supertest';
import app from '../../app';
import {DB_connection}  from '../../data/db.data'
import { User } from '../../models/v2/user.model';
import { AuthService } from '../../services/v2/auth.service';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/jwt.util';
import {describe, expect, test} from '@jest/globals';
import { UserService } from "../../services/v2/user.service";
import { config } from '../../config/config';
import { Product } from '../../models/v2/product.model';
import { ProductService } from "../../services/v2/product.service";
import { loadCertificate } from '../../middlewares/certificat.middleware';
const certificate = loadCertificate();
let token: string;

beforeAll(async ()  => {
    DB_connection(config.databaseUrl);
    await User.deleteMany({"name":"AuthTest"});
    token = await AuthService.login("test2@gmail.com", "password");
});

afterAll(async ()=> {
    await Product.deleteMany({"name":"Products"});
    await User.deleteMany({"name":"AuthTest"});
})

describe('POST PRODUCT as administrator', () => {
  it('should create a new products', async () => {
    const res = await request(app)
        .post('/v2/products')
        .auth(token, {type:'bearer'})
        .key(certificate.key)
        .cert(certificate.cert)
        .trustLocalhost(true)
        .send({
          "name":"Products",
          "description":"Test products",
          "category":"test",
          "price":99,
          "quantity":100
        })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toBe("The new product have been created succesfully");
  })
})


