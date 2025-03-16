import { Schema, model } from "mongoose";
import normalize from  "normalize-mongoose";

const productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    quantity: {type: String, required: true},
}, {
    timestamps: true
});

productSchema.plugin(normalize);
export const ProductModel = model('Product', productSchema);

