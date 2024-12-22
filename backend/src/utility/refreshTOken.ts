import jwt from 'jsonwebtoken'
import { sendResponse } from './response';
import { NextFunction , Request , Response } from 'express';
import { AUTH_REQ } from './cookieAuth';
import dotenv from 'dotenv';
import { sendServerError } from './error';

dotenv.config();

const refreshTOken = process.env.JWT_ACESS;

const refreshTokenHandler = async ( req:AUTH_REQ , res:Response, next:NextFunction )=>{

    const refreshTOken = req.cookies.refreshToken;

    if(!refreshTOken || !refreshTOken){
        sendResponse( res,401 , ' token invalid' )
    }

    try {
        const returnPayload = jwt.verify( refreshTOken , refreshTOken , (err:any , decoded:any)=>{

            if(err){
                sendResponse(res,401,'some error coccured during token ')
            }
            const newAccessToken = jwt.sign({ email: decoded.email }, 'jwt-access-token-secret-key', { expiresIn: '1m' });
            res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 60000 });
            return res.status(200).json({ valid: true, message: "Access token refreshed" });
          
        })
    }catch(err){
            sendServerError(res,500);
    }

}