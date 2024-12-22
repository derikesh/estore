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

            if(!tokenId){
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
            const token = jwt.sign( {userId:userExists?._id} , tokenId , { expiresIn: '1d' } );

            return sendResponse( res,200,'user loged in sucessfully',token )

        }catch(err){
            console.log(err);
            sendServerError(res,500);
        }
}