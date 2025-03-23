import { Router } from "express";
import { addProduct, countProducts, deleteProduct, getProducts, replaceProduct, updateProducts } from "../controllers/products.js";
import { localUpload, productPicturesUpload, remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

//Create product router
const productsRouter = Router();

//Define routes  //upload specific middleware for product upload image(localUpload)
productsRouter.post(
    '/products',
    isAuthenticated,
    isAuthorized(['superadmin', 'admin']),
    //productImageUpload.single('image'),
    productPicturesUpload.array('pictures', 3),
    addProduct
);

productsRouter.get('/products', getProducts);

productsRouter.get('/products/count', countProducts);

productsRouter.patch('/products/:id', isAuthenticated, updateProducts);

productsRouter.put(
    '/products/:id',
    isAuthenticated,
    productPicturesUpload.array('pictures', 3),
    replaceProduct
);

productsRouter.delete('/products/:id', isAuthenticated, deleteProduct);


//Export router
export default productsRouter;