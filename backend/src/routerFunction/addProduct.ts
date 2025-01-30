import { Request, Response } from "express";

// Utility functions
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

// data model 
import Product from '../dataModels/productModel';
import { PRODUCT_INTERFACE } from "../dataModels/productModel";


// css
// Adding product into data
export const addProducts = async (req: Request, res: Response) => {

        const { name , price , category , description , images, productImages , sizes , color }:PRODUCT_INTERFACE = req.body;

    try {
        const existingProduct = await Product.find({name});
        if(existingProduct.length > 0){
            sendResponse(res,400,'product alreadt exists');
            return;
        }
        const newPost =  new Product({
            name , price ,productImages, category,description , images , sizes ,color
        });
        await newPost.save();
       return sendResponse(res, 200, 'Product added successfully',newPost);
    } catch (err:any) {
        console.log(err);
        sendServerError(res,err);
    }
}


// Fetching all the products
export const getProduct = async (req: Request, res: Response) => {
    try {
        const allData = await Product.find({}).populate('category','name').sort({createdAt:-1});
        if(!allData){
            sendResponse(res,400,'no product were found');
            return;
        }
        sendResponse(res, 200, 'All products',allData);
        return;
    } catch (err) {
        console.log(err);
        sendServerError(res,err);
    }
}


// Fetching a single product by ID
export const getProductSingle = async (req: Request, res: Response) => {

    const {id} = req.params;

    try {
         const singleData = await Product.findById(id);
         if(!singleData){
            sendResponse(res,400,'no such product found');
            return;
         }   
        sendResponse(res, 200, 'Single product',singleData);
        return;
    } catch (err) {
        console.log(err);
        sendServerError(res,err);
    }
}


// Updating a product by ID
export const updateProduct = async (req: Request, res: Response) => {

    const {id} = req.params;
    const { name , price , category , description,productImages , images , sizes , color }:PRODUCT_INTERFACE = req.body;

    try {
        
        const updateData = await Product.findByIdAndUpdate(
        id,
        { name , price , category , description , images,productImages , sizes , color },
        {new:true}    
        );

        if( !updateData ){
            sendResponse(res,400,'product could not be updated');
            return;
        }

        sendResponse(res, 200, 'Product updated successfully',updateData);
        return;
    } catch (err) {
        console.log(err);
        sendServerError(res,err);
    }
}


// Deleting a product by ID
export const deleteProduct = async (req: Request, res: Response) => {

        const {id} = req.params;

    try {
        const deltedItem = await Product.findByIdAndDelete(id);
        if(!deltedItem){
            sendResponse(res,400,'could not found the item');
            return;
        }
        sendResponse(res, 200, 'Product deleted successfully',deltedItem);
        return;
    } catch (err) {
        console.log(err);
        sendServerError(res,err);
    }
}


// delete multiple 
export const deleteSelected = async ( req:Request, res:Response )=>{
        const {ids} = req.body;
        try{
            
            const deleteResult = await Product.deleteMany({
                _id :{$in:ids}
            });
            if(deleteResult.deletedCount === 0){
                return sendResponse(res,400,'could not delete item');
            }
            return sendResponse(res,200,'deleted sucessfully',{deletedItems:deleteResult})

        }catch(err){
            return sendServerError(res,200);
        }
}