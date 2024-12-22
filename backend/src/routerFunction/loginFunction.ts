import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request , Response } from "express";
import userModel from "../dataModels/userModel";
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

// getting the token from header


export const loginFunction = async ( req:Request ,res:Response )=>{
       
    const { email , password } = req.body;
        try {

            const tokenId = process.env.JWT_KEY;
            const acessTokenId = process.env.JWT_ACESS;

            if(!tokenId || !acessTokenId){
                return sendResponse(res,400,'some error occured please try again later');
            }

            // checking the email /user in db 
            const userExists = await userModel.findOne({email});
            if( !userExists ){
                return sendResponse(res,400,"user do no exists");
            }
            // password 
            const validUser = await bcrypt.compare( password , userExists.password );

            if( !validUser ){
                return sendResponse(res,400,'invalid credentials');
            }

            // generat token 
            const acessToken = jwt.sign( {userId:userExists?._id} , tokenId , { expiresIn: '15m' } );
            const refreshToken = jwt.sign( {userId:userExists?._id} ,acessTokenId , {expiresIn:'7d'}  );


            res.cookie('acessToken',acessToken , {maxAge: 15 * 60 * 1000 })
            res.cookie( 'refreshToken', refreshToken , { maxAge:7*24*60*60*1000 ,httpOnly:true , sameSite:'strict' , secure:true } )

            return sendResponse( res,200,'user loged in sucessfully',acessToken )

        }catch(err){
            console.log(err);
            sendServerError(res,500);
        }
}