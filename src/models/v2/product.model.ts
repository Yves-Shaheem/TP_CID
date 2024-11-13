import { IProduct } from '../interfaces/v2/product.interface';
const mongoose = require('mongoose');

const schema = new mongoose.Schema<IProduct>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category:{type: String, required: true},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true}

})
const Product = mongoose.model<IProduct>('Product', schema);

module.exports = Product;