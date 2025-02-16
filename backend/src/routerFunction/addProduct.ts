import { Request, Response, NextFunction } from "express";

// Utility functions
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";

// Data models
import Product from "../dataModels/productModel";
import { PRODUCT_INTERFACE } from "../dataModels/productModel";
import categoryModel from "../dataModels/categoryModel";

// Adding product into database
export const addProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, category, description, images, productImages, sizes, color }: PRODUCT_INTERFACE = req.body;
        
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            throw new Error("Product already exists");
        }

        const newProduct = new Product({ name, price, productImages, category, description, images, sizes, color });
        await newProduct.save();
        return sendResponse(res, 200, "Product added successfully", newProduct);
    } catch (err) {
        next(err);
    }
};

// Fetching all products
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { includeCategory, selectedCategory } = req.query;
        const filter = selectedCategory ? { category: selectedCategory } : {};
        
        const allProducts = await Product.find(filter);
        if (!allProducts.length) {
            throw new Error("No products found");
        }

        if (includeCategory === "true") {
            const categories = await categoryModel.find({});
            return sendResponse(res, 200, "All products", { allProducts, categories });
        }

        return sendResponse(res, 200, "All products", allProducts);
    } catch (err) {
        next(err);
    }
};

// Fetching a single product by ID
export const getProductSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { includeSuggestion } = req.query;

        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }

        if (includeSuggestion === "true") {
            const suggestions = await Product.find({ category: product.category, _id: { $ne: product._id } });
            return sendResponse(res, 200, "Product details", { product, suggestions });
        }
        
        return sendResponse(res, 200, "Product details", product);
    } catch (err) {
        next(err);
    }
};

// Updating a product by ID
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, price, category, description, productImages, images, sizes, color }: PRODUCT_INTERFACE = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, category, description, images, productImages, sizes, color },
            { new: true }
        );

        if (!updatedProduct) {
            throw new Error("Product could not be updated");
        }

        return sendResponse(res, 200, "Product updated successfully", updatedProduct);
    } catch (err) {
        next(err);
    }
};

// Deleting a product by ID
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new Error("Product not found");
        }

        return sendResponse(res, 200, "Product deleted successfully", deletedProduct);
    } catch (err) {
        next(err);
    }
};

// Deleting multiple products
export const deleteSelected = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ids } = req.body;
        const deleteResult = await Product.deleteMany({ _id: { $in: ids } });

        if (deleteResult.deletedCount === 0) {
            throw new Error("No products were deleted");
        }

        return sendResponse(res, 200, "Products deleted successfully", { deletedCount: deleteResult.deletedCount });
    } catch (err) {
        next(err);
    }
};

// Adding product details
export const addDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { newFeatures, id } = req.body;

        if (!newFeatures) {
            throw new Error("Features are required");
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: { features: newFeatures } },
            { new: true }
        );

        if (!updatedProduct) {
            throw new Error("Product not found");
        }

        return sendResponse(res, 200, "Features added successfully", updatedProduct);
    } catch (err) {
        next(err);
    }
};
