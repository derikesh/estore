import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

// Cart item interface
interface CART_ITEM_INTERFACE extends Document {
    product: mongoose.Schema.Types.ObjectId; // Reference to the product model
    quantity: number;
}

// Cart interface
interface CART_INTERFACE {
    user: mongoose.Schema.Types.ObjectId; // Reference to the user model
    items: CART_ITEM_INTERFACE[];
}

// Cart schema
const CART_SCHEMA = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }]
});

export default mongoose.model<CART_INTERFACE>('Cart', CART_SCHEMA);
