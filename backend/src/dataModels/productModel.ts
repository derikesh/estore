import mongoose , {Document} from "mongoose";


// Product interface

interface ImageInterFace {
    imageUrl:string,
    publicKey:string
}
export interface PRODUCT_INTERFACE extends Document {
    name: string;
    price: number;
    category: string;
    description?: string;
    images?: ImageInterFace;
    sizes?:string[];
    color?:string[];
    createdAt:Date;
}

// Product schema
const ImageSchema = new mongoose.Schema<ImageInterFace>({
    imageUrl: { type: String , required: false },
    publicKey: { type: String, required: false }
});

const PRODUCT_SCHEMA = new mongoose.Schema({
    name: { type: String, required: false },
    price: { type: Number, required: false },
    category: { type: String, required: false },
    description: { type: String },
    images: { type: ImageSchema, required:false},
    sizes: { type:[String], required:false},
    color: { type:[String] , required:false},
    createdAt:{ type:Date , default:Date.now() , required:false }

});

export default mongoose.model<PRODUCT_INTERFACE>('PRODUCT', PRODUCT_SCHEMA);
