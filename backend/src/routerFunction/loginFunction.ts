import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import userModel from "../dataModels/userModel";
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

// getting the token from header
import { JWT_KEY, JWT_REFRESH } from '../utility/cookieAuth';

export const loginFunction = async (req: Request, res: Response , next:NextFunction) => {

    const { email, password } = req.body;

    try {
        if (!JWT_REFRESH) {
            throw new Error('Some error occurred, no refresh token secret provided. Please try again later.');
        }

        if (!JWT_KEY) {
            throw new Error('Some error occurred, no access token secret provided. Please try again later.');
        }

        // checking the email /user in db 
        const userExists = await userModel.findOne({ email });
        if (!userExists) {
            throw new Error('User does not exist');
        }

        // password comparison
        const validUser = await bcrypt.compare(password, userExists.password);
        if (!validUser) {
            throw new Error('Invalid credentials');
        }

        // generate token
        const accessToken = jwt.sign({ userId: userExists?._id }, JWT_KEY, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ userId: userExists?._id }, JWT_REFRESH, { expiresIn: '7d' });

        res.cookie('e_accessToken', accessToken, { maxAge:30 * 1000, secure: false,httpOnly:true, path: '/' });
        res.cookie('e_refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict', secure: false, path: '/refreshToken' });

        return sendResponse(res, 200, 'User logged in successfully');

    } catch (err: any) {
        console.log(err);
        next(err);
    }
}


export const logOutFunction = ( req:Request, res:Response , next:NextFunction )=>{

    try {
        res.clearCookie('e_accessToken');
        res.clearCookie('e_refreshToken');
        res.status(200).send({ message: 'Logged out successfully' });
    }catch(err){
        next(err);
    }

}