import { Request, Response } from "express";
import { sendResponse } from "../utility/response";
import { sendServerError } from "../utility/error";
import FAQ from '../dataModels/faqModel'; // Assuming you have an FAQ model

interface FAQ_INTERFACE {
    question: string;
    answer: string;
}


export const readFaq = async (req: Request, res: Response):Promise<any> => {
    try {
        const faq = await FAQ.find({});
        if (faq.length === 0) {
            return res.status(404).json({ message: 'No FAQs found' });
        }
        return res.status(200).json(faq);
    } catch (err) {
        console.log(err);
        sendServerError(res, err);
    }
};


export const addFAQ = async (req: Request, res: Response) => {
    const { question, answer }: FAQ_INTERFACE = req.body;

    try {
        const existingFAQ = await FAQ.findOne({ question });
        if (existingFAQ) {
            return sendResponse(res, 400, 'FAQ already exists');
        }

        const newFAQ = new FAQ({
            question,
            answer
        });

        await newFAQ.save();
        return sendResponse(res, 200, 'FAQ added successfully', newFAQ);
    } catch (err) {
        console.log(err);
        sendServerError(res, err);
    }
};


export const deleteFAQ = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(id);
        if (!deletedFAQ) {
            return sendResponse(res, 400, 'FAQ not found');
        }

        return sendResponse(res, 200, 'FAQ deleted successfully', deletedFAQ);
    } catch (err) {
        console.log(err);
        sendServerError(res, err);
    }
};