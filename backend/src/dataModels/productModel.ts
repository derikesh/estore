import mongoose , {Document} from "mongoose";

// Product interface
interface PRODUCT_INTERFACE extends Document {
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrl?: string[];
    size?:string[];
    color?:string[];
}

// Product schema
const PRODUCT_SCHEMA = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: [String], required:true },
    size: { type:[String] , required:false},
    color: { type:[String] , required:false}

});

export default mongoose.model<PRODUCT_INTERFACE>('PRODUCT', PRODUCT_SCHEMA);
