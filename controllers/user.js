import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerUserValidator, loginUserValidator, updateUserValidator } from "../validators/user.js";


export const registerUser = async (req, res, next) => {
    //validate user information
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }

    //check if user does not exist already
    const user = await userModel.findOne({
        $or: [                             //mongodb way of using or
            { username: value.username },
            { email: value.email }
        ]
    });
    if (user) {
        return res.status(409).json('User already exist');
    }
    //hash plaintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10)


    //create user record in database
    await userModel.create({
        ...value,
        password: hashedPassword
    })
    //send registration email to user
    //(optionally) generate access token for user
    //return response
    res.status(201).json('User registered successfully')

}

export const loginUser = async (req, res, next) => {
    //validate user information
    const { error, value } = loginUserValidator.validate(req.body)
    if (error) {
        return res.status(422).json(error);
    }
    //find matching user records in database
    const user = await userModel.findOne({
        $or: [                              // mongodb way or doing or
            { username: value.username },
            { email: value.email }
        ]
    });
    if (!user) {
        return res.status(409).json('User does not exist')
    }
    // compare incoming password with saved hash password
    const correctPassword = bcrypt.compareSync(value.password, user.password)
    if (!correctPassword) {
        return res.status(401).json('Invalid credentials')
    }
    // generate access token for user
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    )
    //return response
    res.status(200).json({ accessToken })
}

export const updateUser = async (req, res, next) => {
    //validate request body
    const {error, value } = updateUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    //Update user in the database
    const user = await userModel.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
    );
    //return response
    res.status(200).json(value);
};