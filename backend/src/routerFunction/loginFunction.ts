import { Jwt } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Request , Response } from "express";
import userModel from "../dataModels/userModel";
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

// getting the token from header
export const loginFunction = async ( req:Request , res:Response )=>{  
           
    const { email , password } = req.body;

    try {

        // checking the user
        const userExist = await userModel.findOne({email});
        if(!userExist){
            return sendResponse( res, 400 , 'user not found' );
        }

        // checking the password 
        const validUser = bcrypt.compare( password , userExist.password );

        if( !validUser ){
            sendResponse(res,400,'credential do not match');
        }

        return ;

    }catch(err){

        sendServerError( res, 500  );

    }
        
}