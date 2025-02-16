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

    try{
        if(!getToken || !JWT_KEY){  
            throw new Error('no valid tokens');
        }   
    
        const validaUser = jwt.verify( getToken , JWT_KEY  );
        req.user = validaUser;
        next();
    }catch(err){
        next(err);
      }
}


// function to generate new access token 
export const refreshTokenHandlerr = (req: AUTH_REQ, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.e_refreshToken;
        if (!refreshToken) throw new Error("No refresh token provided");

        if (!JWT_REFRESH) throw new Error("No refresh token secret provided");

        if (!JWT_KEY) throw new Error("No access token secret provided");

        const isValidToken = jwt.verify(refreshToken, JWT_REFRESH);
        if (!isValidToken) throw new Error("Invalid refresh token");

        const accessToken = jwt.sign({ userId: (isValidToken as any).userId }, JWT_KEY, { expiresIn: "5m" });

        res.cookie("e_accessToken", accessToken, { maxAge: 5 * 60 * 1000, httpOnly: true, secure: true });

        return sendResponse(res, 200, "Access token refreshed successfully.");
    } catch (err) {
        next(err); 
    }
};

