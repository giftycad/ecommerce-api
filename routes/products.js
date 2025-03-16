import { Router } from "express";
import { addProduct, countProducts, deleteProduct, getProducts, updateProducts } from "../controllers/products.js";
import { localUpload, remoteUpload } from "../middlewares/upload.js";

//Create product router
const productsRouter = Router();

//Define routes  //upload specific middleware for product upload image(localUpload)
productsRouter.post('/products', remoteUpload.single('image'), addProduct);

productsRouter.get('/products', getProducts);

productsRouter.get('/products/count', countProducts);

productsRouter.patch('/products/:id', updateProducts);

productsRouter.delete('/products/:id', deleteProduct);


//Export router
export default productsRouter;