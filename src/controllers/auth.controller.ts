import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';
import { key } from '../services/auth.service';


export class AuthController {
    public async createNewUser(req: Request, res: Response): Promise<void> {
        let code:number;
        const encryptedPassword = key.encrypt(req.body.password, 'base64')
        let name = req.body.name;
        let email = req.body.email; 
        let password = encryptedPassword;
        code = await UserService.createNewUser(name,email,password);
        res.json(code);
        
    };
    public async login(req: Request, res: Response): Promise<void> {
        let email = req.body.email;
        let password = req.body.password;
        const token = await AuthService.login(email, password);
        if(token != null){
            res.json({token})
        }else{
            res.json(403);
        }
        
    }
    
}