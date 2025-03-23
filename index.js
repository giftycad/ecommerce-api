import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';

//make database connection
//const MONGO_URI ='mongodb+srv://ecommerce-api:ryC2LllPaV2cAI5i@cluster0.g9pn8.mongodb.net/ecommerce-db?retryWrites=true&w=majority&appName=Cluster0';

await mongoose.connect(process.env.MONGO_URI);
//create an express app
const app = express();

//Use global middlewares
app.use(express.json());

//use routes
app.use(productsRouter);
app.use(userRouter);

//Listen for incoming request

//const port = 3000;


//route path and controller
// app.get('/', (req, res)=> {
//     res.send('They tricked me');
// });

//listen for incoming request
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server listening on port ${port}`);
})