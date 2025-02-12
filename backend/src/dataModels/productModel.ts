import mongoose , {Document} from "mongoose";


// Product interface

interface ImageInterFace {
    imageUrl:string,
    publicKey:string
}

interface FEATURES_INTERFACE {
    name:string,
    x:number,
    y:number
} 


export interface PRODUCT_INTERFACE extends Document {
    name: string;
    price: number;
    category: mongoose.Types.ObjectId;
    description?: string;
    images?: ImageInterFace;
    productImages?:ImageInterFace[];
    sizes?:string[];
    color?:string[];
    createdAt:Date;
    features?:FEATURES_INTERFACE[]
}

// Product schema
const ImageSchema = new mongoose.Schema<ImageInterFace>({
    imageUrl: { type: String , required: false },
    publicKey: { type: String, required: false }
});

const FeatureSchema = new mongoose.Schema<FEATURES_INTERFACE>({
    name:{type:String,required:false},
    x:{type:Number,required:false},
    y:{type:Number,required:false}
})

const PRODUCT_SCHEMA = new mongoose.Schema({
    name: { type: String, required: false },
    price: { type: Number, required: false },
    category: { type: mongoose.Types.ObjectId,ref:'category', default: null },
    description: { type: String },
    images: { type: ImageSchema, required:false},
    productImages:{ type: [ImageSchema] , required:false},
    sizes: { type:[String], required:false},
    color: { type:[String] , required:false},
    createdAt:{ type:Date , default:Date.now() , required:false },
    features:{ type:[FeatureSchema] , required:false }
});

export default mongoose.model<PRODUCT_INTERFACE>('PRODUCT', PRODUCT_SCHEMA);
