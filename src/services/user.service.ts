import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { key } from '../services/auth.service';
import * as fs from 'fs';
const PATH_TO_JSON_FILE = 'src/data/users.json';
import { logger } from '../utils/logger';

export class UserService {
 
  public static async getAllUsers(): Promise<User[]> {
    let userModel: UserModel;
    let userList: User[] = [];
    const response = fs.readFileSync(PATH_TO_JSON_FILE, 'utf8');
    const json = await JSON.parse(response);
    json.forEach((element: any) => {
      userModel = new UserModel(element.id, element.name, element.email, element.password, element.role );
      userList.push(userModel);
    });
    logger.info("The user's list have been recuperated ");
    return userList;
  }
  public static async createNewUser(name:string, email:string, password: string):  Promise<number> {
    let code:number;
    let userList: User[] = await UserService.getAllUsers();
    try {
      let user = userList.at(-1);
      let id: number = user!.id+1;
      let newProduct: UserModel = new UserModel(id, name,email, password, "employee");
      userList.push(newProduct);
      code = 201;
      logger.info("User have been created successfully");
    } catch (error) {
      logger.error("Something bad happen");
      code = 404
    }
    fs.writeFileSync(PATH_TO_JSON_FILE, JSON.stringify(userList), 'utf8');
    return code;
  }
  public static async findByEmail(email: string): Promise<User> {
    let userList: User[] = await UserService.getAllUsers();
    let user: User = userList.find((element) => element.email == email)!; 
    return user;
  }
}