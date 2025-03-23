import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {

    try {
        console.log(req.auth)   //(req.file, req.files)//(req.auth);

        //Validate product information. {}destructure, similar to unpacking. we pull out what we want from the object by name
        const { error, value } = addProductValidator.validate({
            ...req.body,//(... also known as spread)
            //image: req.file?.filename,//how you get the filename from multer to join req.body 
            pictures: req.files?.map((file) => {//higher order function(takes another function as an argument)
                return file.filename;
            })

        }, { abortEarly: false });
        if (error) {
            return res.status(422).json(error);
        }
        //Check if product does not exist
        const count = await ProductModel.countDocuments({
            name: value.name

        });
        if (count) {
            return res.status(409).json('Product with name already exist!')
        }
        //Save product information in database
        const result = await ProductModel.create({
            ...value,
            userId: req.auth.id
        });
        //Return response
        res.status(201).json(result);
    } catch (error) {
        if (error.code === 'MongooseError') {
            return res.status(409).json(error.message);
        }
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

export const replaceProduct = async (req, res, next) => {
    //Validate incoming request body
    //Perform model replace operation
    const result = await ProductModel.findOneAndReplace(
        { _id: req.params.id },
        req.body,
        { new: true }
    );
    //return a response
    res.status(200).json(result);
}

export const deleteProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} deleted!`);
}