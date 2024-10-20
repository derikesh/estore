import mongoose from "mongoose";

// Product interface
interface PRODUCT_INTERFACE {
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrl?: string;
    varient:string;
}

// Product schema
const PRODUCT_SCHEMA = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    varient: { type:String , required:true}
});

export default mongoose.model<PRODUCT_INTERFACE>('PRODUCT', PRODUCT_SCHEMA);
