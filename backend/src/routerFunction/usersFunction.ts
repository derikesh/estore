import { Request , Response } from "express";
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

// user model
import USERS from "../dataModels/userModel";


dotenv.config();
export const JWTKEY = process.env.JWT_KEY;

console.log( "this is JWTKEY",JWTKEY )

// creating a new user and sending a token into the header information of response 
export const createNewUser = async ( req : Request , res : Response )=>{

    const { name , email , password } = req.body;
        
    if(!JWTKEY){
        return sendResponse(res,400,'some error occured while creating a user please try again later');
    }

    try{        
        // checking is users already exits
        const userExist = await USERS.findOne({email});

        if(userExist){
            return sendResponse( res , 400 , "user already exits" );
        }

        // hashing the password
       let hashedPassword =await bcrypt.hash( password , 10 )

        const newUser = new USERS({ name , email , password : hashedPassword });
       
        await newUser.save();

        // after the user is created with the hashed password we can generate the token and provide them the token 
        // const token = jwt.sign( { userId:newUser._id } , JWTKEY , { expiresIn:'30s' }  )


        return  sendResponse(res, 200 , "new user has been added ", { user:name} );

    }catch(err:any){
        console.log(err.message);
        sendServerError( res ,`Error creating user: ${err.message}` );
    }

} 




// reading all the users 
export const readAllUsers = async ( req:Request , res:Response )=>{
        try {

            const allUsers = await USERS.find({});
            if(allUsers.length<1){
                return sendResponse( res , 404 , 'no users were found' ); 
            } 
            return sendResponse( res , 200 , 'users found : ' , allUsers );

        }catch(err:any){
            console.log(err.message);
            sendServerError( res ,err.message );
        }
}




// reading  users by id 
export const readSingleUser = async ( req:Request , res:Response )=>{
    
    const {id} = req.params;
    
    try {
        const singleUser = await USERS.findById(id);
        if(!singleUser){
            return sendResponse( res , 400 , 'no users were found' ); 
        } 
        return sendResponse( res , 200 , 'users found : ' , singleUser );

    }catch(err:any){
        console.log(err.message);
        sendServerError( res ,err.message );
    }
}