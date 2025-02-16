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
        if(!getToken){  
            throw new Error('no access token getting');
        }   

        if(!JWT_REFRESH){
            throw new Error('no refresh token');
        }

        if(!JWT_KEY){  
            throw new Error('no jwt token gettnig');
        }   
    
        const validaUser = jwt.verify( getToken , JWT_KEY  );
        req.user = validaUser;
        next();
    }catch(err:any){

        if(err.name === 'TokenExpiredError'){
            await refreshTokenHandlerr( req , res, next );
        }else {
            res.clearCookie('e_accessToken');
            res.clearCookie('e_refreshToken');
            next(new Error('Invalid token. Please log in again.'));
        }

    }
}


// function to generate new access token 
export const refreshTokenHandlerr = (req: AUTH_REQ, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.e_refreshToken;
        if (!refreshToken) throw new Error("No refresh token provided");

        if (!JWT_REFRESH) throw new Error("No refresh token secret provided");
        if (!JWT_KEY) throw new Error("No access token secret provided");

        // Verify the refresh token
        const isValidToken = jwt.verify(refreshToken, JWT_REFRESH);
        if (!isValidToken) throw new Error("Invalid refresh token");

        // Generate a new access token
        const accessToken = jwt.sign({ userId: (isValidToken as any).userId }, JWT_KEY, { expiresIn: "15m" });

        // Set the new access token in the cookie
        res.cookie("e_accessToken", accessToken, { sameSite: 'lax', secure: false, httpOnly: true, path: '/' });

        // Attach the new token to the request and continue
        req.user = isValidToken;
        next();
    } catch (err) {
        res.clearCookie('e_accessToken');
        res.clearCookie('e_refreshToken');
        next(new Error('Session expired. Please log in again.'));
    }
};

