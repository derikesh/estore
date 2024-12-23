import { Express, Request, Response } from "express";
import Category from "../dataModels/categoryModel";


import { sendServerError } from "../utility/error";
import { sendResponse } from "../utility/response";

export const addCategory = async (req: Request, res: Response) => {

    const { name, parent, slug, description } = req.body;


    try {

        // check if category already exists
        const cateogyExist = await Category.findOne({ name });

        if (cateogyExist) {
            return sendResponse(res, 400, 'the category alreadt exits')
        }

        const newCategory = new Category({
            name,
            parent,
            slug,
            description
        });

        await newCategory.save();

        return sendResponse(res, 200, `succesfully added a new categroy ${newCategory}`, { category: newCategory })

    } catch (err: any) {
        console.log("Error Message", err.message);
        sendServerError(res, `Error creating user: ${err.message}`)

    }
}


// read all category

export const readCategory = async (req: Request, res: Response) => {

    try {

        const allCategory = await Category.find({});
        if (allCategory.length > 1) {
            return sendResponse(res, 400, 'no categoru fuond')
        }

        return sendResponse(res, 200, `all category:${allCategory}`, { data: allCategory })

    } catch (err: any) {
        console.log("Error Message", err.message);
        sendServerError(res, `Error creating user: ${err.message}`)
    }

}


// reading  users by id 
export const readSingleCategory = async ( req:Request , res:Response )=>{
    
    const {id} = req.params;
    
    try {
        const singleCatrgory = await Category.findById(id);
        if(!singleCatrgory){
            return sendResponse( res , 400 , 'no users were found' ); 
        } 
        return sendResponse( res , 200 , 'users found : ' , singleCatrgory );

    }catch(err:any){
        console.log(err.message);
        sendServerError( res ,err.message );
    }
}


export const updateCategory =async ( req:Request , res:Response  )=>{

    const {id} = req.params;
    const { name , slug , description , parent } = req.body;

    try {

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, slug, parent, description },
            { new: true }
        );

        if(!updateCategory){
            return sendResponse(res,400,'could not update category');
        }

        return sendResponse(res,200,`category updated:${updateCategory}`);

    }catch(err:any){
        console.log(err.message);
        sendServerError( res ,err.message );
    }

}