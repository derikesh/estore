import jwt from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';
import { sendServerError } from './error';
import { sendResponse } from './response';

import { JWT_KEY } from './authentication';

export interface AUTH_REQ extends Request {
    user?:string | object;
}


const cookieAuth = async ( req:AUTH_REQ , res:Response , next:NextFunction )=>{

    const getToken = req.cookies.acessToken;

    if(!getToken || !JWT_KEY){  
        return sendResponse(res,401,'some error occured during json string');
    }   

    const validaUser = jwt.verify( getToken , JWT_KEY  );
    req.user = validaUser;

    next();
}