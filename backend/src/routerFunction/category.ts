import { NextFunction, Request, Response } from "express";
import Category from "../dataModels/categoryModel";
import { sendServerError } from "../utility/error";
import { sendResponse } from "../utility/response";

// Add a new category
export const addCategory = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { name, parent, slug, image, description } = req.body;
        
        const categoryExist = await Category.findOne({ name });
        if (categoryExist) {
            throw new Error("The category already exists");
        }

        const newCategory = new Category({ name, parent, slug, image, description });
        await newCategory.save();

        sendResponse(res, 201, "Successfully added a new category", { category: newCategory });
    } catch (err: any) {
        next(err);
    }
};

// Read all categories
export const readCategory = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const allCategories = await Category.find({});
        if (allCategories.length === 0) {
            throw new Error("No categories found");
        }
        sendResponse(res, 200, "All categories retrieved", allCategories);
    } catch (err: any) {
        next(err);
    }
};

// Read a single category by ID
export const readSingleCategory = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { id } = req.params;
        const singleCategory = await Category.findById(id);
        if (!singleCategory) {
            throw new Error("No category found");
        }
        sendResponse(res, 200, "Category found", singleCategory);
    } catch (err: any) {
        next(err);
    }
};

// Update a category
export const updateCategory = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { id } = req.params;
        const { name, slug, description, image, parent } = req.body;
        
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, slug, parent, description, image },
            { new: true }
        );

        if (!updatedCategory) {
            throw new Error("Could not update category");
        }

        sendResponse(res, 200, "Category updated", updatedCategory);
    } catch (err: any) {
        next(err);
    }
};

// Delete categories by IDs
export const deleteCategory = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { ids } = req.body;
        const deleteResult = await Category.deleteMany({ _id: { $in: ids } });
        
        if (deleteResult.deletedCount === 0) {
            throw new Error("Items not found");
        }

        sendResponse(res, 200, "Items deleted successfully", { deletedCount: deleteResult.deletedCount });
    } catch (err: any) {
        next(err);
    }
};
