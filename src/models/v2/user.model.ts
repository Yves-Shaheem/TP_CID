import { IUser } from '../../interfaces/v2/user.interface';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<IUser>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password:{type: String, required: true},
  role:{ type: String, enum: ["administrator", "employee"], required: true}
})
export const User = mongoose.model('user', schema);