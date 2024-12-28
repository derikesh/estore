import mongoose , {Document} from "mongoose";


// Product interface
export interface PRODUCT_INTERFACE extends Document {
    name: string;
    price: number;
    category: string;
    description?: string;
    images?: string[];
    size?:string[];
    color?:string[];
}

// Product schema
const PRODUCT_SCHEMA = new mongoose.Schema({
    name: { type: String, required: false },
    price: { type: Number, required: false },
    category: { type: String, required: false },
    description: { type: String },
    images: { type: [String], required:false },
    size: { type:[String], required:false},
    color: { type:[String] , required:false}

});

export default mongoose.model<PRODUCT_INTERFACE>('PRODUCT', PRODUCT_SCHEMA);
