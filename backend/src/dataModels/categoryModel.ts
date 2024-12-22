import mongoose from "mongoose";

import { Document, Schema } from "mongoose";

interface CATEGORY_INTERFACE extends Document {
        name : string,
        parent: mongoose.Types.ObjectId,  //self refrencing for hiearchy
        slug:string,
        description:string
}


const categoryModel = new mongoose.Schema({
    name : { type:String, require:true , unique:true  },
    slug:{ type:String },
    parent:{ type:mongoose.Types.ObjectId , ref:'CATEGORY',default:null },
    description:{ type:String }
})


export default mongoose.model<CATEGORY_INTERFACE>( 'CATEGORY',categoryModel );