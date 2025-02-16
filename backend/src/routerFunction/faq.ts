import { Request, Response } from "express";
import { sendResponse } from "../utility/response";
import FAQ from "../dataModels/faqModel"; // Assuming you have an FAQ model

interface FAQ_INTERFACE {
    question: string;
    answer: string;
}

// Read all FAQs
export const readFaq = async (req: Request, res: Response): Promise<void> => {
    try {
        const faqs = await FAQ.find({});
        if (!faqs.length) {
            throw { status: 404, message: "No FAQs found" };
        }
        return sendResponse(res, 200, "FAQs retrieved successfully", faqs);
    } catch (err: any) {
        console.error("Error fetching FAQs:", err.message);
        throw { status: err.status || 500, message: err.message || "Server error" };
    }
};

// Add a new FAQ
export const addFAQ = async (req: Request, res: Response): Promise<void> => {
    const { question, answer }: FAQ_INTERFACE = req.body;

    try {
        const existingFAQ = await FAQ.findOne({ question });
        if (existingFAQ) {
            throw { status: 400, message: "FAQ already exists" };
        }

        const newFAQ = new FAQ({ question, answer });
        await newFAQ.save();
        
        return sendResponse(res, 201, "FAQ added successfully", newFAQ);
    } catch (err: any) {
        console.error("Error adding FAQ:", err.message);
        throw { status: err.status || 500, message: err.message || "Server error" };
    }
};

// Delete an FAQ by ID
export const deleteFAQ = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(id);
        if (!deletedFAQ) {
            throw { status: 404, message: "FAQ not found" };
        }

        return sendResponse(res, 200, "FAQ deleted successfully", deletedFAQ);
    } catch (err: any) {
        console.error("Error deleting FAQ:", err.message);
        throw { status: err.status || 500, message: err.message || "Server error" };
    }
};
