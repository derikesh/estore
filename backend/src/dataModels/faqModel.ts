import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the FAQ document
export interface FAQ_INTERFACE extends Document {
    question: string;
    answer: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the FAQ schema
const FAQSchema: Schema = new Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

// Create and export the FAQ model
const FAQ = mongoose.model<FAQ_INTERFACE>('FAQ', FAQSchema);
export default FAQ;