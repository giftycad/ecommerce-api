// import { request } from "express";
// import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt"
import { userModel } from "../models/user.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256']
});

export const isAuthorized = (roles) => {
    return async (req, res, next) => {
        //Find user by id
        const user = await userModel.findById(req.auth.id);
        //Check if roles includes user role
        if (roles?.includes(user.role)){
            next();
        } else {
            res.status(403).json('You are not authorized!');
        }
    }
}

// export const isAuthenticated = (req, res, next) => {

//     //Get authorization header
//     const authorization = req.headers.authorization;
//     //check the presence of authorization
//     if (!authorization){
//         return res.status(401).json('Authorization header does not exist!');
//     }
//     //Get access token from authorization
//     const token = authorization.split(' ')[1];
//     //check if token exists
//     if (!token){
//         return res.status(401).json('Access token not provided!');
//     }
//     //Verify and decode the access token
//     jwt.verify(
//         token,
//         process.env.JWT_SECRET_KEY,
//         (error, decoded) => {
//             if (error) {
//                 //Handle verified error
//                 return res.status(401).json(error);
//             }
//             //Add decoded to request object
//             request.user = decoded;
//             //Proceed to next handler
//             next();
//         }
//     );

// }