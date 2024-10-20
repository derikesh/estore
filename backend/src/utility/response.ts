import { Response } from "express";

export const sendResponse = (res: Response, statusCode: number, message: string | JSON, data?: any) => {
    
    res.status(statusCode).json({
        message,
        data
    });

};