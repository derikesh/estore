import { Request , Response } from "express";
import router from "../router/allRoutes";
import { sendServerError } from "../utility/error";

import categoryModel from "../dataModels/categoryModel";
import productModel from "../dataModels/productModel";
import FAQ from "../dataModels/faqModel";
import { sendResponse } from "../utility/response";

export const homeFunction =  async ( req:Request , res:Response )=>{
            try {

                const randomCategory = await categoryModel.aggregate( [ { $sample : { size:1 } } ] );
                const randomObj = randomCategory[0];

                const categoryProduct = await productModel.find( {category:randomCategory[0]._id} ).limit(5);

                const category = await categoryModel.find({});

                const highlightProduct = await productModel.find( { isHighlight:true } ).limit(5);

                const featuredProduct = await productModel.find( {features:{ $exists:true , $ne:[] }} ).select('_id name price color images features');

                const faq = await FAQ.find({}).limit(10);
                
                res.status(200).json({message:'home data',data:{ randomObj ,categoryProduct ,category,highlightProduct, faq , featuredProduct }});

            }catch(err){
                sendServerError( res ,`Error creating user: ${err }` );
            }
} 


 export const searchFunction = async ( req:Request, res:Response )=>{
        const { keyword } = req.body;

        try{
            const searchItem = await productModel.find({$text:{$search:keyword}});
            if(searchItem.length <= 0){
                sendResponse(res,400,'no product found');
                return
            }
            sendResponse(res,200,"item found",searchItem)
            return;

        }catch(err){
            sendServerError( res ,`Error creating user: ${err }` );
        }

 }


 export const testData = async ( req:Request , res:Response )=>{
            try {
              return  sendResponse(res,200,'successfully loaded dashboard');
            }catch(err){
                sendServerError( res ,`Error creating user: ${err }` );
            }
    
 }