import { Request , Response } from "express"
import { sendResponse } from "../utility/response"
import { sendServerError } from "../utility/error"

// user model
import USERS from "../dataModels/userModel";

export const createNewUser = async ( req : Request , res : Response )=>{

    const { name , email , password } = req.body;
        
    try{        
        // checking is users already exits
        const userExist = await USERS.findOne({email});

        if(userExist){
            return sendResponse( res , 400 , "user already exits" );
        }

        const newUser = new USERS({ name , email , password });
       
        await newUser.save();
        sendResponse(res, 200 , "new user has been added ", newUser );
        return;

    }catch(err:any){
        console.log(err.message);
        sendServerError( res , err.message );
    }

} 