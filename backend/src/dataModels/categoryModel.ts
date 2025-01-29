import mongoose from "mongoose";

import { Document, Schema } from "mongoose";

interface ImageInterFace {
    imageUrl:string,
    publicKey:string
}

export interface CATEGORY_INTERFACE extends Document {
        _id:any,
        name : string,
        parent: mongoose.Types.ObjectId,  //self refrencing for hiearchy
        image:ImageInterFace,
        slug:string,
        description:string
}

const ImageSchema = new mongoose.Schema<ImageInterFace>({
    imageUrl: { type: String , required: false },
    publicKey: { type: String, required: false }
});

const categoryModel = new mongoose.Schema({
    name : { type:String, require:true , unique:true  },
    slug:{ type:String },
    image:{ type:ImageSchema , required:false },
    parent:{ type:mongoose.Types.ObjectId , ref:'Category',default:null },
    description:{ type:String }
})


// pre save hook 
categoryModel.pre( 'save' , function(next){
        
    if(this.slug){
        this.slug = this.slug.toLowerCase();
    }
    next();

} )

export default mongoose.model<CATEGORY_INTERFACE>( 'Category',categoryModel );