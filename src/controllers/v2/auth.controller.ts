import { Request, Response } from 'express';
import { AuthService } from '../../services/v2/auth.service';
import { UserService } from '../../services/v2/user.service';
import { logger } from '../../utils/logger';

export class AuthController {
    public async createNewUser(req: Request, res: Response): Promise<void> {
        let code:number;
        let name = req.body.name;
        let email = req.body.email; 
        let password = req.body.password;
        code = await UserService.createNewUser(name,email,password);
        console.log(code); 
        res.status(code).json({"message":"New user has been created"});
    };
    public async login(req: Request, res: Response): Promise<void> {
        let email = req.body.email;
        let password = req.body.password;
        const token = await AuthService.login(email, password);
        console.log(token);
        if(token != ""){
            logger.info("L'utilisateur a connecté avec succes");
            res.status(201).json({token})
            

        }else{
            res.status(401).json("Invalid email or password");
        }
        
    }
    
}