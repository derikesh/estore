import jwt from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';
import { sendServerError } from './error';
import { sendResponse } from './response';

export interface AUTH_REQ extends Request {
    user?:string | object;
}

export const JWT_REFRESH = process.env.REFRESH_TOKEN;
export const JWT_KEY = process.env.JWT_KEY


// middeware function cookie
export const cookieAuth = async ( req:AUTH_REQ , res:Response , next:NextFunction )=>{

    const getToken = req.cookies.e_accessToken;

    if(!getToken || !JWT_KEY){  
        return sendResponse(res,401,'authentication failed');
    }   

    const validaUser = jwt.verify( getToken , JWT_KEY  );
    req.user = validaUser;
    next();
}


// function to generate new access token 
export const refreshTokenHandlerr = ( req:AUTH_REQ, res:Response , next:NextFunction )=>{

    const refreshToken = req.cookies.e_refreshToken;

    if (!refreshToken) {
        return sendResponse(res, 401, 'Authorization failed, no refresh token provided');
    }
    
    if (!JWT_REFRESH) {
        return sendResponse(res, 401, 'Authorization failed, no refresh token secret provided');
    }
    
    if (!JWT_KEY) {
        return sendResponse(res, 401, 'Authorization failed, no access token secret provided');
    }

    try{
        const isValideToken = jwt.verify( refreshToken , JWT_REFRESH );
        if( !isValideToken ){
            return sendResponse(res,401,'authoization failed , invalide token')
        }
        const accessToken = jwt.sign( { userId:(isValideToken as any).id } ,JWT_KEY,{expiresIn:'15m'}  )
        res.cookie('e_accessToken',accessToken,{maxAge:15*60*1000});
        next();

    }catch(err){
      return  sendServerError(res,500)
    }

}
