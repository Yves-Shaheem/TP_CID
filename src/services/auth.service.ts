import NodeRSA from 'node-rsa';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import { JWT_SECRET } from '../utils/jwt.util';
import { UserService } from '../services/user.service';

export class AuthService {
  public static async login(email: string, password: string): Promise<string | null> {
    const user = await UserService.findByEmail(email);
    if (user && password == key.decrypt(user.password, 'utf8')) {
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      console.log(JWT_SECRET);
      return token;
    }else{
      return null;
    } 
  }
  public static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}

const key = new NodeRSA({ b: 512 });
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

export { key };