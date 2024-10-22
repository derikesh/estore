import { Request, Response } from "express";

// Utility functions
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

// Adding product into data
export const addProducts = async (req: Request, res: Response) => {
    try {
        // Logic here
        sendResponse(res, 200, 'Product added successfully');
    } catch (err) {
        console.log(err);
        sendServerError(res);
    }
}

// Fetching all the products
export const getProduct = async (req: Request, res: Response) => {
    try {
        // Logic here
        sendResponse(res, 200, 'All products');
    } catch (err) {
        console.log(err);
        sendServerError(res);
    }
}

// Fetching a single product by ID
export const getProductSingle = async (req: Request, res: Response) => {
    try {
        // Logic here
        sendResponse(res, 200, 'Single product');
    } catch (err) {
        console.log(err);
        sendServerError(res);
    }
}

// Updating a product by ID
export const updateProduct = async (req: Request, res: Response) => {
    try {
        // Logic here
        sendResponse(res, 200, 'Product updated successfully');
    } catch (err) {
        console.log(err);
        sendServerError(res);
    }
}

// Deleting a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        // Logic here
        sendResponse(res, 200, 'Product deleted successfully');
    } catch (err) {
        console.log(err);
        sendServerError(res);
    }
}