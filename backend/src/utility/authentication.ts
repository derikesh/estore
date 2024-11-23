import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { sendServerError } from './error';
import { sendResponse } from './response';
import dotenv from 'dotenv';
// middleware function 


dotenv.config();

const JWT_KEY = process.env.JWT_KEY;


export interface userAuth extends Request {
    user?:String | object;
}

const authMiddleware =  (req: userAuth, res: Response, next: NextFunction):void => {
    const token = req.header('Authorization')?.replace('Bearer: ','');
    if(!token){
        sendResponse( res , 400,'authorization failed' );
        return;
    }
    try {
    // verify jwt
        if(!JWT_KEY){
            throw new Error("")
            return;
        }
        const payload = jwt.verify( token ,JWT_KEY  ); 
        req.user = payload;
         next();
    } catch (err: any) {
        console.log(err.message);
        sendServerError(res,500);
    }
}

export default authMiddleware;