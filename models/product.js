//Types is from mongodb
//import { ref } from "joi";
import { Schema, model, Types } from "mongoose";
import normalize from  "normalize-mongoose";

const productSchema = new Schema({
    name: { type: String, required: true, unique: [true, 'Product name must be unique!'] },
    price: {type: Number, required: true},
    description: {type: String, required: true},
    //image: {type: String, required: true},
    quantity: {type: String, required: true},
    pictures: [{ type: String, required: true }],
    userId: { type: Types.ObjectId, required: true, ref: 'User' },//foreign key
}, {
    timestamps: true
});

productSchema.plugin(normalize);
export const ProductModel = model('Product', productSchema);

