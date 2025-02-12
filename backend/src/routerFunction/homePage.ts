import { Request , Response } from "express";
import router from "../router/allRoutes";
import { sendServerError } from "../utility/error";

import categoryModel from "../dataModels/categoryModel";
import productModel from "../dataModels/productModel";
import FAQ from "../dataModels/faqModel";

export const homeFunction =  async ( req:Request , res:Response )=>{
            try {

                const randomCategory = await categoryModel.aggregate( [ { $sample : { size:1 } } ] );
                const randomObj = randomCategory[0];

                const categoryProduct = await productModel.find( {category:randomCategory[0]._id} ).limit(5);

                const category = await categoryModel.find({});

                const highlightProduct = await productModel.find( { isHighlight:true } ).limit(5);

                // const likedProduct = await productModel.find({"features":{$size:{$gte:1}}})

                const faq = await FAQ.find({}).limit(10);
                
                res.status(200).json({message:'home data',data:{ randomObj ,categoryProduct ,category,highlightProduct, faq }});

            }catch(err){
                sendServerError( res ,`Error creating user: ${err }` );
            }
} 

 