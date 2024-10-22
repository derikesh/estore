import { Response } from "express";


export const sendServerError = ( res:Response , err:any)=>{
        res.status(500).json({message:"Internal server error",error:err.message});
}