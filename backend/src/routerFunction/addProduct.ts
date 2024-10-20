import { Request , Response } from "express";

// utlity 
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";


// adding product into data
export const addProducts = async ( req:Request ,res:Response )=>{
        try {
            sendResponse( res ,200,'this is ok' );
        }catch(err){
            console.log(err);
            sendServerError(res);
        }
}




// boiler plat for the code 
export const boilerPlate = async ( req:Request ,res:Response )=>{
    try {
        sendResponse( res ,200,'this is ok' );
    }catch(err){
        console.log(err);
        sendServerError(res);
    }
}