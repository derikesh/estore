import { Request, Response, NextFunction } from "express";

// Global Error Handler Middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log error (optional)

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error ooo",
    });
};