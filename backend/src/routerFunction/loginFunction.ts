import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import userModel from "../dataModels/userModel";
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

// getting the token from header
import { JWT_KEY, JWT_REFRESH } from '../utility/cookieAuth';

export const loginFunction = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    try {

        if (!JWT_REFRESH) {
            return sendResponse(res, 400, 'Some error occurred, no refresh token secret provided. Please try again later.');
        }

        if (!JWT_KEY) {
            return sendResponse(res, 400, 'Some error occurred, no access token secret provided. Please try again later.');
        }

        // checking the email /user in db 
        const userExists = await userModel.findOne({ email });
        if (!userExists) {
            return sendResponse(res, 400, "user do no exists");
        }
        // password 
        const validUser = await bcrypt.compare(password, userExists.password);

        if (!validUser) {
            return sendResponse(res, 400, 'invalid credentials');
        }

        // generat token 
        const acessToken = jwt.sign({ userId: userExists?._id }, JWT_KEY, { expiresIn: '10s' });
        const refreshToken = jwt.sign({ userId: userExists?._id }, JWT_REFRESH, { expiresIn: '7d' });


        res.cookie('e_accessToken', acessToken, { maxAge: 15 * 60 * 1000 })
        res.cookie('e_refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict', secure: true })

        return sendResponse(res, 200, 'user loged in sucessfully')

    } catch (err) {
        console.log(err);
        sendServerError(res, 500);
    }
}