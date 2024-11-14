import { User } from '../../models/v2/user.model';
import { logger } from '../../utils/logger';

export class UserService {
 
  public static async getAllUsers(){
    try {
      const users = User.find();
      logger.info("The user's list have been recuperated ");
      return users;
    } catch (error) {
      logger.error("Not able to recuperate the users Error:"+ error);
    }
  }
  public static async createNewUser(name:string, email:string, password: string):  Promise<number> {
    let code:number;
    const user = new User({
      name: name,
      email:email,
      password:password,
      role:"administrator"
    })
    try {
      console.log(User);
      const newUser = await user.save();
      
      logger.info("The user have been created");
      code = 201;
    } catch (error) {
      logger.error("Something bad happen:" + error);
      code = 404
    }
    return code;
  }
  public static async findByEmail(email: string) {
    let user = await User.findOne({email:email})
    return user;
  }
}