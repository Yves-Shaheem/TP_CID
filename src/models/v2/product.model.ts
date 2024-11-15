import { IProduct } from '../../interfaces/v2/product.interface';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<IProduct>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category:{type: String, required: true},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true}

})
export const Product = mongoose.model('Product', schema);
