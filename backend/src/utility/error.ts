import { Response } from "express";


export const sendServerError = ( res:Response )=>{
        res.status(500).json({message:"Internal server error"});
}