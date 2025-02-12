import mongoose, { Document, Schema } from "mongoose";

interface ImageInterFace {
    imageUrl: string;
    publicKey: string;
}

export interface CATEGORY_INTERFACE extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    parent?: mongoose.Types.ObjectId;  // Self-referencing for hierarchy
    image?: ImageInterFace;
    slug: string;
    description: string;
}

const ImageSchema = new Schema<ImageInterFace>({
    imageUrl: { type: String, required: false },
    publicKey: { type: String, required: false }
});

const categorySchema = new Schema<CATEGORY_INTERFACE>({
    name: { type: String, required: true, unique: true },
    slug: { type: String },
    image: { type: ImageSchema, required: false },
    parent: { type: mongoose.Types.ObjectId, ref: "Category", default: null },
    description: { type: String }
});

// Pre-save hook to convert slug to lowercase
categorySchema.pre<CATEGORY_INTERFACE>("save", function (next) {
    if (this.slug) {
        this.slug = this.slug.toLowerCase();
    }
    next();
});

export default mongoose.model<CATEGORY_INTERFACE>("Category", categorySchema);
