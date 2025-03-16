import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {

    try {

        //Validate product information. {}destructure, similar to unpacking. we pull out what we want from the object by name
        const { error, value } = addProductValidator.validate({
            ...req.body,//(... also known as spread)
            image: req.file?.filename //how you get the filename from multer to join req.body 
        }, { abortEarly: false });
        if (error) {
            return res.status(422).json(error);
        }
        //Save product information in database
        const result = await ProductModel.create(value);
        //Return response
        res.status(201).json(result);
    } catch (error) {
        next(error);

    }
}


export const getProducts = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}" } = req.query;
        //Fetch products from database
        const result = await ProductModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort));
        //return response
        res.json(result);
    } catch (error) {
        next(error);

    }
}

export const countProducts = (req, res) => {
    res.send('All products count!');
}

export const updateProducts = (req, res) => {
    res.send(`Product with id ${req.params.id} updated!`);
}

export const deleteProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} deleted!`);
}