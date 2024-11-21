import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { SendResponse } from 'firebase-admin/messaging';
import { sendServerError } from './error';
import { sendResponse } from './response';
import dotenv from 'dotenv';
// middleware function 


dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export interface userAuth extends Request {
    user:String | object;
}

const authMiddleware = async (req: userAuth, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer: ','');
    if(!token){
      return  sendResponse( res , 400,'authorization failed' )
    }
    try {
    // verify jwt
        if(!JWT_KEY){
            return sendResponse(res,400,'some error occured please try again later');
        }
        const payload = jwt.verify( token ,JWT_KEY  ); 
        req.user = payload;

        sendResponse(res,200,'user valid',{ jsonKey:payload });
        return next();
    } catch (err: any) {
        console.log(err.message);
        sendServerError(res,500);
    }
}

export default authMiddleware;