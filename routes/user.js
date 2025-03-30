import { Router } from "express";
import { getAuthenticatedUser, loginUser, registerUser, updateUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

 // create a user router
 const userRouter = Router();

//define routes
userRouter.post('/users/register', registerUser);
userRouter.post('/users/login', loginUser);
userRouter.patch('/users/:id', updateUser);
userRouter.get('/users/me',isAuthenticated, getAuthenticatedUser);

//export router
export default userRouter;